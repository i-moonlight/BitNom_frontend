import { Card, CardContent, Typography } from '@material-ui/core';
import { EditRounded } from '@material-ui/icons';
import React from 'react';
import Button from '../../../components/Button';

export default function AboutCard() {
  return (
    <Card className='mb-3'>
      <CardContent>
        <div className='space-between center-horizontal'>
          <Typography>About</Typography>
          <Button textCase variant='text' startIcon={<EditRounded />}>
            Edit
          </Button>
        </div>
        <Typography variant='body2' className='mt-2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          exercitationem possimus ea vero architecto ipsa non expedita ut in
          inventore.
        </Typography>
      </CardContent>
    </Card>
  );
}
