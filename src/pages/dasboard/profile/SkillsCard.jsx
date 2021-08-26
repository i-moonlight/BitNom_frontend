import { useMutation } from '@apollo/client';
import {
  Card,
  CardContent,
  Chip,
  InputBase,
  Paper,
  Typography,
  useTheme,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, { useState } from 'react';
import Button from '../../../components/Button';
import {
  MUTATION_ADD_SKILL,
  MUTATION_REMOVE_SKILL,
  QUERY_FETCH_PROFILE,
} from './utilities/profile.queries';
import { useStyles } from './utilities/profile.styles';

export default function SkillsCard({ profile }) {
  const [text, setText] = useState('');
  const theme = useTheme();
  const classes = useStyles();
  const skills = profile?.skills;

  const [
    addSkill,
    {
      // addError,
      // data,
      addLoading,
    },
  ] = useMutation(MUTATION_ADD_SKILL, {
    context: { clientName: 'users' },
  });

  const [
    removeSkill,
    {
      // removeError,
      // data,
      removeLoading,
    },
  ] = useMutation(MUTATION_REMOVE_SKILL, {
    context: { clientName: 'users' },
  });

  return (
    <Card className='mb-3'>
      <CardContent>
        <div>
          <Typography>Your Skills</Typography>
        </div>

        <Paper
          variant={theme.palette.type == 'light' ? 'outlined' : 'elevation'}
          elevation={0}
          component='form'
          className={classes.paperSearch}
        >
          <Search color='inherit' />
          <InputBase
            value={text}
            onChange={e => setText(e.target.value)}
            className={classes.input}
            placeholder='Search Skill eg "Data Analyst"'
            inputProps={{ 'aria-label': 'search bitnorm' }}
            endAdornment={
              <Button
                onClick={() => {
                  addSkill({
                    variables: {
                      data: { name: text },
                    },
                    refetchQueries: [
                      {
                        query: QUERY_FETCH_PROFILE,
                        context: { clientName: 'users' },
                      },
                    ],
                  }).then(() => {
                    setText('');
                  });
                }}
                disabled={addLoading}
                size='small'
                className='my-1'
              >
                Add
              </Button>
            }
          />
        </Paper>

        <Typography variant='body2' className='mt-2 mb-2' color='textSecondary'>
          You can add up to 30 skills
        </Typography>

        <div>
          {skills?.map(({ _id, name }) => (
            <Chip
              color='primary'
              key={_id}
              label={name}
              className='me-2 mb-2'
              onDelete={() =>
                removeSkill({
                  variables: {
                    id: _id,
                  },
                  refetchQueries: [
                    {
                      query: QUERY_FETCH_PROFILE,
                      context: { clientName: 'users' },
                    },
                  ],
                })
              }
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
