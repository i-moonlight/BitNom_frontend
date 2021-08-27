import { AppBar, Avatar, Container, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import logo_light from '../../../assets/logo_light.svg';
import InvestorTabs from './InvestorTabs';

export default function NavBarInvestor() {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const history = useHistory();
  const palette = useSelector(state => state.theme.palette);

  return (
    <AppBar
      position='static'
      style={{
        background: theme.palette.background.default,
      }}
      elevation={0}
    >
      <Container maxWidth='lg'>
        <div className='space-between my-3'>
          <div
            className='center-horizontal c-pointer'
            onClick={() => history.push('/')}
          >
            <Avatar src={palette == 'light' ? logo : logo_light}>B</Avatar>
          </div>

          <InvestorTabs
            value={tabValue}
            handleChange={(e, val) => setTabValue(val)}
          />

          <div></div>
        </div>
      </Container>
    </AppBar>
  );
}
