import { MessageOutlined } from '@mui/icons-material';
import {
    Avatar,
    Card,
    CircularProgress,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { contentBodyFactory, truncateText } from '../utilities/functions';

export default function TrendingPostsCard({ trending, loading }) {
    const history = useHistory();
    const contentClickHandler = (e) => {
        const targetLink = e.target.closest('a');
        if (!targetLink) return;
        e.preventDefault();
        e.stopPropagation();
        history.push(targetLink.href.substring(location.origin.length));
    };
    return (
        <Paper
            style={{
                marginBottom: 16,
            }}
        >
            <List
                style={{ padding: 8, paddingBottom: 0 }}
                component={Card}
                variant="outlined"
            >
                <Typography style={{ marginLeft: 8 }} variant="body1">
                    Trending Posts
                </Typography>
                {loading && (
                    <Grid align="center">
                        <CircularProgress
                            color="primary"
                            size={24}
                            thickness={4}
                        />
                    </Grid>
                )}
                {trending &&
                    trending?.slice(0, 3).map((post) => (
                        <ListItem key={post?._id} divider>
                            <ListItemAvatar>
                                <Avatar
                                    src={
                                        post?.images?.length > 0
                                            ? process.env
                                                  .REACT_APP_BACKEND_URL +
                                              post?.images[0]
                                            : ''
                                    }
                                    variant="square"
                                >
                                    <MessageOutlined
                                        style={{
                                            display:
                                                post?.images?.length > 0
                                                    ? 'none'
                                                    : 'block',
                                        }}
                                        color="primary"
                                    />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography
                                        onClick={(e) => contentClickHandler(e)}
                                        style={{ zIndex: 2 }}
                                        dangerouslySetInnerHTML={{
                                            __html: truncateText(
                                                contentBodyFactory(post),
                                                90
                                            ),
                                        }}
                                    ></Typography>
                                }
                                secondary={`${post?.reactions?.likes} ${
                                    post?.reactions?.likes === 1
                                        ? 'Like'
                                        : 'Likes'
                                } . ${post?.comments} ${
                                    post?.comments === 1
                                        ? 'Comment'
                                        : 'Comments'
                                }`}
                            />
                        </ListItem>
                    ))}
                {!loading && trending?.length === 0 && (
                    <Grid className="p-2">
                        <Typography color="Primary" variant="body2">
                            Trending posts will appear hear..start
                            participating.
                        </Typography>
                    </Grid>
                )}
            </List>
        </Paper>
    );
}
