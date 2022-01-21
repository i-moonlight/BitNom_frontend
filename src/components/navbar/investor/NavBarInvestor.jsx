import { Brightness4Rounded, Brightness7Rounded } from '@mui/icons-material';
import {
    AppBar,
    Container,
    IconButton,
    Tab,
    Tabs,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { styled, withStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import logo_light from '../../../assets/logo_light.svg';
import { changeTheme } from '../../../store/actions/themeActions';
import { Button } from '../../Button';
import LazyImage from '../../LazyImage';
import { investorTabs } from '../../utilities/data.components';

const InvestorTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        backgroundColor: 'transparent',
    },
});

export default function NavBarInvestor() {
    const [tabValue, setTabValue] = useState(0);

    const dispatch = useDispatch();
    const history = useHistory();
    const palette = useSelector((st) => st.theme.palette);
    const theme = useTheme();
    const xsDown = useMediaQuery('(max-width:599px)');

    return (
        <AppBar
            position="static"
            style={{
                background: theme.palette.mode == 'dark' ? '#000' : '#fff',
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
                        <LazyImage
                            style={{ marginRight: 16 }}
                            image={{
                                src:
                                    theme.palette.mode == 'light'
                                        ? logo
                                        : logo_light,
                                alt: 'BN Logo',
                                height: 40,
                            }}
                        />
                    </div>

                    {!xsDown && (
                        <InvestorTabs
                            value={tabValue}
                            onChange={(_ev, val) => {
                                setTabValue(val);
                            }}
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
                        </InvestorTabs>
                    )}

                    <div className="ms-auto">
                        <IconButton
                            size="small"
                            className="m-1 p-1 me-2"
                            onClick={() => {
                                palette == 'light'
                                    ? dispatch(changeTheme('dark'))
                                    : dispatch(changeTheme('light'));
                            }}
                        >
                            {palette == 'light' ? (
                                <Brightness4Rounded
                                    style={{
                                        width: 20,
                                        height: 20,
                                    }}
                                />
                            ) : (
                                <Brightness7Rounded
                                    style={{
                                        width: 20,
                                        height: 20,
                                    }}
                                />
                            )}
                        </IconButton>
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
