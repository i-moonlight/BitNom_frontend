import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  AddRounded,
  Book,
  BookmarkRounded,
  EventRounded,
  Favorite,
  MessageOutlined,
  MoreVert,
  Notifications,
  Settings,
  Share,
} from '@material-ui/icons';
import React from 'react';
import Screen from '../components/Screen';

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
        <Container>
          <Grid container spacing={2}>
            <Hidden mdDown>
              <Grid item lg={3}>
                <UserCard />
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8} lg={6}>
              <Scroll />
              <Scroll />
              <Scroll />
              <Scroll />
              <Scroll />
              <Scroll />
              <Scroll />
            </Grid>
            <Grid item md={4} lg={3}>
              <Hidden smDown>
                <TrendingPost />
              </Hidden>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Screen>
  );
}

function Scroll() {
  return (
    <Card
      //  className={classes.root}
      style={{ marginBottom: 16 }}
    >
      <CardHeader
        avatar={<Avatar aria-label='recipe'>R</Avatar>}
        action={
          <IconButton aria-label='settings'>
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
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
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

        {/* <CardMedia
          style={{ height: 160, borderRadius: 16 }}
          image={"https://picsum.photos/200/300"}
          title="Paella dish"
        /> */}
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <Favorite />
        </IconButton>
        <IconButton aria-label='share'>
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
}

function TrendingPost() {
  return (
    <Paper>
      <List style={{ padding: 8 }} component={Card} variant='outlined'>
        <Typography style={{ marginLeft: 8 }} variant='body1'>
          Trending Post
        </Typography>
        {[1, 2, 3, 4, 5].map(item => (
          <ListItem key={item} divider>
            <ListItemAvatar>
              <Avatar variant='square'>
                <MessageOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary='What is crypto currency?'
              secondary='12.1K Likes . 120 Comments'
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

function UserCard() {
  return (
    <div
      style={{
        position: 'sticky',
        top: 176,
      }}
    >
      <Card style={{ marginBottom: 16 }} variant={'outlined'}>
        <CardMedia
          style={{ height: 140 }}
          image={'https://picsum.photos/300/200'}
          title='Contemplative Reptile'
        />
        <CardContent
          style={{
            position: 'relative',
            top: -100,
            marginBottom: -100,
          }}
        >
          <div className='space-between'>
            <div>
              <Avatar
                variant='rounded'
                style={{
                  // position:"relative",
                  backgroundColor: '#fed132',
                  marginRight: 12,
                  width: 100,
                  height: 100,
                }}
              >
                L
              </Avatar>
              <Typography variant='body1'>Mahmud Zayn</Typography>
              <Typography gutterBottom color='textSecondary' variant='body2'>
                @mahmudzayn
              </Typography>
            </div>
            <div>
              <IconButton>
                <Notifications />
              </IconButton>
              <IconButton>
                <Settings />
              </IconButton>
            </div>
          </div>

          <Divider style={{ marginTop: 8, marginBottom: 8 }} />

          <div className='center-horizontal space-between'>
            {[1, 2, 3].map(item => (
              <div key={item}>
                <Typography variant='h6'>Scrolls</Typography>
                <div className='center-horizontal'>
                  <Book fontSize='small' />
                  <Typography variant='h5'>0</Typography>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <Divider />
        <CardActions>
          <IconButton>
            <BookmarkRounded />
          </IconButton>
          <Typography>Saved Items</Typography>
        </CardActions>
        <Divider />
        <CardActions>
          <IconButton>
            <EventRounded />
          </IconButton>
          <Typography>Event</Typography>
          <IconButton color='primary' style={{ marginLeft: 'auto' }}>
            <AddRounded />
          </IconButton>
        </CardActions>
      </Card>
      <Button color='primary' fullWidth variant='contained'>
        Start Scroll
      </Button>
    </div>
  );
}
