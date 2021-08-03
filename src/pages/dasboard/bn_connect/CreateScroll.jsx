import {
  Card,
  CardActionArea,
  CardContent,
  alpha,
  Hidden,
  Typography,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import image from '../../../assets/scrolls/image.svg';
import Button from '../../../components/Button';
import schedule from '../../../assets/scrolls/schedule.svg';
import video from '../../../assets/scrolls/video.svg';
import write from '../../../assets/scrolls/write.svg';

export default function CreateScroll({ setOpen, setOpenImage, setOpenVideo }) {
  const theme = useTheme();
  return (
    <Card style={{ marginBottom: 12 }}>
      <CardContent>
        <CardActionArea
          style={{
            borderRadius: 8,
          }}
          onClick={() => setOpen(true)}
        >
          <Card
            elevation={0}
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor: alpha(theme.palette.common.white, 0.15),
            }}
          >
            <Typography variant='body2' color='textSecondary'>
              Start a scroll
            </Typography>
          </Card>
        </CardActionArea>
        <div className='space-between mt-2 mx-1'>
          <Button
            textCase
            onClick={() => {
              setOpen(true);
              setOpenImage(true);
            }}
            variant='text'
            color='primary'
          >
            <div className='center-horizontal'>
              <img
                style={{ marginRight: 10, width: 20 }}
                src={image}
                alt='img'
              />
              <Hidden xsDown>
                <Typography variant='body2'>Image</Typography>
              </Hidden>
            </div>
          </Button>
          <Button
            textCase
            onClick={() => {
              setOpen(true);
              setOpenVideo(true);
            }}
            variant='text'
            color='primary'
          >
            <div className='center-horizontal'>
              <img
                style={{ marginRight: 10, width: 20 }}
                src={video}
                alt='img'
              />
              <Hidden xsDown>
                <Typography variant='body2'>Video</Typography>
              </Hidden>
            </div>
          </Button>
          <Button textCase variant='text' color='primary'>
            <div className='center-horizontal'>
              <img
                style={{ marginRight: 10, width: 20 }}
                src={schedule}
                alt='img'
              />
              <Hidden xsDown>
                <Typography variant='body2'>Schedule</Typography>
              </Hidden>
            </div>
          </Button>
          <Button textCase variant='text' color='primary'>
            <div className='center-horizontal'>
              <img
                style={{ marginRight: 10, width: 20 }}
                src={write}
                alt='img'
              />
              <Hidden xsDown>
                <Typography variant='body2'>Article</Typography>
              </Hidden>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
