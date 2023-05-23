import React, { useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import correctLogo from '../../assets/correct-logo.png';
import { ImExit } from 'react-icons/im';
import { IoGameController } from 'react-icons/io5';
import { IoIosClose } from 'react-icons/io';
import { BsFillClipboard2CheckFill } from 'react-icons/bs';
import { BsChatLeftTextFill } from 'react-icons/bs';
import { ImEnter } from 'react-icons/im';
import { useLocation } from 'react-router-dom';

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
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: none;
  align-items: center;
  top: 0;
  right: 0;
  width: 45%;
  height: 100%;
  background-color: white;
  padding: 1rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
`;

const LogoWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    gap: 0.8rem;
    align-items: center;
  }
  img {
    width: 2rem;
    ${media.phone`width: 1.5rem;`};
  }
  a {
    color: #6ac7b2;
    font-weight: 500;
    font-size: 1.1rem;
    ${media.phone`font-size: 0.9rem;`};
    text-decoration: none;
    letter-spacing: 0.03rem;
  }
`;
const MenuWrap = styled.div`
  margin: 3rem 0 1rem 0;
  width: 90%;
  padding-bottom: 0.3rem;
  font-size: 0.9rem;
  font-weight: 400;
  p {
    color: #142231;
  }
  border-bottom: 1px solid #142231;
`;

const SelectWrap = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.2rem;
  gap: 1.5rem;

  button {
    &:last-child {
      color: red;
    }
  }
`;
const StyledButton = styled.button`
  width: 90%;
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: white;
  padding: 1rem 3rem;
  ${media.phone`padding: 0.5rem 1.5rem;`};
  border: none;
  border-radius: 0.8rem;
  a {
    color: #142231;
    transition: color 0.3s ease-in-out;
    text-decoration: none;
    font-size: 1.2rem;
    ${media.phone`font-size: 0.9rem;`};
    font-weight: 700;
    flex-grow: 1;
  }
  &:hover {
    background-color: #e0f2f6;
  }
`;
const Sidebar = ({ nickname, isOpen: initialIsOpen, onClose, onLogout }) => {
  const sidebarRef = useRef(null);
  const location = useLocation();
  /*초기값을 'initialIsOpen' prop로 전달된 값으로 설정*/
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  /* 밖 클릭시 닫히는 코드 */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  /* 화면 크기가 변경될 때마다 isOpen 상태를 업데이트. 너비가 1025px 이상이면 isOpen 상태를 false로 변경 */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1025) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  /* 'initialIsOpen' prop 값이 변경될 때마다 isOpen 상태업뎃 */
  useEffect(() => {
    setIsOpen(initialIsOpen);
  }, [initialIsOpen]);

  return (
    <MainWrap ref={sidebarRef} isOpen={isOpen}>
      <LogoWrap>
        <div>
          <img src={correctLogo} alt="correcting 로고" />
          <Link to="/">Correct-ing</Link>
        </div>
        <IoIosClose size="25" color="black" onClick={onClose}></IoIosClose>
      </LogoWrap>
      <MenuWrap>
        <p>menu</p>
      </MenuWrap>
      <SelectWrap>
        <StyledButton className={location.pathname === '/chat' ? 'active' : ''}>
          <BsChatLeftTextFill size="25" />
          <Link to={nickname ? '/chat' : '/login'} onClick={onClose}>
            챗봇
          </Link>
        </StyledButton>
        <StyledButton>
          <BsFillClipboard2CheckFill size="25" />
          <Link to={nickname ? '/test' : '/login'} onClick={onClose}>
            테스트
          </Link>
        </StyledButton>

        <StyledButton>
          <IoGameController size="25" />
          <Link to={nickname ? '/game' : '/login'} onClick={onClose}>
            게임하기
          </Link>
        </StyledButton>

        {nickname ? (
          <StyledButton>
            <ImExit size="25" />
            <Link to="#" onClick={onLogout}>
              로그아웃
            </Link>
          </StyledButton>
        ) : (
          <StyledButton>
            <ImEnter size="25" />
            <Link to="/login" onClick={onClose}>
              로그인
            </Link>
          </StyledButton>
        )}
      </SelectWrap>
    </MainWrap>
  );
};

export default Sidebar;
