import { Card, CardContent, Typography } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import React from 'react';
import Button from '../../../components/Button';
import EducationFragment from './fragments/EducationFragment';

export default function EducationCard() {
  return (
    <Card className='mb-3'>
      <CardContent>
        <div className='space-between center-horizontal'>
          <Typography>Education</Typography>
          <Button textCase variant='text' startIcon={<AddRounded />}>
            Add Education
          </Button>
        </div>
        <div>
          {[0, 1, 2].map(work => (
            <EducationFragment
              key={work}
              school='Dedan Kimathi University of Technology'
              course='BSC Computer Science'
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
