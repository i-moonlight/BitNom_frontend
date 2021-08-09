import {
  makeStyles,
  Snackbar,
  SnackbarContent,
  useTheme,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import NavBarLanding from '../../components/navbar/NavBarLanding';
import Footer from './Footer';
import InfrastructureSection from './InfrastructureSection';
import InvestorSection from './InvestorSection';
import Sponsors from './Sponsors';
import Header from './Header';
import LayersSection from './LayersSection';
import ProjectSection from './ProjectSection';
import ServicesSection from './ServicesSection';
import TransitionSection from './TransitionSection';

export const INVESTOR_CARD_DISPLACEMENT = 200;

export default function Landing() {
  const history = useHistory();
  const state = useSelector(state => state);
  const user = state.auth.user;
  const theme = useTheme();

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
    <div style={{ width: '100%' }}>
      <NavBarLanding />
      <Header />
      <Sponsors />
      <ProjectSection />
      <InfrastructureSection />
      <TransitionSection />
      <LayersSection />
      <InvestorSection />
      <ServicesSection />
      <Footer />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={false}
        autoHideDuration={6000}
        // onClose={handleClose}
      >
        <SnackbarContent
          action={
            <React.Fragment>
              <Button color={theme.palette.text.primary} size='small' textCase>
                I Agree
              </Button>
            </React.Fragment>
          }
          style={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
          message='BitNorm uses cookies on this site to enhance your user experience, understand site usage, and assist in our marketing efforts.'
        />
      </Snackbar>
    </div>
  );
}

export const useStyles = makeStyles(() => ({
  sectionText: {
    lineHeight: '1.8em',
    marginBottom: 16,
  },
  cardImg: {
    width: 100,
    height: 100,
    padding: 10,
  },
}));
