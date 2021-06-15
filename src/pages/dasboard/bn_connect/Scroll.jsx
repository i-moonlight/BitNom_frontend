import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  CommentRounded,
  MoreVert,
  ShareRounded,
  ThumbUpRounded,
} from '@material-ui/icons';
import React, { useState } from 'react';
import Button from '../../../components/Button';
import ScrollOptionsPopover from './ScrollOptionsPopover';

const scrollOptionId = 'menu-scroll-option';

export default function Scroll() {
  const [scrollOptionAnchorEl, setScrollOptionAnchorEl] = useState(null);
  const isScrollOptionOpen = Boolean(scrollOptionAnchorEl);

  const handleScrollOptionOpen = event => {
    setScrollOptionAnchorEl(event.currentTarget);
  };

  const handleScrollOptionClose = event => {
    setScrollOptionAnchorEl(null);
  };

  return (
    <>
      <Card style={{ marginBottom: 16 }}>
        <CardHeader
          avatar={<Avatar aria-label='recipe'>R</Avatar>}
          action={
            <IconButton
              aria-label='show more'
              aria-controls={scrollOptionId}
              aria-haspopup='true'
              onClick={handleScrollOptionOpen}
              color='inherit'
            >
              <MoreVert />
            </IconButton>
          }
          title={
            <div className='center-horizontal'>
              <Typography style={{ marginRight: 8 }}>Brian Sadroe </Typography>
              <Typography variant='body2' color='textSecondary'>
                @briansadroe
              </Typography>
            </div>
          }
          subheader='11h ago'
        />

        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>

        <CardContent>
          <Grid container spacing={2}>
            {[1, 2].map(item => (
              <Grid key={item} item xs={6}>
                <div
                  style={{
                    height: 200,
                    borderRadius: 8,
                    width: '100%',
                    backgroundImage: `url('https://picsum.photos/200/300')`,
                    backgroundSize: 'cover',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions className='space-around'>
          <Button
            color='textPrimary'
            textCase
            variant='text'
            startIcon={<ThumbUpRounded />}
          >
            Like
          </Button>
          <Button
            color='textPrimary'
            textCase
            variant='text'
            startIcon={<CommentRounded />}
          >
            Comment
          </Button>
          <Button
            color='textPrimary'
            textCase
            variant='text'
            startIcon={<ShareRounded />}
          >
            Share
          </Button>
        </CardActions>
      </Card>
      <ScrollOptionsPopover
        scrollOptionId={scrollOptionId}
        scrollOptionAnchorEl={scrollOptionAnchorEl}
        isScrollOptionOpen={isScrollOptionOpen}
        handleScrollOptionClose={handleScrollOptionClose}
      />
    </>
  );
}
