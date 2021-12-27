import { ExpandMoreRounded } from '@mui/icons-material';
import {
    Avatar,
    ButtonBase,
    Card,
    CardMedia,
    Grid,
    IconButton,
    Paper,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { Code, LinkTag } from '../../../../components/markdown_renders';
import { getUserInitials } from '../../../../utilities/Helpers';
import { useStyles } from '../utils/styles';

import { getDistanceToNowWithSuffix } from '../../../../components/utilities/date.components';

export default function IncomingMessage({ message, chat, onClick }) {
    const [show_reply, setShowReply] = useState(false);
    const classes = useStyles();
    const mdDown = useMediaQuery('(max-width:1279px)');
    const author = message?.author || {};
    const userInitials = getUserInitials(
        chat?.otherUser?.info?._id?.displayName
    );

    return (
        <div className={classes.messageLeft}>
            <ButtonBase>
                <Link
                    to={`/users/${chat?.otherUser?.info?._id?._id}`}
                    style={{ textDecoration: 'none' }}
                >
                    <Avatar
                        src={
                            chat?.otherUser?.info?._id?.profile_pic
                                ? process.env.REACT_APP_BACKEND_URL +
                                  chat?.otherUser?.info?._id?.profile_pic
                                : `https://ui-avatars.com/api/?name=${userInitials}&background=random`
                        }
                        alt={'avatar'}
                    >
                        {userInitials}
                    </Avatar>
                </Link>
            </ButtonBase>
            <Paper
                className={classes.incoming}
                onMouseEnter={() => setShowReply(true)}
                onMouseLeave={() => setShowReply(false)}
                elevation={0}
            >
                <Typography
                    variant="body1"
                    component="div"
                    style={{ marginLeft: '16px' }}
                >
                    <span
                        style={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <Link
                            to={`users/${author}`}
                            style={{
                                textDecoration: 'none',
                                marginRight: '5px',
                            }}
                        >
                            <small className={classes.author}>
                                <strong>@{author}</strong>
                            </small>
                        </Link>
                        {(show_reply || mdDown) && (
                            <IconButton
                                style={{
                                    fontSize: '1em',
                                    color: '#000',
                                }}
                                size="small"
                                onClick={onClick}
                            >
                                <ExpandMoreRounded />
                            </IconButton>
                        )}
                    </span>
                    {message?.edited === true ? (
                        <small>
                            <strong>(Edited)</strong>
                        </small>
                    ) : (
                        ''
                    )}
                </Typography>
                {message?.responseTo?.text?.length > 0 ? (
                    <Card variant="outlined" className={classes.responseTo}>
                        {' '}
                        <Typography
                            variant="body2"
                            component="div"
                            style={{
                                marginLeft: '8px',
                                marginTop: '8px',
                                marginRight: '8px',
                            }}
                        >
                            <ReactMarkdown
                                components={{ code: Code, Link: LinkTag }}
                            >
                                {message?.responseTo?.text?.length > 200
                                    ? message?.responseTo?.text?.substring(
                                          0,
                                          200
                                      ) + '...'
                                    : message?.responseTo?.text}
                            </ReactMarkdown>
                        </Typography>
                    </Card>
                ) : (
                    ''
                )}
                {message?.video && (
                    <Grid
                        item
                        xs={12}
                        style={{
                            marginRight: '10px',
                            marginLeft: '10px',
                            marginTop: '10px',
                        }}
                    >
                        <CardMedia
                            component="video"
                            src={`${process.env.REACT_APP_BACKEND_URL}${message?.video}`}
                            controls
                            styles={{ borderRadius: 8 }}
                        />
                    </Grid>
                )}
                {message?.images?.length > 0 &&
                    message?.images?.map((imageURL) => (
                        <Grid
                            className="mt-3"
                            key={imageURL}
                            item
                            xs={message?.images?.length > 1 ? 6 : 12}
                            // onClick={() => {
                            //   setImagePreviewURL(
                            //     process.env.REACT_APP_BACKEND_URL + imageURL
                            //   );
                            //   setImagePreviewOpen(true);
                            // }}
                            style={{
                                marginRight: '10px',
                                marginLeft: '10px',
                            }}
                        >
                            <div
                                style={{
                                    height: 200,
                                    minWidth: 250,
                                    borderRadius: 8,
                                    width: '100%',
                                    backgroundImage:
                                        'url(' +
                                        process.env.REACT_APP_BACKEND_URL +
                                        imageURL +
                                        ')',
                                    backgroundSize: 'cover',
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                    backgroundBlendMode: 'soft-light',
                                    cursor: 'pointer',
                                }}
                            />
                        </Grid>
                    ))}
                <Typography
                    className={classes.message}
                    variant="body2"
                    component="div"
                    style={{
                        marginTop: '4px',
                    }}
                >
                    <ReactMarkdown components={{ code: Code, Link: LinkTag }}>
                        {message?.text}
                    </ReactMarkdown>
                </Typography>
            </Paper>
            <div className={classes.time}>
                <small>
                    {getDistanceToNowWithSuffix(
                        new Date(message?.date).getTime()
                    )}
                </small>
            </div>
        </div>
    );
}
