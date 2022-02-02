import {
    BookmarkRounded,
    CollectionsBookmarkRounded,
    EventRounded,
    PersonRounded,
} from '@mui/icons-material';
import {
    Avatar,
    Badge,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { getUserInitials } from '../../../utilities/Helpers';

const useStyles = makeStyles((theme) => ({
    clickableTypography: {
        padding: '0px 8px',
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.action.hover,
        },
    },
}));

export default function UserCard({ setOpen, followers, following }) {
    const classes = useStyles();
    const card = useRef();
    const history = useHistory();
    const location = useLocation();
    const state = useSelector((st) => st);

    const user = state.auth.user;
    const userInitials = getUserInitials(user?.displayName);

    const sticky =
        window.innerHeight < card?.current?.clientHeight + 176
            ? window.innerHeight - (card?.current?.clientHeight + 24)
            : 160;

    return (
        <div
            ref={card}
            style={{
                position: 'sticky',
                top: sticky,
                //176
            }}
        >
            <Card style={{ marginBottom: 16 }} variant={'outlined'}>
                <CardMedia
                    style={{ height: 100 }}
                    src={process.env.REACT_APP_BACKEND_URL + user?.cover_pic}
                    image={process.env.REACT_APP_BACKEND_URL + user?.cover_pic}
                />
                <CardContent
                    style={{
                        position: 'relative',
                        top: -80,
                        marginBottom: -80,
                    }}
                >
                    <div className="space-between">
                        <div>
                            <Avatar
                                src={
                                    user?.profile_pic &&
                                    process.env.REACT_APP_BACKEND_URL +
                                        user?.profile_pic
                                }
                                variant="rounded"
                                style={{
                                    backgroundColor: '#fed132',
                                    marginRight: 12,
                                    width: 80,
                                    height: 80,
                                }}
                            >
                                {userInitials}
                            </Avatar>
                            <Typography className="pt-1" variant="body2">
                                {user?.displayName}
                            </Typography>
                            <Typography
                                gutterBottom
                                color="textSecondary"
                                variant="body2"
                            >
                                {`@${user?._id}`}
                            </Typography>
                        </div>

                        <div
                            style={{
                                position: 'relative',
                                top: 60,
                            }}
                        ></div>
                    </div>

                    <Divider style={{ marginTop: 8, marginBottom: 8 }} />

                    <div className="center-horizontal space-between">
                        <div
                            onClick={() => history.push('/profile/posts')}
                            className={classes.clickableTypography}
                        >
                            <Typography variant="body2">Posts</Typography>
                            <div className="center-horizontal">
                                <CollectionsBookmarkRounded
                                    color="primary"
                                    className="mx-2"
                                    fontSize="small"
                                />
                                <Typography variant="body2">
                                    {state?.postCount?.postCount}
                                </Typography>
                            </div>
                        </div>
                        <div
                            className={classes.clickableTypography}
                            onClick={() => history.push('/profile/friends')}
                        >
                            <Typography variant="body2">Followers</Typography>
                            <div className="center-horizontal">
                                <PersonRounded
                                    color="primary"
                                    className="mx-2"
                                    fontSize="small"
                                />
                                <Typography variant="body2">
                                    {followers}
                                </Typography>
                            </div>
                        </div>
                        <div
                            className={classes.clickableTypography}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                history.push('/profile/friends/following');
                            }}
                        >
                            <Typography variant="body2">Following</Typography>
                            <div className="center-horizontal">
                                <PersonRounded
                                    color="primary"
                                    className="mx-2"
                                    fontSize="small"
                                />
                                <Typography variant="body2">
                                    {following}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <Divider />
                <CardActions className="py-0">
                    <Button
                        color="inherit"
                        textCase
                        startIcon={<BookmarkRounded />}
                        variant="text"
                        className="py-1 my-1"
                        onClick={() => history.push('/profile/bookmarks')}
                    >
                        Saved Items
                    </Button>
                </CardActions>
                <Divider />
                <CardActions className="py-0">
                    <Button
                        color="inherit"
                        textCase
                        startIcon={<EventRounded />}
                        endIcon={
                            <Badge
                                className="ms-2 me-3"
                                badgeContent={state?.eventCount?.eventCount}
                                color="primary"
                            ></Badge>
                        }
                        variant="text"
                        className="py-1 my-1 me-3"
                        onClick={() => history.push('/events')}
                    >
                        Events
                    </Button>
                </CardActions>
            </Card>
            {((location.pathname.includes('/connect') &&
                !location.pathname.includes('/connect/')) ||
                location.pathname.includes('/post/')) && (
                <Button onClick={setOpen} color="primary" fullWidth textCase>
                    Create Post
                </Button>
            )}
        </div>
    );
}
