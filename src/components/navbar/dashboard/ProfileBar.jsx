import {
    ChevronRight,
    ForumRounded,
    MenuRounded,
    Notifications,
    Search,
} from '@mui/icons-material';
import {
    Avatar,
    Badge,
    Box,
    Card,
    Container,
    Divider,
    IconButton,
    InputBase,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import logo_full from '../../../assets/logo_full.svg';
import logo_light from '../../../assets/logo_light.svg';
import logo_light_full from '../../../assets/logo_light_full.svg';
import { getUserInitials } from '../../../utilities/Helpers';
import Button from '../../Button';
import { useStyles } from '../../utilities/styles.components';

export default function ProfileBar({
    notifications,
    menuId,
    handleMenuOpen,
    notificationId,
    handleNotificationsOpen,
    profile,
}) {
    const state = useSelector((st) => st);
    const user = state.auth.user;
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const userInitials = getUserInitials(
        profile?.displayName || user?.displayName
    );
    const smDown = useMediaQuery('(max-width:959px)');
    const mdUp = useMediaQuery('(min-width:960px)');
    const xsDown = useMediaQuery('(max-width:599px)');

    return (
        <Box className={classes.root}>
            <Container>
                <Card elevation={0} className={classes.appBar}>
                    <div
                        className="center-horizontal c-pointer"
                        onClick={() => history.push('/connect')}
                    >
                        {!smDown && (
                            <>
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
                            </>
                        )}

                        {!mdUp && (
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
                        {!smDown && (
                            <Typography
                                style={{ marginLeft: 16, color: '#F59301' }}
                                variant="body2"
                                noWrap
                            >
                                NEW
                            </Typography>
                        )}
                    </div>
                    <Paper
                        variant={theme.palette.mode == 'light' && 'outlined'}
                        elevation={0}
                        component="form"
                        className={classes.paperSearch}
                    >
                        {!xsDown && (
                            <>
                                <Button textCase variant="text">
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        General
                                    </Typography>
                                    <ChevronRight
                                        style={{
                                            transform: 'rotateZ(90deg)',
                                        }}
                                    />
                                </Button>
                                <Divider
                                    className={classes.divider}
                                    orientation="vertical"
                                />
                            </>
                        )}
                        <InputBase
                            className={classes.input}
                            placeholder="Search Bitnorm"
                            inputProps={{ 'aria-label': 'search bitnorm' }}
                        />
                        <IconButton
                            size="small"
                            type="submit"
                            className={'m-1 p-1' + classes.iconButton}
                            aria-label="search"
                        >
                            <Search />
                        </IconButton>
                    </Paper>
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            size="small"
                            className={'m-1 p-1' + classes.iconButton}
                            color="inherit"
                            aria-label="account of current user"
                            aria-controls={notificationId}
                            aria-haspopup="true"
                            onClick={handleNotificationsOpen}
                        >
                            <Badge color="primary" badgeContent={notifications}>
                                <Notifications />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="small"
                            className={classes.iconButton}
                            color="inherit"
                            onClick={(e) => {
                                e.stopPropagation();
                                history.push('/chat');
                            }}
                        >
                            <ForumRounded />
                        </IconButton>
                        <Button
                            textCase
                            className="py-0 ms-3"
                            variant="text"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleMenuOpen}
                        >
                            <Avatar
                                variant="rounded"
                                style={{
                                    backgroundColor: '#fed132',
                                    marginRight: 12,
                                    width: 30,
                                    height: 30,
                                }}
                                src={
                                    profile?.profile_pic ||
                                    user?.profile_pic ||
                                    `https://ui-avatars.com/api/?name=${userInitials}&background=random`
                                }
                            >
                                {userInitials}
                            </Avatar>
                            <Typography
                                variant="body2"
                                style={{ marginRight: 4 }}
                            >
                                {profile?.displayName ||
                                    user?.displayName ||
                                    profile?._id ||
                                    user?.id}
                            </Typography>
                            <ChevronRight
                                style={{
                                    transform: 'rotateZ(90deg)',
                                }}
                            />
                        </Button>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            size="small"
                            className={'m-1 p-1' + classes.iconButton}
                            aria-label="show more"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleMenuOpen}
                            color="inherit"
                        >
                            <MenuRounded />
                        </IconButton>
                    </div>
                </Card>
            </Container>
        </Box>
    );
}
