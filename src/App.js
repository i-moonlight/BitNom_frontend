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
      default: '#171818',
      alt: '#444444',
    },
  };

  const themeOptionsLight = {};

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
