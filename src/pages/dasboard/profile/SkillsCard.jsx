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

export default function SkillsCard() {
  const theme = useTheme();
  const classes = useStyles();

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
          <Search color='textSecondary' />
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
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(skill => (
            <Chip
              color='primary'
              key={skill}
              label='Web Developer'
              className='me-2 mb-2'
              onDelete={() => null}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
