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
import React from 'react';
import { useStyles } from './utilities/profile.styles';

export default function SkillsCard({ profile }) {
  const theme = useTheme();
  const classes = useStyles();
  const skills = profile?.skills;

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
            className={classes.input}
            placeholder='Search Skill eg "Data Analyst"'
            inputProps={{ 'aria-label': 'search bitnorm' }}
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
              onDelete={() => null}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
