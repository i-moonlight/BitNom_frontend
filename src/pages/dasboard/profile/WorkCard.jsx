import { Card, CardContent, Typography } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import Button from '../../../components/Button';
import WorkForm from './forms/WorkForm';
import WorkFragment from './fragments/WorkFragment';

export default function WorkCard() {
  const [showForm, setShowForm] = useState(false);

  const onClose = () => {
    setShowForm(false);
  };

  return (
    <Card className='mb-3'>
      <CardContent>
        <div className='space-between center-horizontal'>
          <Typography>Work Experience</Typography>
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              textCase
              variant='text'
              startIcon={<AddRounded />}
            >
              Add Work Experience
            </Button>
          )}
        </div>
        <div>
          {showForm && <WorkForm onClose={onClose} />}
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
