import { Card, CardContent, Typography } from '@mui/material';

export default function Blocked() {
    return (
        <Card>
            <CardContent>
                <Typography>
                    You can no longer send messages to this chat!
                </Typography>
            </CardContent>
        </Card>
    );
}
