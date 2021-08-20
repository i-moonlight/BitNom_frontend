import { Card, CardContent, Typography } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import React from 'react';
import Button from '../../../components/Button';
import HonorFragment from './fragments/HonorFragment';

export default function HonorsCard() {
  return (
    <Card className='mb-3'>
      <CardContent>
        <div className='space-between center-horizontal'>
          <Typography>Honors and Awards</Typography>
          <Button textCase variant='text' startIcon={<AddRounded />}>
            Add Honors and Awards
          </Button>
        </div>
        <div>
          {[0, 1, 2].map(work => (
            <HonorFragment
              key={work}
              honor='Accessibility: How to design for all'
              institution='Interaction Design Foundation (IDF)'
              dateFrom='Dec 2019'
              dateTo='Present'
              photoURL='https://picsum.photos/200'
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
