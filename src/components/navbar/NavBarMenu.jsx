import {
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';

export default function NavBarMenu({ show, items = [] }) {
  const [showMenu, setShowMenu] = useState(false);

  const useStyles = makeStyles(() => ({
    root: {
      position: 'absolute',
      top: 50,
      display: showMenu || show ? 'block' : 'none',
    },
    image: {
      width: 30,
    },
  }));

  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <List className='py-0' component='nav' aria-label='main mailbox folders'>
        {items.map(item => (
          <ListItem key={item?.text} button>
            <ListItemIcon>
              <img src={item?.icon} alt='' className={classes.image} />
            </ListItemIcon>
            <ListItemText
              primary={<Typography noWrap>{item?.text}</Typography>}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
