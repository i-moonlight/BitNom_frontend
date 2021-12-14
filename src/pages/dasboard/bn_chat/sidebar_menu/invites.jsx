import {
    CircularProgress,
    Grid,
    List,
    ListSubheader,
    Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat } from '../../../../store/actions/chatActions';
import ChatItem from './chat';

export default function Invites({ invites, loading }) {
    const dispatch = useDispatch();
    const state = useSelector((st) => st);
    const activeChatId = state.chats.current_chat?._id;
    const openChatInvite = (chat) => {
        const current_chat = state.chats.current_chat;
        if (current_chat?._id !== chat?._id) {
            dispatch(setCurrentChat(chat));
        }
    };
    return (
        <>
            {invites && invites?.length > 0 && (
                <List
                    component="nav"
                    subheader={
                        <ListSubheader component="div">Invites</ListSubheader>
                    }
                >
                    {invites?.map((chat) => (
                        <ChatItem
                            key={chat._id}
                            chat={chat}
                            onClick={() => openChatInvite(chat)}
                            activeChatId={activeChatId}
                        />
                    ))}
                </List>
            )}
            {loading && !invites?.length > 0 && <CircularProgress />}
            {!loading && !invites?.length > 0 && (
                <Grid
                    alignItems="centre"
                    justifyContent="centre"
                    item
                    direction
                    column
                >
                    <Typography>You have no chat invites yet!</Typography>
                </Grid>
            )}
        </>
    );
}
