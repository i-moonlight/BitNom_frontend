import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Routes from './Routes';
import './css/style.css';
import './css/bootstrap_utilities.css';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Routes />
    </div>
  );
}
