import { Container, Grid } from '@material-ui/core';
import React from 'react';
import BitnormPaper from '../BitnormPaper';
import Wrapper from '../Wrapper';

export default function Cookie() {
  return (
    <Wrapper>
      <Grid>
        <Container container component={Grid} maxWidth='lg'>
          <BitnormPaper title='BitNorm Cookie Policy' />
        </Container>
      </Grid>
    </Wrapper>
  );
}
