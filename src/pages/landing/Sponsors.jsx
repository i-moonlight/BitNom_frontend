import { Container, Grid } from '@material-ui/core';
import React from 'react';
import sponsor1Img from '../../assets/landing/sponsor (1).png';
import sponsor2Img from '../../assets/landing/sponsor (2).png';
import sponsor3Img from '../../assets/landing/sponsor (3).png';
import sponsor4Img from '../../assets/landing/sponsor (4).png';
import sponsor5Img from '../../assets/landing/sponsor (5).png';
import sponsor6Img from '../../assets/landing/sponsor (6).png';

export default function Sponsors() {
  return (
    <Grid style={{ backgroundColor: '#242526' }}>
      <Container container component={Grid} maxWidth='lg'>
        <Grid item lg={12}>
          <div className='center-horizontal space-around my-4'>
            <img src={sponsor1Img} alt='' />
            <img src={sponsor2Img} alt='' />
            <img src={sponsor3Img} alt='' />
            <img src={sponsor4Img} alt='' />
            <img src={sponsor5Img} alt='' />
            <img src={sponsor6Img} alt='' />
          </div>
        </Grid>
      </Container>
    </Grid>
  );
}
