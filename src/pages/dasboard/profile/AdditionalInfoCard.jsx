import {
  Card,
  CardContent,
  Divider,
  IconButton,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import AditionalInfoForm from './forms/AditionalInfoForm';

export default function AdditionalInfoCard({ profile }) {
  const [showForm, setShowForm] = useState(false);
  const [showFormMenu, setShowFormMenu] = useState(false);
  const [formType, setFormType] = useState('course');
  const courses = profile?.courses;
  const projects = profile?.projects;
  const languages = profile?.languages;
  const gender = profile?.gender;

  const onClose = () => {
    setShowForm(false);
  };

  return (
    <Card className='mb-3'>
      <CardContent>
        <div className='space-between center-horizontal mb-2'>
          <Typography>Additional Information (Optional)</Typography>
          {!showForm && (
            <IconButton
              onClick={() => {
                setShowFormMenu(!showFormMenu);
              }}
              color='primary'
              size='small'
              className='m-1 p-1'
            >
              <AddRounded />
              <Card
                style={{
                  position: 'absolute',
                  top: 33,
                  right: 5,
                  visibility: showFormMenu ? 'visible' : 'hidden',
                }}
                variant='outlined'
              >
                <MenuItem
                  button
                  onClick={() => {
                    setFormType('course');
                    setShowForm(true);
                  }}
                >
                  Course
                </MenuItem>
                <MenuItem
                  button
                  onClick={() => {
                    setFormType('project');
                    setShowForm(true);
                  }}
                >
                  Project
                </MenuItem>
                <MenuItem
                  button
                  onClick={() => {
                    setFormType('language');
                    setShowForm(true);
                  }}
                >
                  Language
                </MenuItem>
                <MenuItem
                  button
                  onClick={() => {
                    setFormType('gender');
                    setShowForm(true);
                  }}
                >
                  Gender
                </MenuItem>
              </Card>
            </IconButton>
          )}
        </div>
        {showForm && (
          <AditionalInfoForm onClose={onClose} formType={formType} />
        )}
        {!showForm && <Divider />}
        <div className='mt-3'>
          <SectionCard title='Courses' values={courses} />
          <SectionCard title='Projects' values={projects} />
          <SectionCard title='Languages' values={languages} />
          <SectionCard noNum title='Gender' values={gender || 'Unset'} />
        </div>
      </CardContent>
    </Card>
  );
}

const SectionCard = ({ values, title, noNum }) => {
  return (
    <div className='d-flex flex-row mb-3'>
      <Typography
        style={{
          visibility: noNum && 'hidden',
        }}
        variant='body2'
        color='primary'
        className='me-2'
      >
        {values?.length}
      </Typography>
      <div>
        <Typography gutterBottom variant='body2' color='primary'>
          {title}
        </Typography>
        <Typography variant='body2'>
          {noNum
            ? values
            : values?.map(({ name }, index) =>
                index == values.length - 1 ? name + '' : name + '  .  '
              )}
        </Typography>
      </div>
    </div>
  );
};
