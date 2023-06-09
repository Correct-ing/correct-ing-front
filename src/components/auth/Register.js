import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import correctLogo from '../../assets/correct-logo.png';

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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const IntroWrap = styled.div`
  display: flex;
  margin-top: 5rem;
  width: 30%;
  ${media.tablet`margin-top: 4rem;`};
  ${media.phone`margin-top: 3rem;`};
  flex-direction: column;
  ${media.tablet`width: 50%;`};
  ${media.phone`width: 80%;`};

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
  width: 30%;
  ${media.tablet`width: 50%;`};
  ${media.phone`width: 80%;`};
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
  ${media.tablet`margin: 3rem 0;`};
  ${media.phone`margin: 2rem 0;`};
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

const DupCheckBtn = styled.button`
  background-color: #e0f2f6;
  border: none;
  cursor: pointer;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  :hover {
    background-color: #cae7e2;
    transition: all 0.2s;
  }
`;

const IdWrap = styled.div`
  display: flex;
  gap: 1rem;
  input {
    width: 70%;
  }
  button {
    width: 25%;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  font-weight: 700;
`;

const CheckMessage = styled.div`
  color: #6ac7b2;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 700;
  margin-top: 1rem;
`;

const Register = ({ form, onChange, onSubmit, error, onCheck, message }) => {
  return (
    <MainWrap>
      <IntroWrap>
        <LogoWrap>
          <img src={correctLogo} alt="correcting 로고" />
          <Link to="/">Correct-ing</Link>
        </LogoWrap>
        <h1>회원가입</h1>
        <p>닉네임, 아이디, 비밀번호를 입력해주세요!</p>
      </IntroWrap>
      <FormWrap onSubmit={onSubmit}>
        <FormInput>
          <label htmlFor="name">Nickname</label>
          <input
            id="name"
            placeholder="Enter your nickname"
            name="name"
            onChange={onChange}
            value={form.name}
          />
        </FormInput>
        <FormInput>
          <label htmlFor="id">ID</label>
          <IdWrap>
            <input
              id="id"
              placeholder="Enter your id"
              name="id"
              onChange={onChange}
              value={form.id}
            />
            <DupCheckBtn onClick={onCheck}>중복 확인</DupCheckBtn>
          </IdWrap>
          {message && <CheckMessage>{message}</CheckMessage>}
        </FormInput>
        <FormInput>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            placeholder="Enter your password"
            name="password"
            onChange={onChange}
            value={form.password}
            type="password"
          />
        </FormInput>
        <FormInput>
          <label htmlFor="passwordConfirm">Password Confirm</label>
          <input
            id="passwordConfirm"
            placeholder="Enter your password"
            name="passwordConfirm"
            onChange={onChange}
            value={form.passwordConfirm}
            type="password"
          />
        </FormInput>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitBtn type="submit">가입하기</SubmitBtn>
      </FormWrap>
    </MainWrap>
  );
};

export default Register;
