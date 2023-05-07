import client from './client';

// 로그인
export const login = ({ id, password }) =>
  client.post('/api/v1/users/login', { id, password });

// 회원가입
export const register = ({ id, name, password }) =>
  client.post('/api/v1/users', { id, name, password });

// 회원가입 시 아이디 중복 체크
export const isIdDup = ({ username }) =>
  client.get(`/api/v1/users/${username}/exists`, { username });

// token 재발급
export const getNewToken = ({ accessToken, refreshToken }) =>
  client.post('/api/v1/users/token', { accessToken, refreshToken });

// 로그인 상태 체크
export const check = () => client.get(''); // 다시 해야됨
