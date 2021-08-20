import { Card, CardContent, Typography } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import Button from '../../../components/Button';
import HonorForm from './forms/HonorForm';
import HonorFragment from './fragments/HonorFragment';

export default function HonorsCard() {
  const [showForm, setShowForm] = useState(false);

  const onClose = () => {
    setShowForm(false);
  };

  return (
    <Card className='mb-3'>
      <CardContent>
        <div className='space-between center-horizontal'>
          <Typography>Honors and Awards</Typography>
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              textCase
              variant='text'
              startIcon={<AddRounded />}
            >
              Add Honors and Awards
            </Button>
          )}
        </div>
        <div>
          {showForm && <HonorForm onClose={onClose} />}
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
