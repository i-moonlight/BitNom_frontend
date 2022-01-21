import { Reply } from '@mui/icons-material';
import { Avatar, Grid, IconButton, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SentMessage({ message, onReply = () => null }) {
    const [show_reply, setShowReply] = useState(false);
    const user = message?.author?._id || {};

    return (
        <Grid
            item
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            onMouseEnter={() => setShowReply(true)}
            onMouseLeave={() => setShowReply(false)}
            style={{
                marginTop: '20px',
                width: '70%',
                backgroundColor: '#f0f8ff',
            }}
        >
            <Grid item xs={2} container justifyContent="center">
                <Link to={`/users/${user}`} style={{ textDecoration: 'none' }}>
                    <Avatar
                        src={
                            user.image
                                ? `${process.env.REACT_APP_USERS_IMAGES_URL}${user.image}`
                                : 'https://wallpaperaccess.com/full/2213426.jpg'
                        }
                    />
                </Link>
            </Grid>
            <Grid
                style={{ position: 'relative' }}
                item
                container
                xs={10}
                justifyContent="flex-start"
                direction="column"
            >
                <Grid item style={{ marginBottom: '10px' }}>
                    <Typography variant="body1" component="p">
                        <Link
                            to={`/users/${user}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <strong>{user}</strong>
                        </Link>
                    </Typography>
                    <Typography variant="caption" component="span">
                        {format(new Date(message?.date), 'MMMM do y, h:mm aaa')}
                    </Typography>
                    {message?.responseTo && (
                        <Typography variant="body2" component="article">
                            {message?.responsTo?.text}
                        </Typography>
                    )}
                    <Typography variant="body2" component="article">
                        {message?.text}
                    </Typography>
                </Grid>
                {show_reply && (
                    <IconButton
                        style={{
                            fontSize: '1em',
                            position: 'absolute',
                            bottom: '5px',
                            right: '3px',
                            color: '#bbb',
                        }}
                        size="small"
                        onClick={onReply}
                    >
                        <Reply />
                    </IconButton>
                )}
            </Grid>
        </Grid>
    );
}
