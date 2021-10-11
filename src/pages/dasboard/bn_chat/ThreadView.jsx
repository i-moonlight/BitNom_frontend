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
    </div>
  );
}
