import { useQuery } from "@apollo/client";
import { CircularProgress, Grid, List, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { GET_DIALOGUES } from "../../graphql/queries";
import ChatItem from "./chat";
import {
  addChatDialogues,
  setCurrentChat,
} from "../../../../../store/actions/chatActions";
function Chats({
  addChatDialogues: setChatDialogues,
  addCuurentChat,
  current_chat_id,
  chats = [],
}) {
  const { loading, data, error } = useQuery(GET_DIALOGUES, {
    // fetchPolicy: "network-only",
    variables: {
      status: "accepted",
    },
  });
  const openChat = (chat) => {
    if (current_chat_id !== chat._id) {
      addCuurentChat(chat);
      //reset count later
    }
  };
  useEffect(() => {
    const AcceptedChats =
      data && data.Chat.Dialogue.get ? data.Chat.Dialogue.get : null;
    setChatDialogues(AcceptedChats);
  }, [data, setChatDialogues, chats]);
  console.log("ERROR", error);
  return (
    <>
      {chats.length > 0 && (
        <List>
          {chats.map((chat) => (
            <ChatItem
              key={chat._id}
              onClick={() => openChat(chat)}
              chat={chat}
            />
          ))}
        </List>
      )}
      {loading && !chats.length && (
        <Grid
          alignItems="center"
          justifyContent="center"
          container
          item
          direction="column"
          style={{ width: "100%" }}
        >
          <CircularProgress />
        </Grid>
      )}
      {!loading && !chats.length && (
        <Grid
          alignItems="center"
          justifyContent="center"
          container
          item
          direction="column"
          style={{ width: "100%" }}
        >
          <Typography>You have no chats yet.</Typography>
        </Grid>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  chats: state.chats || [],
  current_chat_id: state.current_chat_id || "",
});
const mapDispatchToProps = (dispatch) => {
  return {
    addChatDialogues: (data) => dispatch(addChatDialogues(data)),
    addCurrentChat: (data) => dispatch(setCurrentChat(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chats);
