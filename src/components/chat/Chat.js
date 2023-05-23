import React from 'react';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
// import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
// import { IoSendSharp } from 'react-icons/io5';
// import { FiSearch } from 'react-icons/fi';
import { FiChevronLeft } from 'react-icons/fi';
import ChatInfo from './ChatInfo';
import GptChat from './GptChat';
import MyChat from './MyChat';

const sizes = {
  phone: 850,
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

// 메인
const MainWrap = styled.div`
  margin-left: 1rem;
  display: flex;
  justify-content: center;
`;

// 챗리스트 Section 전체
const ListSectionWrap = styled.section`
  width: 30vw;
  height: 100vh;
  ${media.phone`width: 100vw;`};
  justify-content: center;
  display: flex;
`;

// 채팅 Section 전체
const ChatSectionWrap = styled.section`
  width: 70vw;
  height: 100vh;
  ${media.phone`width: 100vw;`};
  justify-content: center;
`;

// 챗리스트 DIV
const ChatListWrap = styled.section`
  margin: 3rem auto;
  width: 90%;
  height: 80%;
  justify-content: center;
  background-color: black;
  border-radius: 5rem;
  background: #ffffff;
  box-shadow: 0rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
`;

// 채팅 DIV
const ChatGptWrap = styled.div`
  justify-content: center;
  margin: 3rem auto;
  width: 90%;
  height: 80%;
  background-color: black;
  border-radius: 5rem;
  background: #ffffff;
  box-shadow: 0rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
`;

// 챗리스트 상단 DIV
const ChatListTop = styled.div`
  display: flex;
  width: 100%;
  height: 5rem;
  margin-top: 2rem;

  h1 {
    position: flex;
    font-style: normal;
    font-size: 2rem;
    display: flex;
    align-items: center;
    margin: 1rem 2.5rem;
    font-weight: 600;
    color: #6ac7b2;
  }
`;

// 챗리스트 중단 DIV
const ChatListMiddle = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  justify-content: center;
`;
// 챗리스트 검색창
const ChatText = styled.input`
  position: flex;
  height: 70%;
  width: 80%;
  ${media.phone`width: 80%;`};
  border-radius: 1rem;
  border-style: hidden;
  background-color: rgba(217, 217, 217, 0.4);
  font-size: 1.5rem;
  text-indent: 2rem;
`;
// 챗리스트 하단 DIV
const ChatListBottom = styled.div`
  width: 90%;
  height: 27rem;
  justify-content: center;
  margin: 1.5rem auto;
`;

// 챗리스트 List
const RecordList = styled.li`
  display: flex;
  width: 90%;
  height: 4rem;
  margin: 1rem auto;

  h1 {
    width: 100%;
    margin: 0.4rem auto;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 600;
    font-size: 1.5rem;
    border-bottom: 0.1rem solid rgba(130, 130, 130, 0.4);
  }

  h2 {
    width: 40%;
    margin: 0.4rem auto;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 1rem;
    border-bottom: 0.1rem solid rgba(130, 130, 130, 0.4);
  }

  button {
  }
`;
// 채팅 상단 DIV
const ChatGptTop = styled.div`
  display: flex;
  width: 100%;
  height: 30%;
  border-radius: 5rem;
  background: rgba(224, 224, 224, 0.4);
  max-height: 20rem;

  h1 {
    width: 100%;
    margin: 3rem auto;
    margin-left: 4rem;
    font-style: normal;
    font-weight: 600;
    font-size: 1.5rem;
    color: black;
  }
`;

// 채팅 상단 Button
const ChatResume = styled.button`
  display: flex;
  border: none;
  margin-top: 1.5rem;
  background: rgba(242, 242, 242, 0.4);
  margin-left: 2rem;
  cursor: pointer;
  width: 5rem;
  height: 1rem;
`;

// 채팅 중단 DIV
const ChatGptMiddle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60%;
  background: white;
  margin-top: -5rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(127, 168, 157, 0.3); /* 스크롤바 색상 */
    border-radius: 5rem; /* 스크롤바 둥근 테두리 */
  }
  ::-webkit-scrollbar-track {
    background: white; /*스크롤바 뒷 배경 색상*/
  }
  h1 {
    width: 100%;
    margin: 3.5rem auto;
    margin-left: 4rem;
    font-style: normal;
    font-weight: 600;
    font-size: 1.5rem;
    color: black;
  }
`;

// 채팅 하단 DIV
const ChatGptBottom = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: center;
  background: white;
  border-radius: 5rem;
  margin-top: 2rem;
`;

// 채팅 입력창
const ChatInput = styled.input`
  position: flex;
  height: 80%;
  width: 80%;
  ${media.phone`width: 80%;`};
  border-radius: 3rem;
  border-style: hidden;
  background-color: rgba(127, 168, 157, 0.3);
  font-size: 1.5rem;
  text-indent: 2rem;
`;

const Chat = () => {
  const [Subject, setSubject] = useState();
  const [isSelect, setisOn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [components, setComponents] = useState([]);
  const [userInput, setUserInput] = useState("");
  const chatRef = useRef(null);
  

  const handleInput = (event) => {
    setUserInput(event.target.value);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [components]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const input = userInput.trim();
      const myComponent = <MyChat text={input} key={uuidv4()}></MyChat>;
      setComponents(prevComponents => [...prevComponents, myComponent]);

      const gptComponent = <GptChat text={'GPT 대답'} key={uuidv4()}></GptChat>;
      setComponents(prevComponents => [...prevComponents, gptComponent]);

      setUserInput("");
    }
  };

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width } = window;
      setIsMobile(width < 850);
      setIsDesktop(width >= 850);
    }
    window.addEventListener('resize', handleResize);
    handleResize(); // 초기값 설정
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // List 클릭 시 토글
  const ListClick = (name, e) => {
    setSubject(name);
    setisOn(!isSelect);
  };

  return (
    <MainWrap>
      {/*    모바일  버전           */}
      {isMobile && !isSelect && (
        <ListSectionWrap>
          <ChatListWrap>
            <ChatListTop>
              <h1>Chat List</h1>
            </ChatListTop>

            <ChatListMiddle>
              <ChatText placeholder="Search" />
            </ChatListMiddle>

            <ChatListBottom>
              <RecordList
                onClick={(e) => {
                  ListClick('Business', e);
                }}
              >
                <h1>Business</h1>
                <h2>6:56 PM</h2>
              </RecordList>
              <RecordList
                onClick={(e) => {
                  ListClick('Daily Life', e);
                }}
              >
                <h1>Daily Life</h1>
                <h2>Yesterday</h2>
              </RecordList>
              <RecordList
                onClick={(e) => {
                  ListClick('Education', e);
                }}
              >
                <h1>Education</h1>
                <h2>Yesterday</h2>
              </RecordList>
              <RecordList
                onClick={(e) => {
                  ListClick('Interest', e);
                }}
              >
                <h1>Interest</h1>
                <h2>Tuesday</h2>
              </RecordList>
            </ChatListBottom>
          </ChatListWrap>
        </ListSectionWrap>
      )}

      {isSelect && isMobile && (
        <ChatSectionWrap>
          <ChatGptWrap>
            <ChatGptTop>
              <ChatResume
                onClick={(e) => {
                  ListClick(null, e);
                }}
              >
                <FiChevronLeft size="4rem" color="#6AC7B2"></FiChevronLeft>
              </ChatResume>
              <h1>{Subject}</h1>
            </ChatGptTop>

            <ChatGptMiddle ref={chatRef}>
              {/* Subject가 null일경우 출력*/}
              {!Subject && <ChatInfo> </ChatInfo>}

              {components}
              
            </ChatGptMiddle>

            <ChatGptBottom>
              <ChatInput placeholder="Type your message here" onKeyPress={handleKeyPress} value={userInput}
                onChange={handleInput}></ChatInput>
            </ChatGptBottom>
          </ChatGptWrap>
        </ChatSectionWrap>
      )}

      {/*    PC 버전   */}

      {isDesktop && (
        <ListSectionWrap>
          <ChatListWrap>
            <ChatListTop>
              <h1>Chat List</h1>
            </ChatListTop>

            <ChatListMiddle>
              <ChatText placeholder="Search" />
            </ChatListMiddle>

            <ChatListBottom>
              <RecordList
                onClick={(e) => {
                  ListClick('Business', e);
                }}
              >
                <h1>Business</h1>
                <h2>6:56 PM</h2>
              </RecordList>
              <RecordList
                onClick={(e) => {
                  ListClick('Daily Life', e);
                }}
              >
                <h1>Daily Life</h1>
                <h2>Yesterday</h2>
              </RecordList>
              <RecordList
                onClick={(e) => {
                  ListClick('Education', e);
                }}
              >
                <h1>Education</h1>
                <h2>Yesterday</h2>
              </RecordList>
              <RecordList
                onClick={(e) => {
                  ListClick('Interest', e);
                }}
              >
                <h1>Interest</h1>
                <h2>Tuesday</h2>
              </RecordList>
            </ChatListBottom>
          </ChatListWrap>
        </ListSectionWrap>
      )}

      {isDesktop && (
        <ChatSectionWrap>
          <ChatGptWrap>
            <ChatGptTop>
              <ChatResume
                onClick={(e) => {
                  ListClick(null, e);
                }}
              >
                <FiChevronLeft size="4rem" color="#6AC7B2"></FiChevronLeft>
              </ChatResume>
              <h1>{Subject}</h1>
            </ChatGptTop>

            <ChatGptMiddle ref={chatRef}>
              {/* Subject가 null일경우 출력*/}
              {!Subject && <ChatInfo> </ChatInfo>}
              
              {components}
            </ChatGptMiddle>

            <ChatGptBottom>
              <ChatInput placeholder="Type your message here" onKeyPress={handleKeyPress} value={userInput}
                onChange={handleInput}></ChatInput>
            </ChatGptBottom>
          </ChatGptWrap>
        </ChatSectionWrap>
      )}
    </MainWrap>
  );
};

export default Chat;
