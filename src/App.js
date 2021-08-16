import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import './css/bootstrap_utilities.css';
import './css/style.css';
import Routes from './Routes';

export default function App() {
  const palette = useSelector(state => state.theme.palette);

  const themeOptionsDark = {
    primary: {
      main: '#006097',
    },
    secondary: {
      main: '#FB5E5E',
    },
    background: {
      paper: '#242526',
      paperAlt: '#333333',
      default: '#171818',
      landing: '#18191a',
    },
  };

  const themeOptionsLight = {
    background: {
      paperAlt: '#333333',
    },
  };

  const themeOptionsRoot =
    palette == 'light' ? themeOptionsLight : themeOptionsDark;

  //Create MUI Theme
  const providerTheme = createTheme({
    palette: {
      type: palette,
      ...themeOptionsRoot,
    },
  });

  return (
    <ThemeProvider theme={providerTheme}>
      <Routes />
    </ThemeProvider>
  );
}
