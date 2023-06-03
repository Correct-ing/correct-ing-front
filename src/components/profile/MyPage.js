import { React, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import MyChart from './MyChart';
import MySubjectChart from './MySubjectChart';
import MyGameChart from './MyGameChart';
import correctLogo from '../../assets/correct-logo.png';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import axios from 'axios';
import { useSelector } from 'react-redux';
import usestate from '../../../node_modules/usestate/index';


const sizes = {
  phone: 768,
  tablet: 1000,
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

// Main DIV
const MainWrap = styled.div`
  display: flex;
  width: 100%;
  height: 45rem;
  align-items: center;
`;

// 그래프 SECTION
const GraphInfoWrap = styled.section`
  display: flex;
  width: 45%;
  ${media.tablet`width: 80%`};
  ${media.tablet`margin: 1rem auto`};
  height: 100%;
  background: white;

  button {
    border: none;
    background: white;
  }
`;

// GRAPH DIV
const GraphDiv = styled.section`
  display: flex;
  flex-direction: column;
  margin: 3rem auto;
  width: 80%;
  height: 90%;
  background-color: black;
  border-radius: 5rem;
  background: #ffffff;
  box-shadow: 0rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
`;

// GRAPH DIV TOP
const GraphDivTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 65%;
  border-radius: 5rem;
  background-color: white;

  h1 {
    position: flex;
    font-style: normal;
    font-size: 1.5rem;
    display: flex;
    margin: 2.5rem 3rem;
    font-weight: 600;
    color: #243465;
  }
`;

// GRAPH DIV MIDDLE
const GraphDivMiddle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 23%;
  background-color: white;
  align-items: center;
`;

// GRAPH MIDDLE SECTION
const GraphMiddleSection = styled.div`
  display: flex;
  margin-left: -20rem;
  ${media.tablet`margin-left: -11rem;`};
  width: 4rem;
`;

// SCORE, INFO SECTION
const ScoreInfoWrap = styled.section`
  display: flex;
  flex-direction: column;
  ${media.tablet`width: 80%`};
  ${media.tablet`margin: 1rem auto`};
  width: 55%;
  height: 100%;
  background: white;
`;

// SCORE DIV
const ScoreWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 55%;
  background: white;
  ${media.tablet`height: 60%`};

  button {
    border: none;
    background: white;
  }
`;

// SCORE DIV
const ScoreDiv = styled.section`
  display: flex;
  flex-direction: column;
  margin: 3rem auto;
  ${media.tablet`margin-left: 5rem`};
  width: 50%;
  height: 80%;
  justify-content: center;
  background-color: black;
  border: 1px solid rgba(250, 250, 250, 0.2);
  border-radius: 5rem;
  background: #ffffff;
  box-shadow: 0rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
`;

// SCOREIMAGE DIV
const ScoreImageDiv = styled.div`
  display: flex;
  margin: 1rem auto;
  align-items: center;
  flex-direction: column;
  width: 90%;
  height: 45%;
  
  padding-bottom: 20px;
  border-bottom: 0.1rem solid #d9d9d9;

  img {
    display: flex;
    width: 7rem;
    height: 7rem;
  }

  h2 {
    margin-top: 1.2rem;
    font-weight: 500;
    font-size: 1.2rem;
    color: #797979;
  }
`;

// SCOREINFO DIV
const ScoreInfoDiv = styled.div`
  display: flex;
  margin: 0.2rem auto;
  align-items: center;
  flex-direction: column;
  width: 90%;
  height: 45%;

  h2 {
    margin-top: 0.5rem;
    font-weight: 500;
    font-size: 1.2rem;
    color: #797979;
  }

  h1 {
    margin-top: 1rem;
    font-weight: 700;
    font-size: 2rem;
    color: black;
  }

  button {
    margin-top: 2rem;
    width: 10rem;
    height: 3rem;
    background: #142231;
    border-radius: 3rem;
    font-style: normal;
    font-weight: 400;
    font-size: 1.4rem;
    color: white;
    border: none;
    cursor: pointer;
  }
`;

// INFO DIV
const InfoWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40%;
  background: white;

  justify-content: center;

  button {
    border: none;
  }
`;

// InfoSubject DIV
const InfoSubjectDiv = styled.section`
  margin: 3rem auto;
  margin-top: 2rem;
  width: 25%;
  height: 80%;
  justify-content: center;
  background-color: black;
  border: 0.1rem solid rgba(250, 250, 250, 0.2);
  border-radius: 3rem;
  background: #ffffff;
  box-shadow: 0rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
`;

// INFOSUBJECT TOP DIV
const InfoSubjectTop = styled.div`
  display: flex;
  margin: 1rem auto;
  align-items: center;
  flex-direction: column;
  background: white;
  width: 90%;
  height: 25%;
  border-bottom: 0.1rem solid #d9d9d9;

  img {
    display: flex;
    width: 7rem;
    height: 7rem;
  }

  h2 {
    margin-top: 1rem;
    font-weight: 400;
    font-size: 1rem;
    color: #797979;
  }
`;

// INFOSUBJECT MIDDLE DIV
const InfoSubjectMiddle = styled.div`
  display: flex;
  margin: 2rem auto;
  align-items: center;
  flex-direction: column;
  background: white;
  width: 90%;
  height: 65%;

  h2 {
    margin-top: 0.5rem;
    font-weight: 400;
    font-size: 1rem;
    color: #797979;
  }

  h1 {
    margin-top: 1rem;
    font-weight: 700;
    font-size: 2rem;
    color: black;
  }

  button {
    margin-top: 1.5rem;
    width: 7rem;
    height: 2rem;
    background: #142231;
    border-radius: 3rem;
    font-style: normal;
    font-weight: 400;
    font-size: 1.4rem;
    color: white;
    border: none;
    cursor: pointer;
  }
`;

const MyPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [grammar, setIsGrammar] = useState(0);
  const [wordOrder, setIsOrder] = useState(0);
  const [part, setIsPart] = useState(0);
  const [form, setIsForm] = useState(0);
  const [negative, setIsNegative] = useState(0);
  const [tense, setISTense] = useState(0);
  const [method, setISMethod] = useState(0);
  const [irregular, setISIrregular] = useState(0);
  const [speech, setISSpeech] = useState(0);
  const [correct, setIsCorrect] = useState(0);


  const data = [
    { label: '구식문법', value: (grammar / (grammar + wordOrder + part + form + negative + tense + method + irregular + speech + correct))},
    { label: '어순', value: (wordOrder / (grammar + wordOrder + part + form + negative + tense + method + irregular + speech + correct)) },
    { label: '품사', value: (part / (grammar + wordOrder + part + form + negative + tense + method + irregular + speech + correct)) },
    { label: '형식', value: (form / (grammar + wordOrder + part + form + negative + tense + method + irregular + speech + correct)) },
    { label: '부정문', value: (negative / (grammar + wordOrder + part + form + negative + tense + method + irregular + speech + correct)) },
    { label: '시제', value: (tense / (grammar + wordOrder + part + form + negative + tense + method + irregular + speech + correct)) },
    { label: '접속법', value: (method / (grammar + wordOrder + part + form + negative + tense + method + irregular + speech + correct)) },
    { label: '불규칙_활용', value: (irregular / (grammar + wordOrder + part + form + negative + tense + method + irregular + speech + correct)) },
    { label: '화법', value: (speech / (grammar + wordOrder + part + form + negative + tense + method + irregular + speech + correct)) },

  ];

  const { loginRes } = useSelector(({ auth }) => ({
    form: auth.login, // 상태 값 설정
    loginRes: auth.loginRes,
    loginErr: auth.loginErr,
  }));
  const accessToken = loginRes.accessToken;

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width } = window;
      setIsMobile(width < 1000);
      setIsDesktop(width >= 1000);
    }
    window.addEventListener('resize', handleResize);
    handleResize(); // 초기값 설정
    getSubjectChart();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSubjectChart = () => {
    
    const fetchData = async () => {
      try {
        const headers = {
          'accept': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ${accessToken}`
        };

        const response = await axios.get(
          'http://correcting-env.eba-harr53pi.ap-northeast-2.elasticbeanstalk.com/api/v1/weakness/me',
          { headers }
        );
        const weaknessPercentages = response.data.weaknessPercentages;
  
        // 형식에 해당하는 값들을 저장할 배열
        const result = [];
      
        // 형식 순서대로 값을 배열에 저장
        result.push(weaknessPercentages["품사"] || 0);
        result.push(weaknessPercentages["어순"] || 0);
        result.push(weaknessPercentages["형식"] || 0);
        result.push(weaknessPercentages["시제"] || 0);
        result.push(weaknessPercentages["화법"] || 0);
        result.push(weaknessPercentages["접속법"] || 0);
        result.push(weaknessPercentages["부정문"] || 0);
        result.push(weaknessPercentages["불규칙_활용"] || 0);
        result.push(weaknessPercentages["구식문법"] || 0);
        result.push(weaknessPercentages["정답"] || 0);

        setIsPart(result[0]);
        setIsOrder(result[1]);
        setIsForm(result[2]);
        setISTense(result[3]);
        setISSpeech(result[4]);
        setISMethod(result[5]);
        setIsNegative(result[6]);
        setISIrregular(result[7]);
        setIsGrammar(result[8]);
        setIsCorrect(result[9]);

       

      } catch (error) {
        alert(error.message);
      }
    };

    fetchData();

  }


  const GraphButtonClick = () => {
    setIsClicked(true);
  };
  const InfoButtonClick = () => {
    setIsClicked(false);
  };

  return (
    // PC 크기일때
    <MainWrap>
      {isDesktop && (
        <GraphInfoWrap>
          <GraphDiv>
            <GraphDivTop>
              <h1>취약점 분석표</h1>
                <MyChart data={data}></MyChart>
              <h1>집중 분석</h1>
            </GraphDivTop>
            <GraphDivMiddle>
              <GraphMiddleSection>

              </GraphMiddleSection>
            </GraphDivMiddle>
          </GraphDiv>
        </GraphInfoWrap>
      )}

      {isDesktop && (
        <ScoreInfoWrap>
          <ScoreWrap>
            <ScoreDiv>
              <ScoreImageDiv>
                <img src={correctLogo} alt="correcting 로고" />
                <h2>나의 점수는</h2>
              </ScoreImageDiv>
              <ScoreInfoDiv>
                <h2>측정 결과</h2>

                {/* <button>랭킹 보기</button> */}
              </ScoreInfoDiv>
            </ScoreDiv>
          </ScoreWrap>

          <InfoWrap>
  
            {/* <InfoSubjectDiv>
              <InfoSubjectTop>
                <h1>문법</h1>
                <InfoSubjectMiddle>
                  <h2>{GrammarFeed}</h2>
                  <button>복습하기</button>
                </InfoSubjectMiddle>
              </InfoSubjectTop>
            </InfoSubjectDiv>

            <InfoSubjectDiv>
              <InfoSubjectTop>
                <h1>어휘</h1>
                <InfoSubjectMiddle>
                  <h2>{VocaFeed}</h2>
                  <button>복습하기</button>
                </InfoSubjectMiddle>
              </InfoSubjectTop>
            </InfoSubjectDiv>

            <InfoSubjectDiv>
              <InfoSubjectTop>
                <h1>독해</h1>
                <InfoSubjectMiddle>
                  <h2>{readingFeed}</h2>
                  <button>복습하기</button>
                </InfoSubjectMiddle>
              </InfoSubjectTop>
            </InfoSubjectDiv> */}
          </InfoWrap>
        </ScoreInfoWrap>
      )}

      {/* 모바일 크기일때*/}
      {isMobile && !isClicked && (
        <GraphInfoWrap>
          <GraphDiv>
            <GraphDivTop>
              <h1>취약점 분석표</h1>
              
              <h1>집중 분석</h1>
            </GraphDivTop>
            <GraphDivMiddle>
              <GraphMiddleSection>
                
                {/* <MySubjectChart data={data1}></MySubjectChart> */}
              </GraphMiddleSection>
            </GraphDivMiddle>
          </GraphDiv>
          <button onClick={GraphButtonClick}>
            <FiChevronRight size="4rem" color="#6AC7B2"></FiChevronRight>
          </button>
        </GraphInfoWrap>
      )}

      {isMobile && isClicked && (
        <ScoreInfoWrap>
          <ScoreWrap>
            <button onClick={InfoButtonClick}>
              <FiChevronLeft size="4rem" color="#6AC7B2"></FiChevronLeft>
            </button>
            <ScoreDiv>
              <ScoreImageDiv>
                <img src={correctLogo} alt="correcting 로고" />
                <h2>나의 점수는</h2>
              </ScoreImageDiv>
              <ScoreInfoDiv>
                <h2>측정 결과</h2>

                {/* <button>랭킹 보기</button> */}
              </ScoreInfoDiv>
            </ScoreDiv>
          </ScoreWrap>

          <InfoWrap>
 
            {/* <InfoSubjectDiv>
              <InfoSubjectTop>
                <h1>문법</h1>
                <InfoSubjectMiddle>
                  <h2>{GrammarFeed}</h2>
                  <button>복습하기</button>
                </InfoSubjectMiddle>
              </InfoSubjectTop>
            </InfoSubjectDiv>

            <InfoSubjectDiv>
              <InfoSubjectTop>
                <h1>어휘</h1>
                <InfoSubjectMiddle>
                  <h2>{VocaFeed}</h2>
                  <button>복습하기</button>
                </InfoSubjectMiddle>
              </InfoSubjectTop>
            </InfoSubjectDiv>

            <InfoSubjectDiv>
              <InfoSubjectTop>
                <h1>독해</h1>
                <InfoSubjectMiddle>
                  <h2>{readingFeed}</h2>
                  <button>복습하기</button>
                </InfoSubjectMiddle>
              </InfoSubjectTop>
            </InfoSubjectDiv> */}
          </InfoWrap>
        </ScoreInfoWrap>
      )}
    </MainWrap>
  );
};

export default MyPage;
