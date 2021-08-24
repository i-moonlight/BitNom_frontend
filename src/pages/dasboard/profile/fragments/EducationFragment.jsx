import { Avatar, Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import Button from '../../../../components/Button';
import { useStyles } from '../utilities/profile.styles';

export default function EducationFragment({
  school,
  course,
  dateFrom,
  dateTo,
  photoURL,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.profileFragment}>
      <CardContent>
        <div className='d-flex flex-row'>
          <Avatar src={photoURL} variant='rounded'>
            J
          </Avatar>
          <div className='mx-3 w-100'>
            <div className='center-horizontal space-between '>
              <Typography variant='body2' className='flex-1'>
                {school}
              </Typography>
              <Button textCase variant='text' size='small'>
                Edit
              </Button>
            </div>
            <Typography variant='body2'>{course}</Typography>
            <Typography variant='body2'>
              {dateFrom} to {dateTo}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
