import {
  Avatar,
  Badge,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  fade,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Popover,
  Typography,
  useTheme,
} from '@material-ui/core';
import {
  AddRounded,
  BookmarkBorderRounded,
  BookmarkRounded,
  CollectionsBookmarkRounded,
  CommentRounded,
  EventRounded,
  FileCopyOutlined,
  FlagOutlined,
  MessageOutlined,
  MoreVert,
  Notifications,
  PersonAddDisabledOutlined,
  PersonRounded,
  Settings,
  ShareRounded,
  ThumbUpRounded,
} from '@material-ui/icons';
import React, { useState } from 'react';
import Button from '../components/Button';
import Screen from '../components/Screen';

import image from '../assets/image.svg';
import video from '../assets/video.svg';
import schedule from '../assets/schedule.svg';
import write from '../assets/write.svg';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

const scrollOptionId = 'menu-scroll-option';

export default function BnConnect() {
  const classes = useStyles();
  const [scrollOptionAnchorEl, setScrollOptionAnchorEl] = useState(null);

  const isScrollOptionOpen = Boolean(scrollOptionAnchorEl);

  const handleScrollOptionOpen = event => {
    setScrollOptionAnchorEl(event.currentTarget);
  };

  const handleScrollOptionClose = event => {
    setScrollOptionAnchorEl(null);
  };

  const renderScrollOption = (
    <Popover
      anchorEl={scrollOptionAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={scrollOptionId}
      // keepMounted
      open={isScrollOptionOpen}
      onClose={handleScrollOptionClose}
      style={{ marginLeft: 16, width: '100%' }}
    >
      <List
        style={{ padding: 0, paddingBottom: 0 }}
        component={Card}
        variant='outlined'
      >
        <ListItem button divider>
          <ListItemIcon>
            <BookmarkBorderRounded />
          </ListItemIcon>
          <ListItemText
            primary='Save the scroll'
            secondary='Add this to you saved items'
          />
        </ListItem>
        <ListItem button divider>
          <ListItemIcon>
            <FlagOutlined />
          </ListItemIcon>
          <ListItemText
            primary='Report this scroll'
            secondary='Im concerned about this scroll'
          />
        </ListItem>
        <ListItem button divider>
          <ListItemIcon>
            <FileCopyOutlined />
          </ListItemIcon>
          <ListItemText primary='Copy this scroll' />
        </ListItem>
        <ListItem button divider>
          <ListItemIcon>
            <PersonAddDisabledOutlined />
          </ListItemIcon>
          <ListItemText primary='Unfollow @briansadroe' />
        </ListItem>
        <Divider />
        <div className='m-2'>
          <Button fullWidth textCase>
            Support by tipping
          </Button>
        </div>
      </List>
    </Popover>
  );

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
              <StartScroll />
              <Scroll handleScrollOptionOpen={handleScrollOptionOpen} />
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
                <SuggestedPeople />
              </Hidden>
            </Grid>
          </Grid>
        </Container>
      </div>
      {renderScrollOption}
    </Screen>
  );
}

function StartScroll() {
  const theme = useTheme();

  return (
    <Card style={{ marginBottom: 16 }}>
      <CardContent>
        <CardActionArea>
          <Card
            elevation={0}
            style={{
              padding: 12,
              borderRadius: 8,
              backgroundColor: fade(theme.palette.common.white, 0.15),
            }}
          >
            <Typography color='textSecondary'>Start a scroll</Typography>
          </Card>
        </CardActionArea>
        <div className='space-between mt-4 mx-2'>
          <Button textCase variant='text' color='textPrimary'>
            <div className='center-horizontal'>
              <img style={{ marginRight: 10 }} src={image} alt='img' />
              <Hidden xsDown>
                <Typography>Image</Typography>
              </Hidden>
            </div>
          </Button>
          <Button textCase variant='text' color='textPrimary'>
            <div className='center-horizontal'>
              <img style={{ marginRight: 10 }} src={video} alt='img' />
              <Hidden xsDown>
                <Typography>Video</Typography>
              </Hidden>
            </div>
          </Button>
          <Button textCase variant='text' color='textPrimary'>
            <div className='center-horizontal'>
              <img style={{ marginRight: 10 }} src={schedule} alt='img' />
              <Hidden xsDown>
                <Typography>Schedule</Typography>
              </Hidden>
            </div>
          </Button>
          <Button textCase variant='text' color='textPrimary'>
            <div className='center-horizontal'>
              <img style={{ marginRight: 10 }} src={write} alt='img' />
              <Hidden xsDown>
                <Typography>Write Article</Typography>
              </Hidden>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Scroll({ handleScrollOptionOpen }) {
  return (
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
  );
}

function TrendingPost() {
  return (
    <Paper
      style={{
        marginBottom: 16,
      }}
    >
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

function SuggestedPeople() {
  return (
    <Paper>
      <List
        style={{ padding: 8, paddingBottom: 0 }}
        component={Card}
        variant='outlined'
      >
        <Typography style={{ marginLeft: 8 }} variant='body1'>
          People you may know
        </Typography>
        {[1, 2, 3].map(item => (
          <ListItem key={item} divider>
            <ListItemAvatar>
              <Avatar>
                <PersonRounded />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Andy bo Wu' secondary='@andybowu' />
            <ListItemIcon>
              {/* <SendRounded /> */}
              <Button size='small' variant='outlined' textCase>
                Follow
              </Button>
            </ListItemIcon>
          </ListItem>
        ))}
        <Divider />
        <Typography className='my-2' color='primary'>
          Show more
        </Typography>
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
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            perferendis ratione.
          </Typography>
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
          <Typography>
            Events
            <Badge badgeContent='3' color='secondary'>
              <span className='mx-2 '></span>
            </Badge>
          </Typography>
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
