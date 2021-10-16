import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    profileFragment: {
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
    paperSearchAlt: {
        padding: '0px 4px',
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    formCard: {
        backgroundColor: theme.palette.background.profileCard,
    },
}));
