import {
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Hidden,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { EventRounded, RoomRounded } from '@material-ui/icons';
import React from 'react';
import Button from '../components/Button';
import Screen from '../components/Screen';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export default function Events() {
  const classes = useStyles();

  return (
    <Screen>
      <div className={classes.root}>
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            <Hidden mdDown>
              <Grid item lg={3}>
                <CreateEventCard />
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8} lg={6}>
              <EventListCard />
            </Grid>
            <Grid item md={4} lg={3}>
              {/* <Hidden smDown></Hidden> */}
            </Grid>
          </Grid>
        </Container>
      </div>
    </Screen>
  );
}

function CreateEventCard() {
  return (
    <div
      style={{
        position: 'sticky',
        top: 176,
      }}
    >
      <Card style={{ marginBottom: 16 }} variant={'outlined'}>
        <CardContent
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
        >
          <EventRounded
            style={{
              marginRight: 16,
              width: 30,
              height: 30,
            }}
          />
          <div>
            <Typography variant='body1' className='mb-3'>
              Host an event on BitNorm and invite your network
            </Typography>
            <Button>create Event</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EventListCard() {
  return (
    <Card>
      <Typography className='mx-4 my-1' variant='h6'>
        Your Events
      </Typography>
      <Divider />
      <CardContent>
        {[1, 2, 3].map(event => (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginBottom: 8,
                marginTop: 8,
              }}
            >
              <div
                style={{
                  backgroundImage: `url('${'https://picsum.photos/200/300'}')`,
                  backgroundSize: 'cover',
                  width: 150,
                  height: 100,
                  borderRadius: 8,
                  marginRight: 10,
                }}
              ></div>
              <div>
                <Typography color='textSecondary' variant='body2'>
                  MONDAY, 17 JULY 2021 AT 08:00 UTC+02
                </Typography>
                <Typography>Savvy UX Summit 2021 (Virtual)</Typography>
                <div className='center-horizontal'>
                  <RoomRounded color='primary' />
                  <Typography color='primary'>
                    Capeesh - E14 9HN Manchester
                  </Typography>
                </div>
                <Typography>2,435 Going</Typography>
              </div>
            </div>
            <Divider />
          </>
        ))}
      </CardContent>
    </Card>
  );
}
