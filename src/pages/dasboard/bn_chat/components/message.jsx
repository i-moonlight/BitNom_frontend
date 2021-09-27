import { Avatar, Grid, Typography, IconButton } from "@material-ui/core";
import { Reply } from "@material-ui/icons";
import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Message({ message, onReply = () => null }) {
  const [show_reply, setShowReply] = useState(false);
  const user = message.author || {};
  return (
    <Grid
      item
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      onMouseEnter={() => setShowReply(true)}
      onMouseLeave={() => setShowReply(false)}
    >
      <Grid item xs={2} container justifyContent="center">
        <Link style={{ textDecoration: "none" }}>
          <Avatar
            src={
              user.image
                ? `${process.env.REACT_APP_USERS_IMAGES_URL}${user.image}`
                : "https://wallpaperaccess.com/full/2213426.jpg"
            }
          />
        </Link>
      </Grid>
      <Grid
        style={{ position: "relative" }}
        item
        container
        xs={10}
        justifyContent="flex-start"
        direction="column"
      >
        {" "}
        <Grid item style={{ marginBottom: "10px" }}>
          <Typography variant="body1" component="p">
            <Link style={{ textDecoration: "none" }}>
              <strong>{user._id}</strong>
            </Link>
          </Typography>
          <Typography variant="caption" component="span">
            {moment(message.date).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
          {message.responseTo && (
            <Typography variant="body2" component="article">
              {message.responsTo.text}
            </Typography>
          )}
          <Typography variant="body2" component="article">
            {message.text}
          </Typography>
        </Grid>
        {show_reply && (
          <IconButton
            style={{
              fontSize: "1em",
              position: "absolute",
              bottom: "5px",
              right: "3px",
              color: "#bbb",
            }}
            size="small"
            onClick={onReply}
          >
            <Reply />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
}
