import { AppBar, Container, useTheme } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';

const logo_full = React.lazy(() => import('../../../assets/logo_full.svg'));
const logo_light_full = React.lazy(() =>
    import('../../../assets/logo_light_full.svg')
);

export default function NavBarAuth() {
    const history = useHistory();
    const theme = useTheme();

    return (
        <AppBar
            className="pt-2"
            style={{
                background: theme.palette.background.default,
            }}
            elevation={0}
        >
            <Container>
                <div className="space-between my-3">
                    <div
                        className="center-horizontal c-pointer"
                        onClick={() => history.push('/')}
                    >
                        <div>
                            <img
                                style={{
                                    height: 40,
                                }}
                                src={
                                    theme.palette.mode == 'light'
                                        ? logo_full
                                        : logo_light_full
                                }
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </AppBar>
    );
}
