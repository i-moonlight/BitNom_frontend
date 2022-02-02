import { MessageOutlined } from '@mui/icons-material';
import {
    Avatar,
    Card,
    CardActions,
    CardHeader,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Skeleton,
    Typography,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../components/Button';
import {
    contentBodyFactory,
    getReactionsSum,
    truncateText,
} from '../utilities/functions';

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
        <Card
            variant="outlined"
            style={{
                marginBottom: 16,
            }}
        >
            <CardHeader subheader="Trending posts" />
            <div>
                <List>
                    {trending?.length < 1 && !loading && (
                        <ListItem>
                            <ListItemText
                                primary="Nothing here yet"
                                secondary="Start to interact to show content here"
                            />
                        </ListItem>
                    )}

                    {loading &&
                        trending?.length < 1 &&
                        [1, 2, 3].map((post) => (
                            <ListItem
                                key={post}
                                style={{ zIndex: 1, cursor: 'pointer' }}
                            >
                                <ListItemAvatar>
                                    <span>
                                        <Skeleton
                                            animation="wave"
                                            variant="rectangular"
                                            height={50}
                                            width={50}
                                            className="br-2"
                                        />
                                    </span>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <span>
                                            <Skeleton
                                                variant="text"
                                                animation="wave"
                                            />
                                        </span>
                                    }
                                    secondary={
                                        <span>
                                            <Skeleton
                                                variant="text"
                                                animation="wave"
                                            />
                                        </span>
                                    }
                                />
                            </ListItem>
                        ))}

                    {trending?.slice(0, 3).map((post) => (
                        <ListItem
                            key={post?._id}
                            style={{ zIndex: 1, cursor: 'pointer' }}
                            onClick={() => history.push(`/post/${post?._id}`)}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    src={
                                        post?.images?.length > 0 ||
                                        post?.video?.thumbnail
                                            ? post?.video?.thumbnail
                                                ? process.env
                                                      .REACT_APP_BACKEND_URL +
                                                  post?.video?.thumbnail
                                                : process.env
                                                      .REACT_APP_BACKEND_URL +
                                                  post?.images[0]
                                            : ''
                                    }
                                    style={{ backgroundColor: 'inherit' }}
                                    variant="square"
                                >
                                    <MessageOutlined
                                        style={{
                                            display:
                                                post?.images?.length > 0 ||
                                                post?.video?.path
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
                                        variant="body2"
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
                                secondary={
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        {`${getReactionsSum(post)} ${
                                            getReactionsSum(post) === 1
                                                ? 'Reaction'
                                                : 'Reactions'
                                        } . ${post?.comments} ${
                                            post?.comments === 1
                                                ? 'Comment'
                                                : 'Comments'
                                        }`}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}

                    {(!loading && trending?.length === 0) ||
                        (!trending && (
                            <Grid className="p-2">
                                <Typography color="Primary" variant="body2">
                                    Trending posts will appear here.
                                </Typography>
                            </Grid>
                        ))}
                </List>
            </div>

            <CardActions>
                {trending?.length > 0 && (
                    <Button
                        textCase
                        size="small"
                        variant="text"
                        className="my-1"
                        onClick={() => {
                            history.push('/connect/trending');
                        }}
                    >
                        Show More
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}
