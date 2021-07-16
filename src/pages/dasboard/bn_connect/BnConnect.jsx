import { Container, Grid, Hidden, makeStyles } from '@material-ui/core';
import React from 'react';
import Screen from '../../../components/Screen';
import CreateScroll from './CreateScroll';
import SuggestedPeople from './SuggestedPeople';
import Scroll from './Scroll';
import TrendingPosts from './TrendingPosts';
import UserCard from './UserCard';
import { scrollVariations } from '../../../store/local/dummy';
import CreatePost from './create_scroll/CreatePost';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export default function BnConnect() {
  const [createScrollOpen, setCreateScrollOpen] = useState(false);
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
            <Grid item xs={12} sm={12} md={8} lg={5}>
              <CreateScroll setOpen={open => setCreateScrollOpen(open)} />
              {scrollVariations.map(
                ({ name, username, hashtags, text, images, videos, link }) => (
                  <Scroll
                    key={`${Math.random() * 1000}`}
                    link={link}
                    name={name}
                    videos={videos}
                    images={images}
                    username={username}
                    hashtags={hashtags}
                    text={text}
                  />
                )
              )}
            </Grid>
            <Grid item md={4} lg={3.5}>
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
        setOpen={open => setCreateScrollOpen(open)}
      />
    </Screen>
  );
}
