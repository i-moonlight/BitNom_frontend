import { Container, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Wrapper from '../Wrapper';
import FaqSection from './FaqSection';

export default function Faqs() {
  return (
    <Wrapper>
      <Grid>
        <Container container component={Grid} maxWidth='lg'>
          <Grid item lg={2}></Grid>
          <Grid
            item
            lg={8}
            style={{
              borderRadius: 30,
            }}
          >
            <div className='py-4 mb-4'>
              <Typography variant='h4' color='textPrimary'>
                Frequently asked questions
              </Typography>
              <Typography variant='h6' color='textPrimary'>
                BitNorm sounds great, but I have questions!
              </Typography>
            </div>
            <FaqSection />
            <FaqSection />
            <FaqSection />
          </Grid>
          <Grid item lg={2}></Grid>
        </Container>
      </Grid>
    </Wrapper>
  );
}
