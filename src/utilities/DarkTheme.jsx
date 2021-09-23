import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

export default function DarkTheme({ children }) {
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
        paperAlt: '#333333',
        default: '#171818',
        landing: '#18191a',
        investor: '#000000',
      },
    },
  });

  return (
    <ThemeProvider theme={providerTheme}>
      <Paper>{children}</Paper>
    </ThemeProvider>
  );
}
