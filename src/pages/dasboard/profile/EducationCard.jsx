import { Card, CardContent, Typography } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import Button from '../../../components/Button';
import EducationForm from './forms/EducationForm';
import EducationFragment from './fragments/EducationFragment';

export default function EducationCard({ profile }) {
  const [showForm, setShowForm] = useState(false);
  const education = profile?.education;

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
          {education?.map(
            ({
              _id,
              institution,
              major,
              start_date,
              end_date,
              current,
              description,
            }) => (
              <EducationFragment
                key={_id}
                school={institution}
                course={major}
                dateFrom={start_date}
                dateTo={end_date}
                current={current}
                description={description}
                photoURL='https://picsum.photos/200'
              />
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
