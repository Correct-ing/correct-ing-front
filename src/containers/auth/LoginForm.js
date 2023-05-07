import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import Login from '../../components/auth/Login';
import { check } from '../../modules/user';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';

const LoginForm = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login, // 상태 값 설정
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
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
    dispatch(login({ id, password }));
  };

  // 컴포넌트 처음 렌더링 될 때 form 초기화
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      setError('로그인 실패');
      return;
    }

    if (auth) {
      console.log('로그인 성공');
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <Login form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
  );
};

export default LoginForm;
