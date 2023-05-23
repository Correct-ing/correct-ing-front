import React, { useState, useEffect } from "react";
import styled from 'styled-components';

// 50문제 랜덤
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
  "i love walking dogs",
  "coffee fuels my mornings",
  "reading books relaxes me",
  "music enhances my cooking",
  "traveling brings me joy",
  "running in parks refreshes me",
  "loved ones make me happy",
  "painting sparks my creativity",
  "journaling clears my mind",
  "yoga keeps me balanced",
  "rain's sound soothes me",
  "board games with friends are fun",
  "nature inspires me",
  "trying new recipes is an adventure",
  "dance expresses my freedom",
  "gardening is therapeutic",
  "movies help me unwind",
  "puzzles challenge and entertain me",
  "photography captures moments",
  "helping others fulfills me",
  "learning is a lifelong journey",
  "laughter is the best medicine",
  "friends are the family we choose",
  "creativity knows no bounds",
  "adventure awaits at every corner",
  "kindness costs nothing",
  "hard work pays off",
  "imagination is the key to innovation",
  "failure is a stepping stone to success",
  "patience is a virtue",
  "simplicity is the ultimate sophistication",
  "knowledge is power",
  "time is precious, use it wisely",
  "love conquers all",
  "actions speak louder than words",
  "change starts from within",
  "happiness is a choice",
  "beauty is in the eye of the beholder",
  "forgiveness sets you free",
  "hope is a powerful motivator",
  "self-care is important for well-being",
  "gratitude turns what we have into enough",
  "embrace the unknown",
  "positivity breeds positivity",
  "success comes to those who persevere",
  "inspiration can be found everywhere",
  "learning from mistakes leads to growth",
  "a journey of a thousand miles begins with a single step",
  "challenges make you stronger",
  "kindness is contagious",
  "stay curious, keep learning",
  "dreams have no limits",
  "be the change you wish to see in the world",
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
    button{
      margin: 5rem auto;
      width: 8rem;
      height: 4rem;
      border: none;
      border-radius: 1rem;
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
  const [timeLeft, setTimeLeft] = useState(1000000);
  const [gameOver, setGameOver] = useState(false);
  const [inCorrect, setInCorrect] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [count, setCount] = useState("");

  useEffect(() => {
    if (timeLeft > -1) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft < 0){
      setTimeLeft(0);
      setGameOver(true);
    }
  }, [timeLeft]);

  const handleInput = (event) => {
    setUserInput(event.target.value);
  };

  const decreaseTime = () => {
    setTimeLeft((prevTimeLeft) => prevTimeLeft - 0.3);
  };

  const startGame = () =>{
    let countdown = 3;
    const countdownInterval = setInterval(() => {
      setCount(countdown);
      countdown--;

      if (countdown < 0) {
        clearInterval(countdownInterval);
        setGameStart(true);
        setTimeLeft(15);
      }
    }, 1000);
    
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const input = userInput.trim();
      if (input === currentWord) {
        setScore(score + 10);
        const nextWord = words[Math.floor(Math.random() * words.length)];
        setCurrentWord(nextWord);
        setUserInput("");
        setTimeLeft(15);
        const multiplier = score >= 1 ? 2 : 1; // 첫 번째 맞춤일 때는 1, 그 이후로는 2를 곱하여 가중치 부여
        decreaseTime(multiplier);
      } else{
        // 틀렸을때
        setInCorrect(true);
        setTimeout(() => {
          // 일시 정지 후 실행할 코드 작성
          setInCorrect(false);
        }, 2000);
      }
      setUserInput("");
    }
  };

  useEffect(() => {
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  useEffect(() => {
    if (score > 0) {
      const updatedTimeLeft = 15 - (score * 0.3 / 10);
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

  if (!gameStart){
    return(
      <GameDiv>
        <h1>{count}</h1>
        <ProblemWrap>
          
          <AnswerWrap>
            <p>이 곳에 나타나는 문장을 똑같이 타이핑 해주세요!</p>
          </AnswerWrap>

          <button onClick={startGame}>시작하기</button>

        </ProblemWrap>

      </GameDiv>
    )
  } else {

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
            {inCorrect && (<p style={{ color: 'red' }}>틀렸습니다!</p>)}
          </ProblemWrap>

        </GameDiv>

      </div>
    );
  };
}
export default Game;

