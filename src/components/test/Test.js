import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import correctLogo from '../../assets/correct-logo.png';
import { MdNavigateBefore } from 'react-icons/md';
import { RiCloseLine } from 'react-icons/ri';
import { IoArrowForwardCircle } from 'react-icons/io5';
import { IoArrowBackCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';

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
  width: 100vw;
  height: 100vh;
  justify-content: center;
`;
const TestWrap = styled.div`
  background-color: #FFFFFF;
  justify-content: center;
  border-radius: 5rem;
  border: none;
  box-shadow: 0px 4px 5px 3px #D8D8D8;
  width: 75vw;
  height: 78vh;
  margin:2rem auto;
  margin-top: -2rem;
  ${media.phone`width: 90vw; height: 60vh; margin-top:-5rem;`};
  svg{
    color: #6AC7B2;
  }
`;
const IngWrap = styled.div`
    display: flex; 
    background-color: #F3F3F3;
    width: 100%;
    height: 15%;
    border-radius: 5rem 5rem 0 0;
    justify-content: center;
    align-items: center;
`;
const TestMiddleWrap=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  width: 100%;
  height: 80%;
  background: none;
`;
const ButtonWrap = styled.div`
    display: flex;
    margin-right:6rem;
    margin-top: 2rem;
    justify-content: flex-end;
    width: 100%;
    height: 10%;
    cursor: pointer;
`;
const StatusBar = styled.div`
    width: 70%;
    height: 30%;
    background-color: #FFFFFF;
    margin-top: 5px;
    border-radius: 30px;
`;
const StyledStatusBar = styled(StatusBar)`
    justify-content:left;
    overflow: hidden;
`;
const Progress = styled.div`
    height: 100%;
    border-radius: inherit;
    background-color: #6AC7B2;
    transition: width 0.5s ease-in-out;
`;
const IntroWrap = styled.div`
  display: flex;
  align-items: center;
  margin:1rem ;
  justify-content: center;
  img {
    width: 3rem;
    margin-right: 0.3rem;
  }
  h1 {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }
  p {
    color: #767676;
    font-size: 0.8rem;
    letter-spacing: 0.02rem;
    text-align:center;
  }
`;

const ProblemWrap = styled.div`
    width: 85%;
    height:80%;
    background-color:#FFFFFF;
    border-radius: 50px;
    border: 1px solid #D9D9D9;
    margin-top: 1rem;
`;
const TextInput = styled.input`
  font-size: 2rem;
  width: 50%;
  margin: 2rem;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  ${media.phone`width: 55%; margin:1rem;`};
`;
const QuestionWrap = styled.div`
    width: 100%;
    height:50%;
    background-color:#EAF5F3;
    border-radius: 50px 50px 0px 0px;
`;
const AnswerWrap = styled.div`
    width: 100%;
    height:50%;
    background-color:#FFFFFF;
    border-radius: 0px 0px 50px 50px;
    justify-content: center;
    align-items: center;  
`;
const ProgressNumber = styled.span`
    display: flex;
    transform: translate(10px, -20px);
    color: #FFFFFF;
    font-size: 1rem;
    font-weight: bold;
`;
const Icon1 = styled(MdNavigateBefore)`
    margin-right: 1rem;
`;
const Close = styled(RiCloseLine)`
    margin-top:0.5rem;
    margin-left: 1.2rem;
`;
const Test = () => {
  const [problems] = [
    {
      problem: 'Choose the correct spelling:',
      options: ['Beleive', 'Believe', 'Beleve', 'Bleieve'],
      answer: 1,
      category: 'Spelling',
    },
    {
      problem: 'Select the synonym of "happy":',
      options: ['Joyful', 'Sad', 'Angry', 'Tired'],
      answer: 0,
      category: 'Vocabulary',
    },
    {
      category: '품사',
      question: '문제 1',
      answer: '답 1',
    },
    {
      category: '품사',
      question: '문제 1',
      answer: '답 1',
    },
    {
      category: '품사',
      question: '문제 2',
      answer: '답 2',
    },
    
    {
      category: '품사',
      question: '문제 10',
      answer: '답 10',
    },
    {
      category: '품사',
      question: '문제 1',
      answer: '답 1',
    },
    {
      category: '품사',
      question: '문제 1',
      answer: '답 1',
    },
    {
      category: '품사',
      question: '문제 1',
      answer: '답 1',
    },
    {
      category: '품사',
      question: '문제 1',
      answer: '답 1',
    },
  ]; // 서버에서 가져온 문제 목록을 담을 상태 변수
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0); // 현재 문제의 인덱스
    const [userAnswer, setUserAnswer] = useState(null); // 사용자의 입력 값을 담을 상태 변수
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null); // 정답 맞춤 여부를 담을 상태 변수
    
    const handleAnswerSelection = (selectedOption) => {
      setUserAnswer(selectedOption);
      setIsAnswerCorrect(selectedOption === problems[currentProblemIndex].answer);
    };
  
    const handleNext = () => {
      handleCheckAnswer();
      if (currentProblemIndex < problems.length - 1) {
        handleCheckAnswer(); // 다음 버튼을 누르기 전에 정답 확인 동작 수행
        setCurrentProblemIndex(currentProblemIndex + 1);
        setUserAnswer('');
        setIsAnswerCorrect(null);
      }
        
    };
    const handlePrev = () => {
      if (currentProblemIndex > 0) {
        setCurrentProblemIndex(currentProblemIndex - 1);
        setUserAnswer('');
        setIsAnswerCorrect(null);
      }
    };
    const currentProblem = problems[currentProblemIndex];
  
    const handleCheckAnswer = () => {
      if (problems.length > 0 && currentProblemIndex < problems.length) {
        const currentProblem = problems[currentProblemIndex];
        if (userAnswer.toLowerCase() === currentProblem.answer.toLowerCase()) {
          setIsAnswerCorrect(true);
        } else {
          setIsAnswerCorrect(false);
        }
      }
    };
  
  return (
    <MainWrap>
      <TestWrap>
        <IngWrap>
            <Icon1 size="50"/>
            <StyledStatusBar>
                <Progress style={{ width: `${((currentProblemIndex + 1) / problems.length) * 100}%` }} />
                <ProgressNumber>{currentProblemIndex + 1}/{problems.length}</ProgressNumber>
            </StyledStatusBar>
            <Link to="/"><Close size="40"/></Link>
        </IngWrap>
        <TestMiddleWrap>
          <IntroWrap>
              <img src={correctLogo} alt="correcting 로고" />
              <div>
                  <h1>Correct-ing과 함께 공부해 보세요.</h1>
                  <p>다음 빈 칸에 맞는 단어를 입력해주세요!</p>
              </div>
          </IntroWrap>
         
          <ProblemWrap>
              <QuestionWrap>
              <p>{currentProblem.problem}</p>
              </QuestionWrap>
              <AnswerWrap>
              {currentProblem.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelection(index)}
                  disabled={userAnswer !== null}
                >
                {option}
                </button>
              ))}
              </AnswerWrap>
              {isAnswerCorrect !== null && (
              <div>
                {isAnswerCorrect ? (
                  <p>맞았습니다!</p>
                ) : (
                  <p>틀렸습니다!</p>
                )}
              </div>
            )}
          </ProblemWrap>
          
          <ButtonWrap>
              <IoArrowBackCircle size="50" onClick={handlePrev}/>
              <IoArrowForwardCircle size="50" onClick={handleNext}/>
          </ButtonWrap>
        </TestMiddleWrap>
      </TestWrap>
    </MainWrap>
  );
};
export default Test;