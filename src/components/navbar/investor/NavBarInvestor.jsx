import { AppBar, Avatar, Container, Tab, Tabs } from '@mui/material';
import { withStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import logo_light from '../../../assets/logo_light.svg';
// import DarkThemeOnly from '../../../utilities/DarkThemeOnly';
import Button from '../../Button';
import { investorTabs } from '../../utilities/data.components';

export default function NavBarInvestor() {
    const history = useHistory();
    const palette = useSelector((st) => st.theme.palette);

    const [tabValue, setTabValue] = useState(0);

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

                    <Tabs
                        value={tabValue}
                        onChange={(_ev, val) => {
                            setTabValue(val);
                        }}
                        indicatorColor="transparent"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {investorTabs.map(({ label, hash }) => {
                            return (
                                <BitTab
                                    key={`${Math.random() * 100}`}
                                    label={label}
                                    aria-haspopup="true"
                                    onClick={() => {
                                        window.location.hash = hash;
                                    }}
                                />
                            );
                        })}
                    </Tabs>

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
    );
}

const BitTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: theme.palette.mode == 'dark' ? '#fff' : '#000',
        fontWeight: theme.typography.fontWeightBold,
        fontSize: theme.typography.pxToRem(15),
        marginRight: 0,

        // '&:focus': {
        //     opacity: 1,
        //     color: theme.palette.mode == 'dark' ? '#fff' : '#000',
        // },
        // '&:hover': {
        //   backgroundColor:
        //     theme.palette.mode == 'dark'
        //       ? theme.palette.background.paper
        //       : theme.palette.background.search,
        // },
    },
}))((props) => <Tab disableRipple {...props} />);
