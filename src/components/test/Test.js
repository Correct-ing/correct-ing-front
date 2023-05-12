import React, {useState} from 'react';
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
  ${media.phone`width: 90vw; height: 60vh; margin-top:5rem;`};
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
const AnswerWrap = styled.div`
    width: 100%;
    height:50%;
    background-color:#EAF5F3;
    border-radius: 50px 50px 0px 0px;
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
    const [status, setStatus] = useState(0); // 진행 상황을 나타내는 상태 값
  
    const handleNext = () => {
        if(status<10) {
            setStatus(status + 1); // 다음 버튼을 클릭할 때마다 상태를 업데이트
        }
    };
    const handlePrev = () => {
        if (status > 0) {
            setStatus(status - 1); // 다음 버튼을 클릭할 때마다 상태를 업데이트
        }
    };
  return (
    <MainWrap>
      <TestWrap>
        <IngWrap>
            <Icon1 size="50"/>
            <StyledStatusBar>
                <Progress style={{ width: `${(status / 10) * 100}%` }}/>
                <ProgressNumber>{status}/10</ProgressNumber>
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
              <AnswerWrap></AnswerWrap>
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