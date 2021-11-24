import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import {
    AttachFile,
    EmojiEmotions,
    Gif,
    Image,
    SendOutlined,
    VideoLibrary,
    Close,
} from '@mui/icons-material';
import {
    Divider,
    IconButton,
    Paper,
    useTheme,
    Typography,
    TextField,
    CardHeader,
    Card,
    CardContent,
    useMediaQuery,
} from '@mui/material';

import {
    CREATE_DIALOGUE_MESSAGE,
    UPDATE_MESSAGE,
    USER_TYPING,
} from '../graphql/queries';
import { useStyles } from '../utils/styles';
import debounce from 'lodash/debounce';

import EmojiPickerPopover from '../../bn_connect/popovers/EmojiPickerPopover';

const emojiPickerId = 'emoji-picker-popover';

export default function SendMessage({
    chat,
    replyText,
    onCancelReply,
    setReplyText,
    open,
    setOpen,
    editText,
    setEditText,
    onCancelMessageUpdate,
    currentUser,
    otherUser,
}) {
    const [text, setText] = useState('');

    const inputRef = useRef();
    const [message_images, setMessageImages] = useState([]);
    const [message_video, setMessageVideo] = useState(null);
    const [message_gif, setMessageGif] = useState(null);
    const [message_docs, setMessageDoc] = useState([]);
    const [openImage, setImageOpen] = useState(false);
    const [openFile, setFileOpen] = useState(false);
    const [openVideo, setVideoOpen] = useState(false);
    const [openGif, setGifOpen] = useState(false);
    const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = useState(null);
    const isEmojiPickerOpen = Boolean(emojiPickerAnchorEl);
    const [sendMessageErr, setSendMessageError] = useState({});
    const theme = useTheme();
    const classes = useStyles();
    const xsDown = useMediaQuery('(max-width:599px)');
    const [mediaUploadAnchorEl, setMediaUploadAnchorEl] = useState(null);

    const isMediaUploadOpen = Boolean(mediaUploadAnchorEl);

    const handleMediaUploadOpen = (e) => {
        setMediaUploadAnchorEl(e.currentTarget);
    };

    const handleEmojiPickerOpen = (e) => {
        setEmojiPickerAnchorEl(e.currentTarget);
    };

    const handleEmojiPickerClose = () => {
        setEmojiPickerAnchorEl(null);
    };
    const handleSelectEmoji = (emoji) => {
        handleEmojiPickerClose();
        setText(`${text} ${emoji.native}`);
    };

    const [sendMessage] = useMutation(CREATE_DIALOGUE_MESSAGE, {
        onError(error) {
            setSendMessageError(error.graphQLErrors[0].state);
        },
    });

    const [updateMessage] = useMutation(UPDATE_MESSAGE);
    const [userTypingMutation] = useMutation(USER_TYPING);

    const onSendMessage = async (ICreateMessage) => {
        await sendMessage({
            variables: {
                data: ICreateMessage,
            },

            context: { clientName: 'chat' },
        });
        setText('');
        setMessageImages([]);
        setMessageVideo(null);
        setMessageDoc([]);
        setMessageGif(null);
        setOpen(false);
        setReplyText();
    };
    const onUpdateMessage = async (IUpdateMessage) => {
        await updateMessage({
            variables: {
                data: IUpdateMessage,
            },
            context: { clientName: 'chat' },
        });
        setText('');
        setEditText();
    };

    const onUserTyping = async (IUserTyping) => {
        await userTypingMutation({
            variables: {
                data: IUserTyping,
            },
            context: { clientName: 'chat' },
        });
    };
    const handleChange = (e) => {
        setText(
            text?.length >= 250
                ? e.target.value.substring(0, e.target.value.length - 1)
                : e.target.value.substring(0, 250)
        );
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        onSendMessage({
            chat: chat,
            text: text,
            responseTo: replyText ? replyText._id : '',
            images: message_images,
            video: message_video,
            gif: message_gif,
            documents: message_docs,
        });
    };

    const handleUpdateMessage = (e) => {
        e.preventDefault();
        onUpdateMessage({ chat: chat, _id: editText?._id, text: text });
    };
    useEffect(() => {
        setText(editText?.text);
    }, [editText]);
    useEffect(() => {
        if (
            text === '' ||
            replyText?.text?.length > 0 ||
            editText?.text?.length > 0
        ) {
            inputRef.current.focus();
        }
    }, [text, replyText, editText]);

    const handleUserTyping = () => {
        onUserTyping({
            currentUser: currentUser?.info._id,
            otherUser: otherUser?.info._id,
            typing: true,
            chat: chat,
        });
    };
    const handleUserNotTyping = () => {
        onUserTyping({
            currentUser: currentUser?.info._id,
            otherUser: otherUser?.info._id,
            typing: false,
            chat: chat,
        });
    };
    // eslint-disable-next-line
    const debouncedUserTyping = useCallback(
        debounce(handleUserNotTyping, 1000),
        []
    );

    return (
        <>
            {' '}
            {replyText && (
                <Card variant="outlined" className={classes.promptCard}>
                    <CardHeader
                        style={{ marginTop: '-15px' }}
                        action={
                            <IconButton onClick={onCancelReply} size="small">
                                <Close />
                            </IconButton>
                        }
                        subheader={
                            <Typography
                                variant="body2"
                                component="span"
                                style={{ margin: '1px 5px' }}
                            >
                                <strong>{replyText.author}</strong>
                            </Typography>
                        }
                    />

                    <CardContent style={{ marginTop: '-35px' }}>
                        {' '}
                        <Typography
                            variant="body2"
                            component="span"
                            style={{ margin: '1px 5px' }}
                        >
                            {replyText.text?.length > 80
                                ? replyText?.text.substring(0, 80) + '...'
                                : replyText?.text}
                        </Typography>
                    </CardContent>
                </Card>
            )}
            {isMediaUploadOpen && (
                <Card variant="outlined" className={classes.promptCard}>
                    <CardHeader
                        style={{ marginTop: '-15px' }}
                        action={
                            <IconButton onClick={onCancelReply} size="small">
                                <Close />
                            </IconButton>
                        }
                        subheader={
                            <Typography
                                variant="body2"
                                component="span"
                                style={{ margin: '1px 5px' }}
                            >
                                <strong>{replyText.author}</strong>
                            </Typography>
                        }
                    />

                    <CardContent style={{ marginTop: '-35px' }}>
                        {' '}
                        <Typography
                            variant="body2"
                            component="span"
                            style={{ margin: '1px 5px' }}
                        >
                            {replyText.text?.length > 80
                                ? replyText?.text.substring(0, 80) + '...'
                                : replyText?.text}
                        </Typography>
                    </CardContent>
                </Card>
            )}
            {editText?.text && (
                <Card variant="outlined" className={classes.promptCard}>
                    <CardHeader
                        style={{ marginTop: '-15px' }}
                        action={
                            <IconButton
                                onClick={() => {
                                    onCancelMessageUpdate(), setText('');
                                }}
                                size="small"
                            >
                                <Close />
                            </IconButton>
                        }
                        subheader={
                            <Typography
                                variant="body2"
                                component="span"
                                style={{ margin: '1px 5px' }}
                            >
                                <strong>Edit</strong>
                            </Typography>
                        }
                    />

                    <CardContent style={{ marginTop: '-35px' }}>
                        {' '}
                        <Typography
                            variant="body2"
                            component="span"
                            style={{ margin: '1px 5px' }}
                        >
                            {editText?.text?.length > 80
                                ? editText?.text?.substring(0, 80) + '...'
                                : editText?.text}
                        </Typography>
                    </CardContent>
                </Card>
            )}
            {open ? (
                <Card className={classes.cardDropzone}>
                    <CardHeader
                        action={
                            <IconButton onClick={() => setOpen(false)}>
                                <Close />
                            </IconButton>
                        }
                    />
                    {openImage ? (
                        <input
                            id="create-post-images"
                            type="file"
                            onChange={(e) => {
                                setMessageImages(Array.from(e.target.files));
                            }}
                            accept="image/*"
                            multiple
                        />
                    ) : openVideo ? (
                        <input
                            id="create-post-video"
                            type="file"
                            onChange={(e) => {
                                setMessageVideo(Array.from(e.target.files));
                            }}
                            accept="video/*"
                        />
                    ) : openFile ? (
                        <input
                            id="create-post-video"
                            type="file"
                            onChange={(e) => {
                                setMessageDoc(Array.from(e.target.files));
                            }}
                            accept="video/*"
                        />
                    ) : openGif ? (
                        <input
                            id="create-post-video"
                            type="file"
                            onChange={(e) => {
                                setMessageGif(Array.from(e.target.files));
                            }}
                            accept="video/*"
                        />
                    ) : null}
                </Card>
            ) : null}
            <div className={classes.inputRoot}>
                <Divider className={classes.divider} />{' '}
                <div className="d-flex">
                    {xsDown ? (
                        <IconButton
                            size="small"
                            className={'m-1 p-1' + classes.iconButton}
                            aria-label="search"
                            onClick={handleMediaUploadOpen}
                        >
                            <AttachFile />
                        </IconButton>
                    ) : (
                        <div
                            className={classes.inputTab}
                            style={{ width: '33%' }}
                        >
                            {' '}
                            <IconButton
                                size="small"
                                className={'m-1 p-1' + classes.iconButton}
                                aria-label="search"
                                onClick={() => {
                                    setOpen(true);
                                    setFileOpen(true);
                                    setVideoOpen(false);
                                    setImageOpen(false);
                                    setGifOpen(false);
                                }}
                            >
                                <AttachFile />
                            </IconButton>
                            <IconButton
                                size="small"
                                className={'m-1 p-1' + classes.iconButton}
                                aria-label="search"
                                onClick={() => {
                                    setOpen(true);
                                    setImageOpen(true);
                                    setVideoOpen(false);
                                    setFileOpen(false);
                                    setGifOpen(false);
                                }}
                            >
                                <Image />
                            </IconButton>
                            <IconButton
                                size="small"
                                className={'m-1 p-1' + classes.iconButton}
                                aria-label="search"
                                onClick={() => {
                                    setOpen(true);
                                    setVideoOpen(true);
                                    setImageOpen(false);
                                    setFileOpen(false);
                                    setGifOpen(false);
                                }}
                            >
                                <VideoLibrary />
                            </IconButton>
                            <IconButton
                                size="small"
                                className={'m-1 p-1' + classes.iconButton}
                                aria-label="search"
                                onClick={() => {
                                    setOpen(true);
                                    setGifOpen(true);
                                    setVideoOpen(false);
                                    setImageOpen(false);
                                    setFileOpen(false);
                                }}
                            >
                                <Gif />
                            </IconButton>
                        </div>
                    )}

                    <div style={{ width: '100%' }}>
                        <Paper
                            variant={
                                theme.palette.type == 'light'
                                    ? 'outlined'
                                    : 'elevation'
                            }
                            elevation={0}
                            component="form"
                            className={classes.sendMessage}
                        >
                            {' '}
                            <IconButton
                                size="small"
                                className={'m-1 p-1' + classes.iconButton}
                                aria-label="pick emoji"
                                aria-controls={emojiPickerId}
                                aria-haspopup="true"
                                onClick={(e) => {
                                    handleEmojiPickerOpen(e);
                                }}
                            >
                                <EmojiEmotions />
                            </IconButton>
                            <TextField
                                size="small"
                                name="text"
                                value={text}
                                inputRef={inputRef}
                                className={classes.inputField}
                                placeholder="Type a message"
                                fullWidth
                                onKeyDownCapture={handleUserTyping}
                                onKeyUp={debouncedUserTyping}
                                onChange={handleChange}
                                multiline
                                margin="dense"
                                maxRows={3}
                                onKeyDown={(e) => {
                                    e.key === 'Enter' &&
                                    e.shiftKey &&
                                    editText?.text?.length > 0
                                        ? handleUpdateMessage()
                                        : e.key === 'Enter' && e.shiftKey
                                        ? handleSendMessage()
                                        : null;
                                }}
                                error={Object.keys(sendMessageErr)?.length > 0}
                            />
                            <IconButton
                                size="small"
                                className={'m-1 p-1' + classes.iconButton}
                                aria-label="send"
                                onClick={
                                    editText?.text?.length > 0
                                        ? handleUpdateMessage
                                        : handleSendMessage
                                }
                            >
                                <SendOutlined />
                            </IconButton>
                        </Paper>
                        {Object.keys(sendMessageErr)?.length > 0 && (
                            <div>
                                {' '}
                                {Object.values(sendMessageErr)?.map((value) => (
                                    <Typography
                                        color="error"
                                        variant="body2"
                                        key={value}
                                    >
                                        {' '}
                                        {value}
                                    </Typography>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <EmojiPickerPopover
                emojiPickerId={emojiPickerId}
                emojiPickerAnchorEl={emojiPickerAnchorEl}
                isEmojiPickerOpen={isEmojiPickerOpen}
                handleEmojiPickerClose={handleEmojiPickerClose}
                handleSelectEmoji={handleSelectEmoji}
            />
        </>
    );
}
