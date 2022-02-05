import {
    CircularProgress,
    Grid,
    List,
    ListSubheader,
    Typography,
} from '@mui/material';
import ChatItem from './chat';

export default function Invites({ invites, loading, openChat, activeChatId }) {
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
                            onClick={() => openChat(chat)}
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
