import { MoreHorizRounded } from '@mui/icons-material';
import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getDistanceToNow } from '../../../components/utilities/date.components';
import { getUserInitials } from '../../../utilities/Helpers';
import { contentBodyFactory, getReactionsSum } from '../utilities/functions';
import SavedItemsOptionPopover from './SavedItemsOptionPopover';

const savedItemOptionId = 'menu-savedItem-option';
export default function SavedComment({
    comment,
    setImagePreviewURL,
    setImagePreviewOpen,
}) {
    const history = useHistory();
    const contentClickHandler = (e) => {
        const targetLink = e.target.closest('a');
        if (!targetLink) return;
        e.preventDefault();
        e.stopPropagation();
        history.push(targetLink.href.substring(location.origin.length));
    };
    const [savedItemOptionAnchorEl, setSavedItemOptionAnchorEl] =
        useState(null);
    const isSavedItemOptionOpen = Boolean(savedItemOptionAnchorEl);

    const handleSavedItemOptionOpen = (event) => {
        setSavedItemOptionAnchorEl(event.currentTarget);
    };

    const handleSavedItemOptionClose = () => {
        setSavedItemOptionAnchorEl(null);
    };
    const commentUserInitials = getUserInitials(comment?.author?.displayName);
    return (
        <>
            <Card style={{ marginBottom: 16 }}>
                <CardActionArea
                    disableRipple
                    onClick={() => history.push(`/post/${comment?.scroll}`)}
                >
                    <CardHeader
                        avatar={
                            <Avatar
                                style={{
                                    backgroundColor: '#fed132',
                                }}
                                src={
                                    comment?.author?.profile_pic &&
                                    process.env.REACT_APP_BACKEND_URL +
                                        comment?.author?.profile_pic
                                }
                            >
                                {commentUserInitials}
                            </Avatar>
                        }
                        action={
                            <IconButton
                                size="small"
                                className="m-1 p-1"
                                aria-label="show more"
                                aria-controls={savedItemOptionId}
                                aria-haspopup="true"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSavedItemOptionOpen(e);
                                }}
                            >
                                <MoreHorizRounded />
                            </IconButton>
                        }
                        title={
                            <Typography component="div" display="inline">
                                <Typography
                                    component="a"
                                    style={{ marginRight: 4, zIndex: 2 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        history.push(
                                            `/users/${comment?.author?._id}`
                                        );
                                    }}
                                >
                                    {comment?.author?.displayName}
                                </Typography>{' '}
                                <Typography display="inline" variant="body2">
                                    . @{comment?.author?._id}
                                </Typography>{' '}
                                <Typography
                                    component="span"
                                    color="textSecondary"
                                    display="inline"
                                    variant="body2"
                                >
                                    . {getDistanceToNow(comment?.creation_date)}
                                </Typography>
                            </Typography>
                        }
                    />
                    <CardContent>
                        <Typography variant="body2" component="div">
                            <Typography
                                onClick={(e) => contentClickHandler(e)}
                                dangerouslySetInnerHTML={{
                                    __html: contentBodyFactory(comment),
                                }}
                                style={{
                                    zIndex: 2,
                                    overflowWrap: 'break-word',
                                    wordWrap: 'break-word',
                                }}
                                variant="body2"
                            ></Typography>

                            {comment?.image.length > 0 && (
                                <Grid container spacing={2}>
                                    <Grid
                                        className="mt-2"
                                        key={comment?.image}
                                        item
                                        xs={12}
                                        onClick={() => {
                                            setImagePreviewURL &&
                                                setImagePreviewURL(
                                                    process.env
                                                        .REACT_APP_BACKEND_URL +
                                                        comment?.image
                                                );
                                            setImagePreviewOpen(true);
                                        }}
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
                                                    comment?.image +
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
                                </Grid>
                            )}
                        </Typography>
                        <br />
                        <Typography
                            color="textSecondary"
                            component="div"
                            display="inline"
                        >
                            <Typography variant="body2" display="inline">
                                {`${getReactionsSum(comment)} ${
                                    getReactionsSum(comment) === 1
                                        ? 'Reaction'
                                        : 'Reactions'
                                }`}
                            </Typography>
                            {' . '}
                            <Typography variant="body2" display="inline">
                                {`${comment?.replies} ${
                                    comment?.replies === 1 ? 'Reply' : 'Replies'
                                }`}
                            </Typography>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <SavedItemsOptionPopover
                savedItem={comment}
                itemType="comment"
                savedItemOptionId={savedItemOptionId}
                savedItemOptionAnchorEl={savedItemOptionAnchorEl}
                isSavedItemOptionOpen={isSavedItemOptionOpen}
                handleSavedItemOptionClose={handleSavedItemOptionClose}
            />
        </>
    );
}
