import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Snackbar,
  SnackbarContent,
  Typography,
  useTheme,
} from '@material-ui/core';
import { ArrowRightAltRounded } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';

//
import headerBgImg from '../../assets/landing/img12.png';
import joinImg from '../../assets/landing/img2.png';
import servicesImg from '../../assets/landing/img3.png';
import media1Img from '../../assets/landing/img8.png';
import sponsorImg from '../../assets/landing/sponsor.svg';
import investorImg from '../../assets/landing/investor.svg';
import visionImg from '../../assets/landing/vision.svg';
import googlePlayImg from '../../assets/google_play.svg';
import logoImg from '../../assets/logo.svg';
import card1Img from '../../assets/landing/token.png';
import TextField from '../../components/TextField';

export default function Landing() {
  const history = useHistory();
  const state = useSelector(state => state);
  const user = state.auth.user;
  const theme = useTheme();

  useEffect(() => {
    if (JSON.stringify(user) !== '{}') {
      if (!user?.email?.verified) {
        history.push('/auth/require_verify');
      } else {
        user?.email?.verified && !user?.displayName
          ? history.push('/auth/update_info_register')
          : history.push('/dashboard');
      }
    }
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Grid
        style={{
          backgroundColor: '#18191a',
          backgroundImage: `url('${headerBgImg}')`,
          backgroundSize: 'cover',
        }}
      >
        <Container container component={Grid} maxWidth='lg'>
          <Grid item lg={12} className='my-5'>
            <Typography variant='h3' color='textPrimary' className='mb-2 mt-5'>
              The Ultimate Crypto-Intelligence Suite
            </Typography>
            <Typography variant='h6' color='textPrimary' className='my-2'>
              BitNorm is an ever-expanding ecosystem of interconnected apps and
              services, built for a decentralized future.
            </Typography>
            <Button
              color={theme.palette.text.primary}
              size='medium'
              textCase
              className='mt-2 mb-5'
              endIcon={<ArrowRightAltRounded />}
            >
              Explore BN
            </Button>
            <Typography
              variant='body2'
              color='textPrimary'
              className='mt-2 mb-5'
            >
              BN crypto token is NOW available.{' '}
              <a href='' className='alt'>
                Click here to buy
              </a>
            </Typography>
          </Grid>
        </Container>
      </Grid>

      <Grid style={{ backgroundColor: '#242526' }}>
        <Container container component={Grid} maxWidth='lg'>
          <Grid item lg={12}>
            <div className='center-horizontal space-around my-3'>
              <img style={{ width: '100%' }} src={sponsorImg} alt='' />
              <img style={{ width: '100%' }} src={sponsorImg} alt='' />
              <img style={{ width: '100%' }} src={sponsorImg} alt='' />
              <img style={{ width: '100%' }} src={sponsorImg} alt='' />
              <img style={{ width: '100%' }} src={sponsorImg} alt='' />
            </div>
          </Grid>
        </Container>
      </Grid>

      <Grid style={{ backgroundColor: '#18191a' }}>
        <Container container component={Grid} maxWidth='lg' className='my-5'>
          <Grid item lg={6}>
            <Typography variant='h5' color='textPrimary'>
              Our Project &amp; Ecosystem
            </Typography>
            <Typography variant='body2' color='textPrimary'>
              BitNorm combines the four elements necessary to empower users
              venturing into cryptocurrencies and budding cryptocurrency-related
              projects and businesses: Blockchain technology, BNConnect,
              BNMarket, and BitNorm›s knowledge center.
            </Typography>
            <Typography variant='body2' color='textPrimary'>
              It is our goal to deliver on this promise. We aim to construct
              seamless integrations between these elements that will allow you,
              our user, to unceremoniously wear the hats of a learner, seller,
              investor, and master as you use our platform.
            </Typography>
          </Grid>
          <Grid item lg={6}>
            <Grid container>
              <Grid item lg={3}>
                <img style={{ width: '100%' }} src={card1Img} alt='' />
              </Grid>
              <Grid item lg={3}>
                <img style={{ width: '100%' }} src={card1Img} alt='' />
              </Grid>
              <Grid item lg={3}>
                <img style={{ width: '100%' }} src={card1Img} alt='' />
              </Grid>
              <Grid item lg={3}></Grid>
            </Grid>
          </Grid>
          <Grid item lg={6}>
            <img style={{ width: '100%' }} src={joinImg} alt='' />
            <Button textCase>Join BN Community</Button>
          </Grid>
          <Grid item lg={6}>
            <Typography color='textPrimary'>
              Share your vision instantly
            </Typography>
            <img style={{ width: '100%' }} src={visionImg} alt='' />
            <Typography color='textPrimary'>
              BN Social is a BitNorm›s social media tool that allows users from
              all over the world to connect and share ideas about
              cryptocurrencies. BNConnect allows users to build and manage
              profiles with an emphasis on their activity and interests in
              cryptocurrencies.
            </Typography>
            <Typography color='textPrimary'>
              <a href=''>Read more about this feature</a>
            </Typography>
          </Grid>
        </Container>
      </Grid>

      <Grid style={{ backgroundColor: '#242526' }}>
        <Container container component={Grid} maxWidth='lg'>
          <Grid item lg={7}>
            <Typography color='textPrimary'>card</Typography>
          </Grid>
          <Grid item lg={5}>
            <Typography color='textPrimary'>
              Integrate battle-hardened and time-tested solutions.
            </Typography>
          </Grid>
          <Grid item lg={4}>
            <Typography color='textPrimary'>
              Integrate battle-hardened and time-tested solutions.
            </Typography>
          </Grid>
          <Grid item lg={4}>
            <Typography color='textPrimary'>Widgets and bots </Typography>
            <Typography color='textPrimary'>
              Learn how to create, backtest and start your own crypto trading
              bots
            </Typography>
          </Grid>
          <Grid item lg={4}>
            <Typography color='textPrimary'>Job Board </Typography>
            <Typography color='textPrimary'>
              Stay updated and get the latest job listing.
            </Typography>
          </Grid>
        </Container>
      </Grid>

      <Grid style={{ backgroundColor: '#18191a' }}>
        <Container container component={Grid} maxWidth='lg'>
          <Grid item lg={6}>
            <Typography color='textPrimary'>
              Our World Is Changing. Together, We Can Change It For The Better.
            </Typography>
          </Grid>
          <Grid item lg={6}>
            <Grid container>
              <Grid item lg={3}>
                <img style={{ width: '100%' }} src={card1Img} alt='' />
              </Grid>
              <Grid item lg={3}>
                <img style={{ width: '100%' }} src={card1Img} alt='' />
              </Grid>
              <Grid item lg={3}>
                <img style={{ width: '100%' }} src={card1Img} alt='' />
              </Grid>
              <Grid item lg={3}></Grid>
              <Typography color='textPrimary'>
                We aim to empower the beginner transition from novice to master
                in the simplest of ways and the master to expand his knowledge,
                specialty, and career. We empower both learners and businesses.
                We believe in community and humanity.
              </Typography>
              <Typography color='textPrimary'>
                We believe that the action of making the lives of those around
                us better has the consequence of making our lives better whether
                directly or indirectly.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>

      <Grid style={{ backgroundColor: '#242526' }}>
        <Container container component={Grid} maxWidth='lg'>
          <Grid item lg={12}>
            <Typography color='textPrimary'>BitNorm Platform Layers</Typography>
            <Typography color='textPrimary'>
              By leveraging BitNorm, you will have clickaway access to guides,
              tools, goods, and services all of which feed into your
              understanding of the cryptocurrencies ecosystem and friends,
              mentors, and consultants to hold your hand when you need it. What
              more could you ask for?
            </Typography>
          </Grid>
          {[1, 2, 3].map(card => (
            <Grid key={`${card}`} item lg={3}>
              <Card>
                <CardMedia style={{ height: 140 }} image={media1Img} />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='h2'>
                    BN Social Center
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                  >
                    BN connect is a platform that allows our users from all over
                    the world to connect and share ideas about cryptocurrencies.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item lg={3}></Grid>
        </Container>
      </Grid>

      <Container style={{ backgroundColor: '#18191a' }} maxWidth='lg'>
        <Grid container component={Card}>
          <Grid item lg={5}>
            <Typography color='textPrimary'>graphic</Typography>
          </Grid>
          <Grid item lg={7}>
            <img style={{ width: '100%' }} src={investorImg} alt='' />
          </Grid>
          <Grid item lg={12}>
            <Typography color='textPrimary'>Our Investor Page </Typography>
            <Typography color='textPrimary'>
              The investors utilize diverse accounts on diverse project
              environments to be well informed of unique and potential projects
              All through news, blogs, and other important information pols to
              help navigate their decision. The Ultimate Crypto-Intelligence
              Suite Your gateway to the cryptocurrency ecosystem.{' '}
            </Typography>
            <Typography color='textPrimary'>
              <a href=''>Visit investor page</a>{' '}
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Grid style={{ backgroundColor: '#242526' }}>
        <Container container component={Grid} maxWidth='lg'>
          <Grid item lg={6}>
            <Typography color='textPrimary'>
              The fastest and easiest wayto bring your product to life
            </Typography>
            <Typography color='textPrimary'>
              Ultimately the key to value is need and use. If nobody needs or
              uses your product you have no business, to ensure you make
              profitable investments, Bitnorm aggregates and associates services
              and cryptocurrencies to provide you with a strong indicator of
              their usage and hence their true value. product to life
            </Typography>
            <Typography color='textPrimary'>
              <a href=''>Visit BN Services</a>
            </Typography>
          </Grid>
          <Grid item lg={6}>
            <img style={{ width: '100%' }} src={servicesImg} alt='' />
          </Grid>
        </Container>
      </Grid>

      <Grid style={{ backgroundColor: '#18191a' }}>
        <Container container component={Grid} maxWidth='lg'>
          <Grid item lg={6} className='my-2'>
            <Typography color='textPrimary'>
              Get BitNorm Updates to your Inbox
            </Typography>
          </Grid>
          <Grid item lg={6} className='my-2'>
            <div className='center-horizontal'>
              <TextField className='flex-2' placeholder='Enter Your Email' />
              <Button className='w-100' textCase>
                Join Mailing List
              </Button>
            </div>
          </Grid>
          {[1, 2, 3, 4].map(footer => (
            <Grid key={footer} item lg={3}>
              <Typography variant='body2' color='textPrimary'>
                COMPANY
              </Typography>
              <Typography color='textPrimary'>Home</Typography>
              <Typography color='textPrimary'>About Us</Typography>
              <Typography color='textPrimary'>Whitepaper</Typography>
              <Typography color='textPrimary'>Brand Guidelines</Typography>
              <Typography color='textPrimary'>RoadMap</Typography>
              <Typography color='textPrimary'>Blogs</Typography>
            </Grid>
          ))}

          <Grid item lg={12} className='my-3'>
            <Divider />
          </Grid>
          <Grid item lg={6} className='my-2'>
            <img style={{ width: 50 }} src={logoImg} alt='' />
          </Grid>
          <Grid item lg={6} className='my-2'>
            <img style={{ height: 50 }} src={googlePlayImg} alt='' />
          </Grid>
        </Container>
      </Grid>

      <Grid style={{ backgroundColor: '#141617' }}>
        <Container container component={Grid} maxWidth='lg' className='py-3'>
          <Grid item lg={6}>
            <Typography variant='body2' color='textPrimary'>
              Copyright &copy; {new Date().getFullYear()} {window.location.host}{' '}
              All rights reserved
            </Typography>
          </Grid>
          <Grid item lg={6}>
            <Typography variant='body2' color='textPrimary'>
              <a href=''>Terms And Conditions </a>
              <a href=''> Privacy Policy </a>
              <a href=''> Cookie Policy </a>
              <a href=''> Disclaimer</a>
            </Typography>
          </Grid>
        </Container>
      </Grid>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={false}
        autoHideDuration={6000}
        // onClose={handleClose}
      >
        <SnackbarContent
          action={
            <React.Fragment>
              <Button color={theme.palette.text.primary} size='small' textCase>
                I Agree
              </Button>
            </React.Fragment>
          }
          style={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
          message='BitNorm uses cookies on this site to enhance your user experience, understand site usage, and assist in our marketing efforts.'
        />
      </Snackbar>
    </div>
  );
}
