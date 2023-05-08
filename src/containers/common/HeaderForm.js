import React from 'react';
import Header from '../../components/common/Header';
import { useSelector } from '../../../node_modules/react-redux/es/exports';

const HeaderForm = () => {
  const { loginRes } = useSelector(({ auth }) => ({
    loginRes: auth.loginRes,
  }));

  const onLogout = () => {
    console.log('로그아웃 api 추가해야함');
  };

  return <Header loginRes={loginRes} onLogout={onLogout} />;
};

export default HeaderForm;
