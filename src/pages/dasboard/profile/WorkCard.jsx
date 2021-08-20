import { Card, CardContent, Typography } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import React from 'react';
import Button from '../../../components/Button';
import WorkFragment from './fragments/WorkFragment';

export default function WorkCard() {
  return (
    <Card className='mb-3'>
      <CardContent>
        <div className='space-between center-horizontal'>
          <Typography>Work Experience</Typography>
          <Button textCase variant='text' startIcon={<AddRounded />}>
            Add Work Experience
          </Button>
        </div>
        <div>
          {[0, 1, 2].map(work => (
            <WorkFragment
              key={work}
              title='Product Designer'
              company='BitNorm'
              dateFrom='Dec 2019'
              dateTo='Present'
              description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
              labore saepe. Explicabo quidem ut voluptates voluptate cum quaerat
              molestiae voluptatem magni voluptatum, deserunt incidunt unde ad
              dicta id consequatur dignissimos!'
              photoURL='https://picsum.photos/200'
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
