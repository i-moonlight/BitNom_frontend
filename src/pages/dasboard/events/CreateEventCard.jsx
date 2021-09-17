import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { EventRounded } from '@material-ui/icons';
import Button from '../../../components/Button';

function CreateEventCard({ setOpen }) {
  return (
    <div
      style={{
        position: 'sticky',
        top: 176,
      }}
    >
      <Card style={{ marginBottom: 16 }} variant={'outlined'}>
        <CardContent
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
        >
          <EventRounded
            style={{
              marginRight: 16,
              width: 30,
              height: 30,
            }}
          />
          <div>
            <Typography variant='body2' className='mb-3'>
              Host an event on BitNorm and invite your network
            </Typography>
            <Button onClick={() => setOpen(true)}>create Event</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateEventCard;
