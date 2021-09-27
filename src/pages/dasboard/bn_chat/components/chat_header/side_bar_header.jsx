import {
  Grid,
  IconButton,
  Typography,
  Divider,
  Paper,
  InputBase,
  useTheme,
} from "@material-ui/core";
import { MoreVert, Search } from "@material-ui/icons";
import React from "react";
import { useStyles } from "../../styles.component";

export default function SideBarHeader() {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <>
      <Grid item container>
        <Grid item xs={10}>
          {" "}
          <Typography variant="h5">Messaging</Typography>
        </Grid>
        <Grid item xs={2} alignItems="flex-end" justifyContent="flex-end">
          <IconButton>
            <MoreVert />
          </IconButton>
        </Grid>
      </Grid>{" "}
      <Divider className={classes.divider} />
      <Grid item>
        <Paper
          variant={theme.palette.type == "light" ? "outlined" : "elevation"}
          elevation={0}
          component="form"
          className={classes.paperSearch}
        >
          {" "}
          <IconButton
            size="small"
            type="submit"
            className={"m-1 p-1" + classes.iconButton}
            aria-label="search"
          >
            <Search />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Search Messages"
            inputProps={{ "aria-label": "search messages" }}
          />
        </Paper>
      </Grid>
    </>
  );
}
