import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { AppBar, Divider, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
    GET_TOTAL_COUNT,
    TOTAL_COUNT,
} from '../../../pages/dasboard/bn_chat/graphql/queries';
import {
    NOTIFICATIONS_SUBSCRIPTION,
    QUERY_FETCH_PROFILE,
    QUERY_LOAD_EVENTS,
    QUERY_LOAD_SCROLLS,
} from '../../../pages/dasboard/utilities/queries';
import {
    checkSessionTimeOut,
    signout,
    userUpdate,
} from '../../../store/actions/authActions';
import {
    clearAllChatData,
    resetTotalCount,
    setTotalCount,
} from '../../../store/actions/chatActions';
import { resetCount, setCount } from '../../../store/actions/countActions';
import { setEventCount } from '../../../store/actions/eventCountActions';
import { setPostCount } from '../../../store/actions/postCountActions';
import {
    MARK_NOTIFICAION_AS_SEEN,
    QUERY_GET_USER_NOTIFICATIONS,
} from '../../utilities/queries.components';
import StatusBar from '../StatusBar';
import ConnectBar from './ConnectBar';
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

    const history = useHistory();
    const dispatch = useDispatch();
    const theme = useTheme();
    const state = useSelector((st) => st);

    const user = state.auth.user;
    const _count = state.count.count;

    const smUp = useMediaQuery('(min-width:600px)');
    const smDown = useMediaQuery('(max-width:959px)');

    const isMenuOpen = Boolean(menuAnchorEl);
    const isTabOptionOpen = Boolean(tabOptionAnchorEl);
    const isNotificationOpen = Boolean(notificationAnchorEl);
    const isNotificationOptionOpen = Boolean(notificationOptionAnchorEl);
    const unreadCount = state.chats.unreadCount;

    const { loading: profileLoading, data: profileData } = useQuery(
        QUERY_FETCH_PROFILE,
        {
            context: { clientName: 'users' },
            fetchPolicy: 'network-only',
        }
    );

    const { data } = useQuery(QUERY_GET_USER_NOTIFICATIONS, {
        context: { clientName: 'notifications' },
    });

    const { data: chatCountData } = useQuery(GET_TOTAL_COUNT, {
        variables: {
            data: { _id: user._id },
        },
        context: { clientName: 'chat' },
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
    const { data: totalCountData } = useSubscription(TOTAL_COUNT, {
        variables: {
            _id: user._id,
        },
    });

    const response = data?.Notification?.get;
    const isAuth =
        profileLoading || (!profileLoading && profileData?.Users?.profile);

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

    const handleResetCount = () => {
        dispatch(resetTotalCount());
    };

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

    useEffect(() => {
        if (totalCountData?.totalCount?.count) {
            dispatch(setTotalCount(totalCountData?.totalCount?.count));
        }
    }, [totalCountData?.totalCount?.count, dispatch]);

    useEffect(() => {
        dispatch(userUpdate(profileData?.Users?.profile));
    }, [dispatch, profileData]);

    useEffect(() => {
        if (chatCountData?.Dialogue?.getCount) {
            dispatch(setTotalCount(chatCountData?.Dialogue?.getCount));
        }
    }, [dispatch, chatCountData]);

    useEffect(() => {
        user?.email &&
            !user?.email?.verified &&
            history.push('/auth/require_verify');

        if (window.location.pathname?.includes('/connect')) {
            setTabValue(0);
        }

        if (
            window.location.pathname?.includes(
                '/knowledge_center/cryptocurrencies'
            )
        ) {
            setTabValue(1);
        }

        if (
            window.location.pathname?.includes('/knowledge_center/cryptogazing')
        ) {
            setTabValue(2);
        }

        if (window.location.pathname?.includes('/events')) {
            setTabValue(3);
        }

        if (window.location.pathname?.includes('/chat')) {
            setTabValue(4);
        }

        if (window.location.pathname?.includes('/forum')) {
            setTabValue(5);
        }

        if (window.location.pathname?.includes('/investors')) {
            setTabValue(6);
        }
    }, [history, user?.email, user?.email?.verified]);

    useEffect(() => {
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

        if (_count > 0 || unreadCount > 0) {
            logo.href = `${window.location.origin}/logo_badge.svg`;
        } else {
            logo.href = `${window.location.origin}/logo.svg`;
        }

        if (!isAuth) {
            dispatch(signout());
            dispatch(clearAllChatData());
        }
    }, [
        _count,
        unreadCount,
        dispatch,
        eventsData?.Events?.get,
        isAuth,
        response,
        subscriptionData,
        user._id,
        userPosts,
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
                unreadCount={unreadCount}
                notificationCount={_count}
                menuId={menuId}
                handleMenuOpen={handleMenuOpen}
                notificationId={notificationId}
                handleNotificationsOpen={handleNotificationsOpen}
                handleTotalCountReset={handleResetCount}
                profile={user}
            />
            <TabsBar
                value={tabValue}
                handleChange={handleChange}
                tabOptionsId={tabOptionsId}
                setTabOptions={setTabOptions}
                handleTabOptionsOpen={handleTabOptionsOpen}
                handleTabOptionsClose={handleTabOptionsClose}
            />
            {/* <TabsBar2
                value={tabValue}
                handleChange={handleChange}
                tabOptionsId={tabOptionsId}
                setTabOptions={setTabOptions}
                handleTabOptionsOpen={handleTabOptionsOpen}
                handleTabOptionsClose={handleTabOptionsClose}
            /> */}

            {smDown &&
                (location.pathname.includes('/connect') ||
                    (location.pathname.includes('/posts') &&
                        !location.pathname.includes('/post/'))) && (
                    <ConnectBar />
                )}

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
                notifications={response}
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
