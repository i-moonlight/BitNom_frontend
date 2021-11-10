import { ExpandMoreRounded } from '@mui/icons-material';
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
import { getUserInitials } from '../../../../utilities/Helpers';
import { useStyles } from '../utils/styles';
import ReactMarkdown from 'react-markdown';
import { Code, LinkTag } from '../../../../components/markdown_renders';
import { Link } from 'react-router-dom';
export default function OutgoingMessage({ chat, message, onClick }) {
    const classes = useStyles();
    const [show_reply, setShowReply] = useState(false);
    const author = message.author || {};
    return (
        <div className={classes.messageRight}>
            <div className={classes.time}>
                <small>{moment(message?.date).fromNow()}</small>
            </div>

            <Paper
                className={classes.outgoing}
                onMouseEnter={() => setShowReply(true)}
                onMouseLeave={() => setShowReply(false)}
                elevation={0}
            >
                <Typography
                    variant="body1"
                    component="p"
                    style={{ marginLeft: '16px' }}
                >
                    <Link to={`/profile`} style={{ textDecoration: 'none' }}>
                        <small className={classes.author}>
                            <strong>@{author}</strong>
                        </small>
                    </Link>
                    {message?.edited === true ? (
                        <div className={classes.Edited}>
                            <strong>(Edited)</strong>
                        </div>
                    ) : (
                        ''
                    )}
                    {show_reply && (
                        <div className={classes.reply}>
                            <IconButton
                                style={{
                                    fontSize: '1em',
                                    bottom: '5px',
                                    right: '3px',
                                    color: '#000',
                                }}
                                size="small"
                                onClick={onClick}
                            >
                                <ExpandMoreRounded />
                            </IconButton>
                        </div>
                    )}
                </Typography>
                {message?.responseTo?.text?.length > 0 ? (
                    <Card
                        variant="outlined"
                        style={{
                            backgroundColor: '#BDE0FF',
                            marginLeft: '8px',
                            marginRight: '8px',
                            borderWidth: '0px 0px 0px 7px ',
                            borderRadius: '5px 5px 5px 5px',
                        }}
                    >
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
                                components={{ code: Code, Link: LinkTag }}
                                escapeHtml={false}
                            >
                                {message?.responseTo?.text?.length > 200
                                    ? message?.responseTo?.text.substring(
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
                            marginTop: '10px',
                            marginLeft: '10px',
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
                    component="article"
                    style={{
                        marginTop: '4px',
                    }}
                >
                    <ReactMarkdown
                        components={{ code: Code, Link: LinkTag }}
                        escapeHtml={false}
                    >
                        {message.text}
                    </ReactMarkdown>
                </Typography>
                {/* {show_reply && (
                    <div className={classes.reply}>
                        <IconButton
                            style={{
                                fontSize: '1em',
                                marginTop: '-2px',
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
                )} */}
            </Paper>
            <ButtonBase>
                <Avatar
                    alt={chat.currentUser.info.displayName}
                    src={
                        chat?.currentUser?.info.profile_pic
                            ? process.env.REACT_APP_BACKEND_URL +
                              chat?.currentUser?.info.profile_pic
                            : ''
                    }
                    style={{ backgroundColor: '#1C0C5B' }}
                >
                    {chat?.currentUser?.info.profile_pic
                        ? ''
                        : getUserInitials(chat?.currentUser?.info.displayName)}
                </Avatar>
            </ButtonBase>
        </div>
    );
}
