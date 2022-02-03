import { useMutation } from '@apollo/client';
import {
    AttachFile,
    Close,
    EmojiEmotions,
    //Gif,
    Image,
    SendOutlined,
    VideoLibrary,
} from '@mui/icons-material';
import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    CircularProgress,
    Divider,
    Grid,
    IconButton,
    InputBase,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { styled } from '@mui/styles';
import debounce from 'lodash/debounce';
import React, {
    Suspense,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
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
    const inputRef = useRef();
    const [message_images, setMessageImages] = useState([]);
    const [message_video, setMessageVideo] = useState(null);
    const [message_gif, setMessageGif] = useState(null);
    const [message_docs, setMessageDoc] = useState([]);
    const [openImage, setImageOpen] = useState(false);
    const [openFile, setFileOpen] = useState(false);
    const [openVideo, setVideoOpen] = useState(false);
    const [openGif, setGifOpen] = useState(false);
    const [sendMessageErr, setSendMessageError] = useState(null);
    const [imagePreviewURLS, setImagePreviewURLS] = useState([]);
    const [docPreviewNames, setDocPreviewNames] = useState([]);
    const [videoPreviewURL, setVideoPreviewURL] = useState(null);
    const [errors, setErrors] = useState([]);
    const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = useState(null);
    const [mediaUploadAnchorEl, setMediaUploadAnchorEl] = useState(null);
    const isEmojiPickerOpen = Boolean(emojiPickerAnchorEl);
    const theme = useTheme();
    const classes = useStyles();
    const xsDown = useMediaQuery('(max-width:1200px)');

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
        setText(`${text} ${emoji}`);
        handleEmojiPickerClose();
    };

    const [sendMessage] = useMutation(CREATE_DIALOGUE_MESSAGE, {
        onError(errs) {
            setSendMessageError(errs?.graphQLErrors[0]?.state);
        },
    });

    const [updateMessage] = useMutation(UPDATE_MESSAGE);
    const [userTypingMutation] = useMutation(USER_TYPING);

    const onSendMessage = (ICreateMessage) => {
        sendMessage({
            variables: {
                data: ICreateMessage,
            },

            context: { clientName: 'chat' },
        }).then(({ data, errors: sendErrors }) => {
            if (data) {
                setText('');
                handleResetFiles();
                setOpen(false);
                setReplyText();
            }
            if (sendErrors) {
                if (
                    sendErrors[0]?.message?.includes('Unsupported MIME type:')
                ) {
                    const errorMsg = sendErrors[0]?.message;
                    const mime = errorMsg?.substring(
                        errorMsg?.indexOf(':') + 1
                    );

                    setErrors([
                        `Your image(s) have an unsupported file type (${mime})`,
                    ]);

                    handleResetFiles();
                } else {
                    setErrors([
                        `Something is wrong! Check your connection and refresh the page.`,
                    ]);
                }
            }
        });
    };

    const onUpdateMessage = async (IUpdateMessage) => {
        updateMessage({
            variables: {
                data: IUpdateMessage,
            },
            context: { clientName: 'chat' },
        }).then(({ data, errors: updateErrors }) => {
            if (data) {
                setText('');
                setOpen(false);
                setEditText();
                handleResetFiles();
            }
            if (updateErrors) {
                if (
                    updateErrors[0]?.message?.includes('Unsupported MIME type:')
                ) {
                    const errorMsg = updateErrors[0]?.message;
                    const mime = errorMsg?.substring(
                        errorMsg?.indexOf(':') + 1
                    );

                    setErrors([
                        `Your image(s) have an unsupported file type (${mime})`,
                    ]);

                    handleResetFiles();
                } else {
                    setErrors([
                        `Something is wrong! Check your connection and refresh the page.`,
                    ]);
                }
            }
        });
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

    const handleSendMessage = () => {
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
        setText('');
        handleResetFiles();
    };

    const handleUpdateMessage = () => {
        onUpdateMessage({ chat: chat, _id: editText?._id, text: text });
        setText('');
        handleResetFiles();
    };

    const handleResetFiles = () => {
        setMessageDoc([]);
        setMessageVideo(null);
        setMessageGif(null);
        setMessageImages([]);
        setImagePreviewURLS([]);
        setVideoPreviewURL(null);
        setDocPreviewNames();
        setErrors([]);
    };

    useEffect(() => {
        if (editText?.text) {
            setText(editText?.text);
        }
    }, [editText]);
    useEffect(() => {
        if (sendMessageErr !== null) {
            const timeOut = setTimeout(() => {
                setSendMessageError(null);
            }, 5000);
            return () => {
                clearTimeout(timeOut);
            };
        }
    }, [sendMessageErr]);

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
            currentUser: currentUser?.info?._id?._id,
            otherUser: otherUser?.info?._id?._id,
            typing: true,
            chat: chat,
        });
    };

    const handleUserNotTyping = () => {
        onUserTyping({
            currentUser: currentUser?.info?._id?._id,
            otherUser: otherUser?.info?._id?._id,
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
        handleResetFiles();
    };

    const handleGifOpen = () => {
        setOpen(true);
        setGifOpen(true);
        setVideoOpen(false);
        setImageOpen(false);
        setFileOpen(false);
        setMediaUploadAnchorEl(null);
        handleResetFiles();
    };

    const handleImageOpen = () => {
        setOpen(true);
        setImageOpen(true);
        setVideoOpen(false);
        setFileOpen(false);
        setGifOpen(false);
        setMediaUploadAnchorEl(null);
        handleResetFiles();
    };

    const handleVideoLibrary = () => {
        setOpen(true);
        setVideoOpen(true);
        setImageOpen(false);
        setFileOpen(false);
        setGifOpen(false);
        setMediaUploadAnchorEl(null);
        handleResetFiles();
    };

    const handleSelectImages = (files) => {
        if (files.length < 1) return;
        if (files.length > 4) {
            return setErrors(['You can only upload a maximum of 4 images']);
        }
        const previews = [];
        const allowedFiles = [];
        files.forEach((file) => {
            if (file.size > 2000000) {
                previews.splice(0, previews.length);
                allowedFiles.splice(0, allowedFiles.length);
                return setErrors(['Each image should be less than 2MB']);
            } else {
                previews.push(URL.createObjectURL(file));
                allowedFiles.push(file);
            }
        });
        setImagePreviewURLS(previews);
        setMessageImages(allowedFiles);
    };

    const handleSelectVideo = (files) => {
        if (files.length < 1) return;
        const file = files[0];
        if (file.size > 4000000) {
            return setErrors(['The video should be less than 4MB']);
        } else {
            setVideoPreviewURL(URL.createObjectURL(file));
            setMessageVideo(file);
        }
    };

    const handleSelectDocs = (files) => {
        if (files.length < 1) return;
        if (files.length > 4) {
            return setErrors(['You can only upload a maximum of 4 documents']);
        }
        const names = [];
        const allowedFiles = [];
        files.forEach((file) => {
            if (file.size > 2000000) {
                names.splice(0, names.length);
                allowedFiles.splice(0, allowedFiles.length);
                return setErrors(['Each document should be less than 2MB']);
            } else {
                names.push(file.name);
                allowedFiles.push(file);
            }
        });
        setDocPreviewNames(names);
        setMessageDoc(allowedFiles);
    };
    const editing = editText?.text?.length > 0 ? true : false;
    return (
        <>
            <div>
                {replyText && (
                    <Card variant="outlined" className={classes.promptCard}>
                        <CardHeader
                            // className="bg-primary"
                            style={{ marginTop: '-15px' }}
                            action={
                                <IconButton
                                    onClick={onCancelReply}
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
                                    <small>
                                        {' '}
                                        <strong>@{replyText.author}</strong>
                                    </small>
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
                                <IconButton
                                    onClick={() => {
                                        setOpen(false);
                                        handleResetFiles();
                                    }}
                                >
                                    <Close />
                                </IconButton>
                            }
                        />
                        <CardContent>
                            <Grid>
                                {errors?.length > 0 && (
                                    <Card
                                        elevation={0}
                                        style={{
                                            marginTop: '3px',
                                            background: 'transparent',
                                        }}
                                        component="div"
                                        //variant="outlined"
                                    >
                                        {errors?.map((errItem) => (
                                            <ListItem key={errItem}>
                                                <ListItemText
                                                    secondary={
                                                        <Typography
                                                            variant="body2"
                                                            color="error"
                                                        >
                                                            {`~ ${errItem}`}
                                                        </Typography>
                                                    }
                                                />
                                            </ListItem>
                                        ))}
                                    </Card>
                                )}
                                {imagePreviewURLS.length > 0 && (
                                    <>
                                        <Grid
                                            container
                                            style={{ margin: '3px 0px' }}
                                        >
                                            {imagePreviewURLS.map(
                                                (imageURL) => (
                                                    <Grid
                                                        style={{
                                                            padding: '1px',
                                                        }}
                                                        key={imageURL}
                                                        item
                                                        xs={
                                                            imagePreviewURLS.length >
                                                            1
                                                                ? 6
                                                                : 12
                                                        }
                                                    >
                                                        <div
                                                            style={{
                                                                height: 200,
                                                                borderRadius: 8,
                                                                width: '100%',
                                                                backgroundImage:
                                                                    'url(' +
                                                                    imageURL +
                                                                    ')',
                                                                backgroundSize:
                                                                    'cover',
                                                                backgroundColor:
                                                                    'rgba(0,0,0,0.2)',
                                                                backgroundBlendMode:
                                                                    'soft-light',
                                                                cursor: 'pointer',
                                                            }}
                                                        />
                                                    </Grid>
                                                )
                                            )}
                                        </Grid>
                                    </>
                                )}
                                {videoPreviewURL && (
                                    <Grid
                                        item
                                        xs={12}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                        style={{ marginTop: '3px' }}
                                    >
                                        <CardMedia
                                            className="br-2"
                                            component="video"
                                            src={videoPreviewURL}
                                            controls
                                            preload="metadata"
                                        />
                                    </Grid>
                                )}
                                {docPreviewNames?.map((item) => (
                                    <ListItem key={item}>
                                        <ListItemText
                                            secondary={
                                                <Typography variant="body1">
                                                    {`~ ${item}`}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </Grid>
                            <Stack
                                direction="row"
                                alignItems="center"
                                display="flex"
                                justifyContent="center"
                                spacing={2}
                            >
                                {openImage ? (
                                    <label htmlFor="send-message-images">
                                        <Input
                                            accept="image/*"
                                            id="send-message-images"
                                            multiple
                                            type="file"
                                            onChange={(e) => {
                                                handleSelectImages(
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
                                            type="file"
                                            onChange={(e) => {
                                                handleSelectVideo(
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
                                                handleSelectDocs(
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
                                style={{ width: '15%' }}
                            >
                                {/* <IconButton
                                    size="small"
                                    className={'m-1 p-1' + classes.iconButton}
                                    aria-label="search"
                                    onClick={() => handleAttachFileOpen()}
                                >
                                    <AttachFile />
                                </IconButton> */}
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
                                {/*  <IconButton
                                    size="small"
                                    className={'m-1 p-1' + classes.iconButton}
                                    aria-label="search"
                                    onClick={() => handleGifOpen()}
                                >
                                    <Gif />
                                </IconButton> */}
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
                                        if (
                                            e.key === 'Enter' &&
                                            editing === false
                                        ) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                        if (
                                            e.key === 'Enter' &&
                                            editing === true
                                        ) {
                                            e.preventDefault();
                                            handleUpdateMessage();
                                        }
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
                            {sendMessageErr &&
                            otherUser.blocked === false &&
                            currentUser.blocked === false ? (
                                <Typography
                                    color="error"
                                    variant="body2"
                                    style={{ marginLeft: '5%' }}
                                >
                                    {' '}
                                    ~ You cannot send an empty message!
                                </Typography>
                            ) : sendMessageErr &&
                              (otherUser.blocked === true ||
                                  currentUser.blocked === true) ? (
                                <Typography
                                    color="error"
                                    variant="body2"
                                    style={{ marginLeft: '5%' }}
                                >
                                    {' '}
                                    ~ You can no longer send messages to this
                                    chat!
                                </Typography>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>{' '}
            <Suspense fallback={<CircularProgress />}>
                {' '}
                <EmojiPickerPopover
                    emojiPickerId={emojiPickerId}
                    emojiPickerAnchorEl={emojiPickerAnchorEl}
                    isEmojiPickerOpen={isEmojiPickerOpen}
                    handleEmojiPickerClose={handleEmojiPickerClose}
                    handleSelectEmoji={handleSelectEmoji}
                />
            </Suspense>
        </>
    );
}
