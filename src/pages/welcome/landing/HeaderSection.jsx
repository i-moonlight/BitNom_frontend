import {
  Container,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from '@material-ui/core';
import { ArrowForwardRounded, PlayArrowRounded } from '@material-ui/icons';
import React from 'react';
import headerBgImg from '../../../assets/landing/img12.png';
import Button from '../../../components/Button';
import DarkTheme from '../../../utilities/DarkTheme';

export default function HeaderSection() {
  const theme = useTheme();

  return (
    <Grid
      style={{
        backgroundColor: theme.palette.background.landing,
      }}
    >
      <Container container component={Grid} maxWidth='lg'>
        <Grid
          style={{
            backgroundImage: `url('${headerBgImg}')`,
            backgroundSize: 'cover',
            borderRadius: 30,
            padding: '5%',
          }}
          item
          lg={12}
          className='mt-5 mb-5'
        >
          <DarkTheme>
            <Typography variant='h3' color='textPrimary' className='mb-2 mt-4'>
              The Ultimate Crypto-Intelligence Suite
            </Typography>
            <Typography variant='h6' color='textPrimary' className='my-2'>
              BitNorm is an ever-expanding ecosystem of interconnected apps and
              services, built for a decentralized future.
            </Typography>
            <div className='center-horizontal mt-2 mb-5'>
              <Button
                color={theme.palette.text.primary}
                size='large'
                textCase
                className='mx-2'
                endIcon={<ArrowForwardRounded />}
              >
                Explore BN
              </Button>
              <IconButton size='small' className='m-1 p-1'>
                <PlayArrowRounded />
              </IconButton>
            </div>
            <Typography variant='body2' color='textPrimary' className='mt-5'>
              BN crypto token is NOW available.{' '}
              <a href='' className='alt'>
                Click here to buy
              </a>
            </Typography>
          </DarkTheme>
        </Grid>
      </Container>
    </Grid>
  );
}
