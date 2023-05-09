import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import Register from '../../components/auth/Register';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import axios from '../../../node_modules/axios/index';

const RegisterForm = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [check, setCheck] = useState(null);
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

    if ([name, id, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }

    if (password !== passwordConfirm) {
      setError('두 비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
      );
      return;
    }

    if (check !== true) {
      setError('아이디 중복을 확인해주세요.');
      return;
    }
    dispatch(register({ id, name, password }));
  };

  const onCheck = (e) => {
    e.preventDefault();
    const { id } = form;
    axios
      .get(
        `http://correcting-env.eba-harr53pi.ap-northeast-2.elasticbeanstalk.com/api/v1/users/${id}/exists`,
        {
          username: id,
        },
      )
      .then((response) => {
        console.log(response);
        if (response.data === false) {
          setMessage('사용 가능한 아이디입니다.');
          setCheck(true);
        }
        if (response.data === true) {
          setMessage('이미 존재하는 계정명입니다.');
          setCheck(false);
          dispatch(changeField({ form: 'register', key: 'id', value: '' }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
      message={message}
    />
  );
};

export default RegisterForm;
