import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const words = [
  "the quick brown fox jumps",
  "life is short make it",
  "keep calm and code on",
  "practice makes perfect",
  "dream big work hard",
  "stay focused and never give up",
  "be yourself everyone else is taken",
  "success is the sum of small efforts",
  "believe in yourself and all that you are",
  "do what you love love what you do",
];

// GRAPH DIV
const GameDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem auto;
  width: 80%;
  height: 40rem;
  background-color: black;
  align-items: center;
  border-radius: 5rem;
  background: #ffffff;
`;

const TimeBarDiv = styled.div`
  height: 2rem;
  margin: 1rem auto;
  background-color: white;
  border-radius: 1rem;
`;

const TextInput = styled.input`
  font-size: 2rem;
  width: 50%;
  margin: 4rem; auto;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const ProblemWrap = styled.div`
    width: 85%;
    height:80%;
    background-color:#FFFFFF;
    border-radius: 50px;
    border: 1px solid #D9D9D9;
    align-items: center;
    text-align: center;
    margin-top: 1rem;
    p{
      line-height: 2em;
    }
    h1{
      font-size: 3rem;
      margin: 5rem auto;
    }
`;
const AnswerWrap = styled.div`
    width: 100%;
    height:50%;
    align-items: center;
    text-align: center;
    background-color:#EAF5F3;
    border-radius: 50px 50px 0px 0px;

    p{
      line-height: 8em;
      font-size: 2rem;
    }
`;

const Game = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft > -1) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft < 0){
      setGameOver(true);
    }
  }, [timeLeft]);

  const handleInput = (event) => {
    setUserInput(event.target.value);
  };

  const decreaseTime = () => {
    setTimeLeft((prevTimeLeft) => prevTimeLeft - 0.3);
  };

  const resetTimer = () => {
    setTimeLeft(15);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const input = userInput.trim();
      if (input === currentWord) {
        setScore(score + 1);
        const nextWord = words[Math.floor(Math.random() * words.length)];
        setCurrentWord(nextWord);
        setUserInput("");
        setTimeLeft(15);
        const multiplier = score >= 1 ? 2 : 1; // 첫 번째 맞춤일 때는 1, 그 이후로는 2를 곱하여 가중치 부여
        decreaseTime(multiplier);
      }
      setUserInput("");
    }
  };

  useEffect(() => {
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    resetTimer();
  }, []);

  useEffect(() => {
    if (score > 0) {
      const updatedTimeLeft = 15 - (score * 0.3);
      setTimeLeft(updatedTimeLeft);
    }
  }, [score]);

  const getBarColor = (timeLeft) => {
    if (timeLeft <= 2) {
      return "red";
    } else if (timeLeft <= 4) {
      return "yellow";
    } else {
      return "green";
    }
  };

  const barStyle = {
    width: `${(timeLeft / 60) * 300}%`,
    transition: "width 1s linear",
    backgroundColor: getBarColor(timeLeft),
  };

  if (gameOver) {
    return (
      <GameDiv>
        <ProblemWrap>
          <h1>게임 오버</h1>
          <br/>
          <h1>최종 점수: {score}</h1>
        </ProblemWrap>
      </GameDiv>
    );
  }

  return (
    <div>
      <GameDiv>
        <TimeBarDiv style={barStyle}/>
        <ProblemWrap>
          <AnswerWrap>
            <p>{currentWord}</p>
          </AnswerWrap>
            <TextInput
              type="text"
              value={userInput}
              onChange={handleInput}
              onKeyPress={handleKeyPress}
            />
          <p>남은 시간: {timeLeft.toFixed(1)}초</p>
          <p>점수: {score}</p>
        </ProblemWrap>
        
      </GameDiv>
      
    </div>
  );
};

export default Game;

