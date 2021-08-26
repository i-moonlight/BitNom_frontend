import { useMutation } from '@apollo/client';
import { Card, CardContent, Chip, Typography } from '@material-ui/core';
import { SearchRounded } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import Button from '../../../../components/Button';
import Form from '../../../../components/Form';
import TextField from '../../../../components/TextField';
import { courseAndProjectInitialValues } from '../utilities/profile.initialValues';
import {
  MUTATION_ADD_COURSE,
  MUTATION_ADD_PROJECT,
  QUERY_FETCH_PROFILE,
} from '../utilities/profile.queries';
import { useStyles } from '../utilities/profile.styles';
import { courseAndProjectValidation } from '../utilities/profile.validationSchemas';

export default function AditionalInfoForm({ onClose, formType, updateData }) {
  const [gender, setGender] = useState('unset');
  const [localError, setLocalError] = useState(false);
  const classes = useStyles();

  const [
    addCourse,
    {
      // addError,
      // data,
      addCourseLoading,
    },
  ] = useMutation(MUTATION_ADD_COURSE, {
    context: { clientName: 'users' },
  });

  const [
    addProject,
    {
      // addError,
      // data,
      addProjectLoading,
    },
  ] = useMutation(MUTATION_ADD_PROJECT, {
    context: { clientName: 'users' },
  });

  return (
    <div className='mt-2'>
      <Form
        initialValues={courseAndProjectInitialValues}
        validationSchema={
          formType == ('course' || 'project') && courseAndProjectValidation
        }
        onSubmit={({ name, year }, { resetForm }) => {
          const ICourseProject = {
            name,
            year,
          };

          if (updateData) {
            //Updates

            return;
          }

          formType == 'course'
            ? addCourse({
                variables: {
                  data: ICourseProject,
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
            : addProject({
                variables: {
                  data: ICourseProject,
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
            <Typography>Add {formType}</Typography>
            <TextField
              required
              fullWidth
              name='name'
              labelTop='Name'
              placeholder='Type to search'
              adornmentType='start'
              adornment={<SearchRounded className='p-' />}
            />
            <TextField
              required
              fullWidth
              name='year'
              labelTop='Year'
              placeholder=' Enter the year'
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
              <Button
                disabled={addProjectLoading || addCourseLoading}
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
