import {
    ChevronRight,
    ForumRounded,
    MenuRounded,
    Notifications,
} from '@mui/icons-material';
import {
    Avatar,
    Badge,
    Box,
    Card,
    Container,
    IconButton,
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
import { Button } from '../../Button';
import LazyImage from '../../LazyImage';
import { useStyles } from '../../utilities/styles.components';

export default function ProfileBar({
    unreadCount,
    notificationCount,
    menuId,
    handleMenuOpen,
    notificationId,
    handleNotificationsOpen,
    profile,
    handleTotalCountReset,
}) {
    const state = useSelector((st) => st);
    const user = state.auth.user;
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();

    const userInitials = getUserInitials(
        user?.displayName || profile?.displayName
    );
    const smDown = useMediaQuery('(max-width:959px)');
    const mdUp = useMediaQuery('(min-width:960px)');
    // const xsDown = useMediaQuery('(max-width:599px)');

    return (
        <Box className={classes.root}>
            <Container maxWidth="lg">
                <Card elevation={0} className={classes.appBar}>
                    <div
                        className="center-horizontal c-pointer"
                        onClick={() => history.push('/connect')}
                    >
                        {!smDown && (
                            <>
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
                            </>
                        )}

                        {!mdUp && (
                            <LazyImage
                                style={{ marginRight: 8 }}
                                image={{
                                    src:
                                        theme.palette.mode == 'light'
                                            ? logo
                                            : logo_light,
                                    alt: 'BN Logo',
                                    height: 40,
                                }}
                            />
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
                        // variant={theme.palette.mode == 'light' && 'outlined'}
                        elevation={0}
                        component="form"
                        className={classes.paperSearch}
                        sx={{
                            height: 36,
                        }}
                    >
                        <div className="flex-1 p-1 m-1"></div>
                        {/* {!xsDown && (
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
                        </IconButton> */}
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
                            <Badge
                                color="primary"
                                badgeContent={notificationCount}
                            >
                                <Notifications />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="small"
                            className={classes.iconButton}
                            color="inherit"
                            onClick={(e) => {
                                handleTotalCountReset();
                                e.stopPropagation();
                                history.push('/chat');
                            }}
                        >
                            <Badge color="primary" badgeContent={unreadCount}>
                                <ForumRounded />
                            </Badge>
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
                                    marginRight: 12,
                                    width: 30,
                                    height: 30,
                                }}
                                src={
                                    user?.profile_pic
                                        ? process.env.REACT_APP_BACKEND_URL +
                                          user?.profile_pic
                                        : `https://ui-avatars.com/api/?name=${userInitials}&background=random`
                                }
                            >
                                {userInitials}
                            </Avatar>
                            <Typography
                                variant="body2"
                                style={{ marginRight: 4 }}
                            >
                                {user?.displayName ||
                                    profile?.displayName ||
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
