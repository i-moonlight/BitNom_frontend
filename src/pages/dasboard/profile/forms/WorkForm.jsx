import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from '@material-ui/core';
import { SearchRounded } from '@material-ui/icons';
import React from 'react';
import Button from '../../../../components/Button';
import Form from '../../../../components/Form';
import TextField from '../../../../components/TextField';
import { useStyles } from '../utilities/profile.styles';

export default function WorkForm({ onClose }) {
  const classes = useStyles();

  return (
    <div className='mt-2'>
      <Form>
        <Card className={classes.formCard}>
          <CardContent>
            <TextField
              required
              fullWidth
              name='company'
              labelTop='Company'
              placeholder='Type to search'
              adornmentType='start'
              adornment={<SearchRounded className='p-' />}
            />
            <TextField
              required
              fullWidth
              name='title'
              labelTop='Title'
              placeholder='Title eg Graphic Designer'
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  type='date'
                  name='start_date'
                  labelTop='Start Date'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  type='date'
                  name='end_date'
                  labelTop='End Date'
                />
              </Grid>
            </Grid>
            <FormControlLabel
              control={
                <Checkbox checked={false} onChange={null} name='checkedA' />
              }
              label={
                <Typography variant='body2'>I Currently work here</Typography>
              }
            />
            <TextField
              required
              fullWidth
              multiline
              name='description'
              labelTop='Description'
              placeholder='Describe your work experience'
              rows={4}
            />
            <div className='d-flex justify-content-end'>
              <Button
                onClick={onClose}
                color='inherit'
                size='small'
                variant='text'
              >
                Cancel
              </Button>
              <Button size='small' className='ms-2'>
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </Form>
    </div>
  );
}
