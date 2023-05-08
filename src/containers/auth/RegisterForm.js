import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register, dup } from '../../modules/auth';
import Register from '../../components/auth/Register';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';

const RegisterForm = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, registerRes, registerErr } = useSelector(({ auth }) => ({
    form: auth.register,
    registerRes: auth.registerRes,
    registerErr: auth.registerErr,
  }));

  // input 변경 감지
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  // form submit
  const onSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지

    const { name, id, password, passwordConfirm } = form;
    if (password !== passwordConfirm) {
      return;
    }
    dispatch(register({ id, name, password }));
  };

  const onCheck = (e) => {
    e.preventDefault();

    const { id } = form;
    dispatch(dup({ id }));
  };

  // 컴포넌트 처음 렌더링 될 때 form 초기화
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  // 회원가입 성공/실패 처리
  useEffect(() => {
    if (registerErr) {
      console.log('오류 발생');
      console.log(registerErr);
      setError('회원가입 오류');
      return;
    }
    if (registerRes) {
      console.log('회원가입 성공');
      console.log(registerRes);
      navigate('/login');
    }
  }, [registerRes, registerErr, navigate]);

  return (
    <Register
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      onCheck={onCheck}
      error={error}
    />
  );
};

export default RegisterForm;
