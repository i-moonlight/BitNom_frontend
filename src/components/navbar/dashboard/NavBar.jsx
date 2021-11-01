import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { AppBar, Divider, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
    NOTIFICATIONS_SUBSCRIPTION,
    QUERY_FETCH_PROFILE,
    QUERY_LOAD_EVENTS,
    QUERY_LOAD_SCROLLS,
} from '../../../pages/dasboard/utilities/queries';
import {
    checkSessionTimeOut,
    signout,
} from '../../../store/actions/authActions';
import { resetCount, setCount } from '../../../store/actions/countActions';
import { setEventCount } from '../../../store/actions/eventCountActions';
import { setPostCount } from '../../../store/actions/postCountActions';
import {
    MARK_NOTIFICAION_AS_SEEN,
    QUERY_GET_USER_NOTIFICATIONS,
} from '../../utilities/queries.components';
import StatusBar from '../StatusBar';
import MenuPopover from './popovers/MenuPopover';
import MobileMenuModal from './popovers/MobileMenuModal';
import NotificationOptionPopover from './popovers/NotificationOptionPopover';
import NotificationsPopover from './popovers/NotificationsPopover';
import TabOptionsPopover from './popovers/TabOptionsPopover';
import ProfileBar from './ProfileBar';
import TabsBar from './TabsBar';

const menuId = 'menu-profile';
const tabOptionsId = 'menu-tab-options';
const notificationId = 'menu-notifications';
const notificationOptionId = 'menu-notifications-option';

export default function NavBar() {
    const [tabValue, setTabValue] = useState(0);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [tabOptionAnchorEl, setTabOptionAnchorEl] = useState(false);
    const [tabOptions, setTabOptions] = useState(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
    const [notificationOptionAnchorEl, setNotificationOptionAnchorEl] =
        useState(null);

    const theme = useTheme();
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector((st) => st);
    const user = state.auth.user;

    const smUp = useMediaQuery('(min-width:600px)');

    const isMenuOpen = Boolean(menuAnchorEl);
    const isTabOptionOpen = Boolean(tabOptionAnchorEl);
    const isNotificationOpen = Boolean(notificationAnchorEl);
    const isNotificationOptionOpen = Boolean(notificationOptionAnchorEl);

    const { loading: profileLoading, data: profileData } = useQuery(
        QUERY_FETCH_PROFILE,
        {
            context: { clientName: 'users' },
        }
    );

    const isAuth =
        profileLoading || (!profileLoading && profileData?.Users?.profile);

    const { data } = useQuery(QUERY_GET_USER_NOTIFICATIONS, {
        context: { clientName: 'notifications' },
    });

    const { data: userPosts } = useQuery(QUERY_LOAD_SCROLLS, {
        variables: { data: { author: user?._id, limit: 220 } },
    });

    const { data: eventsData } = useQuery(QUERY_LOAD_EVENTS, {
        variables: {
            data: { host: user?._id, limit: 20 },
        },
    });

    const [markAsSeen] = useMutation(MARK_NOTIFICAION_AS_SEEN, {
        variables: { _id: user?._id },
        context: { clientName: 'notifications' },
    });

    const { data: subscriptionData } = useSubscription(
        NOTIFICATIONS_SUBSCRIPTION,
        {
            variables: { _id: user?._id },
            context: { clientName: 'notifications' },
        }
    );

    const handleMenuOpen = (event) => {
        smUp ? setMenuAnchorEl(event.currentTarget) : setMobileMenuOpen(true);
    };

    const handleMenuClose = () => {
        smUp ? setMenuAnchorEl(null) : setMobileMenuOpen(false);
    };

    const handleTabOptionsOpen = (event) => {
        setTabOptionAnchorEl(event.currentTarget);
    };

    const handleTabOptionsClose = (link) => {
        link && history.push(link);
        setTabOptionAnchorEl(false);
    };

    const handleNotificationsOpen = (event) => {
        setNotificationAnchorEl(event.currentTarget);
        handleMarkAsSeen();
    };

    const handleNotificationsClose = () => {
        setNotificationAnchorEl(null);
    };

    const handleNotificationOptionOpen = (event) => {
        setNotificationOptionAnchorEl(event.currentTarget);
    };

    const handleNotificationOptionClose = () => {
        setNotificationOptionAnchorEl(null);
    };

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleMarkAsSeen = () => {
        markAsSeen({
            variables: {
                _id: user?._id,
            },
            refetchQueries: [
                {
                    query: QUERY_GET_USER_NOTIFICATIONS,
                    context: { clientName: 'notifications' },
                },
            ],
        });
        dispatch(resetCount());
    };

    const response = data?.Notification?.get;
    const _count = state.count.count;

    useEffect(() => {
        !user?.email?.verified && history.push('/auth/require_verify');

        if (window.location.pathname == '/connect') {
            setTabValue(0);
        }

        if (
            window.location.pathname == '/knowledge_center/cryptocurrency' ||
            window.location.pathname == '/knowledge_center/bitcoin'
        ) {
            setTabValue(1);
        }

        if (window.location.pathname == '/events') {
            setTabValue(2);
        }

        if (window.location.pathname == '/chat') {
            setTabValue(3);
        }

        if (window.location.pathname == '/investors') {
            setTabValue(4);
        }

        const count =
            subscriptionData && subscriptionData.liveUpdates.count
                ? subscriptionData.liveUpdates.count
                : null;

        if (count !== null) {
            dispatch(setCount(count));
        }

        const postCount =
            userPosts && userPosts.Posts.get ? userPosts.Posts.get.length : 0;
        dispatch(setPostCount(postCount));

        const userEvents = eventsData?.Events?.get?.filter(
            (event) => new Date(event?.endDate).getTime() > new Date().getTime()
        );
        const upcomingEvents = userEvents?.length > 0 ? userEvents?.length : 0;
        dispatch(setEventCount(upcomingEvents));

        dispatch(checkSessionTimeOut());
        const notSeenArray = [];
        response?.forEach((notification) => {
            notification.to_notify.forEach((item) => {
                if (item?.user_id === user._id && item?.seen === 'false') {
                    notSeenArray.push(notification?._id);
                }
            });
        });

        dispatch(setCount(notSeenArray.length));

        const logo = document.getElementById('favicon');

        if (_count > 0) {
            logo.href = `${window.location.origin}/logo_badge.svg`;
        } else {
            logo.href = `${window.location.origin}/logo.svg`;
        }

        if (!isAuth) {
            dispatch(signout());
        }
    }, [
        _count,
        dispatch,
        history,
        isAuth,
        profileData,
        profileLoading,
        response,
        subscriptionData,
        userPosts,
        user._id,
        eventsData,
        user?.email?.verified,
    ]);

    return (
        <AppBar
            position="fixed"
            style={{
                background: theme.palette.background.default,
            }}
            elevation={0}
        >
            <StatusBar />
            <Divider />
            <ProfileBar
                notifications={_count}
                menuId={menuId}
                handleMenuOpen={handleMenuOpen}
                notificationId={notificationId}
                handleNotificationsOpen={handleNotificationsOpen}
                profile={profileData?.Users?.profile}
            />
            <TabsBar
                value={tabValue}
                handleChange={handleChange}
                tabOptionsId={tabOptionsId}
                setTabOptions={setTabOptions}
                handleTabOptionsOpen={handleTabOptionsOpen}
                handleTabOptionsClose={handleTabOptionsClose}
            />
            <Divider />
            <Divider />
            <TabOptionsPopover
                value={tabValue}
                tabOptionsId={tabOptionsId}
                tabOptionAnchorEl={tabOptionAnchorEl}
                isTabOptionOpen={isTabOptionOpen}
                handleTabOptionsClose={handleTabOptionsClose}
                tabOptions={tabOptions}
            />
            <MenuPopover
                menuId={menuId}
                menuAnchorEl={menuAnchorEl}
                isMenuOpen={isMenuOpen}
                handleMenuClose={handleMenuClose}
            />
            <MobileMenuModal
                isMenuOpen={mobileMenuOpen}
                handleMenuClose={handleMenuClose}
            />
            <NotificationsPopover
                notifications={data?.Notification?.get}
                notificationAnchorEl={notificationAnchorEl}
                notificationId={notificationId}
                isNotificationOpen={isNotificationOpen}
                handleNotificationsClose={handleNotificationsClose}
                notificationOptionId={notificationOptionId}
                handleNotificationOptionOpen={handleNotificationOptionOpen}
            />
            <NotificationOptionPopover
                notificationOptionAnchorEl={notificationOptionAnchorEl}
                notificationOptionId={notificationOptionId}
                isNotificationOptionOpen={isNotificationOptionOpen}
                handleNotificationOptionClose={handleNotificationOptionClose}
            />
        </AppBar>
    );
}
