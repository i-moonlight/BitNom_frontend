import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { AppBar, Divider, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
    NOTIFICATIONS_SUBSCRIPTION,
    QUERY_FETCH_PROFILE,
} from '../../../pages/dasboard/utilities/queries';
import { checkSessionTimeOut } from '../../../store/actions/authActions';
import { resetCount, setCount } from '../../../store/actions/countActions';
import {
    MARK_NOTIFICAION_AS_SEEN,
    QUERY_GET_USER_NOTIFICATIONS,
} from '../../utilities/queries.components';
import StatusBar from '../StatusBar';
import MenuPopover from './popovers/MenuPopover';
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

    const isMenuOpen = Boolean(menuAnchorEl);
    const isTabOptionOpen = Boolean(tabOptionAnchorEl);
    const isNotificationOpen = Boolean(notificationAnchorEl);
    const isNotificationOptionOpen = Boolean(notificationOptionAnchorEl);

    const {
        profileError,
        profileLoading,
        data: profileData,
    } = useQuery(QUERY_FETCH_PROFILE, {
        context: { clientName: 'users' },
    });

    const isAuth = !profileLoading && profileData?.Users?.profile !== null;

    console.log('prf: ', profileData?.Users?.profile);
    console.log('prfe: ', profileError);

    const { data } = useQuery(QUERY_GET_USER_NOTIFICATIONS, {
        context: { clientName: 'notifications' },
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
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleTabOptionsOpen = (event) => {
        console.log('crt: ', event.currentTarget);
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

        if (window.location.pathname == '/dasboard') {
            setTabValue(0);
        }

        if (window.location.pathname == '/dashboard/knowledge_center') {
            setTabValue(1);
        }

        const count =
            subscriptionData && subscriptionData.liveUpdates.count
                ? subscriptionData.liveUpdates.count
                : null;

        if (count !== null) {
            dispatch(setCount(count));
        }

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
            // dispatch(signout());
            console.log('not isAuth', isAuth);
            alert('not auth');
        } else {
            console.log('isAuth', isAuth);
        }
    }, [
        _count,
        dispatch,
        history,
        isAuth,
        response,
        subscriptionData,
        user._id,
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
            />
            <TabsBar
                value={tabValue}
                handleChange={handleChange}
                tabOptionsId={tabOptionsId}
                setTabOptions={setTabOptions}
                handleTabOptionsOpen={handleTabOptionsOpen}
                handleTabOptionsClose={handleTabOptionsClose}
            />
            {/* <TabsBar2 /> */}
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
