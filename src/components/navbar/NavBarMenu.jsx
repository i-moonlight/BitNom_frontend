import {
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useState } from 'react';

export default function NavBarMenu({ show, items = [] }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Card
      style={{
        position: 'absolute',
        top: 50,
        display: showMenu || show ? 'block' : 'none',
      }}
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <List className='py-0' component='nav' aria-label='main mailbox folders'>
        {items.map(item => (
          <ListItem key={item?.text} button>
            <ListItemIcon>{/* <InboxIcon /> */}</ListItemIcon>
            <ListItemText
              primary={<Typography noWrap>{item.text}</Typography>}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
