import { AppBar, Divider, useTheme } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { useSelector } from 'react-redux';
import MenuPopover from './popovers/MenuPopover';
import NotificationOptionPopover from './popovers/NotificationOptionPopover';
import NotificationsPopover from './popovers/NotificationsPopover';
import TabOptionsPopover from './popovers/TabOptionsPopover';
import ProfileBar from './ProfileBar';
import StatusBar from '../StatusBar';
import TabsBar from './TabsBar';

import {
  QUERY_GET_USER_NOTIFICATIONS,
  MARK_NOTIFICAION_AS_SEEN,
} from '../../utilities/queries.components';
import { NOTIFICATIONS_SUBSCRIPTION } from '../../../pages/dasboard/utilities/queries';

const menuId = 'menu-profile';
const tabOptionsId = 'menu-tab-options';
const notificationId = 'menu-notifications';
const notificationOptionId = 'menu-notifications-option';

export default function NavBar() {
  const [value, setValue] = useState(0);
  const [tabOptions, setTabOptions] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [tabOptionAnchorEl, setTabOptionAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notificationOptionAnchorEl, setNotificationOptionAnchorEl] =
    useState(null);
  const [notSeen, setNotSeen] = useState(0);

  const theme = useTheme();
  const state = useSelector((state) => state);
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
      setNotSeen(subscriptionData?.liveUpdates?.count);
    };
  }, [subscriptionData]);
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleTabOptionsOpen = (event) => {
    setTabOptionAnchorEl(event.currentTarget);
  };

  const handleTabOptionsClose = () => {
    setTabOptionAnchorEl(null);
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
