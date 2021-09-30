import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  List,
} from '@material-ui/core';
import { EventRounded, KeyboardArrowRight } from '@material-ui/icons';
import { useLocation } from 'react-router-dom';
import Button from '../../../components/Button';

function CreateEventCard({ setOpen, setSelectedIndex, selectedIndex }) {
  const location = useLocation();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <div
      style={{
        position: 'sticky',
        top: 176,
      }}
    >
      <Card style={{ marginBottom: 16 }} variant={'outlined'}>
        <CardContent
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
        >
          <EventRounded
            style={{
              marginRight: 16,
              width: 30,
              height: 30,
            }}
          />
          <div>
            <Typography variant='body2' className='mb-3'>
              Host an event on BitNorm and invite your network
            </Typography>
            <Button onClick={() => setOpen(true)}>create Event</Button>
          </div>
        </CardContent>
        <List
          style={{
            display: location.pathname.includes('events/') && 'none',
          }}
          component='nav'
          aria-label='secondary mailbox folder'
        >
          <ListItem
            button
            disablePadding
            disableRipple
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemText primary='Upcoming events' />
            <ListItemSecondaryAction>
              <KeyboardArrowRight />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem
            button
            disablePadding
            disableRipple
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemText primary='Past events' />
            <ListItemSecondaryAction>
              <KeyboardArrowRight />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem
            button
            disablePadding
            disableRipple
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemText primary='Saved events' />
            <ListItemSecondaryAction>
              <KeyboardArrowRight />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Card>
    </div>
  );
}

export default CreateEventCard;
