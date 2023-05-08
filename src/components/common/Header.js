import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import correctLogo from '../../assets/correct-logo.png';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import Sidebar from './Sidebar';

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
    color: black;
    font-weight: 400;
  }
  ${media.tablet`display: none;`};
  ${media.phone`display: none;`};
`;

const HideMenu = styled.div`
  display: none;
  margin-right: 5rem;
  gap: 5rem;
  a {
    color: black;
    font-weight: 400;
  }
  ${media.tablet`display: flex;`};
  ${media.phone`display: flex;`};
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 0.9rem;
  ${media.phone`font-size: 0.8rem;`};
  color: #c6c4c4;
  font-weight: 500;
  cursor: pointer;
  a {
    text-decoration: none;
    font-size: 0.9rem;
    ${media.phone`font-size: 0.8rem;`};
    letter-spacing: 0.03rem;
  }
`;

const AuthWrap = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ${media.phone`gap: 0.3rem;`};
  a {
    color: #c6c4c4;
    font-weight: 500;
  }
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const Header = ({ auth, onLogout }) => {
  return (
    <div>
      <StyledHeader>
        <LogoWrap>
          <img src={correctLogo} alt="correcting 로고" />
          <Link to="/">Correct-ing</Link>
        </LogoWrap>
        <div className="right-wrap">
          <CateGoryWrap>
            <StyledButton>
              <Link to="/chat">챗봇</Link>
            </StyledButton>
            <StyledButton>
              <Link to="/test">테스트</Link>
            </StyledButton>
            <StyledButton>
              <Link to="/game">게임</Link>
            </StyledButton>
          </CateGoryWrap>

          <HideMenu>
            <Sidebar />
          </HideMenu>

          {auth ? (
            <AuthWrap>
              <div>
                <BsPersonCircle />
                <StyledButton>
                  <Link
                    to="/myPage"
                    style={{ color: '#142231', fontWeight: '700' }}
                  >
                    {auth.name}
                  </Link>
                </StyledButton>
              </div>

              <StyledButton onClick={onLogout}>로그아웃</StyledButton>
            </AuthWrap>
          ) : (
            <AuthWrap>
              <StyledButton>
                <Link to="/login">로그인</Link>
              </StyledButton>

              <StyledButton>
                <Link to="/register">회원가입</Link>
              </StyledButton>

              <AiOutlineMenu />
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
