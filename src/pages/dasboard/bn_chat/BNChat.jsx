import {
    Card,
    Container,
    Fab,
    Grid,
    Hidden,
    makeStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import Screen from '../../../components/Screen';
import SideBarHeader from './components/chat_header/side_bar_header';

import Chats from './sidebar_menu';

import { Create } from '@material-ui/icons';
import Messages from './thread_view/messages';
import CreateChatPrompt from './thread_view/create_chat_prompt';
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

export default function BnChat() {
    const classes = useStyles();
    const [createChatOpen, setCreateChatInviteOpen] = useState(false);
    return (
        <Screen>
            <Container maxWidth="lg">
                <Grid container>
                    <Grid item xs={12} sm={3}>
                        <Card style={{ height: '84vh' }}>
                            {' '}
                            <SideBarHeader
                                className={classes.root}
                                setChatInviteOpen={(open) =>
                                    setCreateChatInviteOpen(open)
                                }
                            />
                            <div
                                style={{ maxHeight: '65vh', overflow: 'auto' }}
                            >
                                <Chats />
                            </div>
                            <div
                                style={{
                                    margin: '20px',
                                    position: 'absolute',
                                    bottom: '0px',
                                }}
                            >
                                <Fab
                                    color="primary"
                                    onClick={() =>
                                        setCreateChatInviteOpen(true)
                                    }
                                >
                                    <Create />
                                </Fab>
                            </div>
                        </Card>
                    </Grid>
                    <Hidden smDown>
                        {' '}
                        <Grid item xs={12} sm={9}>
                            <Card style={{ height: '84vh' }}>
                                {' '}
                                <Messages />
                            </Card>
                        </Grid>
                    </Hidden>
                </Grid>
                <CreateChatPrompt
                    openChatInvite={createChatOpen}
                    setChatInviteOpen={(openChatInvite) =>
                        setCreateChatInviteOpen(openChatInvite)
                    }
                />
            </Container>
        </Screen>
    );
}
