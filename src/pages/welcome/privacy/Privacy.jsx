import { Container, Grid } from '@material-ui/core';
import React from 'react';
import BitnormPaper from '../BitnormPaper';
import Wrapper from '../Wrapper';

export default function Privacy() {
  return (
    <Wrapper>
      <Grid>
        <Container container component={Grid} maxWidth='lg'>
          <BitnormPaper title='BitNorm Privacy Policy' />
        </Container>
      </Grid>
    </Wrapper>
  );
}
