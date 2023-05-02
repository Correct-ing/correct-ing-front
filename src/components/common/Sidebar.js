import React, { useEffect, useRef, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const sizes = {
  tablet: 1024,
  phone: 768,
};
//
// 자동으로 media 쿼리 함수를 만들어 준다.
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  a {
    text-decoration: none;
    font-size: 0.9rem;
    ${media.phone`font-size: 0.8rem;`};
    letter-spacing: 0.03rem;
  }
`;

const MainWrap = styled.div`
  .container {
    background-color: #e3ecf1;
  }
  .sidebar {
    background-color: #e3ecf1;
    border-left: 4px solid #202020;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    transition: 0.4s ease;
    color: #202020;
    height: 100%;
    z-index: 99;
  }
  .menu-btn {
    position: relative;
    left: -50px;
    top: 10px;
    width: 40px;
    height: 40px;
    z-index: 99;
    transition: 0.8s ease;
    border: 2px solid #202020;
    border-radius: 40px;
    overflow: hidden;
  }
  .openBtn {
    width: 100%;
    height: 100%;
  }
  .content {
    padding: 40px 40px 0 20px;
    position: relative;
    width: 100%;
  }
  .icon {
    margin: 0;
    color: #202020;
  }
`;

const Sidebar = ({ width = 280 }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(-width);
  const side = useRef();

  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(-width);
      setOpen(false);
    }
  };

  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideCildren)) {
      await setX(-width);
      await setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  });

  return (
    <MainWrap>
      <div
        ref={side}
        className="sidebar"
        style={{ width: `${width}px`, height: '100%', transform: `translatex(${-xPosition}px)` }}
      >
        <button onClick={() => toggleMenu()} className="menu-btn"></button>
        <div className="content">
          <StyledButton>
            <Link to="/chat">챗봇</Link>
          </StyledButton>
          <StyledButton>
            <Link to="/test">테스트</Link>
          </StyledButton>
          <StyledButton>
            <Link to="/game">게임</Link>
          </StyledButton>
        </div>
      </div>
    </MainWrap>
  );
};

export default Sidebar;
