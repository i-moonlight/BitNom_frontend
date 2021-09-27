import React from "react";
import {
  Divider,
  Paper,
  useTheme,
  IconButton,
  InputBase,
  Avatar,
  ButtonBase,
} from "@material-ui/core";
import {
  AttachFile,
  EmojiEmotions,
  Gif,
  Image,
  SendOutlined,
  VideoLibrary,
} from "@material-ui/icons";
import { useStyles } from "./styles.component";
export default function ThreadView() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.threadView}>
      <Divider className={classes.divider} />
      <div className={classes.messageView}>
        <div className={classes.messageLeft}>
          <ButtonBase>
            {" "}
            <Avatar
              alt="Remy Sharp"
              src="https://wallpaperaccess.com/full/2213426.jpg"
              className={classes.mavatar}
            />
          </ButtonBase>
          <Paper className={classes.incoming}>
            <p className={classes.message}>Hello Goo morning Alexis</p>
          </Paper>{" "}
          <div className={classes.time}>
            <small>17.25</small>
          </div>
        </div>
        <div className={classes.messageRight}>
          <div className={classes.time}>
            <small>17.25</small>
          </div>
          <Paper className={classes.outgoing}>
            {" "}
            <p className={classes.message}>Hello Goo morning victor</p>
          </Paper>
          <ButtonBase>
            {" "}
            <Avatar
              alt="Remy Sharp"
              src="https://wallpaperaccess.com/full/2213426.jpg"
              className={classes.mavatar}
            />
          </ButtonBase>
        </div>
        <div className={classes.messageLeft}>
          <ButtonBase>
            {" "}
            <Avatar
              alt="Remy Sharp"
              src="https://wallpaperaccess.com/full/2213426.jpg"
              className={classes.mavatar}
            />
          </ButtonBase>
          <Paper className={classes.incoming}>
            <p className={classes.message}>
              Your story continue on mobile:Build and edit decks. Give and
              receive feedback
            </p>
          </Paper>
          <div className={classes.time}>
            <small>17.25</small>
          </div>
        </div>
        <div className={classes.messageRight}>
          <div className={classes.time}>
            <small>17.25</small>
          </div>
          <Paper className={classes.outgoing}>
            {" "}
            <p className={classes.message}>Yeah,sure</p>
          </Paper>
          <ButtonBase>
            {" "}
            <Avatar
              alt="Remy Sharp"
              src="https://wallpaperaccess.com/full/2213426.jpg"
              className={classes.mavatar}
            />
          </ButtonBase>
        </div>
        <div className={classes.messageRight}>
          {" "}
          <div className={classes.time}>
            <small>17.25</small>
          </div>
          <Paper className={classes.outgoing}>
            {" "}
            <p className={classes.message}>
              {" "}
              Your story continue on mobile:Build and edit decks. Give and
              receive feedback
            </p>{" "}
          </Paper>{" "}
          <ButtonBase>
            {" "}
            <Avatar
              alt="Remy Sharp"
              src="https://wallpaperaccess.com/full/2213426.jpg"
              className={classes.mavatar}
            />
          </ButtonBase>
        </div>
        <div className={classes.messageLeft}>
          <ButtonBase>
            {" "}
            <Avatar
              alt="Remy Sharp"
              src="https://wallpaperaccess.com/full/2213426.jpg"
              className={classes.mavatar}
            />
          </ButtonBase>
          <Paper className={classes.incoming}>
            <p className={classes.message}>Hello Goo morning Alexis</p>
          </Paper>{" "}
          <div className={classes.time}>
            <small>17.25</small>
          </div>
        </div>
        <div className={classes.messageRight}>
          <div className={classes.time}>
            <small>17.25</small>
          </div>
          <Paper className={classes.outgoing}>
            {" "}
            <p className={classes.message}>Hello Goo morning victor</p>
          </Paper>
          <ButtonBase>
            {" "}
            <Avatar
              alt="Remy Sharp"
              src="https://wallpaperaccess.com/full/2213426.jpg"
              className={classes.mavatar}
            />
          </ButtonBase>
        </div>
        <div className={classes.messageLeft}>
          <ButtonBase>
            {" "}
            <Avatar
              alt="Remy Sharp"
              src="https://wallpaperaccess.com/full/2213426.jpg"
              className={classes.mavatar}
            />
          </ButtonBase>
          <Paper className={classes.incoming}>
            <p className={classes.message}>
              Your story continue on mobile:Build and edit decks. Give and
              receive feedback
            </p>
          </Paper>
          <div className={classes.time}>
            <small>17.25</small>
          </div>
        </div>
        {/* <div className={classes.messageRight}>
          <div className={classes.time}>
            <small>17.25</small>
          </div>
          <Paper className={classes.outgoing}>
            {" "}
            <p className={classes.message}>Yeah,sure</p>
          </Paper>
        </div>
        <div className={classes.messageRight}>
          {" "}
          <div className={classes.time}>
            <small>17.25</small>
          </div>
          <Paper className={classes.outgoing}>
            {" "}
            <p className={classes.message}>
              {" "}
              Your story continue on mobile:Build and edit decks. Give and
              receive feedback
            </p>{" "}
          </Paper>{" "}
        </div> */}
      </div>
      <div className={classes.inputRoot}>
        <Divider className={classes.divider} />{" "}
        <div className={classes.inputTab}>
          {" "}
          <IconButton
            size="small"
            type="submit"
            className={"m-1 p-1" + classes.iconButton}
            aria-label="search"
          >
            <AttachFile />
          </IconButton>
          <IconButton
            size="small"
            type="submit"
            className={"m-1 p-1" + classes.iconButton}
            aria-label="search"
          >
            <Image />
          </IconButton>
          <IconButton
            size="small"
            type="submit"
            className={"m-1 p-1" + classes.iconButton}
            aria-label="search"
          >
            <VideoLibrary />
          </IconButton>
          <IconButton
            size="small"
            type="submit"
            className={"m-1 p-1" + classes.iconButton}
            aria-label="search"
          >
            <Gif />
          </IconButton>
          <Paper
            variant={theme.palette.type == "light" ? "outlined" : "elevation"}
            elevation={0}
            component="form"
            className={classes.sendMessage}
          >
            {" "}
            <IconButton
              size="small"
              type="submit"
              className={"m-1 p-1" + classes.iconButton}
              aria-label="search"
            >
              <EmojiEmotions />
            </IconButton>
            <InputBase
              className={classes.inputField}
              placeholder="Type a message"
              inputProps={{ "aria-label": "Find" }}
            />
            <IconButton
              size="small"
              type="submit"
              className={"m-1 p-1" + classes.iconButton}
              aria-label="search"
            >
              <SendOutlined />
            </IconButton>
          </Paper>
        </div>
      </div>
    </div>
  );
}
