import React from 'react';
import Header from '../../components/common/Header';

const HeaderForm = () => {
  const nickname =
    localStorage.getItem('nickname') !== ''
      ? localStorage.getItem('nickname')
      : null;

  const onLogout = () => {
    localStorage.clear();
    window.location.replace('/login');
  };

  return <Header nickname={nickname} onLogout={onLogout} />;
};

export default HeaderForm;
