import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: theme.palette.text.primary,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    background: 'none',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  paperSearch: {
    padding: '0px 4px',
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
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
    height: 24,
    margin: 4,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  statusBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.palette.text.primary,
  },
  tabBar: {
    textTransform: 'none',
  },
  textTheme: {
    color: theme.palette.primary.main,
  },
}));