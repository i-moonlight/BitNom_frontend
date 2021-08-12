import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';

export default function QuaterCard() {
  const classes = useStyles();

  return (
    <Grid item lg={3}>
      <Card className={classes.card}>
        <CardContent>
          <Typography>Q1 2021</Typography>
          <Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
            quasi ipsam impedit est vel tempore quo similique omnis ex iusto!
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
