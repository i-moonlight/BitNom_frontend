import { makeStyles } from '@material-ui/core';
import colors from './colors';
export const useStyles = makeStyles((theme) => ({
    limit_text: {
        overflow: 'hidden',
        whiteSpace: 'nowrap !important',
        textOverflow: 'ellipsis',
    },
    online_badge: {
        '& .MuiBadge-badge': {
            backgroundColor: colors.online_green,
        },
    },
    menuHeader: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    paperSearch: {
        padding: '0px 4px',
        display: 'flex',
        height: '35px',
        flexGrow: 1,
        alignItems: 'center',
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette.background.landing,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    chatContent: {
        height: '69vh',
    },
    chatHeader: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    inputTab: {
        display: 'flex',
    },
    sendMessage: {
        height: '30px',
        display: 'flex',
        padding: '0px 4px',
        flexGrow: '1',
        alignItems: 'center',
        marginLeft: '24px',
        marginRight: '16px',
        borderRadius: '20px',
    },
    iconButton: {
        padding: theme.spacing(0.7),
        margin: theme.spacing(0.1),
    },
    inputField: {
        borderRadius: '5px',
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    divider: {
        margin: 4,
    },
    inviteBar: {
        backgroundColor: theme.palette.background.default,
        height: '100px',
    },
    inviteBoard: {},
    reject: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    accept: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    inviteIntro: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    online_status: {
        position: 'absolute',
        backgroundColor: '#32CD32',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        margin: '6px',
        marginLeft: '30px',
    },
    offline_status: {
        position: 'absolute',
        backgroundColor: '#708090',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        margin: '6px',
        marginLeft: '30px',
    },

    avatar: {
        width: 56,
        height: 56,
    },
    status: {
        display: 'flex',
    },
    iconButtonStatus: {
        padding: '0px',
        marginTop: '4px',
        marginLeft: '10px',
    },
    dividerStatus: {
        margin: 4,
        width: '2px',
        height: '18px',
        marginLeft: '8px',
    },
    online: {
        backgroundColor: '#32CD32',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        margin: '6px',
    },
    offline: {
        backgroundColor: '#708090',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        margin: '6px',
    },
}));
