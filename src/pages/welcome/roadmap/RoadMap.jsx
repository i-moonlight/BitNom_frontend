import {
  Breadcrumbs,
  Container,
  createStyles,
  Grid,
  Link,
  makeStyles,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Wrapper from '../Wrapper';
import QuaterCard from './QuaterCard';

export default function RoadMap() {
  // const theme = useTheme();
  const classes = useStyles();

  const setYear = year => {
    console.log(year);
  };

  return (
    <Wrapper>
      <Container maxWidth='lg'>
        <div className='py-4 mb-4'>
          <Typography variant='h4' color='textPrimary'>
            BitNorm Roadmap
          </Typography>
          <Typography variant='h6' color='textPrimary'>
            The highway to building a legacy that will foster innovation.
          </Typography>
        </div>
      </Container>
      <div className={classes.body}>
        <Container maxWidth='lg'>
          <div className='pt-4'>
            <Breadcrumbs
              style={
                {
                  // backgroundColor: '#fed132',
                }
              }
              aria-label='breadcrumb'
            >
              <Link color='inherit' onClick={() => setYear('2019')}>
                2019
              </Link>
              <Link color='inherit' onClick={() => setYear('2020')}>
                2020
              </Link>
              <Link color='inherit' onClick={() => setYear('2021')}>
                2021
              </Link>
            </Breadcrumbs>
          </div>
        </Container>
        <Container maxWidth='lg'>
          <Grid className='py-4' container spacing={2}>
            <QuaterCard />
            <QuaterCard />
            <QuaterCard />
            <QuaterCard />
          </Grid>
        </Container>
      </div>
    </Wrapper>
  );
}

const useStyles = makeStyles(theme => ({
  body: {
    backgroundColor: theme.palette.background.paper,
  },
}));
