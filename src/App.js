import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import AppContainers from './Containers';
import './css/bootstrap.css';
import './css/style.css';
import { Paper } from '@mui/material';

export default function App() {
    const palette = useSelector((st) => st.theme.palette);

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
            comment: '#333333',
            profileCard: '#333333',
            default: '#171818',
            landing: '#18191a',
            search: '#242526',
        },
    };

    const themeOptionsLight = {
        primary: {
            main: '#006097',
        },
        secondary: {
            main: '#FB5E5E',
        },
        background: {
            paperAlt: '#333333',
            comment: '#ececec',
            profileCard: '#ececec',
            search: '#f1f1f1',
            default: '#F3F2EF',
        },
    };

    const themeOptionsRoot =
        palette == 'light' ? themeOptionsLight : themeOptionsDark;

    //Create MUI Theme
    const providerTheme = createTheme({
        palette: {
            mode: palette,
            ...themeOptionsRoot,
        },
    });

    return (
        <ThemeProvider theme={providerTheme}>
            {/* <Paper> */}
            <AppContainers />
            {/* </Paper> */}
        </ThemeProvider>
    );
}
