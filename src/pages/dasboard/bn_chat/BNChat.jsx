import { Card, Container, Grid, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import Screen from '../../../components/Screen';
import SideBarHeader from './components/chat_header/sid_bar_header';
import Chats from './sidebar_menu';
import Messages from './thread_view/messages';

export default function BnChat() {
    const [chatMobileOpen, setChatMobileOpen] = useState(false);

    const classes = useStyles();
    const xsDown = useMediaQuery('(max-width:1200px)');

    return (
        <Screen>
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {!chatMobileOpen && (
                            <Grid item xs={12} sm={4} md={4}>
                                <Card
                                    style={{
                                        height:
                                            chatMobileOpen === true
                                                ? window.innerHeight - 90
                                                : window.innerHeight - 200,
                                    }}
                                >
                                    <SideBarHeader className={classes.root} />
                                    <div
                                        style={{
                                            maxHeight: '65vh',
                                            overflow: 'auto',
                                        }}
                                    >
                                        <Chats
                                            onSetChatMobile={() =>
                                                setChatMobileOpen(true)
                                            }
                                        />
                                    </div>
                                </Card>
                            </Grid>
                        )}
                        {((chatMobileOpen && xsDown) ||
                            (!chatMobileOpen && !xsDown)) && (
                            <Grid item xs={12} sm={8} md={8}>
                                <Card
                                    style={{
                                        height: window.innerHeight - 200,
                                    }}
                                >
                                    <Messages
                                        onExitChatMobile={() => {
                                            setChatMobileOpen(false);
                                        }}
                                    />
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                </Container>
            </div>
        </Screen>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
    devider: {
        height: '70vh',
        margin: 4,
    },
    sidebar: {
        width: '33%',
        borderRight: '1px solid #ddd',
    },
    threadView: {
        width: '67%',
    },
}));
