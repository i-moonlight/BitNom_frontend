import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  workCard: {
    backgroundColor: theme.palette.background.profileCard,
    marginTop: theme.spacing(2),
  },
  paperSearch: {
    padding: '0px 4px',
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.profileCard,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));
