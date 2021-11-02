import { Button, Typography } from '@mui/material';

export default function NoChatSelected() {
    return (
        <div
            style={{ minHeight: '55vh' }}
            className="d-flex justify-content-center align-items-center mx-auto w-100"
        >
            <div className="text-center h-100">
                <Typography variant="body1">
                    You have no chat selected
                </Typography>
                <Typography variant="body2">
                    Choose one from your existing chats, or start a new chat
                </Typography>
                <Button variant="contained" color="primary" className="my-3">
                    Start a new chat
                </Button>
            </div>
        </div>
    );
}
