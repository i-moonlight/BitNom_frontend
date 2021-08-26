import { useMutation } from '@apollo/client';
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from '@material-ui/core';
import { SearchRounded } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import Button from '../../../../components/Button';
import Form from '../../../../components/Form';
import TextField from '../../../../components/TextField';
import { workInitialValues } from '../utilities/profile.initialValues';
import {
  MUTATION_ADD_WORK,
  MUTATION_REMOVE_WORK,
  MUTATION_UPDATE_WORK,
  QUERY_FETCH_PROFILE,
} from '../utilities/profile.queries';
import { useStyles } from '../utilities/profile.styles';
import { workValidation } from '../utilities/profile.validationSchemas';

export default function WorkForm({ onClose, updateData }) {
  const [current, setCurrent] = useState(updateData?.current);
  const [localError, setLocalError] = useState(false);
  const classes = useStyles();

  const [
    addWork,
    {
      // addError,
      // data,
      addLoading,
    },
  ] = useMutation(MUTATION_ADD_WORK, {
    context: { clientName: 'users' },
  });

  const [
    updateWork,
    {
      // updateError,
      //  data,
      updateLoading,
    },
  ] = useMutation(MUTATION_UPDATE_WORK, {
    context: { clientName: 'users' },
  });

  const [
    removeWork,
    {
      // updateError,
      //  data,
      removeLoading,
    },
  ] = useMutation(MUTATION_REMOVE_WORK, {
    context: { clientName: 'users' },
  });

  return (
    <div className='mt-2'>
      <Form
        initialValues={updateData || workInitialValues}
        validationSchema={workValidation}
        onSubmit={(
          { company, title, start_date, end_date, description },
          { resetForm }
        ) => {
          setLocalError(null);

          if (!current && end_date == '') {
            setLocalError("End Date required if you don't currently work here");
            return;
          }

          const Iwork = current
            ? {
                company,
                title,
                start_date,
                current,
                description,
              }
            : {
                company,
                title,
                start_date,
                end_date,
                description,
              };

          console.log(Iwork);

          updateData ? console.log('upd') : console.log('add');

          updateData
            ? updateWork({
                variables: {
                  id: updateData?.id,
                  data: Iwork,
                },
                refetchQueries: [
                  {
                    query: QUERY_FETCH_PROFILE,
                    context: { clientName: 'users' },
                  },
                ],
              }).then(() => {
                resetForm();
                onClose();
              })
            : addWork({
                variables: {
                  data: Iwork,
                },
                refetchQueries: [
                  {
                    query: QUERY_FETCH_PROFILE,
                    context: { clientName: 'users' },
                  },
                ],
              }).then(() => {
                resetForm();
                onClose();
              });
        }}
      >
        <Card className={classes.formCard}>
          <CardContent>
            <TextField
              required
              fullWidth
              name='company'
              labelTop='Company'
              placeholder={updateData?.company || 'Type to search'}
              adornmentType='start'
              adornment={<SearchRounded className='p-' />}
            />
            <TextField
              required
              fullWidth
              name='title'
              labelTop='Title'
              placeholder={updateData?.title || 'Title eg Graphic Designer'}
            />
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <TextField
                  required
                  type='date'
                  name='start_date'
                  placeholder='2020-01-28'
                  labelTop='Start Date'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled={current}
                  type='date'
                  name='end_date'
                  labelTop='End Date'
                />
              </Grid>
            </Grid>
            <FormControlLabel
              control={
                <Checkbox
                  color='primary'
                  checked={current}
                  onChange={() => {
                    setCurrent(!current);
                  }}
                  name='checkedA'
                />
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
              placeholder={
                updateData?.description || 'Describe your work experience'
              }
              rows={4}
            />
            {localError && <Alert severity='error'>{localError}</Alert>}
            <div className='d-flex justify-content-end mt-2'>
              <Button
                onClick={onClose}
                color='inherit'
                size='small'
                variant='text'
              >
                Cancel
              </Button>
              {updateData && (
                <Button
                  disabled={removeLoading}
                  size='small'
                  className='ms-2'
                  onClick={() => {
                    removeWork({
                      variables: {
                        id: updateData?.id,
                      },
                      refetchQueries: [
                        {
                          query: QUERY_FETCH_PROFILE,
                          context: { clientName: 'users' },
                        },
                      ],
                    }).then(() => {
                      // resetForm();
                      onClose();
                    });
                  }}
                >
                  Delete
                </Button>
              )}
              <Button
                disabled={addLoading || updateLoading}
                size='small'
                className='ms-2'
                submit
              >
                {updateData ? 'Update' : 'Save'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Form>
    </div>
  );
}
