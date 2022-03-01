import {
    DoneAllOutlined,
    DoneOutlined,
    ExpandMoreRounded,
    MoreVertRounded,
} from '@mui/icons-material';
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
import { getDistanceToNowWithSuffix } from '../../../../components/utilities/date.components';
import { getUserInitials } from '../../../../utilities/Helpers';
import { useStyles } from '../utils/styles';

export default function OutgoingMessage({ chat, message, onClick }) {
    const classes = useStyles();
    const [show_reply, setShowReply] = useState(false);
    const author = message?.author?._id || {};
    const userInitials = getUserInitials(
        chat?.currentUser?.info?._id?.displayName
    );
    //const mdDown = useMediaQuery('(max-width:1279px)');
    const customDown = useMediaQuery('(max-width:1200px)');

    return (
        <div className={classes.messageRight}>
            <div className={classes.time}>
                <small>
                    {getDistanceToNowWithSuffix(
                        new Date(message?.date).getTime()
                    )}
                </small>
            </div>

            <Paper
                className={classes.outgoing}
                onMouseEnter={() => setShowReply(true)}
                onMouseLeave={() => setShowReply(false)}
                elevation={0}
            >
                <Typography
                    variant="body1"
                    component="div"
                    style={{ marginLeft: '16px' }}
                >
                    <Link to={`/profile`} style={{ textDecoration: 'none' }}>
                        <small className={classes.author}>
                            <strong>@{author}</strong>
                        </small>
                    </Link>

                    {customDown ? (
                        <div className={classes.reply}>
                            <IconButton
                                style={{
                                    bottom: '5px',
                                    right: '3px',
                                    color: '#000',
                                }}
                                size="small"
                                onClick={onClick}
                            >
                                <MoreVertRounded style={{ fontSize: '18px' }} />
                            </IconButton>
                        </div>
                    ) : show_reply ? (
                        <div className={classes.reply}>
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
                        </div>
                    ) : null}
                </Typography>
                {message?.responseTo?.text?.length > 0 ? (
                    <Card variant="outlined" className={classes.responseToOut}>
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
                    component="div"
                >
                    <ReactMarkdown components={{ code: Code, Link: LinkTag }}>
                        {message?.text}
                    </ReactMarkdown>
                    <span>
                        {message?.edited === true ? (
                            <strong>(Edited)</strong>
                        ) : (
                            ''
                        )}
                    </span>
                </Typography>

                <div className={classes.reply}>
                    {message?.status === 'delivered' ? (
                        <DoneAllOutlined
                            style={{
                                fontSize: '18px',
                                marginTop: '-2px',
                                bottom: '5px',
                                right: '3px',
                                marginRight: '7px',
                                color: '#bbb',
                            }}
                        />
                    ) : message?.status === 'read' ? (
                        <DoneAllOutlined
                            color="primary"
                            style={{
                                fontSize: '18px',
                                marginTop: '-2px',
                                bottom: '5px',
                                right: '3px',
                                marginRight: '7px',
                                color: '#bbb',
                            }}
                        />
                    ) : (
                        <DoneOutlined
                            style={{
                                fontSize: '18px',
                                marginTop: '-2px',
                                bottom: '5px',
                                right: '3px',
                                marginRight: '7px',
                                color: '#bbb',
                            }}
                        />
                    )}
                </div>
            </Paper>
            <ButtonBase>
                <Avatar
                    src={
                        chat?.currentUser?.info?._id?.profile_pic
                            ? process.env.REACT_APP_BACKEND_URL +
                              chat?.currentUser?.info?._id?.profile_pic
                            : `https://ui-avatars.com/api/?name=${userInitials}&background=random`
                    }
                    alt={'avatar'}
                >
                    {userInitials}
                </Avatar>
            </ButtonBase>
        </div>
    );
}
