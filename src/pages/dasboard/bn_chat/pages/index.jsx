import { Grid, Paper } from "@material-ui/core";
import React from "react";
import ChatMenu from "./chat_menu";

export default function Chat() {
  return (
    <>
      {" "}
      <Paper>
        {" "}
        <Grid container>
          <Grid item xs={3}>
            {" "}
            <ChatMenu />
          </Grid>

          <Grid item>Messages here</Grid>
        </Grid>
      </Paper>
    </>
  );
}
