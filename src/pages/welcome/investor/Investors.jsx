import { Box, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import Wrapper from '../Wrapper';
import EcosystemTab from './tabs/EcosystemTab';
import InvestorTab from './tabs/InvestorTab';
import RoadmapTab from './tabs/RoadmapTab';

export default function Investor() {
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
        {/* <section
          className='my-5 text-center'
          style={{
            backgroundColor: '#006097',
            backgroundImage: `url('${bottomBg}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            borderRadius: 20,
            // height: 200,
          }}
        >
          <div className='p-4 px-5'>
            <DarkTheme>
              <Typography color='textPrimary' gutterBottom className='fw-bold'>
                WHO WILL BITNORM ULTIMATELY SERVE?
              </Typography>
              <Typography color='textPrimary' gutterBottom className='my-4'>
                Underlying all activities on the BitNorm application are 3 key
                ideologies: learn, share, and profit. Our goal, therefore, is to
                unite learners, professionals, and businesses all under one roof
                with each one of the benefits from the other.
              </Typography>
              <Button
                size='large'
                className='px-5'
                variant='outlined'
                style={{
                  color: '#fff',
                  borderColor: '#fff',
                }}
              >
                Get Started
              </Button>
            </DarkTheme>
          </div>
        </section> */}
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
