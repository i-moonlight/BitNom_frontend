import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from '@material-ui/core';
import { LinkOutlined } from '@material-ui/icons';
import React from 'react';

export default function LinkCard({ link }) {
  const { image, title, description, url, hostname } = link;

  return (
    <Card
      // className={classes.root}
      variant='outlined'
    >
      <CardActionArea onClick={() => window.open(url, '_blank')}>
        <CardMedia style={{ height: 140 }} image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant='h6'>
            {title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {description}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <LinkOutlined className='mx-2' />
          {hostname}
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
