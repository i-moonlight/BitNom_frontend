import { AppBar, Container, Divider, useTheme } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import logo_full from '../../../assets/logo_full.svg';
import logo_light_full from '../../../assets/logo_light_full.svg';
import LazyImage from '../../LazyImage';
import StatusBar from '../StatusBar';

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
            <StatusBar />
            <Divider />
            <Container maxWidth="lg">
                <div className="space-between my-3">
                    <div
                        className="center-horizontal c-pointer"
                        onClick={() => history.push('/')}
                    >
                        <div>
                            <LazyImage
                                style={{ marginRight: 16 }}
                                image={{
                                    src:
                                        theme.palette.mode == 'light'
                                            ? logo_full
                                            : logo_light_full,
                                    alt: 'BN Logo',
                                    height: 40,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </AppBar>
    );
}
