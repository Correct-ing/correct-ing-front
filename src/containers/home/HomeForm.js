import React from 'react';
import Home from '../../components/home/Home';
import { useSelector } from '../../../node_modules/react-redux/es/exports';

const HomeForm = () => {
  const { loginRes } = useSelector(({ auth }) => ({
    loginRes: auth.loginRes,
  }));

  return <Home loginRes={loginRes} />;
};

export default HomeForm;
