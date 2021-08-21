import { Card, CardContent, Typography } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';
import WorkForm from './forms/WorkForm';
import WorkFragment from './fragments/WorkFragment';

export default function WorkCard() {
  const [showForm, setShowForm] = useState(false);
  const state = useSelector(st => st);
  const work = state.auth.user?.work;

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
          {work?.map(
            ({
              _id,
              company,
              title,
              start_date,
              end_date,
              current,
              description,
            }) => (
              <WorkFragment
                key={_id}
                title={title}
                company={company}
                dateFrom={start_date}
                dateTo={end_date}
                description={description}
                photoURL='https://picsum.photos/200'
                current={current}
              />
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
