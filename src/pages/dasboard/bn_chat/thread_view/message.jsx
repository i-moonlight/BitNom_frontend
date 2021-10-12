import { Avatar, Grid, Typography, IconButton, CardMedia } from '@mui/material';
import { Reply } from '@mui/icons-material';
import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Message({ message, onReply = () => null }) {
    const [show_reply, setShowReply] = useState(false);
    const state = useSelector((st) => st);
    const user = state.auth.user;
    const author = message.author || {};
    return (
        <>
            {user && user._id === author && (
                <Grid
                    item
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    onMouseEnter={() => setShowReply(true)}
                    onMouseLeave={() => setShowReply(false)}
                    style={{
                        marginLeft: 'auto',

                        maxWidth: '480px',
                    }}
                >
                    <Grid
                        item
                        container
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        direction="column"
                        xs={2}
                        style={{
                            marginTop: '20px',
                            width: '30px',
                        }}
                    >
                        {' '}
                        <Typography variant="caption" component="span">
                            {moment(message.date).format(' h:mm a')}
                        </Typography>
                    </Grid>
                    <Grid
                        xs={8}
                        style={{
                            position: 'relative',
                            marginTop: '20px',
                            backgroundColor: '#f0f8ff',
                            borderRadius: '20px 20px 0px 20px',
                        }}
                        item
                        container
                        justifyContent="center"
                        direction="column"
                    >
                        {' '}
                        <Grid
                            item
                            style={{
                                marginBottom: '10px',
                                marginLeft: '10px',
                            }}
                        >
                            <Typography variant="body1" component="p">
                                <Link style={{ textDecoration: 'none' }}>
                                    <strong>{author}</strong>
                                </Link>
                            </Typography>

                            {message.responseTo && (
                                <Typography variant="body2" component="article">
                                    {message.responsTo?.text}
                                </Typography>
                            )}
                            {message?.video && (
                                <Grid
                                    item
                                    xs={12}
                                    style={{ marginRight: '10px' }}
                                >
                                    <CardMedia
                                        component="video"
                                        src={`${process.env.REACT_APP_BACKEND_URL}${message?.video}`}
                                        controls
                                    />
                                </Grid>
                            )}
                            {message?.images?.length > 0 &&
                                message?.images?.map((imageURL) => (
                                    <Grid
                                        className="mt-3"
                                        key={imageURL}
                                        item
                                        xs={
                                            message?.images?.length > 1 ? 6 : 12
                                        }
                                        // onClick={() => {
                                        //   setImagePreviewURL(
                                        //     process.env.REACT_APP_BACKEND_URL + imageURL
                                        //   );
                                        //   setImagePreviewOpen(true);
                                        // }}
                                        style={{ marginRight: '10px' }}
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

                            <Typography variant="body2" component="article">
                                {message.text}
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

                    <Grid
                        item
                        xs={2}
                        container
                        justifyContent="center"
                        alignItems="center"
                        style={{
                            marginTop: '20px',
                        }}
                    >
                        <Link style={{ textDecoration: 'none' }}>
                            <Avatar
                                src={
                                    user.image
                                        ? `${process.env.REACT_APP_USERS_IMAGES_URL}${user.image}`
                                        : 'https://wallpaperaccess.com/full/2213426.jpg'
                                }
                            />
                        </Link>
                    </Grid>
                </Grid>
            )}
            {user && user._id !== author && (
                <Grid
                    item
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    onMouseEnter={() => setShowReply(true)}
                    onMouseLeave={() => setShowReply(false)}
                    style={{
                        marginTop: '20px',
                        marginRight: 'auto',
                        maxWidth: '480px',
                    }}
                >
                    <Grid item xs={2} container justifyContent="center">
                        <Link style={{ textDecoration: 'none' }}>
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
                        style={{
                            position: 'relative',
                            backgroundColor: '#bde0ff',
                            borderRadius: '20px 20px 20px 0px',
                        }}
                        item
                        container
                        xs={8}
                        justifyContent="center"
                        direction="column"
                    >
                        {' '}
                        <Grid
                            item
                            style={{ marginBottom: '10px', marginLeft: '10px' }}
                        >
                            <Typography variant="body1" component="p">
                                <Link style={{ textDecoration: 'none' }}>
                                    <strong>{author}</strong>
                                </Link>
                            </Typography>
                            {message.responseTo && (
                                <Typography variant="body2" component="article">
                                    {message.responsTo?.text}
                                </Typography>
                            )}
                            {message?.video && (
                                <Grid
                                    item
                                    xs={12}
                                    style={{ marginRight: '10px' }}
                                >
                                    <CardMedia
                                        component="video"
                                        src={`${process.env.REACT_APP_BACKEND_URL}${message?.video}`}
                                        controls
                                    />
                                </Grid>
                            )}
                            {message?.images?.length > 0 &&
                                message?.images?.map((imageURL) => (
                                    <Grid
                                        className="mt-3"
                                        key={imageURL}
                                        item
                                        xs={message?.images.length > 1 ? 6 : 12}
                                        // onClick={() => {
                                        //   setImagePreviewURL(
                                        //     process.env.REACT_APP_BACKEND_URL + imageURL
                                        //   );
                                        //   setImagePreviewOpen(true);
                                        // }}
                                        style={{ marginRight: '10px' }}
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
                            <Typography variant="body2" component="article">
                                {message.text}
                            </Typography>{' '}
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
                    <Grid
                        item
                        container
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        direction="column"
                        xs={2}
                        style={{
                            marginTop: '20px',
                            width: '30px',
                        }}
                    >
                        {' '}
                        <Typography variant="caption" component="span">
                            {moment(message.date).format(' h:mm a')}
                        </Typography>
                    </Grid>
                </Grid>
            )}
        </>
    );
}
