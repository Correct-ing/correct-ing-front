import { React, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import MyChart from './MyChart';
import MySubjectChart from './MySubjectChart';
import correctLogo from '../../assets/correct-logo.png';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';

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
  height: 70%;
  background: white;

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
  margin-top: 4rem;
  ${media.tablet`margin-left: 5rem`};
  width: 50%;
  height: 80%;
  justify-content: center;
  background-color: black;
  border: 1px solid rgba(250, 250, 250, 0.2);
  border-radius: 1.5rem;
  background: #ffffff;
  box-shadow: 0rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
`;

// SCOREIMAGE DIV
const ScoreImageDiv = styled.div`
  display: flex;
  margin: 1rem auto;
  align-items: center;
  flex-direction: column;
  background: white;
  width: 90%;
  height: 45%;
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

// SCOREINFO DIV
const ScoreInfoDiv = styled.div`
  display: flex;
  margin: 1rem auto;
  align-items: center;
  flex-direction: column;
  background: white;
  width: 90%;
  height: 45%;

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
  height: 30%;
  background: white;

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

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width } = window;
      setIsMobile(width < 1000);
      setIsDesktop(width >= 1000);
    }
    window.addEventListener('resize', handleResize);
    handleResize(); // 초기값 설정
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 나중에 usestate로 변경
  const data = [
    { label: '문법', value: 67 },
    { label: '어휘', value: 27 },
    { label: '독해', value: 21 },
  ];

  const data1 = [
    { label: '문법', value: 67 },
    { label: '', value: 33 },
  ];

  const data2 = [
    { label: '어휘', value: 27 },
    { label: '', value: 73 },
  ];

  const data3 = [
    { label: '독해', value: 21 },
    { label: '', value: 79 },
  ];

  // 2줄 넘으면 끊어야함
  // const [GrammarFeed, setGrammarFeed] = useState("문법 피드백 내용");
  // const [VocaFeed, setVocaFeed] = useState("어휘 피드백 내용");
  // const [readingFeed, setReadingFeed] = useState("독해 피드백 내용");

  const GrammarFeed = '문법 피드백 내용';
  const VocaFeed = '어휘 피드백 내용';
  const readingFeed = '독해 피드백 내용';

  const GraphButtonClick = () => {
    setIsClicked(true);
  };
  const InfoButtonClick = () => {
    setIsClicked(false);
  };

  const rank = 26.76;

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
                <MySubjectChart data={data1}></MySubjectChart>
                <MySubjectChart data={data2}></MySubjectChart>
                <MySubjectChart data={data3}></MySubjectChart>
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
                <h2>2023.04.20 측정 결과</h2>
                <h1>상위 {rank}%</h1>
                <button>랭킹 보기</button>
              </ScoreInfoDiv>
            </ScoreDiv>
          </ScoreWrap>

          <InfoWrap>
            <InfoSubjectDiv>
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
            </InfoSubjectDiv>
          </InfoWrap>
        </ScoreInfoWrap>
      )}

      {/* 모바일 크기일때*/}
      {isMobile && !isClicked && (
        <GraphInfoWrap>
          <GraphDiv>
            <GraphDivTop>
              <h1>취약점 분석표</h1>
              <MyChart data={data}></MyChart>
              <h1>집중 분석</h1>
            </GraphDivTop>
            <GraphDivMiddle>
              <GraphMiddleSection>
                <MySubjectChart data={data1}></MySubjectChart>
                <MySubjectChart data={data2}></MySubjectChart>
                <MySubjectChart data={data3}></MySubjectChart>
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
                <h2>2023.04.20 측정 결과</h2>
                <h1>상위 {rank}%</h1>
                <button>랭킹 보기</button>
              </ScoreInfoDiv>
            </ScoreDiv>
          </ScoreWrap>

          <InfoWrap>
            <InfoSubjectDiv>
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
            </InfoSubjectDiv>
          </InfoWrap>
        </ScoreInfoWrap>
      )}
    </MainWrap>
  );
};

export default MyPage;
