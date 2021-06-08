import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import "./css/style.css";
import Routes from "./Routes";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
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
