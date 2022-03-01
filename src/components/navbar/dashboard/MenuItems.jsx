import { useMutation } from '@apollo/client';
import {
    AccountBalanceWalletOutlined,
    Brightness4Rounded,
    Brightness7Rounded,
    ChevronRight,
    ExitToAppRounded,
    //ForumRounded,
    Notifications,
    PeopleRounded,
} from '@mui/icons-material';
import {
    Avatar,
    Badge,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signout } from '../../../store/actions/authActions';
import { clearAllChatData } from '../../../store/actions/chatActions';
import { resetCount } from '../../../store/actions/countActions';
import { changeTheme } from '../../../store/actions/themeActions';
import {
    MARK_NOTIFICAION_AS_SEEN,
    QUERY_GET_USER_NOTIFICATIONS,
} from '../../utilities/queries.components';

export default function ListItems({ handleMenuClose }) {
    const palette = useSelector((st) => st.theme.palette);
    const dispatch = useDispatch();
    const theme = useTheme();
    const history = useHistory();
    const smUp = useMediaQuery('(min-width:600px)');
    const mdUp = useMediaQuery('(min-width:960px)');
    const state = useSelector((st) => st);
    const notificationsCount = state.count.count;
    //const messagesCount = state.chats.unreadCount;
    const user = state.auth.user;

    const [markAsSeen] = useMutation(MARK_NOTIFICAION_AS_SEEN, {
        variables: { _id: user?._id },
        context: { clientName: 'notifications' },
    });

    const handleMarkAsSeen = () => {
        markAsSeen({
            variables: {
                _id: user?._id,
            },
            refetchQueries: [
                {
                    query: QUERY_GET_USER_NOTIFICATIONS,
                    context: { clientName: 'notifications' },
                },
            ],
        });
        dispatch(resetCount());
    };

    return (
        <>
            <ListItem
                divider
                button
                onClick={() => {
                    history.push('/profile');
                }}
            >
                <ListItemText primary="My Profile" />
            </ListItem>
            <ListItem divider button onClick={handleMenuClose}>
                <ListItemText primary="Watchlist" />
            </ListItem>
            <ListItem divider button onClick={handleMenuClose}>
                <ListItemText primary="Account and Billing" />
            </ListItem>
            <ListItem divider button onClick={handleMenuClose}>
                <ListItemText primary="Settings" />
            </ListItem>
            {!smUp && (
                <>
                    <ListItem divider button onClick={() => null}>
                        <ListItemText primary="English" />
                        <ListItemIcon>
                            <ChevronRight
                                style={{
                                    transform: 'rotateZ(90deg)',
                                }}
                            />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem divider button onClick={() => null}>
                        <ListItemText
                            primary={
                                <div className="center-horizontal">
                                    <Avatar
                                        style={{
                                            height: 24,
                                            width: 24,
                                            background: '#0F986E',
                                            marginRight: 8,
                                            color: theme.palette.text.primary,
                                        }}
                                        variant="rounded"
                                    >
                                        $
                                    </Avatar>
                                    <Typography
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        USD
                                    </Typography>
                                </div>
                            }
                        />
                        <ListItemIcon>
                            <ChevronRight
                                style={{
                                    transform: 'rotateZ(90deg)',
                                }}
                            />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem
                        divider
                        button
                        onClick={() => {
                            palette == 'light'
                                ? dispatch(changeTheme('dark'))
                                : dispatch(changeTheme('light'));
                        }}
                    >
                        <ListItemText primary="Switch Theme" />
                        <ListItemIcon>
                            {palette == 'light' ? (
                                <Brightness4Rounded />
                            ) : (
                                <Brightness7Rounded />
                            )}
                        </ListItemIcon>
                    </ListItem>
                </>
            )}
            <ListItem
                divider
                button
                onClick={() => {
                    palette == 'light'
                        ? dispatch(changeTheme('dark'))
                        : dispatch(changeTheme('light'));
                }}
            >
                <ListItemText primary="Switch Theme" />
                <ListItemIcon>
                    {palette == 'light' ? (
                        <Brightness4Rounded />
                    ) : (
                        <Brightness7Rounded />
                    )}
                </ListItemIcon>
            </ListItem>
            <ListItem button divider onClick={handleMenuClose}>
                <ListItemText
                    primary={
                        <Typography color="textPrimary" variant="body2">
                            Referred Friends
                        </Typography>
                    }
                    secondary="0"
                />
                <ListItemIcon className="ms-2">
                    <PeopleRounded />
                </ListItemIcon>
            </ListItem>

            <ListItem divider button onClick={handleMenuClose}>
                <ListItemText
                    primary={
                        <Typography color="textPrimary" variant="body2">
                            BN Token
                        </Typography>
                    }
                    secondary="0"
                />
                <ListItemIcon>
                    <AccountBalanceWalletOutlined />
                </ListItemIcon>
            </ListItem>
            {!mdUp && (
                <>
                    {/*  <ListItem disablePadding>
                        <ListItemButton
                            onClick={(e) => {
                                e.stopPropagation();
                                history.push('/chat');
                            }}
                        >
                            <ListItemIcon>
                                <Badge
                                    color="primary"
                                    badgeContent={messagesCount}
                                >
                                    <ForumRounded />
                                </Badge>
                            </ListItemIcon>
                            <ListItemText primary="Messages" />
                        </ListItemButton>
                    </ListItem> */}
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={(e) => {
                                e.stopPropagation();
                                history.push('/notifications');
                                handleMarkAsSeen();
                            }}
                        >
                            <ListItemIcon>
                                <Badge
                                    color="primary"
                                    badgeContent={notificationsCount}
                                >
                                    <Notifications />
                                </Badge>
                            </ListItemIcon>
                            <ListItemText primary="Notifications" />
                        </ListItemButton>
                    </ListItem>
                </>
            )}

            <ListItem
                divider
                button
                onClick={() => {
                    dispatch(signout());
                    dispatch(clearAllChatData());
                }}
            >
                <ListItemText primary="Sign Out" />
                <ListItemIcon>
                    <ExitToAppRounded color="secondary" />
                </ListItemIcon>
            </ListItem>
        </>
    );
}
