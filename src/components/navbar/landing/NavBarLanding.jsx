import {
    ArrowRightAltRounded,
    ChevronRight,
    MenuRounded,
} from '@mui/icons-material';
import {
    AppBar,
    Avatar,
    Container,
    Divider,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import logo_full from '../../../assets/logo_full.svg';
import logo_light from '../../../assets/logo_light.svg';
import logo_light_full from '../../../assets/logo_light_full.svg';
import { Button } from '../../Button';
import { menuEcosystem, menuProduct } from '../../utilities/data.components';
import StatusBar from '../StatusBar';
import NavBarMenu from './MenuOptions';
import MobileMenu from './MobileMenu';

export default function NavBarLanding() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showMenuEcosystem, setShowMenuEcosystem] = useState(false);
    const [showMenuProduct, setShowMenuProduct] = useState(false);
    const theme = useTheme();
    const history = useHistory();
    const xsDown = useMediaQuery('(max-width:599px)');
    const smUp = useMediaQuery('(min-width:600px)');
    const smDown = useMediaQuery('(max-width:959px)');
    const mdUp = useMediaQuery('(min-width:960px)');

    return (
        <AppBar
            position="fixed"
            style={{
                background: theme.palette.background.default,
            }}
            elevation={4}
        >
            <StatusBar />
            <Divider />
            <Container>
                <div className="space-between my-3">
                    <div
                        className="center-horizontal c-pointer"
                        onClick={() => history.push('/connect')}
                    >
                        {!xsDown && (
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
                        )}
                        {!smUp && (
                            <Avatar
                                className="me-1"
                                src={
                                    theme.palette.mode == 'light'
                                        ? logo
                                        : logo_light
                                }
                            >
                                B
                            </Avatar>
                        )}
                    </div>
                    {!smDown && (
                        <>
                            <div className="center-horizontal">
                                <Button
                                    className="mx-2"
                                    color={theme.palette.text.primary}
                                    variant="text"
                                    textCase
                                    size="large"
                                >
                                    <Typography className="fw-bold">
                                        Home
                                    </Typography>
                                </Button>
                                <Button
                                    className="mx-2"
                                    color={theme.palette.text.primary}
                                    variant="text"
                                    textCase
                                    endIcon={
                                        <ChevronRight
                                            style={{
                                                transform: 'rotate(90deg)',
                                            }}
                                        />
                                    }
                                    onMouseEnter={() =>
                                        setShowMenuEcosystem(true)
                                    }
                                    onMouseLeave={() =>
                                        setTimeout(() => {
                                            setShowMenuEcosystem(false);
                                        }, 500)
                                    }
                                >
                                    <Typography className="fw-bold">
                                        Ecosystem
                                    </Typography>
                                    <NavBarMenu
                                        show={showMenuEcosystem}
                                        items={menuEcosystem}
                                    />
                                </Button>
                                <Button
                                    className="mx-2"
                                    color={theme.palette.text.primary}
                                    variant="text"
                                    textCase
                                    endIcon={
                                        <ChevronRight
                                            style={{
                                                transform: 'rotate(90deg)',
                                            }}
                                        />
                                    }
                                    onMouseEnter={() =>
                                        setShowMenuProduct(true)
                                    }
                                    onMouseLeave={() =>
                                        setTimeout(() => {
                                            setShowMenuProduct(false);
                                        }, 300)
                                    }
                                >
                                    <Typography className="fw-bold">
                                        Product
                                    </Typography>
                                    <NavBarMenu
                                        show={showMenuProduct}
                                        items={menuProduct}
                                    />
                                </Button>
                                <Button
                                    className="mx-2"
                                    color={theme.palette.text.primary}
                                    variant="text"
                                    textCase
                                >
                                    <Typography className="fw-bold">
                                        BN for Business
                                    </Typography>
                                </Button>
                                <Button
                                    className="mx-2"
                                    color={theme.palette.text.primary}
                                    variant="text"
                                    textCase
                                >
                                    <Typography className="fw-bold">
                                        Learn
                                    </Typography>
                                </Button>
                            </div>
                        </>
                    )}
                    <div className="center-horizontal">
                        <Button
                            className="mx-2"
                            color={theme.palette.text.primary}
                            variant="text"
                            textCase
                            onClick={() => {
                                history.push('/auth/login');
                            }}
                        >
                            <Typography className="fw-bold">Sign In</Typography>
                        </Button>
                        <Button
                            variant="contained"
                            textCase
                            endIcon={!xsDown && <ArrowRightAltRounded />}
                            onClick={() => {
                                history.push('/auth/signup');
                            }}
                        >
                            <Typography className="fw-bold">
                                Explore
                                {!smDown && 'BN'}
                            </Typography>
                        </Button>

                        {!mdUp && (
                            <IconButton
                                size="small"
                                className="m-1 p-1"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <MenuRounded />
                            </IconButton>
                        )}

                        <MobileMenu
                            open={menuOpen}
                            onClose={() => setMenuOpen(false)}
                        />
                    </div>
                </div>
            </Container>
        </AppBar>
    );
}
