import React from 'react';
import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';

{/* 메인 */}
const MainWrap = styled.div`
  width: 100%;
  height: 50rem;
  margin-left: 1rem;
  display: flex;
  justify-content: center;
`;

// 채팅 DIV
const GameWrap = styled.div`
  justify-content: center;
  margin: 3rem auto;
  width: 50rem;
  height: 40rem;
  background-color: black;
  border-radius: 5rem;
  background: #ffffff;
  box-shadow: 0rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
`;

// 게임 상단 DIV
const GameTopWrap = styled.div`
  display: flex;
  width: 100%;
  height: 30%;
  border-radius: 5rem;
  background: rgba(224, 224, 224, 0.4);
  max-height: 20rem;

  h1 {
    width: 100%;
    margin: 3rem auto;
    margin-left: 4rem;
    font-style: normal;
    font-weight: 600;
    font-size: 1.5rem;
    color: black;
  }
`;

// 채팅 중단 DIV
const GameMiddleWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60%;
  background: green;
  margin-top: -5rem;
  overflow-y: scroll;

  h1 {
    width: 100%;
    margin: 3.5rem auto;
    margin-left: 4rem;
    font-style: normal;
    font-weight: 600;
    font-size: 1.5rem;
    color: black;
  }
`;

// 채팅 하단 DIV
const GameBottomWrap = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: center;
  background: blue;
`;

const Game = () => {

  const [Progress, setProgress] = useState();

  return (
  
    <MainWrap>
      <GameWrap>

        <GameTopWrap>

        </GameTopWrap>

        <GameMiddleWrap>

        </GameMiddleWrap>

        <GameBottomWrap>

        </GameBottomWrap>

      </GameWrap>
    </MainWrap>
  
  )
};

export default Game;
