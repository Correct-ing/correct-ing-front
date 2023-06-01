import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import correctLogo from '../../assets/correct-logo.png';
import { MdNavigateBefore } from 'react-icons/md';
import { RiCloseLine } from 'react-icons/ri';
import { IoArrowForwardCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import TestChart from './TestChart';
import axios from 'axios';

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
  background-color: #ffffff;
  justify-content: center;
  border-radius: 5rem;
  border: none;
  box-shadow: 0px 4px 5px 3px #d8d8d8;
  width: 75vw;
  height: 78vh;
  margin: 2rem auto;
  margin-top: -2rem;
  ${media.phone`width: 90vw; height: 60vh; margin-top:-5rem;`};
  svg {
    color: #6ac7b2;
  }
`;
const IngWrap = styled.div`
  display: flex;
  background-color: #f3f3f3;
  width: 100%;
  height: 15%;
  border-radius: 5rem 5rem 0 0;
  justify-content: center;
  align-items: center;
`;
const TestMiddleWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80%;
  background: none;
`;
const ButtonWrap = styled.div`
  display: flex;
  margin-right: 6rem;
  margin-top: 2rem;
  justify-content: flex-end;
  width: 100%;
  height: 10%;
  cursor: pointer;
`;
const StatusBar = styled.div`
  width: 70%;
  height: 30%;
  background-color: #ffffff;
  margin-top: 5px;
  border-radius: 30px;
`;
const StyledStatusBar = styled(StatusBar)`
  justify-content: left;
  overflow: hidden;
`;
const Progress = styled.div`
  height: 100%;
  border-radius: inherit;
  background-color: #6ac7b2;
  transition: width 0.5s ease-in-out;
`;
const IntroWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
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
    text-align: center;
  }
`;

const ProblemWrap = styled.div`
  width: 85%;
  height: 80%;
  background-color: #ffffff;
  border-radius: 50px;
  border: 1px solid #d9d9d9;
  margin-top: 1rem;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      margin-top: 2.5rem;
      font-weight: 700;
      font-size: 1.1rem;
    }
  }
`;

const QuestionWrap = styled.div`
  width: 100%;
  height: 50%;
  background-color: #eaf5f3;
  border-radius: 50px 50px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-weight: 700;
    font-size: 1.4rem;
  }
`;
const AnswerWrap = styled.div`
  width: 100%;
  height: 50%;
  background-color: #ffffff;
  border-radius: 0px 0px 50px 50px;
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 3rem;

  button {
    border: none;
    background-color: inherit;
    font-weight: 700;
    font-size: 1.3rem;
    cursor: pointer;
    padding: 0.5rem 0.8rem;
    border-radius: 0.5rem;
    box-shadow: 0px 4px 5px 2px #eaf5f3;

    &:hover {
      color: #6ac7b2;
    }
  }
`;
const ProgressNumber = styled.span`
  display: flex;
  transform: translate(10px, -20px);
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
`;
const Icon1 = styled(MdNavigateBefore)`
  margin-right: 1rem;
`;
const Close = styled(RiCloseLine)`
  margin-top: 0.5rem;
  margin-left: 1.2rem;
`;
const Test = () => {
  const data = [
    { label: '문법', value: 67 },
    { label: '어휘', value: 27 },
    { label: '독해', value: 21 },
  ];
  const [problems, setProblems] = useState([
    {
      problem: 'Choose the correct spelling',
      options: ['Beleive', 'Believe', 'Beleve', 'Bleieve'],
      answer: 1,
      category: 'Spelling',
    },
    {
      problem: 'Select the synonym of "happy"',
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
  ]); // 서버에서 가져온 문제 목록을 담을 상태 변수
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0); // 현재 문제의 인덱스
  const [userAnswer, setUserAnswer] = useState(null); // 사용자의 입력 값을 담을 상태 변수
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null); // 정답 맞춤 여부를 담을 상태 변수
  const currentProblem = problems[currentProblemIndex];

  const { loginRes } = useSelector(({ auth }) => ({
    form: auth.login, // 상태 값 설정
    loginRes: auth.loginRes,
    loginErr: auth.loginErr,
  }));
  const accessToken = loginRes.accessToken;

  const handleAnswerSelection = (selectedOption) => {
    setUserAnswer(selectedOption);
    setIsAnswerCorrect(selectedOption === problems[currentProblemIndex].answer);
  };

  const handleNext = () => {
    handleCheckAnswer();
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
      setUserAnswer(null);
    }
  };

  const handleCheckAnswer = () => {
    if (userAnswer !== null) {
      const currentProblem = problems[currentProblemIndex];
      if (userAnswer === currentProblem.answer) {
        setIsAnswerCorrect(true);
      } else {
        setIsAnswerCorrect(false);
      }
    }
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${accessToken}`, // Include access token in the request headers
    };

    if (!isAnswerCorrect) {
      // alert(isAnswerCorrect);

      const data = {
        category: 'string',
        question: 'example question',
        answer: 'example answer',
        userAnswer: 'example user answer',
      };

      axios
        .post(
          'http://correcting-env.eba-harr53pi.ap-northeast-2.elasticbeanstalk.com/api/v1/tests',
          data,
          { headers: headers },
        )
        .then((response) => {
          alert('저장됨');
        })
        .catch((error) => {
          console.error('Error saving data:', error);
        });
    }
  }, [isAnswerCorrect]);

  return (
    <MainWrap>
      <TestWrap>
        <IngWrap>
          <Icon1 size="50" />
          <StyledStatusBar>
            <Progress
              style={{
                width: `${
                  ((currentProblemIndex + 1) / problems.length) * 100
                }%`,
              }}
            />
            <ProgressNumber>
              {currentProblemIndex + 1}/{problems.length}
            </ProgressNumber>
          </StyledStatusBar>
          <Link to="/">
            <Close size="40" />
          </Link>
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
                  <p style={{ color: '#6ac7b2' }}>맞았습니다!</p>
                ) : (
                  <p style={{ color: 'red' }}>틀렸습니다!</p>
                )}
              </div>
            )}
          </ProblemWrap>

          <ButtonWrap>
            <IoArrowForwardCircle size="50" onClick={handleNext} />
          </ButtonWrap>
        </TestMiddleWrap>
      </TestWrap>

      {/*<TestChart data={data}></TestChart>*/}
    </MainWrap>
  );
};
export default Test;
