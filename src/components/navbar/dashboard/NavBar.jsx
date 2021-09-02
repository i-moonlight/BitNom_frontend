import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { AppBar, Divider, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NOTIFICATIONS_SUBSCRIPTION } from '../../../pages/dasboard/utilities/queries';
import { checkSessionTimeOut } from '../../../store/actions/authActions';
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
  const [value, setValue] = useState(0);
  const [notSeen, setNotSeen] = useState(0);
  const [tabOptions, setTabOptions] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [tabOptionAnchorEl, setTabOptionAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notificationOptionAnchorEl, setNotificationOptionAnchorEl] =
    useState(null);

  const theme = useTheme();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const user = state.auth.user;

  const isMenuOpen = Boolean(menuAnchorEl);
  const isTabOptionOpen = Boolean(tabOptionAnchorEl);
  const isNotificationOpen = Boolean(notificationAnchorEl);
  const isNotificationOptionOpen = Boolean(notificationOptionAnchorEl);

  const { data } = useQuery(QUERY_GET_USER_NOTIFICATIONS, {
    context: { clientName: 'notifications' },
  });

  const [markAsSeen, { data: markAsSeenData }] = useMutation(
    MARK_NOTIFICAION_AS_SEEN,
    {
      variables: { _id: user?._id },
      context: { clientName: 'notifications' },
    }
  );

  const { data: subscriptionData } = useSubscription(
    NOTIFICATIONS_SUBSCRIPTION,
    {
      variables: { _id: user?._id },
      // context: { clientName: "notifications" },
    }
  );
  console.log('Subscription Data', subscriptionData);
  useEffect(() => {
    if (subscriptionData?.liveUpdates?.id === user?._id)
      setNotSeen(subscriptionData?.liveUpdates?.count);
    return () => {
      if (subscriptionData?.liveUpdates?.id === user?._id)
        setNotSeen(subscriptionData?.liveUpdates?.count);
    };
  }, [subscriptionData]);

  const handleMenuOpen = event => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleTabOptionsOpen = event => {
    setTabOptionAnchorEl(event.currentTarget);
  };

  const handleTabOptionsClose = () => {
    setTabOptionAnchorEl(null);
  };

  const handleNotificationsOpen = event => {
    setNotificationAnchorEl(event.currentTarget);
    handleMarkAsSeen();
  };

  const handleNotificationsClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleNotificationOptionOpen = event => {
    setNotificationOptionAnchorEl(event.currentTarget);
  };

  const handleNotificationOptionClose = () => {
    setNotificationOptionAnchorEl(null);
  };

  const handleMarkAsSeen = () => {
    if (notSeen < 1) return;
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
    setNotSeen(0);
    console.log(markAsSeenData);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let response = data?.Notification?.get;

  useEffect(() => {
    dispatch(checkSessionTimeOut());
    let notSeenArray = [];
    response?.forEach((notification) => {
      notification.to_notify.forEach((item) => {
        if (item?.user_id === user._id && item?.seen === 'false') {
          notSeenArray.push(notification?._id);
        }
      });
    });
    setNotSeen(notSeenArray.length);
  }, [data?.Notification?.get]);

  return (
    <AppBar
      position='fixed'
      style={{
        background: theme.palette.background.default,
      }}
      elevation={0}
    >
      <StatusBar />
      <Divider />
      <ProfileBar
        notifications={notSeen}
        menuId={menuId}
        handleMenuOpen={handleMenuOpen}
        notificationId={notificationId}
        handleNotificationsOpen={handleNotificationsOpen}
      />
      <TabsBar
        value={value}
        handleChange={handleChange}
        tabOptionsId={tabOptionsId}
        setTabOptions={setTabOptions}
        handleTabOptionsOpen={handleTabOptionsOpen}
      />
      <Divider />
      <Divider />
      <TabOptionsPopover
        tabOptionAnchorEl={tabOptionAnchorEl}
        tabOptionsId={tabOptionsId}
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
