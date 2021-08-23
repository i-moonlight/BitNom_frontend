import { Card, CardContent, Chip, Typography } from '@material-ui/core';
import { SearchRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import Button from '../../../../components/Button';
import Form from '../../../../components/Form';
import TextField from '../../../../components/TextField';
import { useStyles } from '../utilities/profile.styles';

export default function AditionalInfoForm({ onClose, formType }) {
  const [gender, setGender] = useState('Unset');
  const classes = useStyles();

  return (
    <div className='mt-2'>
      <Form>
        <Card className={classes.formCard}>
          <CardContent>
            <Typography>Add {formType}</Typography>
            {formType == 'gender' ? (
              <div className='mt-2'>
                {['Male', 'Female', 'Unset'].map(val => (
                  <Chip
                    variant={val == gender ? 'default' : 'outlined'}
                    color='primary'
                    key={val}
                    label={val}
                    className='me-2 mb-2'
                    onClick={() => setGender(val)}
                  />
                ))}
              </div>
            ) : (
              <>
                <TextField
                  required
                  fullWidth
                  name='name'
                  labelTop='Name'
                  placeholder='Type to search'
                  adornmentType='start'
                  adornment={<SearchRounded className='p-' />}
                />
                {formType !== 'language' && (
                  <TextField
                    required
                    fullWidth
                    name='year'
                    labelTop='Year'
                    placeholder=' Enter the year'
                  />
                )}
              </>
            )}
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
