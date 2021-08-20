import { Card, CardContent, Typography } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import Button from '../../../components/Button';
import EducationForm from './forms/EducationForm';
import EducationFragment from './fragments/EducationFragment';

export default function EducationCard() {
  const [showForm, setShowForm] = useState(false);

  const onClose = () => {
    setShowForm(false);
  };

  return (
    <Card className='mb-3'>
      <CardContent>
        <div className='space-between center-horizontal'>
          <Typography>Education</Typography>
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              textCase
              variant='text'
              startIcon={<AddRounded />}
            >
              Add Education
            </Button>
          )}
        </div>
        <div>
          {showForm && <EducationForm onClose={onClose} />}
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
