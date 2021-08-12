import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import './css/bootstrap_utilities.css';
import './css/style.css';
import Routes from './Routes';

export default function App() {
  // const theme = useTheme();

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
      background: {
        paper: '#242526',
        default: '#171818',
        alt: '#444444',
      },
    },
  });

  return (
    <ThemeProvider theme={providerTheme}>
      <Routes />
    </ThemeProvider>
  );
}
