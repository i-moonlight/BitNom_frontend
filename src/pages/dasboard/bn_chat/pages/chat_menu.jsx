import React from "react";
import SideBarHeader from "../components/chat_header/side_bar_header";
import Chats from "../sidebar";
import { Grid } from "@material-ui/core";

export default function ChatMenu() {
  return (
    <Grid container direction="column" style={{ height: "100%" }}>
      {" "}
      <SideBarHeader />
      <Chats />
    </Grid>
  );
}
