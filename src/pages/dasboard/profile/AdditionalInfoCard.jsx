import {
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import React from 'react';

export default function AdditionalInfoCard() {
  return (
    <Card className='mb-3'>
      <CardContent>
        <div className='space-between center-horizontal'>
          <Typography>Additional Information (Optional)</Typography>
          <IconButton size='small' className='m-1 p-1'>
            <AddRounded />
          </IconButton>
        </div>
        <Divider />
      </CardContent>
    </Card>
  );
}
