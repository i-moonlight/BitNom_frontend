import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_DIALOGUES } from "../../graphql/queries";
import { CircularProgress, Grid, List, Typography } from "@material-ui/core";
import Chat from "./chat";
export default function Invites({ setChatInvites, invites = [] }) {
  const { loading, data } = useQuery(GET_DIALOGUES, {
    variables: {
      status: "new",
    },
  });
  useEffect(() => {
    const chatInvites = data && data.chat.Dialogue ? data.chat.Dialogue : null;
    console.log("CHATINVITES", chatInvites);
    setChatInvites(chatInvites);
  }, [data, setChatInvites, invites]);
  return (
    <>
      {invites && invites.length && (
        <List>
          {invites.map((chat) => (
            <Chat key={chat._id} chat={chat} />
          ))}
        </List>
      )}
      {loading && !invites.length && <CircularProgress />}
      {!loading && !invites.length && (
        <Grid
          alignItems="centre"
          justifyContent="centre"
          container
          item
          direction
          column
        >
          <Typography>You have no chat invites yet!</Typography>
        </Grid>
      )}
    </>
  );
}
