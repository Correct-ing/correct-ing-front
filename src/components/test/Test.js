import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled, { css } from 'styled-components';
import correctLogo from '../../assets/correct-logo.png';
import { MdNavigateBefore } from 'react-icons/md';
import { RiCloseLine } from 'react-icons/ri';
import { IoArrowForwardCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import TestChart from './TestChart';
import { renderToString } from 'react-dom/server';

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
  height: 80%;
  background-color: #ffffff;
  border-radius: 50px;
  border: 1px solid #d9d9d9;
  margin-top: 1rem;

  div:last-child {
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
    font-weight: 600;
    font-size: 1.4rem;
  }
`;
const AnswerWrap = styled.div`
  width: 100%;
  height:50%;
  background-color:#FFFFFF;
  border-radius: 0px 0px 50px 50px;
  justify-content: center;
  align-items: center; 
  display: flex;
  gap: 2rem;
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
  /*const data = [
    { label: '문법', value: 67 },
    { label: '어휘', value: 27 },
    { label: '독해', value: 21 },
  ];*/
  const [correctCount, setCorrectCount] = useState(0);
  const problems = [
    {
      category: '구식문법',
      question: renderToString(
        <div>
        Choose the correct word form to complete the following sentence.
        <br/><br />
        "She is a _______ actress who has won numerous awards."
        </div>
      ),
      options:  ['talent', 'talented', 'talently', 'talenting'],
      answer: 1,
    },
    {
      category: '시제',
      question: renderToString(
        <div>
        Choose the correct verb tense to complete the following sentence.
        <br/><br />
        "She _______ to the beach every summer when she was a child."
        </div>
      ),
      options: ['goes', 'went', 'has gone', 'will go'],
      answer: 1,
      
    },
    {
      category: '구식문법',
      question: renderToString(
        <div>
        Identify the correct form of the verb to complete the sentence.
        <br/><br />
        "She __________ to the party yesterday."
        </div>
      ),
      options: ['go', 'went', 'goed', 'gone'],
      answer: 1,

    },
    {
      category: '구식문법',
      question: renderToString(
        <div>
          Identify the grammatical error in the following sentence.<br /><br />
          "Each of the students in the class are required to submit their project by Friday."
        </div>
      ),
      options: ['Each', 'students', 'are', 'their'],
      answer: 2
      
    },
    {
      category: '접속법',
      question: renderToString(
        <div>
          Choose the correct conjunction to complete the following sentence.<br /><br/>
          "I have a lot of work to do, ____ I\'ll stay late at the office."
        </div>
      ),
      options: ['hence', 'consequently', 'accordingly', 'therefore'],
      answer: 3
      
    },
    
    {
      category: '시제',
      question: 'Choose the correct sentence that uses the subjunctive mood.',
      options: [
        'If I was a millionaire, I will buy a mansion.',
        'If I were a millionaire, I would buy a mansion.',
        'If I was a millionaire, I would buy a mansion.',
        'If I were a millionaire, I will buy a mansion.'
      ],
      answer: 1,
      
    },
    {
      category: '시제',
      question: renderToString(
        <div>
          Choose the correct verb tense to complete the following sentence.<br /><br />
          "He acted as if he _______ the answer to the question."
        </div>
      ),
      options: ['know', 'knew', 'has known', 'will know'],
      answer: 1,
      
    },
    {
      category: '시제',
      question: renderToString(
        <div>
          Choose the correct form of the verb to complete the sentence.<br /><br />
          "The concert __________ canceled due to bad weather."
        </div>
      ),
      options: ['is', 'was', 'has been', 'will be'],
      answer: 1,
      
    },
    {
      category: '접속법',
      question: renderToString(
        <div>
          Choose the correct conjunction to complete the following sentence.<br />
          <br />
          She enjoys both playing the piano _____ composing her own music."
        </div>
      ),
      options: ['yet', 'but', 'and', 'however'],
      answer: 2,
      
    },
    {
      category: '구식문법',
      question: renderToString(
        <div>
          Choose the correct relative pronoun to complete the following sentence.<br />
          <br />
          "I visited the city _____ has a rich cultural heritage."
        </div>
      ),
      options: ['that', 'which', 'who', 'whom'],
      answer: 1,
    },
  ]; // 서버에서 가져온 문제 목록을 담을 상태 변수
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0); // 현재 문제의 인덱스
    const [userAnswer, setUserAnswer] = useState(null); // 사용자의 입력 값을 담을 상태 변수
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null); // 정답 맞춤 여부를 담을 상태 변수
    const currentProblem = problems[currentProblemIndex];
    const [isSolved, setIsSolved] = useState(true);
    const [grammar, setGrammar] = useState(0);
    const [verb, setVerb] = useState(0);
    const [conjuction, setConjuction] = useState(0);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
    const data = [
      { label: '구식문법', question: '질문1', answer: '답변1',value: (grammar / (grammar + verb + conjuction))},
      { label: '시제', question: '질문2', answer: '답변2',value: (verb / (grammar + verb + conjuction)) },
      { label: '접속법', question: '질문3', answer: '답변3',value: (conjuction / (grammar + verb + conjuction)) }

    ];

    const { loginRes } = useSelector(({ auth }) => ({
      form: auth.login, // 상태 값 설정
      loginRes: auth.loginRes,
      loginErr: auth.loginErr,
    }));
    const accessToken = loginRes.accessToken;

    const handleAnswerSelection = (selectedOption, correctAnswerIndex) => {
      setUserAnswer(selectedOption);
      setIsAnswerCorrect(selectedOption === problems[currentProblemIndex].answer);
      if (selectedOption !== correctAnswerIndex) {
        setCorrectAnswerIndex(correctAnswerIndex);
      }
    };
  
    const handleNext = () => {    
      if (currentProblemIndex < problems.length - 1) {
        handleCheckAnswer();
        setCurrentProblemIndex(currentProblemIndex + 1);
        setUserAnswer(null);
        setIsAnswerCorrect(null);
        setCorrectAnswerIndex(null);
      } else {
        // 10번까지 모두 푼 경우, 맞은 개수 확인 및 알림 표시
        //const correctCount = getCorrectCount();
        handleCheckAnswer();
        alert(`맞은 개수: ${correctCount}/${problems.length}`);
        setIsSolved(true);
      }
        
    };
  
    const handleCheckAnswer = () => {
      if (userAnswer !== null) {
        const currentProblem = problems[currentProblemIndex];
        if (userAnswer === currentProblem.answer) {
          setIsAnswerCorrect(true);
          setCorrectCount(correctCount + 1);
        } else {
          setIsAnswerCorrect(false);
          saveIncorrectAnswer(currentProblem, userAnswer);
        }
      }
    };
    
    const saveIncorrectAnswer=(problem, selectedOption) => {
      const headers = {
        Authorization: `Bearer ${accessToken}`, // Include access token in the request headers
      };
  
        const data = {
          category: problem.category,
          question: problem.question,
          answer: problem.options[problem.answer],
          userAnswer: problem.options[selectedOption],
        };
        data.question = data.question.toString();

        try {
        // jsonString 변수에 직렬화된 JSON 데이터가 저장됩니다.
        } catch (error) {
          console.error('JSON 직렬화 오류:', error);
        }
        axios
          .post(
            'http://correcting-env.eba-harr53pi.ap-northeast-2.elasticbeanstalk.com/api/v1/tests',
            data,
            { headers: headers },
          )
          .then((response) => {
            
          })
          .catch((error) => {
            console.error('Error saving data:', error);
          });
      
    };

    useEffect(() => {
      // 데이터베이스에서 틀린 문제 데이터를 가져옴
      axios
      .get('http://correcting-env.eba-harr53pi.ap-northeast-2.elasticbeanstalk.com/api/v1/tests', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(response => {
          if((JSON.stringify(response.data)) === '[]'){
            setIsSolved(false);
          } else {
            setIsSolved(true);

            const questionArr = response.data;
            questionArr.forEach(text => {
              if (text.category === "시제") {

                setVerb(verb => verb + 1);
              } else if(text.category === "구식문법"){

                setGrammar(grammar => grammar + 1);
              } else {

                setConjuction(conjuction => conjuction + 1);
              }            
            });

          

          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      // 데이터베이스에서 틀린 문제 데이터를 가져옴
      axios
      .get('http://correcting-env.eba-harr53pi.ap-northeast-2.elasticbeanstalk.com/api/v1/tests', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(response => {
          if((JSON.stringify(response.data)) === '[]'){
            setIsSolved(false);
          } else {
            setIsSolved(true);

            const questionArr = response.data;
            questionArr.forEach(text => {
              if (text.category === "시제") {

                setVerb(verb => verb + 1);
              } else if(text.category === "구식문법"){

                setGrammar(grammar => grammar + 1);
              } else {

                setConjuction(conjuction => conjuction + 1);
              }            
            });

          

          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSolved]);

  return (
    <MainWrap>
      {!isSolved &&(<TestWrap>
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
              <div dangerouslySetInnerHTML={{ __html: currentProblem.question }} />
              </QuestionWrap>
              <AnswerWrap>
              {currentProblem.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelection(index, problems[currentProblemIndex].answer)}
                  disabled={userAnswer !== null}
                  style={{ backgroundColor: correctAnswerIndex === index ? '#6ac7b2' : null }}
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
              <IoArrowForwardCircle size="50" onClick={handleNext}/>
          </ButtonWrap>
        </TestMiddleWrap>
      </TestWrap>)};
      {/*<TestChart data={data}></TestChart>*/}

      {isSolved && (<div>
        <TestChart data={data}></TestChart>
      </div>)}
    </MainWrap>
  );
};
export default Test;