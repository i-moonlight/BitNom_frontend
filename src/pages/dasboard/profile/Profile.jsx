import {
  //CircularProgress,
  Container,
  Grid,
  Hidden,
  makeStyles,
} from '@material-ui/core';
import React from 'react';
import Screen from '../../../components/Screen';
import InsightCard from './InsightCard';
import ProfileCard from './ProfileCard';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export default function Profile() {
  const classes = useStyles();
  // const { error, loading, data } = useQuery(QUERY_LOAD_SCROLLS);

  return (
    <Screen>
      <div className={classes.root}>
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            <Hidden mdDown>
              <Grid item lg={3}></Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8} lg={6}>
              <ProfileCard />
              <InsightCard />
            </Grid>
            <Grid item md={4} lg={3}></Grid>
          </Grid>
        </Container>
      </div>
    </Screen>
  );
}
