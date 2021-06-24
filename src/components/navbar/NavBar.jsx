import { AppBar, Divider, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import MenuPopover from './MenuPopover';
import NotificationOptionPopover from './NotificationOptionPopover';
import NotificationsPopover from './NotificationsPopover';
import ProfileBar from './ProfileBar';
import StatusBar from './StatusBar';
import TabOptionsPopover from './TabOptionsPopover';
import TopTabs from './TopTabs';

const menuId = 'menu-profile';
const tabOptionsId = 'menu-tab-options';
const notificationId = 'menu-notifications';
const notificationOptionId = 'menu-notification-option';

export default function NavBar() {
  const [value, setValue] = useState(0);
  const [tabOptions, setTabOptions] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [tabOptionAnchorEl, setTabOptionAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notificationOptionAnchorEl, setNotificationOptionAnchorEl] =
    useState(null);

  const theme = useTheme();

  const isMenuOpen = Boolean(menuAnchorEl);
  const isTabOptionOpen = Boolean(tabOptionAnchorEl);
  const isNotificationOpen = Boolean(notificationAnchorEl);
  const isNotificationOptionOpen = Boolean(notificationOptionAnchorEl);

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        menuId={menuId}
        handleMenuOpen={handleMenuOpen}
        notificationId={notificationId}
        handleNotificationsOpen={handleNotificationsOpen}
      />
      <TopTabs
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
