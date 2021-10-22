import { makeStyles } from '@mui/styles';
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
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    paperSearch: {
        padding: '0px 4px',
        display: 'flex',
        height: '35px',
        flexGrow: 1,
        alignItems: 'center',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        backgroundColor: theme.palette.background.landing,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    inputRoot: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    chatContent: {
        height: '69vh',
    },
    chatHeader: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    sendMessage: {
        display: 'flex',
        padding: '0px 4px',
        flexGrow: '1',
        alignItems: 'center',
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
    inviteBar: {
        backgroundColor: theme.palette.background.default,
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
    incoming: {
        maxWidth: '480px',
        minWidth: '120px',
        borderRadius: '20px 20px 20px 0px',
        backgroundColor: theme.palette.background.chatFrom,
        marginLeft: theme.spacing(1),
    },
    outgoing: {
        maxWidth: '480px',
        minWidth: '120px',
        borderRadius: '20px 20px 0px 20px',
        backgroundColor: theme.palette.background.chatTo,
        marginRight: theme.spacing(1),
    },
    messageLeft: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'flex-end',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    messageRight: {
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'flex-end',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    message: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        fontSize: '13px',
    },
    time: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'end',
        margin: theme.spacing(2),
    },
    reply: {
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'end',
        marginTop: '-20px',
    },
    author: {
        fontSize: '12px',
    },
}));
