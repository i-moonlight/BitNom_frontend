import React, { useState } from 'react';
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
} from '@mui/material';
import { DropzoneArea } from 'react-mui-dropzone';
import { CREATE_DIALOGUE_MESSAGE } from '../graphql/queries';
import { useStyles } from '../utils/styles';

import EmojiPickerPopover from '../../bn_connect/popovers/EmojiPickerPopover';

const emojiPickerId = 'emoji-picker-popover';

export default function SendMessage({
    chat,
    replyText,
    onCancelReply,
    setReplyText,
}) {
    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
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
    return (
        <>
            {' '}
            {replyText && (
                <Card
                    variant="outlined"
                    style={{
                        backgroundColor: '#93c7f5',
                        marginLeft: '8px',
                        marginRight: '8px',
                        marginTop: '8px',
                        borderWidth: '0px 0px 0px 7px ',
                        borderRadius: '5px 2px 2px 5px',
                        height: '60px',
                    }}
                >
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
                            {replyText.text.length > 80
                                ? replyText.text.substring(0, 80) + '...'
                                : replyText.text}
                        </Typography>
                    </CardContent>
                </Card>
            )}
            {open ? (
                <DropzoneArea
                    clearOnUnmount
                    onChange={(files) => {
                        openFile
                            ? setMessageDoc(files)
                            : openImage
                            ? setMessageImages(files)
                            : openVideo
                            ? setMessageVideo(files[0])
                            : openGif
                            ? setMessageGif(files[0])
                            : null;
                    }}
                    dropzoneText={
                        openFile
                            ? 'Drag n drop a document here or click'
                            : openImage
                            ? 'Drag n drop images here or click'
                            : openVideo
                            ? 'Drag n drop a video here or click'
                            : openGif
                            ? 'Drag n drop Gif here or click'
                            : ''
                    }
                    acceptedFiles={
                        openFile
                            ? [
                                  '.doc',
                                  '.pdf',
                                  '.docx',
                                  '.txt',
                                  '.ppt',
                                  '.pptx',
                                  '.xls',
                                  '.xlsx',
                              ]
                            : openImage
                            ? ['image/*']
                            : openVideo
                            ? ['video/*']
                            : openGif
                            ? ['.gif']
                            : null
                    }
                    maxFileSize={
                        openFile
                            ? 5000000
                            : openImage
                            ? 5000000
                            : openVideo
                            ? 10000000
                            : openGif
                            ? 1000000
                            : null
                    }
                    filesLimit={
                        openFile
                            ? 5
                            : openImage
                            ? 5
                            : openVideo
                            ? 1
                            : openGif
                            ? 1
                            : null
                    }
                    showAlerts={['error']}
                    showPreviews={false}
                    showPreviewsInDropzone
                    previewGridProps={{
                        container: { spacing: 1, direction: 'row' },
                    }}
                />
            ) : null}
            <div className={classes.inputRoot}>
                <Divider className={classes.divider} />{' '}
                <div className="d-flex">
                    <div className={classes.inputTab} style={{ width: '33%' }}>
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
                                className={classes.inputField}
                                placeholder="Type a message"
                                fullWidth
                                onChange={handleChange}
                                multiline
                                margin="dense"
                                maxRows={5}
                                onKeyDown={(e) =>
                                    e.key === 'Enter' && e.shiftKey
                                        ? handleSendMessage
                                        : null
                                }
                                error={Object.keys(sendMessageErr).length > 0}
                            />
                            <IconButton
                                size="small"
                                className={'m-1 p-1' + classes.iconButton}
                                aria-label="send"
                                onClick={handleSendMessage}
                            >
                                <SendOutlined />
                            </IconButton>
                        </Paper>
                        {Object.keys(sendMessageErr).length > 0 && (
                            <div>
                                {' '}
                                {Object.values(sendMessageErr).map((value) => (
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
