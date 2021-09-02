import { Box, Container, MenuItem, Typography } from '@material-ui/core';
import { ChevronLeftRounded, ChevronRightRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import { tabs } from '../../utilities/data.components';
import { useStyles } from '../../utilities/styles.components';

export default function TabsBar2() {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredTab, setHoveredTab] = useState(-1);
  const [activeTabWidth, setActiveTabWidth] = useState(147);
  const classes = useStyles();

  return (
    <div className={classes.tabBar}>
      <Box className={classes.root}>
        <Container maxWidth='lg'>
          <div className='d-flex center-horizontal'>
            <div className='mx-1'>
              <ChevronLeftRounded />
            </div>
            <div
              className='scroll-hidden'
              style={{
                display: 'flex',
                alignItems: 'center',
                overflowX: 'auto',
              }}
            >
              {tabs.map(({ label, menuItems }, index) => (
                <div
                  key={label}
                  className={
                    index === activeTab
                      ? classes.topTabsActive
                      : classes.topTabs
                  }
                  onClick={e => {
                    setActiveTab(index);
                    console.log(e.target.offsetWidth);
                  }}
                  onMouseEnter={e => {
                    setActiveTabWidth(e.target.offsetWidth);
                    setHoveredTab(index);
                  }}
                  onMouseLeave={() => {
                    setHoveredTab(-1);
                  }}
                >
                  <Typography
                    noWrap
                    style={{
                      paddingTop: 12,
                      paddingBottom: 12,
                      paddingRight: 30,
                      paddingLeft: 30,
                    }}
                  >
                    {label}
                  </Typography>
                  <div
                    style={{
                      position: 'absolute',
                      backgroundColor: '#222',
                    }}
                  >
                    {index === hoveredTab &&
                      menuItems &&
                      menuItems.map(({ label: option }) => (
                        <MenuItem
                          key={`${Math.random() * 1000}`}
                          className='py-3 space-between'
                          style={{
                            width: activeTabWidth,
                          }}
                          // onClick={handleTabOptionsClose}
                        >
                          {option}
                        </MenuItem>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            <div className='mx-1'>
              <ChevronRightRounded />
            </div>
          </div>
        </Container>
      </Box>
    </div>
  );
}
