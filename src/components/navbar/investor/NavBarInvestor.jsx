import { AppBar, Avatar, Container, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import logo_light from '../../../assets/logo_light.svg';
// import DarkTheme from '../../../utilities/DarkTheme';
import Button from '../../Button';
import { investorTabs } from '../../utilities/data.components';

export default function NavBarInvestor() {
    const history = useHistory();
    const palette = useSelector((st) => st.theme.palette);

    // switch (val) {
    //     case 1:
    //         window.location.hash = '#ecosystem';
    //         break;
    //     case 2:
    //         window.location.hash = '#roadmap';
    //         break;
    //     default:
    //         window.location.hash = '#';
    // }

    return (
        // <DarkTheme>
        <AppBar
            position="static"
            style={{
                background: '#000',
                paddingTop: 16,
            }}
            elevation={0}
        >
            <Container maxWidth="lg">
                <div className="d-flex align-items-center my-3 ">
                    <div
                        className="center-horizontal c-pointer me-3"
                        onClick={() => history.push('/')}
                    >
                        <Avatar src={palette == 'light' ? logo : logo_light}>
                            B
                        </Avatar>
                    </div>

                    <div>
                        {investorTabs.map(({ label }) => (
                            <Typography key={label}>{label}</Typography>
                        ))}
                    </div>

                    <div className="ms-auto">
                        <Button
                            textCase
                            onClick={() => history.push('/support')}
                        >
                            Support
                        </Button>
                    </div>
                </div>
            </Container>
        </AppBar>
        // </DarkTheme>
    );
}
