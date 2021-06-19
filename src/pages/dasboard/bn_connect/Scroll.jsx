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
  PlayCircleFilled,
  ShareRounded,
  ThumbUpRounded,
} from '@material-ui/icons';
import React, { useState } from 'react';
import Button from '../../../components/Button';
import LinkCard from './LinkCard';
import ScrollOptionsPopover from './ScrollOptionsPopover';

const scrollOptionId = 'menu-scroll-option';

export default function Scroll({
  name,
  username,
  text,
  link,
  images = [],
  videos = [],
  hashtags = [],
}) {
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
              <Typography style={{ marginRight: 8 }}>{name}</Typography>
              <Typography variant='body2' color='textSecondary'>
                {username}
              </Typography>
            </div>
          }
          subheader='11h ago'
        />

        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {text}
            <br />
            <Typography color='primary'>
              {hashtags.map(hash => hash + ' ')}
            </Typography>
            <br />
            <Grid container spacing={2} className='mb-2'>
              {videos &&
                videos.map(item => (
                  <Grid key={item} item xs={videos.length > 1 ? 6 : 12}>
                    <div
                      className='center-horizontal mx-auto'
                      style={{
                        height: 200,
                        borderRadius: 8,
                        width: '100%',
                        backgroundImage: `url('https://picsum.photos/200/300')`,
                        backgroundSize: 'cover',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        backgroundBlendMode: 'soft-light',
                      }}
                    >
                      <PlayCircleFilled
                        style={{
                          margin: 'auto',
                          width: 50,
                          height: 50,
                        }}
                      />
                    </div>
                  </Grid>
                ))}
              {images &&
                images.map(item => (
                  <Grid key={item} item xs={images.length > 1 ? 6 : 12}>
                    <div
                      style={{
                        height: 200,
                        borderRadius: 8,
                        width: '100%',
                        backgroundImage: `url('https://picsum.photos/200/300')`,
                        backgroundSize: 'cover',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        backgroundBlendMode: 'soft-light',
                      }}
                    />
                  </Grid>
                ))}
            </Grid>
            <br />
            {link && (
              <>
                <LinkCard link={link} />
                <br />
              </>
            )}
            12.1K Likes . 120 Comments
          </Typography>
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
