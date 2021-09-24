import { Box, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import Wrapper from '../Wrapper';
import EcosystemTab from './tabs/EcosystemTab';
import InvestorTab from './tabs/InvestorTab';
import RoadmapTab from './tabs/RoadmapTab';

export default function Investors() {
  const [tabValue, setTabValue] = useState(0);
  // const classes = useStyles();

  const onTabValue = val => {
    setTabValue(val);
  };

  return (
    <Wrapper investor onTabValue={onTabValue}>
      <Paper>
        <TabPanel value={tabValue} index={0}>
          <InvestorTab />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <EcosystemTab />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <RoadmapTab />
        </TabPanel>
      </Paper>
    </Wrapper>
  );
}

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//   },
//   container: {
//     backgroundColor: theme.palette.background.default,
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     fontWeight: 'bold',
//     display: 'flex',
//     alignItems: 'center',
//   },
//   accordionCard: {
//     backgroundColor: theme.palette.background.default,
//   },
//   accordion: {
//     backgroundColor: alpha(theme.palette.primary.main, 0.075),
//   },
// }));
