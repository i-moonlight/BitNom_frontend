import { Container, Grid, Hidden, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import TextField from '../../../components/TextField';
import Wrapper from '../Wrapper';
import RequestDisplayCard from './RequestDisplayCard';
import RequestFormCard from './RequestFormCard';

export default function FeatureRequest() {
  const theme = useTheme();
  return (
    <Wrapper>
      <Grid>
        <Container container component={Grid} maxWidth='lg'>
          <div className='py-4 mb-4'>
            <Typography variant='h4' color='textPrimary'>
              Feature request
            </Typography>
            <Typography variant='h6' color='textPrimary'>
              BitNorm sounds great, but I have a suggestion!
            </Typography>
          </div>
        </Container>
      </Grid>

      <Grid
        style={{
          backgroundColor: theme.palette.background.paper,
          paddingBottom: 32,
        }}
      >
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            <Hidden smDown>
              <Grid item md={4} lg={3}>
                <RequestFormCard />
              </Grid>
            </Hidden>

            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={6}
              style={{
                borderRadius: 30,
                paddingTop: 16,
              }}
            >
              <div className='space-between center-horizontal'>
                <Typography variant='h6' color='textSecondary'>
                  Showing Trending Feature requests
                </Typography>
                <TextField placeholder='Search' />
              </div>
              <RequestDisplayCard />
              <RequestDisplayCard />
              <RequestDisplayCard />
              <RequestDisplayCard />
              <RequestDisplayCard />
            </Grid>
            <Hidden mdDown>
              <Grid item lg={3}></Grid>
            </Hidden>
          </Grid>
        </Container>
      </Grid>
    </Wrapper>
  );
}
