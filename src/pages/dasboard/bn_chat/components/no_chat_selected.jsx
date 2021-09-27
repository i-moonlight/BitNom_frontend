import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";

export default function EmptyMessages() {
  return (
    <>
      <Grid>
        <Typography variant="body1">You have no chat selected</Typography>
        <Typography variant="body2">
          choose one from your existing chats, or start a new chat
        </Typography>
        <Button variant="contained">New Chat</Button>
      </Grid>
    </>
  );
}
