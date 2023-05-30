import React from 'react';
import styled from 'styled-components';

const MainWrap = styled.div`
  margin-top: 1rem;
  display: flex;
  width: 100%;
  height: 10%;
  align-items: center;
  justify-content: right;
`;

const MyChat = ({ text }) => {

  const getWidth = (text) => {
    const textLength = text.length;
    const minWidth = 50;
    const width = Math.max(textLength * 10, minWidth);
    return width;
  };

  const width = getWidth(text);

  const chatStyle = {
    display: 'flex',
    height: '100%',
    margin: '1rem 2rem',
    backgroundColor: 'rgba(127, 168, 157, 0.3)',
    borderRadius: '10px',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    color: '#333',
    fontSize: '16px',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${width}px`,
  };

  return (
    <MainWrap>
      <div style={chatStyle}>{text}</div>
    </MainWrap>
  );
};
export default MyChat;
