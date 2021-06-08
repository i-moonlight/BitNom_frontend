import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import NavBar from './NavBar';

export default function Screen({ auth, children }) {
  const state = useSelector(state => state);
  const history = useHistory();
  const user = state.auth.user;

  useEffect(() => {
    JSON.stringify(user) === '{}' && !auth && history.push('/auth/login');
  }, [auth, history, user]);
  return (
    <div>
      <NavBar />
      <div style={{ height: 160 }}></div>
      {children}
    </div>
  );
}
