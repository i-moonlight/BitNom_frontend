import { MoreVert } from '@mui/icons-material';
import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getDistanceToNowWithSuffix } from '../../../components/utilities/date.components';
import { getUserInitials } from '../../../utilities/Helpers';
import ScrollPreview from '../bn_connect/scroll/ScrollPreview';
import EventPreview from '../events/EventPreview';
import { contentBodyFactory, getReactionsSum } from '../utilities/functions';
import SavedItemsOptionPopover from './SavedItemsOptionPopover';

const savedItemOptionId = 'menu-savedItem-option';

export default function SavedPost({ scroll }) {
    const [savedItemOptionAnchorEl, setSavedItemOptionAnchorEl] =
        useState(null);
    const isSavedItemOptionOpen = Boolean(savedItemOptionAnchorEl);

    const handleSavedItemOptionOpen = (event) => {
        setSavedItemOptionAnchorEl(event.currentTarget);
    };

    const handleSavedItemOptionClose = () => {
        setSavedItemOptionAnchorEl(null);
    };
    const location = useLocation();
    const history = useHistory();
    const contentClickHandler = (e) => {
        const targetLink = e.target.closest('a');
        if (!targetLink) return;
        e.preventDefault();
        e.stopPropagation();
        history.push(targetLink.href.substring(window.location.origin.length));
    };
    const authorInitials = getUserInitials(scroll?.author?.displayName);

    return (
        <>
            <Card
                style={{ marginBottom: 16, zIndex: 1 }}
                onClick={() => history.push(`/post/${scroll?._id}`)}
            >
                <CardActionArea style={{ margin: 0, padding: 0 }} disableRipple>
                    <CardHeader
                        avatar={
                            <Avatar
                                style={{
                                    backgroundColor: '#fed132',
                                }}
                                src={
                                    scroll?.author?.profile_pic &&
                                    process.env.REACT_APP_BACKEND_URL +
                                        scroll?.author?.profile_pic
                                }
                                aria-label="recipe"
                            >
                                {authorInitials}
                            </Avatar>
                        }
                        action={
                            <IconButton
                                size="small"
                                style={{
                                    display:
                                        !location.pathname.includes(
                                            'bookmarks'
                                        ) && 'none',
                                    zIndex: 3,
                                }}
                                className="m-1 p-1"
                                aria-label="post options"
                                aria-controls={savedItemOptionId}
                                aria-haspopup="true"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSavedItemOptionOpen(e);
                                }}
                                color="inherit"
                            >
                                <MoreVert />
                            </IconButton>
                        }
                        title={
                            <div className="center-horizontal">
                                <Typography
                                    component="a"
                                    style={{ marginRight: 8, zIndex: 2 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        history.push(
                                            `/users/${scroll?.author?._id}`
                                        );
                                    }}
                                >
                                    {scroll?.author?.displayName}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {`@${scroll?.author?._id}`}
                                </Typography>
                            </div>
                        }
                        subheader={
                            <Typography
                                component="span"
                                color="textSecondary"
                                variant="body2"
                            >
                                {getDistanceToNowWithSuffix(scroll?.createdAt)}
                            </Typography>
                        }
                    />
                    <CardContent>
                        <Typography variant="body2" component="div">
                            <Typography
                                variant="body2"
                                onClick={(e) => contentClickHandler(e)}
                                dangerouslySetInnerHTML={{
                                    __html: contentBodyFactory(scroll),
                                }}
                                style={{
                                    zIndex: 2,
                                    overflowWrap: 'break-word',
                                    wordWrap: 'break-word',
                                }}
                            ></Typography>
                        </Typography>
                        <Grid container style={{ margin: '3px 0px' }}>
                            {scroll?.video?.path && (
                                <Grid item xs={12}>
                                    <CardMedia
                                        component="video"
                                        poster={`${process.env.REACT_APP_BACKEND_URL}${scroll?.video?.thumbnail}`}
                                        src={`${process.env.REACT_APP_BACKEND_URL}${scroll?.video?.path}`}
                                        controls
                                        preload="metadata"
                                    />
                                </Grid>
                            )}
                            {scroll?.images.length > 0 &&
                                scroll?.images?.map((imageURL) => (
                                    <Grid
                                        style={{
                                            padding: '2px',
                                        }}
                                        key={imageURL}
                                        item
                                        xs={scroll?.images.length > 1 ? 6 : 12}
                                    >
                                        <div
                                            style={{
                                                height: 200,
                                                borderRadius: 8,
                                                width: '100%',
                                                backgroundImage:
                                                    'url(' +
                                                    process.env
                                                        .REACT_APP_BACKEND_URL +
                                                    imageURL +
                                                    ')',
                                                backgroundSize: 'cover',
                                                backgroundColor:
                                                    'rgba(0,0,0,0.2)',
                                                backgroundBlendMode:
                                                    'soft-light',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                        {scroll?.shared_resource?._id &&
                            scroll?.shared_resource?.type === 'post' && (
                                <ScrollPreview
                                    scroll={scroll?.shared_resource?._id}
                                />
                            )}
                        {scroll?.shared_resource?._id &&
                            scroll?.shared_resource?.type === 'event' && (
                                <EventPreview
                                    event={scroll?.shared_resource?._id}
                                />
                            )}

                        <br />
                        <Typography
                            color="textSecondary"
                            component="div"
                            display="inline"
                        >
                            <Typography display="inline" variant="body2">
                                {`${getReactionsSum(scroll)} ${
                                    getReactionsSum(scroll) === 1
                                        ? 'Reaction'
                                        : 'Reactions'
                                }`}
                            </Typography>
                            {' . '}
                            <Typography variant="body2" display="inline">
                                {`${scroll?.comments} ${
                                    scroll?.comments === 1
                                        ? 'Comment'
                                        : 'Comments'
                                }`}
                            </Typography>
                        </Typography>
                    </CardContent>

                    <SavedItemsOptionPopover
                        savedItem={scroll}
                        itemType="post"
                        savedItemOptionId={savedItemOptionId}
                        savedItemOptionAnchorEl={savedItemOptionAnchorEl}
                        isSavedItemOptionOpen={isSavedItemOptionOpen}
                        handleSavedItemOptionClose={handleSavedItemOptionClose}
                    />
                </CardActionArea>
            </Card>
        </>
    );
}
