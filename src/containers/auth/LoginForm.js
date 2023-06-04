import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import Login from '../../components/auth/Login';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import client from '../../lib/api/client';

const LoginForm = () => {
  const [error, setError] = useState(null); // 에러 메세지 설정
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, loginRes, loginErr } = useSelector(({ auth }) => ({
    form: auth.login, // 상태 값 설정
    loginRes: auth.loginRes,
    loginErr: auth.loginErr,
  }));

  // input 변경 감지
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  // form submit
  const onSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지

    const { id, password } = form;

    // input 칸을 다 입력 안했을 경우
    if ([id, password].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }
    dispatch(login({ id, password })); // 로그인 api 호출
  };

  // 컴포넌트 처음 렌더링 될 때 form 초기화
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  // 로그인 api 호출 이후
  useEffect(() => {
    // 로그인 실패 시
    if (loginErr) {
      console.log('오류 발생');
      console.log(loginErr);
      setError('로그인 실패');
      return;
    }

    // 로그인 성공 시
    if (loginRes) {
      console.log('로그인 성공');
      console.log(loginRes);

      localStorage.clear(); // localStorage 초기화
      localStorage.setItem('nickname', loginRes.name); // 사용자 닉네임 localStorage에 저장

      client.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${loginRes.accessToken}`; // 헤더에 accessToken 값 저장

      navigate('/');
    }
  }, [loginRes, loginErr, navigate]);

  return (
    <Login form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
  );
};

export default LoginForm;
