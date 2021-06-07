import React from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Card,
  Container,
  Divider,
  fade,
  Hidden,
  IconButton,
  InputBase,
  makeStyles,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Typography,
  withStyles,
} from "@material-ui/core";
import {
  Brightness3,
  ChevronRight,
  ForumRounded,
  MenuRounded,
  MoreRounded,
  Notifications,
  NotificationsRounded,
  People,
  PeopleRounded,
  Search,
} from "@material-ui/icons";
import logo from "../assets/logo.svg";
import logo_light from "../assets/logo_light.svg";

const BitTab = withStyles(theme => ({
  root: {
    textTransform: "none",
    color: "#fff",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(15),
    marginRight: 0,
    "&:focus": {
      opacity: 1,
      color: "#fff",
    },
  },
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
  // wrapper: {
  //   backgroundColor: "transparent",
  // },
  root: {
    flexGrow: 1,
    // position: "fixed",
    // top: 0,
  },
  appBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: theme.palette.text.primary,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    flexGrow: 1,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    // marginRight: theme.spacing(2),
    // marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  statusBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: theme.palette.text.primary,
  },
  tabBar: {
    textTransform: "none",
  },
  textTheme: {
    color: theme.palette.primary.dark,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Watchlist</MenuItem>
      <MenuItem onClick={handleMenuClose}>Account and Billing</MenuItem>
      <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <div>
          <Typography>Referred Friends</Typography>
          <div>
            <Typography>0</Typography>
            <PeopleRounded />
          </div>
        </div>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>BN Token</MenuItem>
      <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <ForumRounded />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <NotificationsRounded />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      {/* <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
    </Menu>
  );

  return (
    <AppBar position="fixed" color="inherit" elevation={0}>
      <Box className={classes.root}>
        <Container>
          <div class={classes.statusBar}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {[1, 2, 3, 4].map(() => (
                <Typography style={{ marginRight: 16 }}>
                  Crypto: <span class={classes.textTheme}>1837</span>
                </Typography>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {[1, 2].map(() => (
                <>
                  <Typography style={{ marginRight: 4 }}>English</Typography>
                  <IconButton aria-label="show 4 new mails" color="inherit">
                    <ChevronRight
                      style={{
                        transform: "rotateZ(90deg)",
                      }}
                    />
                  </IconButton>
                </>
              ))}
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Brightness3 />
              </IconButton>
            </div>
          </div>
        </Container>
      </Box>
      <Divider />
      <Box className={classes.root}>
        <Container>
          <Card class={classes.appBar}>
            <Avatar src={logo_light} style={{ marginRight: 8 }}>
              B
            </Avatar>
            <Hidden smDown>
              <Typography variant="h6" noWrap>
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
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Notifications />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <ForumRounded />
              </IconButton>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  variant="rounded"
                  style={{
                    backgroundColor: "#fed132",
                    marginRight: 12,
                    marginLeft: 16,
                  }}
                >
                  L
                </Avatar>
                <Typography style={{ marginRight: 4 }}>Mahmud Zayn</Typography>
                <IconButton
                  color="inherit"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                >
                  <ChevronRight
                    style={{
                      transform: "rotateZ(90deg)",
                    }}
                  />
                </IconButton>
              </div>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuRounded />
              </IconButton>
            </div>
          </Card>

          {/*  */}
          <div class={classes.tabBar}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              // variant="fullWidth"
              // class={classes.tabBar}
              //   centered
            >
              <BitTab label="BN Connect" />
              <BitTab label="BN Knowledge Center" />
              <BitTab label="Exchange" />
              <BitTab label="Services" />
              <BitTab label="Job Board" />
              <BitTab label="Product" />
              <BitTab label="More" />
            </Tabs>
          </div>
        </Container>
      </Box>
      <Divider />
      {renderMobileMenu}
      {renderMenu}
    </AppBar>
  );
}
