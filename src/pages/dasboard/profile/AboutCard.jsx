import { Card, CardContent, Typography } from '@material-ui/core';
import { AddRounded, EditRounded } from '@material-ui/icons';
import React from 'react';
import Button from '../../../components/Button';

export default function AboutCard({ profile, profileView }) {
  return (
    <Card className='mb-3'>
      <CardContent>
        <div className='space-between center-horizontal'>
          <Typography>About</Typography>
          {!profileView && (
            <Button
              textCase
              variant='text'
              startIcon={profile?.bio ? <EditRounded /> : <AddRounded />}
            >
              {profile?.bio ? 'Edit Bio' : 'Add Bio'}
            </Button>
          )}
        </div>
        <Typography variant='body2' className='mt-2'>
          {profile?.bio}
        </Typography>
      </CardContent>
    </Card>
  );
}
