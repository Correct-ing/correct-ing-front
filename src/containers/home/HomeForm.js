import React from 'react';
import Home from '../../components/home/Home';

const HomeForm = () => {
  const nickname =
    localStorage.getItem('nickname') !== ''
      ? localStorage.getItem('nickname')
      : null;

  return <Home nickname={nickname} />;
};

export default HomeForm;
