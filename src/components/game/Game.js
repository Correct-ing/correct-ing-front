import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';

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

const MainDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
`;

const RankDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4rem;
  width: 20%;
  height: 32rem;
  background-color: black;
  align-items: center;
  border-radius: 5rem;
  border-radius: 50px;
  border: 1px solid #D9D9D9;
  background: #ffffff;

  h1{
    margin: 2rem auto;
  }
`;

// GRAPH DIV
const GameDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  margin-left: -3rem;
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
    button {
      margin: 5rem auto;
      width: 8rem;
      height: 4rem;
      border: none;
      border-radius: 1rem;
      background-color: #ccc;
      transition: background-color 0.3s, cursor 0.3s;
      cursor: pointer;
    }
    
    button:hover {
      background-color: #aaa;
    }
    
    button:active {
      background-color: #888;
      cursor: grabbing;
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
  const [rankData, setRankData] = useState([]);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [count, setCount] = useState("");
  const { loginRes } = useSelector(({ auth }) => ({
    form: auth.login, // 상태 값 설정
    loginRes: auth.loginRes,
    loginErr: auth.loginErr,
  }));
  const accessToken = loginRes.accessToken;

  useEffect(() => {
    if (timeLeft > -1) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft < 0){
      setTimeLeft(0);
      setGameOver(true);
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const saveScore = async () =>{
    const url = 'http://correcting-env.eba-harr53pi.ap-northeast-2.elasticbeanstalk.com/api/v1/games';
    
    try {
      const response = await axios.post(
        url,
        null,
        {
          params: {
            score,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Handle response if needed
      console.log(response.data);

    } catch (error) {
      // Handle error if needed
      console.error(error);
    }
    alert("점수가 기록되었습니다!");
    setButtonVisible(false);
  }

  const getRank = async () =>{
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.get('http://correcting-env.eba-harr53pi.ap-northeast-2.elasticbeanstalk.com/api/v1/games', { headers });
      const data = response.data;

      setRankData(data); // 데이터를 상태로 업데이트합니다.
      getRank();
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  }

  useEffect(() => {
    getRank();
            // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 컴포넌트가 마운트되었을 때 한 번만 데이터를 가져오기 위해 useEffect 사용


  if (gameOver) {
    return (
      <MainDiv>
        <RankDiv>

          <h1>Top 5</h1>
          {rankData.map((item, index) => {
            if (index < 5) {
              return (
                <h1 key={index}> {index + 1}위: {item.name} - {item.score}Point</h1>
              );
            } else {
              return null; // 4 이후에는 아무것도 렌더링하지 않음
            }
          })}

        </RankDiv>
        <GameDiv>
          <ProblemWrap>
            <h1>게임 오버</h1>
            <br/>
            <h1>최종 점수: {score}</h1>
            {buttonVisible && (
              <button onClick={saveScore}>점수 저장</button>
            )}
          </ProblemWrap>
        </GameDiv>
      </MainDiv>
      
    );
  }

  if (!gameStart){
    return(
      <MainDiv>
        <RankDiv>

          <h1>Top 5</h1>
          {rankData.map((item, index) => {
            if (index < 5) {
              return (
                <h1 key={index}> {index + 1}위: {item.name} - {item.score}Point</h1>
              );
            } else {
              return null; // 4 이후에는 아무것도 렌더링하지 않음
            }
          })}
       
        </RankDiv>
        <GameDiv>
          <h1>{count}</h1>
          <ProblemWrap>

            <AnswerWrap>
              <p>이 곳에 나타나는 문장을 똑같이 타이핑 해주세요!</p>
            </AnswerWrap>

            <button onClick={startGame}>시작하기</button>

          </ProblemWrap>

        </GameDiv>
      </MainDiv>
    )
  } else {

    return (
      <MainDiv>
        <RankDiv>

          <h1>Top 5</h1>
          {rankData.map((item, index) => {
            if (index < 5) {
              return (
                <h1 key={index}> {index + 1}위: {item.name} - {item.score}Point</h1>
              );
            } else {
              return null; // 4 이후에는 아무것도 렌더링하지 않음
            }
          })}

        </RankDiv>
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

      </MainDiv>
    );
  };
}
export default Game;

