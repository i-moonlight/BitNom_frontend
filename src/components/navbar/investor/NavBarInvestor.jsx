import { AppBar, Avatar, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import logo_light from '../../../assets/logo_light.svg';
import DarkTheme from '../../../utilities/DarkTheme';
import Button from '../../Button';
import InvestorTabs from './InvestorTabs';

export default function NavBarInvestor({ onTabValue }) {
    const [tabValue, setTabValue] = useState(0);
    const history = useHistory();
    const palette = useSelector((st) => st.theme.palette);

    useEffect(() => {
        () => onTabValue(tabValue);
    }, [onTabValue, tabValue]);

    return (
        <DarkTheme>
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
                            <Avatar
                                src={palette == 'light' ? logo : logo_light}
                            >
                                B
                            </Avatar>
                        </div>

                        <InvestorTabs
                            value={tabValue}
                            handleChange={(e, val) => {
                                setTabValue(val);
                                onTabValue(val);
                            }}
                        />

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
        </DarkTheme>
    );
}
