import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import correctLogo from '../../assets/correct-logo.png';
import axios from 'axios';

const sizes = {
  tablet: 1024,
  phone: 768,
};

// 자동으로 media 쿼리 함수를 만들어 준다.
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

const MainWrap = styled.div`
  display: flex;
`;

const GreenWrap = styled.div`
  background-color: #6ac7b2;
  width: 65vw;
  height: 100vh;
  ${media.tablet`display: none;`};
  ${media.phone`display: none;`};
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 35vw;
  ${media.tablet`width: 100vw;`};
  ${media.phone`width: 100vw;`};
  height: 100vh;
`;

const IntroWrap = styled.div`
  display: flex;
  margin-top: 5rem;
  ${media.tablet`margin-top: 4rem;`};
  ${media.phone`margin-top: 3rem;`};
  flex-direction: column;
  width: 80%;

  h1 {
    font-size: 2.3rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1.5rem;
    ${media.tablet`margin-bottom: 2rem;`};
    ${media.phone`margin-bottom: 2rem;`};
  }

  p {
    color: #cac6c6;
    font-weight: 500;
    font-size: 1rem;
    text-align: center;
  }
  margin-bottom: 5rem;
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  ${media.tablet`margin-bottom: 3rem;`};
  ${media.phone`margin-bottom: 2rem;`};
  img {
    width: 2rem;
    ${media.phone`width: 1.5rem;`};
  }

  a {
    color: #6ac7b2;
    font-weight: 500;
    font-size: 1.1rem;
    ${media.phone`font-size: 0.9rem;`};
    text-decoration: none;
    letter-spacing: 0.03rem;
  }
`;

const FormWrap = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 80%;
`;

const FormInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  label {
    font-weight: 400;
    font-size: 0.8rem;
    margin-bottom: 0.3rem;
  }
  input {
    padding: 0.7rem 1rem;
    border: 1px solid #c6c4c4;
    border-radius: 0.8rem;
    font-size: 0.8rem;
    &::placeholder {
      color: #d9d9d9;
    }
  }
`;

const SubmitBtn = styled.button`
  margin: 2rem 0;
  background-color: #6ac7b2;
  padding: 0.8rem 1rem;
  width: 100%;
  text-align: center;
  color: white;
  font-weight: 700;
  font-size: 1.4rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  :hover {
    background-color: #cae7e2;
    transition: all 0.2s;
  }
`;

const JoinWrap = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 2rem;
  font-size: 1rem;
  p {
    color: #8c8a8a;
  }

  a {
    color: #6ac7b2;
    font-weight: 700;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  font-weight: 700;
`;

const Login = () => {
  const JWT_EXPIRY_TIME = 24 * 3600 * 1000;
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [check, setCheck] = useState(null);
  const [input, setInput] = useState({
    id: '',
    password: '',
  });

  const { id, password } = input;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if ([id, password].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }

    axios
      .post(
        'http://correcting-env.eba-harr53pi.ap-northeast-2.elasticbeanstalk.com/api/v1/users/login',
        {
          id: id,
          password: password,
        },
      )
      .then((response) => {
        console.log(response);
        onLoginSuccess(response.data.accessToken, response.data.refreshToken);
        setCheck(true);
      })
      .catch((error) => {
        setError('로그인에 실패하였습니다.');
        console.log(error);
      });
  };

  useEffect(() => {
    if (check) {
      navigate('/');
    }
  }, [navigate, check]);

  const onSilentRefresh = (accessToken, refreshToken) => {
    console.log(accessToken, refreshToken);
    axios
      .post(
        'http://correcting-env.eba-harr53pi.ap-northeast-2.elasticbeanstalk.com/api/v1/users/token',
        {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      )
      .then((response) => {
        console.log(response);
        onLoginSuccess(response.data.accessToken, response.data.refreshToken);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLoginSuccess = (accessToken, refreshToken) => {
    console.log(accessToken, refreshToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    setTimeout(onSilentRefresh(accessToken, refreshToken), JWT_EXPIRY_TIME - 60000);
  };

  return (
    <MainWrap>
      <GreenWrap />
      <InputWrap>
        <IntroWrap>
          <LogoWrap>
            <img src={correctLogo} alt="correcting 로고" />
            <Link to="/">Correct-ing</Link>
          </LogoWrap>
          <h1>로그인</h1>
          <p>Welcome back! Please enter your details.</p>
        </IntroWrap>
        <FormWrap onSubmit={onSubmit}>
          <FormInput>
            <label htmlFor="id">ID</label>
            <input id="id" placeholder="Enter your id" value={id} onChange={onChange} name="id" />
          </FormInput>
          <FormInput>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={onChange}
              name="password"
            />
          </FormInput>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <SubmitBtn type="submit">로그인</SubmitBtn>
        </FormWrap>
        <JoinWrap>
          <p>계정이 없으신가요?</p>
          <Link to="/register">계정을 만드세요.</Link>
        </JoinWrap>
      </InputWrap>
    </MainWrap>
  );
};

export default Login;
