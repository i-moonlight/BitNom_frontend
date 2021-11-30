import { useMutation } from '@apollo/client';
import {
    AttachFile,
    Close,
    EmojiEmotions,
    Gif,
    Image,
    SendOutlined,
    VideoLibrary,
} from '@mui/icons-material';
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    InputBase,
    Paper,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { styled } from '@mui/styles';

import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../../../../components/Button';
import {
    CREATE_DIALOGUE_MESSAGE,
    UPDATE_MESSAGE,
    USER_TYPING,
} from '../graphql/queries';
import { useStyles } from '../utils/styles';
import MediaUploadPanel from './MediaUploadPanel';

const EmojiPickerPopover = React.lazy(() =>
    import('../../bn_connect/popovers/EmojiPickerPopover')
);

const Input = styled('input')({
    display: 'none',
});

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
    const [message_images, setMessageImages] = useState([]);
    const [message_video, setMessageVideo] = useState(null);
    const [message_gif, setMessageGif] = useState(null);
    const [message_docs, setMessageDoc] = useState([]);
    const [openImage, setImageOpen] = useState(false);
    const [openFile, setFileOpen] = useState(false);
    const [openVideo, setVideoOpen] = useState(false);
    const [openGif, setGifOpen] = useState(false);
    const [sendMessageErr, setSendMessageError] = useState(null);
    const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = useState(null);
    const isEmojiPickerOpen = Boolean(emojiPickerAnchorEl);
    const theme = useTheme();
    const classes = useStyles();
    const xsDown = useMediaQuery('(max-width:599px)');

    const isMediaUploadOpen = Boolean(mediaUploadAnchorEl);

    const handleMediaUploadOpen = (e) => {
        setMediaUploadAnchorEl(e.currentTarget);
    };
    const handleMediaUploadClose = () => {
        setMediaUploadAnchorEl(null);
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
            setSendMessageError(error?.graphQLErrors[0]?.state);
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
        if (
            !text &&
            message_docs?.length < 1 &&
            message_images?.length < 1 &&
            message_video === null &&
            message_gif === null
        )
            return setSendMessageError(true);
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
        debounce(handleUserNotTyping, 700),
        []
    );

    const handleAttachFileOpen = () => {
        setOpen(true);
        setFileOpen(true);
        setVideoOpen(false);
        setImageOpen(false);
        setGifOpen(false);
        setMediaUploadAnchorEl(null);
    };

    const handleGifOpen = () => {
        setOpen(true);
        setGifOpen(true);
        setVideoOpen(false);
        setImageOpen(false);
        setFileOpen(false);
        setMediaUploadAnchorEl(null);
    };

    const handleImageOpen = () => {
        setOpen(true);
        setImageOpen(true);
        setVideoOpen(false);
        setFileOpen(false);
        setGifOpen(false);
        setMediaUploadAnchorEl(null);
    };

    const handleVideoLibrary = () => {
        setOpen(true);
        setVideoOpen(true);
        setImageOpen(false);
        setFileOpen(false);
        setGifOpen(false);
        setMediaUploadAnchorEl(null);
    };

    return (
        <div>
            {replyText && (
                <Card variant="outlined" className={classes.promptCard}>
                    <CardHeader
                        className="bg-primary"
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
                <MediaUploadPanel
                    handleAttachFileOpen={() => handleAttachFileOpen()}
                    handleGifOpen={() => handleGifOpen()}
                    handleImageOpen={() => handleImageOpen()}
                    handleVideoLibrary={() => handleVideoLibrary()}
                />
            )}

            {editText?.text && (
                <Card variant="outlined" className={classes.promptCard}>
                    <CardHeader
                        className="bg-primary"
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

            {open && (
                <Card className={classes.cardDropzone}>
                    <CardHeader
                        action={
                            <IconButton onClick={() => setOpen(false)}>
                                <Close />
                            </IconButton>
                        }
                    />
                    <CardContent>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            {openImage ? (
                                <label htmlFor="send-message-images">
                                    <Input
                                        accept="image/*"
                                        id="send-message-images"
                                        multiple
                                        type="file"
                                        onChange={(e) => {
                                            setMessageImages(
                                                Array.from(e.target.files)
                                            );
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        component="span"
                                    >
                                        Upload Image
                                    </Button>
                                </label>
                            ) : openVideo ? (
                                <label htmlFor="send-message-video">
                                    <Input
                                        accept="video/*"
                                        id="send-message-video"
                                        multiple
                                        type="file"
                                        onChange={(e) => {
                                            setMessageVideo(
                                                Array.from(e.target.files)
                                            );
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        component="span"
                                    >
                                        Upload Video
                                    </Button>
                                </label>
                            ) : openFile ? (
                                <label htmlFor="send-message-docs">
                                    <Input
                                        id="send-message-docs"
                                        type="file"
                                        onChange={(e) => {
                                            setMessageDoc(
                                                Array.from(e.target.files)
                                            );
                                        }}
                                        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                              text/plain, application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document "
                                        multiple
                                    />
                                    <Button
                                        variant="contained"
                                        component="span"
                                    >
                                        Upload File
                                    </Button>
                                </label>
                            ) : openGif ? (
                                <label htmlFor="send-message-gif">
                                    <Input
                                        id="send-message-gif"
                                        type="file"
                                        onChange={(e) => {
                                            setMessageGif(
                                                Array.from(e.target.files)
                                            );
                                        }}
                                        accept="image/gif"
                                        multiple
                                    />
                                    <Button
                                        variant="contained"
                                        component="span"
                                    >
                                        Upload GIF
                                    </Button>
                                </label>
                            ) : null}
                        </Stack>
                    </CardContent>
                </Card>
            )}

            <Divider className="my-2" />

            <div className={classes.inputRoot}>
                <div className="d-flex">
                    {xsDown && !isMediaUploadOpen ? (
                        <IconButton
                            size="small"
                            className={'m-1 p-1' + classes.iconButton}
                            aria-label="search"
                            onClick={(e) => handleMediaUploadOpen(e)}
                        >
                            <AttachFile />
                        </IconButton>
                    ) : xsDown && isMediaUploadOpen ? (
                        <IconButton
                            size="small"
                            className={'m-1 p-1' + classes.iconButton}
                            aria-label="search"
                            onClick={handleMediaUploadClose}
                        >
                            <Close />
                        </IconButton>
                    ) : (
                        <div
                            className={classes.inputTab}
                            style={{ width: '33%' }}
                        >
                            <IconButton
                                size="small"
                                className={'m-1 p-1' + classes.iconButton}
                                aria-label="search"
                                onClick={() => handleAttachFileOpen()}
                            >
                                <AttachFile />
                            </IconButton>
                            <IconButton
                                size="small"
                                className={'m-1 p-1' + classes.iconButton}
                                aria-label="search"
                                onClick={() => handleImageOpen()}
                            >
                                <Image />
                            </IconButton>
                            <IconButton
                                size="small"
                                className={'m-1 p-1' + classes.iconButton}
                                aria-label="search"
                                onClick={() => handleVideoLibrary()}
                            >
                                <VideoLibrary />
                            </IconButton>
                            <IconButton
                                size="small"
                                className={'m-1 p-1' + classes.iconButton}
                                aria-label="search"
                                onClick={() => handleGifOpen()}
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
                            <InputBase
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
                                error={sendMessageErr ? true : false}
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
                        {sendMessageErr && (
                            <Typography color="error" variant="body2">
                                {' '}
                                This field cannot be empty!
                            </Typography>
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
        </div>
    );
}
