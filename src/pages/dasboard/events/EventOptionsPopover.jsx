import {
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
} from '@material-ui/core';
import React from 'react';
//import { useMutation } from '@apollo/client';

/* import {
  MARK_NOTIFICATION_AS_READ,
  GET_USER_NOTIFICATIONS,
} from '../utilities/queries'; */
//import { useSelector } from 'react-redux';
import { Notifications, FlagOutlined, CheckBox } from '@material-ui/icons';
export default function EventOptionsPopover({
  eventOptionsAnchorEl,
  eventOptionsId,
  isEventOptionsOpen,
  handleEventOptionsClose,
  //setFlaggedResource,
  //setOpenFlag,
  setOpenInvite,
  profile,
  event,
}) {
  //const state = useSelector((st) => st);
  //const user = state.auth.user;

  /*  const handleReportEvent = () => {
    const resource = Object.assign({ resourceType: 'event' }, event);
    setFlaggedResource(resource);
    handleEventOptionsClose();
    setOpenFlag(true);
  }; */

  return (
    <Popover
      anchorEl={eventOptionsAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={eventOptionsId}
      keepMounted
      open={isEventOptionsOpen}
      onClose={handleEventOptionsClose}
      style={{ marginLeft: 16, width: '100%' }}
    >
      <List
        style={{ padding: 0, paddingBottom: 0 }}
        component={Card}
        variant='outlined'
      >
        <ListItem button divider>
          <ListItemIcon>
            <Notifications />
          </ListItemIcon>
          <ListItemText
            primary='Turn on Notifications'
            secondary='Get all notifications on this event'
          />
        </ListItem>
        <ListItem
          onClick={() => {
            setOpenInvite(true);
            handleEventOptionsClose();
          }}
          button
          style={{
            display:
              (event?.host?._id !== profile?._id ||
                new Date(event?.endDate).getTime() < new Date().getTime()) &&
              'none',
          }}
          divider
        >
          <ListItemIcon>
            <CheckBox />
          </ListItemIcon>
          <ListItemText
            primary='Invite Friends'
            secondary='Invite friends to your event'
          />
        </ListItem>
        <ListItem button divider>
          <ListItemIcon>
            <FlagOutlined />
          </ListItemIcon>
          <ListItemText
            primary='Report Event'
            secondary='I am concerned about this event'
          />
        </ListItem>
      </List>
    </Popover>
  );
}
