import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { Button } from '../../../../components/Button';
import CreateChatPrompt from './CreateChatPrompt';

export default function NoChatSelected() {
    const [createChatOpen, setCreateChatInviteOpen] = useState(false);
    return (
        <div
            // style={{ minHeight: '55vh' }}
            className="d-flex justify-content-center align-items-center mx-auto w-100  my-5 py-5"
        >
            <div className="text-center h-100">
                <Typography variant="body1" className="my-2">
                    You have not selected any chat
                </Typography>
                <Typography variant="body2" color="GrayText">
                    Choose one from your existing chats, or start a new one.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    textCase
                    className="my-3"
                    onClick={() => setCreateChatInviteOpen(true)}
                >
                    Start a new chat
                </Button>
            </div>
            <CreateChatPrompt
                openChatInvite={createChatOpen}
                setChatInviteOpen={(openChatInvite) =>
                    setCreateChatInviteOpen(openChatInvite)
                }
            />
        </div>
    );
}
