import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: theme.palette.text.primary,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    background: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    alignItems: "center",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(2),
  },
  paperSearch: {
    padding: "0px 4px",
    display: "flex",
    height: "35px",
    flexGrow: 1,
    alignItems: "center",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.landing,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: theme.spacing(0.7),
    margin: theme.spacing(0.1),
  },
  divider: {
    margin: 4,
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
    color: theme.palette.primary.main,
  },
  topTabs: {
    minWidth: 200,
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "inherit",
    "&:hover": {
      backgroundColor: theme.palette.background.paper,
    },
  },
  topTabsActive: {
    width: "100%",
    minWidth: 200,
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "inherit",
    borderBottomWidth: 2,
    borderBottomColor: theme.palette.primary.main,
    borderBottomStyle: "solid",
    "&:hover": {
      backgroundColor: theme.palette.background.paper,
    },
  },
  menuPopover: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    height: "70vh",
    overflow: "auto",
  },
  sidebar: {
    // width: "420px",
    // float: "left",
  },
  threadView: {
    // float: "right",
    // width: "80%",
  },
  chatBar: {
    height: "7vh",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.landing,
  },
  inputField: {
    borderRadius: "5px",
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  sendMessage: {
    height: "30px",
    display: "flex",
    padding: "0px 4px",
    flexGrow: "1",
    alignItems: "center",
    marginLeft: "24px",
    marginRight: "16px",
    borderRadius: "20px",
  },
  inputTab: {
    display: "flex",
  },
  incoming: {
    // float: "left",
    maxWidth: "480px",
    // flexGrow: 1,
    borderRadius: "20px 20px 20px 0px",
    // height: "20%",
    backgroundColor: "#bde0ff",
  },
  outgoing: {
    // float: "right",
    maxWidth: "400px",
    // flexGrow: 1,
    borderRadius: "20px 20px 0px 20px",
    backgroundColor: "#f0f8ff",
  },
  messageLeft: {
    display: "flex",
    justifyContent: "start",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  messageRight: {
    display: "flex",
    justifyContent: "end",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  message: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  time: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "end",
    margin: theme.spacing(2),
  },
  status: {
    display: "flex",
  },
  iconButtonStatus: {
    padding: "0px",
    marginTop: "4px",
    marginLeft: "10px",
  },
  dividerStatus: {
    margin: 4,
    width: "2px",
    height: "18px",
    marginLeft: "8px",
  },

  avatar: {
    width: 56,
    height: 56,
  },
  online: {
    backgroundColor: "#32CD32",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    margin: "6px",
  },
  offline: {
    backgroundColor: "#708090",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    margin: "6px",
  },
  statusWrapper: {
    position: "absolute",
  },
  mavatar: {
    margin: theme.spacing(1),
  },
  chatonlinestatus: {
    position: "absolute",
    backgroundColor: "#32CD32",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    margin: "6px",
    marginLeft: "30px",
  },
  chatofflinestatus: {
    position: "absolute",
    backgroundColor: "#708090",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    margin: "6px",
    marginLeft: "30px",
  },
  messageView: {
    height: "70vh",
    overflow: "auto",
  },
}));
