import { makeStyles } from '@material-ui/core';
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import React from 'react';
import DarkTheme from '../../../utilities/DarkTheme';
import { platformLayers } from '../utilities/welcome.data';
import { INVESTOR_CARD_DISPLACEMENT } from './Landing';

export default function LayersSection() {
  const classes = useStyles();

  return (
    <DarkTheme>
      <Grid
        style={{
          backgroundColor: '#242526',
          paddingBottom: INVESTOR_CARD_DISPLACEMENT,
        }}
      >
        <Container maxWidth='lg'>
          <Grid spacing={5} container className='pt-5'>
            <Grid item lg={12}>
              <Typography variant='h6' color='textPrimary'>
                BitNorm Platform Layers
              </Typography>
            </Grid>
          </Grid>
          <Grid spacing={5} container>
            <Grid item md={8}>
              <Typography className={classes.sectionText} color='textPrimary'>
                By leveraging BitNorm, you will have click away access to
                guides, tools, goods, and services all of which feed into your
                understanding of the cryptocurrencies ecosystem and friends,
                mentors, and consultants to hold your hand when you need it.
                What more could you ask for?
              </Typography>
            </Grid>
          </Grid>
          <Grid spacing={2} container className='pb-5'>
            {platformLayers.map(card => (
              <Grid key={`${card?.text}`} item md={3} sm={6}>
                <Card className={classes.layersCard}>
                  <CardMedia
                    component='img'
                    style={{ height: 140 }}
                    image={card?.image}
                  />
                  <CardContent className={classes.layersCard}>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {card?.title}
                    </Typography>
                    <Typography
                      className={classes.sectionText}
                      variant='body2'
                      color='textSecondary'
                      component='p'
                    >
                      {card?.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Grid item lg={3}></Grid>
          </Grid>
        </Container>
      </Grid>
    </DarkTheme>
  );
}

const useStyles = makeStyles(() => ({
  layersCard: {
    backgroundColor: '#333333',
  },
}));
