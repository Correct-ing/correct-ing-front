import { React, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import MyChart from './MyChart';
import MySubjectChart from './MySubjectChart';
import MyGameChart from './MyGameChart';
import correctLogo from '../../assets/correct-logo.png';
import axios from 'axios';
import { useSelector } from 'react-redux';


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
  height: calc(100vh - 10vh);
  align-items: center;
  justify-content: center;
  margin: 2rem 1rem;
  gap: 5rem;
`;

// 그래프 SECTION
const GraphInfoWrap = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 90%;
  background: white;
  box-shadow: 0rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
  border-radius: 5rem;
`;


// GRAPH DIV TOP
const GraphDivTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 5rem;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
    color: #243465;
  }
`;

const GraphDivBottom = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
    color: #243465;
  }

`;



// SCORE, INFO SECTION
const ScoreInfoWrap = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 90%;
  background: white;
  box-shadow: 0rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
  border-radius: 5rem;
  gap: 2rem;
`;


// SCORE DIV
const ScoreDiv = styled.section`
  display: flex;
  flex-direction: column;
  width: 45%;
  height: 40%;
  align-items: center;
  border-radius: 3rem;
  background-color: #ffffff;
  box-shadow: 0rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
`;

// SCOREIMAGE DIV
const ScoreImageDiv = styled.div`
  display: flex;
  width: 80%;
  height: 60%;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-bottom: 0.1rem solid #d9d9d9;

  img {
    width: 6rem;
    height: 6rem;
    margin: 1rem 0 1rem 0;
  }

  h2 {
    font-weight: 400;
    font-size: 1.1rem;
    color: #797979;
    margin-bottom: 1rem;
    letter-spacing: 0.05rem;
  }
`;

// SCOREINFO DIV
const ScoreInfoDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40%;

  p {
    font-weight: 700;
    font-size: 2rem;
    color: #142231;
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
  const [rankData, setRankData] = useState(0);
  const [myRankData, setMyRankData] = useState(0);

  const data = [
    { label: '구식문법', value: (grammar / (grammar + wordOrder + part + form + negative + tense + method + irregular + speech + correct))*100, color: '#6AC7B2'},
    { label: '어순', value: (wordOrder / (grammar + wordOrder + part + form + negative + tense + method + irregular + speech + correct))*100, color: '#040C0A' },
    { label: '품사', value: (part / (grammar + wordOrder + part + form + negative + tense + method + irregular + speech + correct))*100, color: '#C0E8DF' },
    { label: '형식', value: (form / (grammar + wordOrder + part + form + negative + tense + method + irregular + speech + correct))*100, color: '#41AC94' },
    { label: '부정문', value: (negative / (grammar + wordOrder + part + form + negative + tense + method + irregular + speech + correct))*100 , color: '#37947F'},
    { label: '시제', value: (tense / (grammar + wordOrder + part + form + negative + tense + method + irregular + speech + correct))*100, color: '#0E241F' },
    { label: '접속법', value: (method / (grammar + wordOrder + part + form + negative + tense + method + irregular + speech + correct))*100 , color: '#9BDACC'},
    { label: '불규칙_활용', value: (irregular / (grammar + wordOrder + part + form + negative + tense + method + irregular + speech + correct))*100 , color: '#51BEA5'},
    { label: '화법', value: (speech / (grammar + wordOrder + part + form + negative + tense + method + irregular + speech + correct))*100 , color: '#1C493F'},

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

    const fetchRankData = async () => {
      try {
        const response = await axios.get('http://correcting-env.eba-harr53pi.ap-northeast-2.elasticbeanstalk.com/api/v1/games', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = response.data;
        setRankData(data);
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    const fetchMyRankData = async () => {
      try {
        const response = await axios.get('http://correcting-env.eba-harr53pi.ap-northeast-2.elasticbeanstalk.com/api/v1/games/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = response.data;
        console.log(response);
        setMyRankData(data);
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };  
    fetchData();
    fetchRankData();
    fetchMyRankData();
  }

  return (
    // PC 크기일때
    <MainWrap>
      {isDesktop && (
        <GraphInfoWrap>
            <GraphDivTop>
              <h1>취약점 분석표</h1>
                <MyChart data={data}></MyChart>
                </GraphDivTop>
                <GraphDivBottom>
              <h1>집중 분석</h1>
                <MySubjectChart data={data}/>
          </GraphDivBottom>
        </GraphInfoWrap>
      )}

      {isDesktop && (
        <ScoreInfoWrap>
            <ScoreDiv>
              <ScoreImageDiv>
                <img src={correctLogo} alt="correcting 로고" />
                <h2>나의 점수는</h2>
              </ScoreImageDiv>
              <ScoreInfoDiv>
                <p>{myRankData.rank}등</p>
              </ScoreInfoDiv>       
            </ScoreDiv>
              <MyGameChart data={rankData}/>

        </ScoreInfoWrap>
      )}
    </MainWrap>
  );
};

export default MyPage;