import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import correctLogo from '../../assets/correct-logo.png';

const sizes = {
  tablet: 1024,
  phone: 768,
};

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

const Login = ({ form, onChange, onSubmit, error }) => {
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
            <input
              id="id"
              placeholder="Enter your id"
              value={form.id}
              onChange={onChange}
              name="id"
            />
          </FormInput>
          <FormInput>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
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
