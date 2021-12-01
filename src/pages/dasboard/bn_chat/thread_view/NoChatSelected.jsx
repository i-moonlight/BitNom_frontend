import { Typography } from '@mui/material';
import { Button } from '../../../../components/Button';

export default function NoChatSelected() {
    return (
        <div
            // style={{ minHeight: '55vh' }}
            className="d-flex justify-content-center align-items-center mx-auto w-100  my-5 py-5"
        >
            <div className="text-center h-100">
                <Typography variant="body1" className="my-2">
                    You have no chat selected
                </Typography>
                <Typography variant="body2" color="GrayText">
                    Choose one from your existing chats, or start a new chat
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    textCase
                    className="my-3"
                >
                    Start a new chat
                </Button>
            </div>
        </div>
    );
}
