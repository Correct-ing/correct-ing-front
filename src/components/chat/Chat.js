import React from 'react';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
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
    cursor: pointer;

  &:hover {
    color: red;
  }
  }

  h2 {
    width: 40%;
    margin: 0.4rem auto;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 1.5rem;
    border-bottom: 0.1rem solid rgba(130, 130, 130, 0.4);
    cursor: pointer;

  &:hover {
    color: red;
  }
  }

  button {
    margin-left: 1rem;
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
  const [chatRoomId, setRoomId] = useState(false);
  const [Subject, setSubject] = useState();
  const [isSelect, setisOn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [components, setComponents] = useState([]);
  const [userInput, setUserInput] = useState("");
  const chatRef = useRef(null);
  const records = ['Business', 'Education', 'Travel', 'Hobby'];
  const [searchText, setSearchText] = useState('');
  const [filteredRecords, setFilteredRecords] = useState(records);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const { loginRes } = useSelector(({ auth }) => ({
    form: auth.login, // 상태 값 설정
    loginRes: auth.loginRes,
    loginErr: auth.loginErr,
  }));
  const accessToken = loginRes.accessToken;
  const userId = localStorage.getItem('nickname') !== ''
                ? localStorage.getItem('nickname')
                : null;

  /* 채팅방 생성 */
  const createChatRoom = (text) => {
    const headers = {
      Authorization: `Bearer ${accessToken}` // Include access token in the request headers
    };

      // Check if a chat room already exists with the provided text
      findChatRoom(text)
      .then(existingRoom => {
        if (!existingRoom) {
          const data = {
            name: userId,
            category: text.toString()
          };
  
          axios.post('http://correcting-env.eba-harr53pi.ap-northeast-2.elasticbeanstalk.com/api/v1/chat-rooms', data, { headers: headers })
           .then(response => {
             return findChatRoom(data.category); // Return the Promise for chaining
           })
           .catch(error => {
             console.error('Error creating chat room:', error);
             // Handle the error case
           });
       } else {
         // Handle the case when a chat room already exists
      }
    })
      .catch(error => {
        console.error('Error finding chat room:', error);
        // Handle the error case for finding chat room
      });

  };

  /* 카테고리로 채팅방 ID 찾기 */
  const findChatRoom = async (text) => {

    const headers = {
      Authorization: `Bearer ${accessToken}` // Include access token in the request headers
    };

    try {
      const response = await axios.get('http://correcting-env.eba-harr53pi.ap-northeast-2.elasticbeanstalk.com/api/v1/chat-rooms', { headers });  
      const chatRooms = await response.data;
      for (const chatRoom of chatRooms) {
        if (chatRoom.category === text) {
          
          return chatRoom.chatRoomId;
        }
      }
  
      return null; // 카테고리에 해당하는 채팅방을 찾지 못한 경우 null 반환
    } catch (error) {
      console.error('Error get chat room:', error);
      // Handle the error case
      return null; // 에러 발생 시 null 반환
    }
  };

 /* 채팅방 삭제 */
const delChatRoom = (event) => {
  findChatRoom(event)
    .then(text => {
      if (text === null) {
        throw new Error("삭제할 방이 없습니다."); // Throw an error to skip the subsequent chain
      }
      
      const headers = {
        Authorization: `Bearer ${accessToken}`
      };
      return axios.delete('http://correcting-env.eba-harr53pi.ap-northeast-2.elasticbeanstalk.com/api/v1/chat-rooms/' + text, { headers: headers })
        .then(response => {
          // 추가적인 작업 수행

          setSubject(false);
          setComponents([]);
        });
    })
    .catch(error => {
      if (error.message !== "삭제할 방이 없습니다.") {
        console.error('Error deleting chat room:', error);
        // 에러 처리
      }
    });
};


  const handleInput = (event) => {
    setUserInput(event.target.value);
  };

  useEffect(() => {
    if (chatRef.current ) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [components]);

  // get 채팅 내용 
  const getChatting = async() =>{
    const headers = {
      Authorization: `Bearer ${accessToken}` // Include access token in the request headers
    };
    setComponents([]);
    const url = `http://correcting-env.eba-harr53pi.ap-northeast-2.elasticbeanstalk.com/api/v1/chats/${chatRoomId}`;
    const response = await axios.get(url, { headers });

    console.log('Chat successfully:', response.data);
    const textArray = response.data;
    textArray.forEach(text => {
      if (text.question) {
        // Do something for question category
        const newComponent = <MyChat text={text.question} key={uuidv4()}/>;
        setComponents(prevComponents => [...prevComponents, newComponent]);
      } 
      if (text.answer) {
        // Do something for answer category
        const newComponent = <GptChat text={text.answer} key={uuidv4()} />;
        setComponents(prevComponents => [...prevComponents, newComponent]);
      }
      // Add more conditions for other categories if needed
    });
          
  };

  /* 채팅 입력 시 */
const handleKeyPress = async (event) => {
  const input = event.target.value;
  if (event.key === "Enter") {
    // 비활성화
    setIsInputDisabled(true);
    setUserInput("");
    try {
      const myToken = accessToken; // Replace with your access token or retrieve it from the appropriate source
      const url = `http://correcting-env.eba-harr53pi.ap-northeast-2.elasticbeanstalk.com/api/v1/chats/${chatRoomId}?prompt=${input}`;
      const data = {
        // 바디에 추가할 데이터
      };

      const retryCount = 5;
      let attempt = 1;
      let response;
      
      while (attempt <= retryCount) {
        try {
          response = await axios.post(url, data, {
            headers: {
              Authorization: `Bearer ${myToken}`,
            },
          });
          break;
        } catch (error) {
          console.error(error);
          console.log(`Retry attempt ${attempt}/${retryCount}`);
          attempt++;
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      if (response) {
        getChatting();
        setTimeout(() => {
          setIsInputDisabled(false);
        }, 3000);
      } else {
        alert("내부 오류입니다. 잠시후 다시 입력해주세요");
        setIsInputDisabled(false);
      }
    } catch (error) {
      console.error(error);
    }

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

  const clickResume = () =>{
    setSubject(null);
    setisOn(!isSelect);
  }
  
  
  // List 클릭 시 토글
  const ListClick = async (name, e) => {
    const uppercaseName = name.toUpperCase();
    setSubject(name);
    setisOn(!isSelect);
    const resolvedValue = await findChatRoom(uppercaseName);
    setComponents([]);
    if(resolvedValue){
      setRoomId(resolvedValue);
      if(chatRoomId===resolvedValue){
        getChatting();
      }
    } else {
      createChatRoom(uppercaseName);
      ListClick(uppercaseName);
    }
    

  };

  useEffect(() => {
    const result = records.filter(record => 
      record.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRecords(result);
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);
  
  useEffect(()=>{
    if(chatRoomId!==false){
      getChatting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomId]);

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
              <RecordList>
                <h2 onClick={(e) => { delChatRoom('BUSINESS', e)}}>x</h2>

                  <h1 onClick={(e) => {
                    ListClick('Business', e);
                    
                  }}>Business</h1>
                
                </RecordList>
                
                <RecordList>
                  <h2 onClick={(e) => { delChatRoom('EDUCATION', e)}}>x</h2>

                  <h1 onClick={(e) => {
                    ListClick('Education', e);
                    
                  }}>Education</h1>
                </RecordList>
              
                <RecordList>
                <h2 onClick={(e) => { delChatRoom('TRAVEL', e)}}>x</h2>

                <h1 onClick={(e) => {
                  ListClick('Travel', e);
                  
                }}>Travel</h1>
              </RecordList>

              <RecordList>
                <h2 onClick={(e) => { delChatRoom('HOBBY', e)}}>x</h2>

                <h1 onClick={(e) => {
                  ListClick('Hobby', e);
                  
                }}>Hobby</h1>
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
                  clickResume();
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
              {!isInputDisabled && Subject &&(<ChatInput placeholder="Type your message here" onKeyPress={handleKeyPress} value={userInput}
                onChange={handleInput}></ChatInput>)}
              {isInputDisabled && Subject &&(<ChatInput placeholder='Please wait' disabled></ChatInput>)}
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
              <ChatText placeholder="Search" value={searchText} onChange={e=> setSearchText(e.target.value)}/>
            </ChatListMiddle>

            <ChatListBottom>


            {filteredRecords.map((record, index) => (
              <RecordList key={index}>
                <h2 onClick={(e) => { delChatRoom(record.toUpperCase(), e)}}>x</h2>
                <h1 onClick={(e) => {
                  ListClick(record, e);

                }}>{record}</h1>
              </RecordList>
            ))}
             
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
                  clickResume();
                }}
              >
                <FiChevronLeft size="4rem" color="#6AC7B2"></FiChevronLeft>
              </ChatResume>
              <h1>{Subject}</h1>
            </ChatGptTop>

            <ChatGptMiddle ref={chatRef}>
              {/* Subject가 null일경우 출력*/}
              {!Subject && <ChatInfo> </ChatInfo>}
              {Subject && components}
              
            </ChatGptMiddle>

            <ChatGptBottom>
              {!isInputDisabled && Subject &&(<ChatInput placeholder="Type your message here" onKeyPress={handleKeyPress} value={userInput}
                onChange={handleInput}></ChatInput>)}
              {isInputDisabled && Subject &&(<ChatInput placeholder='Please wait' disabled></ChatInput>)}
            </ChatGptBottom>
          </ChatGptWrap>
        </ChatSectionWrap>
      )}
    </MainWrap>
  );
};

export default Chat;