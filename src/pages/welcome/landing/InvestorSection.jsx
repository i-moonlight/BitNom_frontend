import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import React from 'react';
import investorGraphicImg from '../../../assets/landing/articles.png';
import investorImg from '../../../assets/landing/investor.svg';
import { INVESTOR_CARD_DISPLACEMENT, useStyles } from './Landing';

export default function InvestorSection() {
  const classes = useStyles();
  return (
    <Grid
      style={{
        backgroundColor: '#18191a',
        marginBottom: -(INVESTOR_CARD_DISPLACEMENT + 150),
      }}
    >
      <Container maxWidth='lg'>
        <Card
          style={{
            position: 'relative',
            bottom: INVESTOR_CARD_DISPLACEMENT,
            borderWidth: 2,
          }}
          variant='outlined'
        >
          <CardContent>
            <Grid spacing={5} container>
              <Grid item lg={5}>
                <img
                  style={{
                    width: '100%',
                    marginRight: -200,
                    zIndex: 1,
                  }}
                  src={investorGraphicImg}
                  alt=''
                />
              </Grid>
              <Grid item lg={7}>
                <img
                  style={{ width: '70%', zIndex: 2 }}
                  src={investorImg}
                  alt=''
                />
              </Grid>
              <Grid item lg={12}>
                <Typography
                  className={classes.sectionText}
                  variant='h6'
                  color='textPrimary'
                >
                  Our Investor Page{' '}
                </Typography>
                <Grid container>
                  <Grid item lg={8}>
                    <Typography
                      className={classes.sectionText}
                      color='textPrimary'
                    >
                      The investors utilize diverse accounts on diverse project
                      environments to be well informed of unique and potential
                      projects All through news, blogs, and other important
                      information pols to help navigate their decision. The
                      Ultimate Crypto-Intelligence Suite Your gateway to the
                      cryptocurrency ecosystem.
                    </Typography>
                  </Grid>
                </Grid>
                <Typography className={classes.sectionText} color='textPrimary'>
                  <a href=''>Visit investor page &gt;</a>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Grid>
  );
}
