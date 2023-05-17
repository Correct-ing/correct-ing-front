import client from './client';

// 로그인
export const login = ({ id, password }) =>
  client.post('/api/v1/users/login', { id, password });

// 회원가입
export const register = ({ id, name, password }) =>
  client.post('/api/v1/users', { id, name, password });
