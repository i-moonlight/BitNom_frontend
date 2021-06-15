import { Container, Grid, Hidden, makeStyles } from '@material-ui/core';
import React from 'react';
import Screen from '../../../components/Screen';
import CreateScroll from './CreateScroll';
import SuggestedPeople from './SuggestedPeople';
import Scroll from './Scroll';
import TrendingPosts from './TrendingPosts';
import UserCard from './UserCard';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export default function BnConnect() {
  const classes = useStyles();

  return (
    <Screen>
      <div className={classes.root}>
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            <Hidden mdDown>
              <Grid item lg={3}>
                <UserCard />
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8} lg={6}>
              <CreateScroll />
              <Scroll />
            </Grid>
            <Grid item md={4} lg={3}>
              <Hidden smDown>
                <TrendingPosts />
                <SuggestedPeople />
              </Hidden>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Screen>
  );
}
