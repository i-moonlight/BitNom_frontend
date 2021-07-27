import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core';
import { ShareRounded } from '@material-ui/icons';
import React from 'react';
import Button from '../../../components/Button';

export default function ServiceCard() {
  return (
    <div>
      <Card variant={'outlined'}>
        <CardMedia
          style={{ height: 100 }}
          image={'https://picsum.photos/300/200'}
          // title='Contemplative Reptile'
        />
        <CardContent
          style={{
            position: 'relative',
            top: -80,
            marginBottom: -80,
          }}
        >
          <div className='space-between'>
            <div>
              <Avatar
                variant='rounded'
                style={{
                  backgroundColor: '#fed132',
                  marginRight: 12,
                  width: 80,
                  height: 80,
                }}
              >
                L
              </Avatar>
              <Typography className='pt-1' variant='body1'>
                Service 101
              </Typography>
              <Typography gutterBottom color='textSecondary' variant='body2'>
                Company X
              </Typography>
            </div>

            <div
              style={{
                position: 'relative',
                top: 70,
              }}
            >
              <Typography>20 Subscribers</Typography>
            </div>
          </div>

          <Divider style={{ marginTop: 8, marginBottom: 8 }} />

          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            perferendis ratione.
          </Typography>

          <CardHeader
            style={{
              padding: 0,
              marginTop: 16,
            }}
            avatar={<Avatar aria-label='recipe'>BS</Avatar>}
            title='Brian Sadroe . Founder'
            subheader='@briansadroe'
          />
        </CardContent>
        <CardActions className='py-0'>
          <Button fullWidth textCase>
            Subscribe
          </Button>
          <IconButton>
            <ShareRounded />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
