import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

import moment from 'moment';
import { useLocation, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import SavedItemsOptionPopover from './SavedItemsOptionPopover';
import { contentBodyFactory, getReactionsSum } from '../utilities/functions';

import { getUserInitials } from '../../../utilities/Helpers';
import ScrollPreview from '../bn_connect/scroll/ScrollPreview';
import EventPreview from '../events/EventPreview';

const savedItemOptionId = 'menu-savedItem-option';

export default function SavedPost({
    scroll,
    setImagePreviewOpen,
    setImagePreviewURL,
}) {
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
            <Card style={{ marginBottom: 16 }}>
                <CardActionArea
                    disableRipple
                    //onClick={() => history.push('/connect')}
                >
                    <CardHeader
                        avatar={
                            <Avatar
                                style={{
                                    backgroundColor: '#fed132',
                                }}
                                src={scroll?.author?.profile_pic}
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
                                        location.pathname.includes('posts') &&
                                        'none',
                                }}
                                className="m-1 p-1"
                                aria-label="show more"
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
                                <Typography style={{ marginRight: 8 }}>
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
                        subheader={moment(scroll?.createdAt).fromNow()}
                    />
                    <CardContent>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            <Typography
                                onClick={(e) => contentClickHandler(e)}
                                dangerouslySetInnerHTML={{
                                    __html: contentBodyFactory(scroll),
                                }}
                                style={{ zIndex: 2 }}
                            ></Typography>
                            {/* <br />
            {scroll?.content_entities?.map((entity) => {
              let colortext = scroll?.content?.slice(
                entity?.offset,
                entity?.offset + entity?.length
              );

              return (
                <a
                  href={entity?.url}
                  className='mx-1 mt-1'
                  key={entity?.offset}
                >
                  {colortext}
                </a>
              );
            })} */}
                        </Typography>
                        <Grid container spacing={2} className="mb-2">
                            {scroll?.video && (
                                <Grid item xs={12}>
                                    <CardMedia
                                        component="video"
                                        src={`${process.env.REACT_APP_BACKEND_URL}${scroll?.video}`}
                                        controls
                                    />
                                </Grid>
                            )}
                            {scroll?.images.length > 0 &&
                                scroll?.images?.map((imageURL) => (
                                    <Grid
                                        className="mt-3"
                                        key={imageURL}
                                        item
                                        xs={scroll?.images.length > 1 ? 6 : 12}
                                        onClick={() => {
                                            setImagePreviewURL(
                                                process.env
                                                    .REACT_APP_BACKEND_URL +
                                                    imageURL
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
                        <Typography display="inline">
                            <Typography display="inline">
                                {`${getReactionsSum(scroll)} ${
                                    getReactionsSum(scroll) === 1
                                        ? 'Reaction'
                                        : 'Reactions'
                                }`}
                            </Typography>
                            {' . '}
                            <Typography display="inline">
                                {`${scroll?.comments} ${
                                    scroll?.comments === 1
                                        ? 'Comment'
                                        : 'Comments'
                                }`}
                            </Typography>
                        </Typography>
                    </CardContent>

                    <Divider />

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
