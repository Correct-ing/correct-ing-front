import React from 'react';
import styled from 'styled-components';
// import correctLogo from '../../assets/correct-logo.png';

// const sizes = {
//   tablet: 1024,
//   phone: 768,
// };

// // 자동으로 media 쿼리 함수를 만들어 준다.
// const media = Object.keys(sizes).reduce((acc, label) => {
//   acc[label] = (...args) => css`
//     @media (max-width: ${sizes[label] / 16}em) {
//       ${css(...args)};
//     }
//   `;
//   return acc;
// }, {});

const MainWrap = styled.div`
  margin: 1rem 0.5rem;
  display: flex;
  width: 90%;
  align-items: center;
`;

const GptChat = ({ text }) => {

  const getWidth = (text) => {
    const textLength = text.length;
    const minWidth = 90;
    const width = Math.max(textLength * 10, minWidth);
    return width;
  };

  const width = getWidth(text);

  const chatStyle = {
    display: 'flex',
    height: '100%',
    margin: '1rem 2rem',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    color: '#333',
    fontSize: '16px',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: `${width}px`,
  };

  return (
    <MainWrap>
      <div style={chatStyle}>{text}</div>
    </MainWrap>
  );
};
export default GptChat;
