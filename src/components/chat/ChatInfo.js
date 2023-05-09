import React from 'react';
import styled from 'styled-components';
import correctLogo from '../../assets/correct-logo.png';

// const sizes = {
//     tablet: 1024,
//     phone: 768,
//   };

// // 자동으로 media 쿼리 함수를 만들어 준다.
// const media = Object.keys(sizes).reduce((acc, label) => {
//     acc[label] = (...args) => css`
//       @media (max-width: ${sizes[label] / 16}em) {
//         ${css(...args)};
//       }
//     `;
//     return acc;
//   }, {});

const InfoWrap = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  justify-content: center;
`;

const ImageWrap = styled.div`
  display: flex;

  img {
    margin: 3rem auto;
    width: 10rem;
    height: 10rem;
  }
`;

const TextWrap = styled.div`
  display: flex;
  width: 100%;
  height: 25%;

  h1 {
    margin: 3rem auto;
    width: 30rem;
    height: 10rem;
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
  }

  h2 {
    margin: 1rem auto;
    width: 30rem;
    height: 10rem;
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
  }
`;

const ChatInfo = () => {
  return (
    <InfoWrap>
      <ImageWrap>
        <img src={correctLogo} alt="correcting 로고" />
      </ImageWrap>
      <TextWrap>
        <h1>Correct-ing과 함께 공부해 보세요</h1>
      </TextWrap>
      <TextWrap>
        <h2>주제를 선택해 주세요</h2>
      </TextWrap>
    </InfoWrap>
  );
};
export default ChatInfo;
