import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';

export default function DarkTheme({ children }) {
    const providerTheme = createTheme({
        palette: {
            mode: 'dark',
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
            <div>{children}</div>
        </ThemeProvider>
    );
}
