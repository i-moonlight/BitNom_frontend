import { Grid } from '@mui/material';
import SideBarHeader from '../components/chat_header/side_bar_header';
import Chats from '../sidebar';

export default function ChatMenu() {
    return (
        <Grid container direction="column">
            <SideBarHeader />
            <Chats />
        </Grid>
    );
}
