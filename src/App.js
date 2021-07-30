import { createTheme, ThemeProvider, useTheme } from '@material-ui/core/styles';
import React from 'react';
import './css/bootstrap_utilities.css';
import './css/style.css';
import Routes from './Routes';

export default function App() {
  const theme = useTheme();

  const bgDark = {
    paper: '#242526',
    default: '#171818',
  };

  //Create MUI Theme
  const providerTheme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#006097',
      },
      secondary: {
        main: '#FB5E5E',
      },
      background: bgDark,
    },
  });

  return (
    <ThemeProvider theme={providerTheme}>
      <Routes />
    </ThemeProvider>
  );
}
