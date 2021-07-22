import { useQuery } from '@apollo/client';
import {
  Container,
  Grid,
  Hidden,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Screen from '../../../components/Screen';
import { scrollVariations } from '../../../store/local/dummy';
import CreateScroll from './CreateScroll';
import CreatePost from './create_scroll/CreatePost';
import Scroll from './Scroll';
import SuggestedPeople from './SuggestedPeople';
import TrendingPosts from './TrendingPosts';
import UserCard from './UserCard';
import { QUERY_LOAD_SCROLLS } from '../utilities/queries';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export default function BnConnect() {
  const [createScrollOpen, setCreateScrollOpen] = useState(false);
  const [latestScrolls, setlatestScrolls] = useState([]);
  const classes = useStyles();

  const { error, loading, data } = useQuery(QUERY_LOAD_SCROLLS);

  useEffect(() => {
    console.log(error);
    console.log(loading);
    if (data?.Posts?.get) setlatestScrolls(data.Posts.get);
  }, [data]);

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
              <CreateScroll setOpen={(open) => setCreateScrollOpen(open)} />
              {loading && (
                <CircularProgress color='primary' size={60} thickness={7} />
              )}
              {latestScrolls.length &&
                latestScrolls.map((scroll) => (
                  <Scroll key={scroll?._id} scroll={scroll} />
                ))}
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
      <CreatePost
        open={createScrollOpen}
        setOpen={(open) => setCreateScrollOpen(open)}
      />
    </Screen>
  );
}
