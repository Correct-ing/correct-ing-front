import React from 'react';
import Header from '../../components/common/Header';

const HeaderForm = () => {
  const nickname =
    localStorage.getItem('nickname') !== ''
      ? localStorage.getItem('nickname')
      : null;

  const onLogout = () => {
    console.log('로그아웃 api 추가해야함');
  };

  return <Header nickname={nickname} onLogout={onLogout} />;
};

export default HeaderForm;
