import React from 'react';
import styled from 'styled-components';

const MyChat = ({ text }) => {
  const MainWrap = styled.div`
    margin-top: 1rem;
    display: flex;
    width: 100%;
    height: 10%;
    align-items: center;
    justify-content: right;
  `;

  const Chat = styled.div`
    display: flex;
    width: ${text.length * 1}rem;
    height: 100%;
    margin: 1rem 2rem;
    background-color: rgba(127, 168, 157, 0.3);
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    color: #333;
    font-size: 16px;
    text-align: center;
    justify-content: center;
  `;
  return (
    <MainWrap>
      <Chat>{text}</Chat>
    </MainWrap>
  );
};
export default MyChat;
