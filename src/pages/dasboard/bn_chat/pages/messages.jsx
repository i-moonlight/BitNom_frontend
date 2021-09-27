import { useQuery } from "@apollo/client";
import { CircularProgress, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import Message from "../components/message";
import { GET_DIALOGUE_MESSAGES } from "../graphql/queries";

export default function Messages({
  dialogue = { messages: [], _id: "", currentuser: {} },
  addDialogueMessage,
  setDialogueMessages,
}) {
  const { loading, data, error } = useQuery(GET_DIALOGUE_MESSAGES, {
    variables: {
      chat_id: dialogue._id,
    },
  });
  useEffect(() => {
    const dialogueMessages =
      data && data.Chat.Dialogue.getMessages
        ? data.chat.Dialogue.getMessages
        : null;
    setDialogueMessages(dialogueMessages);
  })[(data, setDialogueMessages)];
  const messages = dialogue.messages ? [...dialogue.messages] : [];
  return (
    <Grid
      container
      otem
      direction="column"
      wrap="nowrap"
      justifyContent="space-between"
      style={{ height: "100%", position: "relative" }}
    >
      <Grid
        style={{ maxHeight: "clac(100%-45px", overflowY: "auto" }}
        item
        container
        wrap="nowwrap"
        direction="column"
      >
        {messages &&
          messages.map((message) => (
            <Message key={message._id} message={message} />
          ))}
        {loading && <CircularProgress />}
      </Grid>
    </Grid>
  );
}
