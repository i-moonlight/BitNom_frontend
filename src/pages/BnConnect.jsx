import {
  Avatar,
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
  BookmarkRounded,
  CollectionsBookmarkRounded,
  EventRounded,
  Favorite,
  MessageOutlined,
  MoreVert,
  Notifications,
  PersonRounded,
  Settings,
  Share,
} from '@material-ui/icons';
import React from 'react';
import Button from '../components/Button';
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
        <Container maxWidth='lg'>
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
    <Card style={{ marginBottom: 16 }}>
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
      <List
        style={{ padding: 8, paddingBottom: 0 }}
        component={Card}
        variant='outlined'
      >
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
        bottom: 20,
      }}
    >
      <Card style={{ marginBottom: 16 }} variant={'outlined'}>
        <CardMedia
          style={{ height: 100 }}
          image={'https://picsum.photos/300/200'}
          title='Contemplative Reptile'
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
                Mahmud Zayn
              </Typography>
              <Typography gutterBottom color='textSecondary' variant='body2'>
                @mahmudzayn
              </Typography>
            </div>
            <div
              style={{
                position: 'relative',
                top: 60,
              }}
            >
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
            <div>
              <Typography variant='body1'>Scrolls</Typography>
              <div className='center-horizontal'>
                <CollectionsBookmarkRounded
                  color='primary'
                  className='mx-2'
                  fontSize='small'
                />
                <Typography variant='body1'>0</Typography>
              </div>
            </div>
            <div>
              <Typography variant='body1'>Following</Typography>
              <div className='center-horizontal'>
                <PersonRounded
                  color='primary'
                  className='mx-2'
                  fontSize='small'
                />
                <Typography variant='body1'>0</Typography>
              </div>
            </div>
            <div>
              <Typography variant='body1'>Followers</Typography>
              <div className='center-horizontal'>
                <PersonRounded
                  color='primary'
                  className='mx-2'
                  fontSize='small'
                />
                <Typography variant='body1'>0</Typography>
              </div>
            </div>
          </div>
        </CardContent>
        <Divider />
        <CardActions className='py-0'>
          <IconButton>
            <BookmarkRounded />
          </IconButton>
          <Typography>Saved Items</Typography>
        </CardActions>
        <Divider />
        <CardActions className='py-0'>
          <IconButton>
            <EventRounded />
          </IconButton>
          <Typography>Event</Typography>
          <IconButton color='primary' style={{ marginLeft: 'auto' }}>
            <AddRounded />
          </IconButton>
        </CardActions>
      </Card>
      <Button color='primary' fullWidth>
        Start Scroll
      </Button>
    </div>
  );
}
