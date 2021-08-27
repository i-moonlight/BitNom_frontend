import { Tab, Tabs, withStyles } from '@material-ui/core';
import React from 'react';
import { investorTabs } from '../../utilities/data.components';

export default function InvestorTabs({
  value,
  handleChange,
  tabOptionsId,
  setTabOptions,
  handleTabOptionsOpen,
}) {
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor='primary'
      variant='scrollable'
      scrollButtons='auto'
      centered
    >
      {investorTabs.map(({ label, menuItems }) => {
        const tabOptionsId2 = tabOptionsId + Math.random() * 1000;
        return (
          <BitTab
            key={`${tabOptionsId2}-${Math.random}`}
            label={label}
            aria-controls={tabOptionsId2}
            aria-haspopup='true'
            onClick={event => {
              menuItems && setTabOptions(menuItems);
              menuItems && handleTabOptionsOpen(event);
            }}
          />
        );
      })}
    </Tabs>
  );
}

const BitTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: theme.palette.type == 'dark' ? '#fff' : '#000',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(15),
    marginRight: 0,
    // '&:focus': {
    //   opacity: 1,
    //   color: theme.palette.type == 'dark' ? '#fff' : '#000',
    // },
    // '&:hover': {
    //   backgroundColor:
    //     theme.palette.type == 'dark'
    //       ? theme.palette.background.paper
    //       : theme.palette.background.search,
    // },
  },
}))(props => <Tab disableRipple {...props} />);
