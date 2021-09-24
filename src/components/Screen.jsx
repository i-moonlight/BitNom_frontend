import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import NavBar from './navbar/dashboard/NavBar';
import Cookies from 'js-cookie';

export default function Screen({ auth, children }) {
  const state = useSelector(st => st);
  const history = useHistory();
  const user = state.auth.user;

  Cookies.set('bnlogin', 'true', {
    expires: new Date(Date.now() + 900000),
  });

  console.log('cookie: ', Cookies.get());

  useEffect(() => {
    JSON.stringify(user) === '{}' && !auth && history.push('/auth/login');
  }, [auth, history, user]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <NavBar />
      <div style={{ height: 160 }}></div>
      {children}
    </div>
  );
}
