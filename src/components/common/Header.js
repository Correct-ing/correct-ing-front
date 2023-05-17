import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import correctLogo from '../../assets/correct-logo.png';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

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

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  background-color: white;
  padding: 0 2rem;
  ${media.phone`padding: 0 1rem;`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.5rem;
  .right-wrap {
    display: flex;
    gap: 2rem;
  }
`;

const CateGoryWrap = styled.div`
  display: flex;
  margin-right: 5rem;
  gap: 5rem;
  a {
    color: inherit;
    font-weight: inherit;
  }
  ${media.tablet`display: none;`};
  ${media.phone`display: none;`};
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 0.9rem;
  ${media.phone`font-size: 0.8rem;`};
  color: black;
  font-weight: 500;
  cursor: pointer;

  a {
    text-decoration: none;
    font-size: 0.9rem;
    ${media.phone`font-size: 0.8rem;`};
    letter-spacing: 0.03rem;
  }
  &.active {
    color: #6ac7b2;
    font-weight: 800;
  }
`;

const AuthWrap = styled.div`
  display: flex;
  gap: 1rem;
  ${media.phone`gap: 0.3rem;`};

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  a {
    color: #c6c4c4;
    font-weight: 500;
  }
  svg {
    margin-left: 0.5rem;
    @media screen and (min-width: 1025px) {
      display: none;
    }
  }
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
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

const Header = ({ nickname, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToHome = () => {
    navigate('/');
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };
  const toggleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      <StyledHeader>
        <LogoWrap>
          <img
            src={correctLogo}
            alt="correcting 로고"
            onClick={navigateToHome}
          />
          <Link to="/">Correct-ing</Link>
        </LogoWrap>
        <div className="right-wrap">
          <CateGoryWrap>
            <StyledButton
              className={location.pathname === '/chat' ? 'active' : ''}
            >
              <Link to={nickname ? '/chat' : '/login'}>챗봇</Link>
            </StyledButton>
            <StyledButton
              className={location.pathname === '/test' ? 'active' : ''}
            >
              <Link to={nickname ? '/test' : '/login'}>테스트</Link>
            </StyledButton>
            <StyledButton
              className={location.pathname === '/game' ? 'active' : ''}
            >
              <Link to={nickname ? '/game' : '/login'}>게임</Link>
            </StyledButton>
          </CateGoryWrap>

          {nickname ? (
            <AuthWrap>
              <div>
                <BsPersonCircle />
                <StyledButton>
                  <Link
                    to="/myPage"
                    style={{ color: '#142231', fontWeight: '700' }}
                  >
                    {nickname}
                  </Link>
                </StyledButton>
              </div>

              <StyledButton onClick={onLogout}>로그아웃</StyledButton>
              <AiOutlineMenu onClick={toggleSidebarOpen} />
              <Sidebar
                isOpen={isSidebarOpen}
                onClose={toggleSidebarClose}
                nickname={nickname}
              />
            </AuthWrap>
          ) : (
            <AuthWrap>
              <StyledButton>
                <Link to="/login">로그인</Link>
              </StyledButton>

              <StyledButton>
                <Link to="/register">회원가입</Link>
              </StyledButton>

              <AiOutlineMenu onClick={toggleSidebarOpen} />
              <Sidebar
                isOpen={isSidebarOpen}
                onClose={toggleSidebarClose}
                nickname={nickname}
              />
            </AuthWrap>
          )}
        </div>
      </StyledHeader>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default Header;
