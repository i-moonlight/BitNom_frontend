import { Reply } from '@mui/icons-material';
import {
    Avatar,
    ButtonBase,
    CardMedia,
    Grid,
    IconButton,
    Paper,
    Typography,
    Card,
} from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserInitials } from '../../../../utilities/Helpers';
import { useStyles } from '../utils/styles';
import ReactMarkdown from 'react-markdown';
import { Code, LinkTag } from '../../../../components/markdown_renders';

export default function IncomingMessage({ message, chat, onReply }) {
    const [show_reply, setShowReply] = useState(false);
    const classes = useStyles();

    return (
        <div className={classes.messageLeft}>
            <ButtonBase>
                <Link
                    to={`/users/${chat?.otherUser?.info?._id}`}
                    style={{ textDecoration: 'none' }}
                >
                    <Avatar
                        alt={chat.otherUser.info.displayName}
                        src={
                            chat?.otherUser.info.profile_pic
                                ? process.env.REACT_APP_BACKEND_URL +
                                  chat?.otherUser?.info.profile_pic
                                : ''
                        }
                        style={{ backgroundColor: '#1C0C5B' }}
                    >
                        {chat?.otherUser?.info?.profile_pic
                            ? ''
                            : getUserInitials(
                                  chat?.otherUser?.info?.displayName
                              )}
                    </Avatar>
                </Link>
            </ButtonBase>
            <Paper
                className={classes.incoming}
                onMouseEnter={() => setShowReply(true)}
                onMouseLeave={() => setShowReply(false)}
                elevation={0}
            >
                {message?.responseTo?.text?.length > 0 ? (
                    <Card
                        variant="outlined"
                        style={{
                            backgroundColor: '#93c7f5',
                            marginLeft: '8px',
                            marginRight: '8px',
                            marginTop: '8px',
                            borderWidth: '0px 0px 0px 7px ',
                            borderRadius: '5px 2px 2px 5px',
                        }}
                    >
                        {' '}
                        <Typography
                            variant="body2"
                            component="article"
                            style={{
                                marginLeft: '8px',
                                marginTop: '8px',
                                marginRight: '8px',
                            }}
                        >
                            <ReactMarkdown
                                renderers={{ code: Code, link: LinkTag }}
                                escapeHtml={false}
                            >
                                {message?.responseTo?.text?.length > 200
                                    ? message?.responseTo?.text.substring(
                                          0,
                                          200
                                      ) + '...'
                                    : message.responseTo.text}
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
                {message?.images.length > 0 &&
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
                    component="article"
                    style={{
                        marginTop: '8px',
                    }}
                >
                    <ReactMarkdown
                        renderers={{ code: Code, link: LinkTag }}
                        escapeHtml={false}
                    >
                        {message.text}
                    </ReactMarkdown>
                </Typography>
                {show_reply && (
                    <div className={classes.reply}>
                        <IconButton
                            style={{
                                fontSize: '1em',
                                bottom: '5px',
                                right: '3px',
                                color: '#bbb',
                            }}
                            size="small"
                            onClick={onReply}
                        >
                            <Reply />
                        </IconButton>
                    </div>
                )}
            </Paper>
            <div className={classes.time}>
                <small>{moment(message?.date).fromNow()}</small>
            </div>
        </div>
    );
}
