import { Box } from '@material-ui/core';
import { Container, Tab, Tabs, withStyles } from '@material-ui/core';
import React from 'react';
import { tabs } from '../../../store/local/dummy';
import { useStyles } from '../../styles.components';

export default function TabsBar({
  value,
  handleChange,
  tabOptionsId,
  setTabOptions,
  handleTabOptionsOpen,
}) {
  const classes = useStyles();

  return (
    <div className={classes.tabBar}>
      <Box className={classes.root}>
        <Container maxWidth='lg'>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            // variant='scrollable'
            scrollButtons='auto'
          >
            {tabs.map(({ label, menuItems }) => (
              <BitTab
                key={`${tabOptionsId}`}
                label={label}
                aria-controls={tabOptionsId}
                aria-haspopup='true'
                onClick={event => {
                  menuItems && setTabOptions(menuItems);
                  menuItems && handleTabOptionsOpen(event);
                }}
              />
            ))}
          </Tabs>
        </Container>
      </Box>
    </div>
  );
}

const BitTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(15),
    marginRight: 0,
    '&:focus': {
      opacity: 1,
      color: '#fff',
    },
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}))(props => <Tab disableRipple {...props} />);
