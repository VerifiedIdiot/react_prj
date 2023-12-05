import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header'; 

const DoNotShowInLogIn = ({ children }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && <Header />}
      {children}
    </>
  );
};

export default DoNotShowInLogIn;