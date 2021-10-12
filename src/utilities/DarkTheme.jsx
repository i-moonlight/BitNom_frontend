import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';

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
                incomingMessage: '#bde0ff',
                outgoingMessage: '#f0f8ff',
            },
        },
    });

    return <ThemeProvider theme={providerTheme}>{children}</ThemeProvider>;
}
