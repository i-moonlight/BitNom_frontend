import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function AwaitResponse({ dialogue }) {
    return (
        <Grid
            item
            justifyContent="center"
            alignItems="center"
            container
            direction="column"
            style={{ width: '100%', marginTop: '40%' }}
        >
            <Typography variant="body2">
                Please wait as{' '}
                <Link to={`/users/${dialogue?.otherUser?.info?._id?._id}`}>
                    {dialogue?.otherUser?.info?._id?.displayName}
                </Link>{' '}
                responds to your chat invitation
            </Typography>
        </Grid>
    );
}
