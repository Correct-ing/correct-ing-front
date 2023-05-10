import React from 'react';
import Sidebar from '../../components/common/Sidebar';
import { useSelector } from '../../../node_modules/react-redux/es/exports';

const SidebarForm = () => {
  const { loginRes } = useSelector(({ auth }) => ({
    loginRes: auth.loginRes,
  }));

  const onLogout = () => {
    console.log('로그아웃 api 추가해야함');
  };

  return <Sidebar loginRes={loginRes} onLogout={onLogout} />;
};

export default SidebarForm;
