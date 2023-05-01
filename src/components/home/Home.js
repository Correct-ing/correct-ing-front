import React from 'react';
import styled, { css } from 'styled-components';
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

const ChatWrap = styled.div`
  background-color: white;
  width: 100vw;
  height: 100vh;
`;

const Home = () => {
  return (
    <MainWrap>
      <IntroWrap>
        <img src={correctLogo} alt="correcting 로고" />
        <h1>Correct-ing</h1>
        <p>챗봇을 통해 대화 속 오류들을 점검 받으며 영어 공부해요.</p>
        <p>취약점 분석을 통해 부족한 부분을 발전시켜요.</p>
      </IntroWrap>
      <ChatWrap />
    </MainWrap>
  );
};

export default Home;
