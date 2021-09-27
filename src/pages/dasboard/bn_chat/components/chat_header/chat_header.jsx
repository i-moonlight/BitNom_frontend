import React from "react";
import {
  Grid,
  ButtonBase,
  Typography,
  IconButton,
  Divider,
  Avatar,
} from "@material-ui/core";
import { Search, Settings } from "@material-ui/icons";
import { useStyles } from "../../styles.component";
export default function ChatHeader({ chat }) {
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid item>
        <ButtonBase>
          {" "}
          <Avatar
            alt="Remy Sharp"
            src="https://wallpaperaccess.com/full/2213426.jpg"
            className={classes.avatar}
          />
        </ButtonBase>
      </Grid>
      <Grid item xs container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography variant={"h5"}>{chat.otherUser._id}</Typography>
            <div className={classes.status}>
              {" "}
              <span className={classes.online}></span>
              <Typography>Fullstack developer</Typography>{" "}
              <Divider
                className={classes.dividerStatus}
                orientation="vertical"
              />{" "}
              <IconButton
                size="mini"
                type="submit"
                className={classes.iconButtonStatus}
                aria-label="search"
              >
                <Search />
              </IconButton>
            </div>
          </Grid>
          <Grid item></Grid>
        </Grid>{" "}
        <Grid item>
          <IconButton
            size="small"
            type="submit"
            className={"m-1 p-1" + classes.iconButton}
            aria-label="search"
            color="primary"
          >
            <Settings />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
