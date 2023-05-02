import React from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { useState } from 'react';

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
`;

const IntroWrap = styled.div`
  background-color: #e0f2f6;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  img {
    width: 14rem;
    ${media.phone`width: 5rem;`};
  }
  h1 {
    font-weight: 700;
    font-size: 3rem;
    letter-spacing: 0.1rem;
    margin: 3rem 0;
    ${media.phone`font-size: 2rem; margin: 2rem 0`};
  }
  p {
    font-size: 1.5rem;
    ${media.phone`font-size: 0.9rem;`};
    text-align: center;
    letter-spacing: 0.03rem;
    margin-bottom: 0.3rem;
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

const ChattingWrap = styled.input`
  background-color: #e0f2f6;
  width: 80vw;
  height: 3vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const FormWrap = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 30%;
  ${media.tablet`width: 50%;`};
  ${media.phone`width: 80%;`};
`;

const Chat = () => {
  const [prompt, setPrompt] = useState('');

  const postData = {
    prompt: prompt,
  };

  const HandlePrompt = (e) => {
    e.preventDefault();
    axios
      .post(
        'http://correcting-env.eba-harr53pi.ap-northeast-2.elasticbeanstalk.com/api/v1/chat',
        postData,
      )
      .then((response) => {
        alert('성공');
      })
      .catch((error) => {
        console.log(error);
        alert('실패');
      });
  };

  return (
    <MainWrap>
      <IntroWrap />

      <FormWrap onSubmit={HandlePrompt}>
        <ChattingWrap onChange={(e) => setPrompt(e.target.value)} />
        <SubmitBtn onSubmit={HandlePrompt}>입력</SubmitBtn>
      </FormWrap>
    </MainWrap>
  );
};

export default Chat;
