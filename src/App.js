import {
    createTheme,
    StyledEngineProvider,
    ThemeProvider,
} from '@mui/material/styles';
import { useSelector } from 'react-redux';
import AppContainers from './Containers';
import './css/bootstrap.css';
import './css/style.css';

export default function App() {
    const palette = useSelector((st) => st.theme.palette);

    const themeOptionsDark = {
        primary: {
            main: '#006097',
            light: '#006097',
            dark: '#006097',
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
            appBar: '#171818',
            landing: '#18191a',
            search: '#242526',
            chatFrom: '#163C53',
            chatTo: '#333436',
            investorDark: '#000',
            investorShade: '#0C0F19',
            investorCards: '#11141C',
            investorCardsAlt: '#1E2126',
        },
    };

    const themeOptionsLight = {
        primary: {
            main: '#006097',
            light: '#006097',
            dark: '#006097',
        },
        secondary: {
            main: '#FB5E5E',
        },
        background: {
            paperAlt: '#333333',
            comment: '#ececec',
            profileCard: '#ececec',
            search: '#f1f1f1',
            default: '#F8F8F8',
            appBar: '#FEFEFE',
            chatFrom: '#BDE0FF',
            chatTo: '#F0F8FF',
            investorDark: '#fff',
            investorShade: '#F2F5FA',
            investorCards: '#efefef',
            investorCardsAlt: '#efefef',
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
            <div>
                <StyledEngineProvider injectFirst>
                    <AppContainers />
                </StyledEngineProvider>
            </div>
        </ThemeProvider>
    );
}
