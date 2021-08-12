import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NavBarLanding from '../../components/navbar/NavBarLanding';
import Footer from './Footer';

export default function Wrapper({ children }) {
  const history = useHistory();
  const state = useSelector(state => state);
  const user = state.auth.user;

  useEffect(() => {
    if (JSON.stringify(user) !== '{}') {
      if (!user?.email?.verified) {
        history.push('/auth/require_verify');
      } else {
        user?.email?.verified && !user?.displayName
          ? history.push('/auth/update_info_register')
          : history.push('/dashboard');
      }
    }
  }, []);

  return (
    <div
      style={{
        width: '100%',
        paddingTop: 116,
        minHeight: '100vh',
      }}
    >
      <NavBarLanding />
      {children}

      <Footer />
    </div>
  );
}
