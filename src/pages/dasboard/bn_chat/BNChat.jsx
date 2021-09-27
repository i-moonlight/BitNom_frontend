import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import Screen from "../../../components/Screen";
import Chat from "./pages";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  devider: {
    height: "70vh",
    margin: 4,
  },
  sidebar: {
    width: "33%",
    borderRight: "1px solid #ddd",
  },
  threadView: {
    width: "67%",
  },
}));

export default function BnChat() {
  const classes = useStyles();

  return (
    <Screen>
      <Container maxWidth="lg">
        <Chat />
      </Container>
    </Screen>
  );
}
