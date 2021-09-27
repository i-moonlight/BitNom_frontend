import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React from "react";

export default function ChatItem({ chat }) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "#FFF",
          }}
          src="https://wallpaperaccess.com/full/2213426.jpg"
          alt={"avatar"}
        />
      </ListItemAvatar>
      <ListItemText
        secondary={<Typography>{chat.otheruser.info._id}</Typography>}
      />
    </ListItem>
  );
}
