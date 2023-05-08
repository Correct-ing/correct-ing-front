import React from 'react';
import Header from '../../components/common/Header';
import { useSelector } from '../../../node_modules/react-redux/es/exports';

const HeaderForm = () => {
  const { auth } = useSelector(({ auth }) => ({
    auth: auth.auth,
  }));

  const onLogout = () => {
    console.log('로그아웃 api 추가해야함');
  };

  return <Header auth={auth} onLogout={onLogout} />;
};

export default HeaderForm;
