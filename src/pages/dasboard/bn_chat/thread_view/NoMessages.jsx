import { Typography } from '@mui/material';
import { Button } from '../../../../components/Button';

export default function EmptyMessages() {
    return (
        <div
            // style={{ minHeight: '55vh' }}
            className="d-flex justify-content-center align-items-center mx-auto w-100 my-5 py-5"
        >
            <div className="text-center h-100">
                <Typography variant="body1">
                    You have no messages yet.
                </Typography>
                <Typography variant="body2">
                    Be the first one to start the conversation
                </Typography>
                <Button
                    textCase
                    variant="contained"
                    color="primary"
                    className="my-3"
                >
                    New Message
                </Button>
            </div>
        </div>
    );
}
