import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import correctLogo from '../../assets/correct-logo.png';
import chatLogo1 from '../../assets/home-chat1.png';
import chatLogo2 from '../../assets/home-chat2.png';
import weakImg from '../../assets/home-weak.png';

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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  ${media.tablet`flex-direction: column; gap: 3rem;`};
  ${media.phone`flex-direction: column; gap: 3rem;`};
  background-color: white;
  width: 100vw;
  height: 100vh;
`;

const ChatImageWrap = styled.div`
  display: flex;
  align-items: center;
  ${media.tablet`margin-top: 4rem;`};
  ${media.phone`margin-top: 3rem;`};

  img {
    width: 18rem;
    margin-right: 2rem;
    ${media.phone`width: 13rem; margin-right: 0; &:first-child {display: none; }`};
  }
`;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    text-align: center;
    margin-bottom: 0.2rem;
    letter-spacing: 0.05rem;
    font-size: 1.3rem;
    ${media.tablet`font-size: 1.2rem;`};
    ${media.phone`font-size: 0.9rem;`};
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ChatButton = styled.button`
  margin-top: 3rem;
  a {
    font-weight: 700;
    font-size: 1.3rem;
    ${media.tablet`font-size: 1.2rem;`};
    ${media.phone`font-size: 1rem;`};
    text-decoration: none;
    color: black;
  }

  background-color: #ecedf5;
  border: none;
  padding: 1.3rem 2.5rem;
  ${media.tablet`padding: 1.2rem 2.4rem; margin-bottom: 4rem;`};
  ${media.phone`padding: 1.1rem 2.2rem; margin-bottom: 3rem;`};
  border-radius: 25px;
`;

const WeaknessWrap = styled.div`
  background-color: #cae7e2;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;

  ${media.tablet`flex-direction: column-reverse; gap: 4rem;`};
  ${media.phone`flex-direction: column-reverse; gap: 4rem;`};

  img {
    width: 50rem;
    ${media.tablet`width: 30rem;`};
    ${media.phone`width: 20rem;`};
  }
`;

const WeakButton = styled.button`
  margin-top: 3rem;
  a {
    font-weight: 700;
    font-size: 1.3rem;
    ${media.tablet`font-size: 1.2rem;`};
    ${media.phone`font-size: 1rem;`};
    text-decoration: none;
    color: black;
  }

  background-color: white;
  border: none;
  padding: 1.3rem 2.5rem;
  ${media.tablet`padding: 1.2rem 2.4rem; margin-bottom: 4rem;`};
  ${media.phone`padding: 1.1rem 2.2rem; margin-bottom: 3rem;`};
  border-radius: 25px;
`;

const Home = ({ loginRes }) => {
  return (
    <MainWrap>
      <IntroWrap>
        <img src={correctLogo} alt="correcting 로고" />
        <h1>Correct-ing</h1>
        <p>챗봇을 통해 대화 속 오류들을 점검 받으며 영어 공부해요.</p>
        <p>취약점 분석을 통해 부족한 부분을 발전시켜요.</p>
      </IntroWrap>
      <ChatWrap>
        <ChatImageWrap>
          <img src={chatLogo1} alt="채팅 주제 선정 이미지" />
          <img src={chatLogo2} alt="채팅방 이미지" />
        </ChatImageWrap>
        <InfoWrap>
          <div>
            <p>공부하고 싶은 분야를 선택하여</p>
            <p>그에 적합한 대화를</p>
            <p>하면서 공부해요.</p>
          </div>
          <ChatButton>
            <Link to={loginRes ? '/chat' : '/login'}>채팅하러 가기</Link>
          </ChatButton>
        </InfoWrap>
      </ChatWrap>
      <WeaknessWrap>
        <InfoWrap>
          <div>
            <p>대화 내용을 분석하여 자신이</p>
            <p>어느 부분이 부족한지 알 수 있습니다.</p>
            <p>부족한 부분을 중심으로 공부하여</p>
            <p>실력을 향상시켜요.</p>
          </div>
          <WeakButton>
            <Link to={loginRes ? '/myPage' : '/login'}>취약점 분석</Link>
          </WeakButton>
        </InfoWrap>
        <img src={weakImg} alt="취약점 분석 이미지" />
      </WeaknessWrap>
    </MainWrap>
  );
};

export default Home;
