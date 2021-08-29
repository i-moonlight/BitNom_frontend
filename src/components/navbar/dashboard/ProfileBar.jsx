import {
  Avatar,
  Box,
  Card,
  Container,
  Divider,
  Hidden,
  IconButton,
  InputBase,
  Paper,
  Typography,
  useTheme,
  Badge,
} from "@material-ui/core";
import {
  ChevronRight,
  ForumRounded,
  MenuRounded,
  Notifications,
  Search,
} from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import logo_light from "../../../assets/logo_light.svg";
import { getUserInitials } from "../../../utilities/Helpers";
import Button from "../../Button";
import { useStyles } from "../../utilities/styles.components";
export default function ProfileBar({
  notifications,
  menuId,
  handleMenuOpen,
  notificationId,
  handleNotificationsOpen,
}) {
  const state = useSelector((state) => state);
  const user = state.auth.user;
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();

  const userInitials = getUserInitials(user?.displayName);
  return (
    <Box className={classes.root}>
      <Container>
        <Card elevation={0} className={classes.appBar}>
          <div
            className="center-horizontal c-pointer"
            onClick={() => history.push("/")}
          >
            <Avatar
              className="me-1"
              src={theme.palette.type == "light" ? logo : logo_light}
            >
              B
            </Avatar>
            <Hidden smDown>
              <Typography
                color={
                  theme.palette.type == "light" ? "primary" : "textPrimary"
                }
                variant="h6"
                noWrap
              >
                BITNORM
              </Typography>
              <Typography
                style={{ marginLeft: 16, color: "#F59301" }}
                variant="body2"
                noWrap
              >
                NEW
              </Typography>
            </Hidden>
          </div>

          <Paper
            variant={theme.palette.type == "light" ? "outlined" : "elevation"}
            elevation={0}
            component="form"
            className={classes.paperSearch}
          >
            <Hidden xsDown>
              <Button textCase variant="text">
                <Typography variant="body2" color="textSecondary">
                  General
                </Typography>
                <ChevronRight
                  style={{
                    transform: "rotateZ(90deg)",
                  }}
                />
              </Button>
              <Divider className={classes.divider} orientation="vertical" />
            </Hidden>
            <InputBase
              className={classes.input}
              placeholder="Search Bitnorm"
              inputProps={{ "aria-label": "search bitnorm" }}
            />
            <IconButton
              size="small"
              type="submit"
              className={"m-1 p-1" + classes.iconButton}
              aria-label="search"
            >
              <Search />
            </IconButton>
          </Paper>

          <div className={classes.sectionDesktop}>
            <IconButton
              size="small"
              className={"m-1 p-1" + classes.iconButton}
              color="inherit"
              aria-label="account of current user"
              aria-controls={notificationId}
              aria-haspopup="true"
              onClick={handleNotificationsOpen}
            >
              <Badge color="primary" badgeContent={notifications}>
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              size="small"
              className={classes.iconButton}
              color="inherit"
            >
              <ForumRounded />
            </IconButton>

            <Button
              textCase
              className="py-0 ms-3"
              variant="text"
              color="default"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <Avatar
                variant="rounded"
                style={{
                  backgroundColor: "#fed132",
                  marginRight: 12,
                  width: 30,
                  height: 30,
                }}
                source={user?.profile_pic}
              >
                {userInitials}
              </Avatar>
              <Typography variant="body2" style={{ marginRight: 4 }}>
                {user?.displayName}
              </Typography>
              <ChevronRight
                style={{
                  transform: "rotateZ(90deg)",
                }}
              />
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              size="small"
              className={"m-1 p-1" + classes.iconButton}
              aria-label="show more"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <MenuRounded />
            </IconButton>
          </div>
        </Card>
      </Container>
    </Box>
  );
}
