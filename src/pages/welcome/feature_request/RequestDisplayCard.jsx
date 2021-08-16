import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from '@material-ui/core';
import { ThumbDownRounded, ThumbUpRounded } from '@material-ui/icons';
import React from 'react';

export default function RequestDisplayCard() {
  const theme = useTheme();

  return (
    <Card
      style={{
        backgroundColor: theme.palette.background.default,
        marginTop: 16,
      }}
      elevation={4}
    >
      <CardContent>
        <Grid container>
          <Grid item sm={1} className='mr-3'>
            <ThumbUpRounded />
            <Typography>5</Typography>
            <ThumbDownRounded />
          </Grid>
          <Grid sm={11}>
            <div className='space-between center-horizontal'>
              <div className='center-horizontal'>
                <Avatar style={{ width: 30, height: 30 }}>L</Avatar>
                <Typography variant='body2' className='mx-2'>
                  Mark Aloo
                </Typography>
                <Typography variant='body2' className='mx-2'>
                  .
                </Typography>
                <Typography variant='body2' className='mx-2'>
                  Posted on 27 May 2021
                </Typography>
              </div>
              <Typography variant='body2'>PLANNED</Typography>
            </div>
            <div className='my-2'>
              <Typography>Dark Mode Option</Typography>
              <Typography variant='body2'>
                It would be fantastic to have a Dark Mode Toggle setting that
                can alter how the page is seen by visitors /members. The white
                can be bright and jarring to sensitive eyes!
              </Typography>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
