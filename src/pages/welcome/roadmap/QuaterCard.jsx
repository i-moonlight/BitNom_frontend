import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';

export default function QuaterCard({ title, text, list }) {
  const classes = useStyles();

  return (
    <Grid item lg={3}>
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom>{title}</Typography>
          <Typography variant='body2'>
            {text}
            {list?.map(list => (
              <li className='mx-0' key={list}>
                {list}
              </li>
            ))}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: theme.palette.background.default,
  },
}));
