import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
    AttachFile,
    EmojiEmotions,
    Gif,
    Image,
    SendOutlined,
    VideoLibrary,
} from '@mui/icons-material';
import { Divider, IconButton, InputBase, Paper, useTheme } from '@mui/material';
import { DropzoneArea } from 'react-mui-dropzone';
import { CREATE_DIALOGUE_MESSAGE } from '../graphql/queries';
import { useStyles } from '../utils/styles';

const EmojiPickerPopover = React.lazy(() =>
    import('../../bn_connect/popovers/EmojiPickerPopover')
);

const emojiPickerId = 'emoji-picker-popover';

export default function SendMessage({ chat }) {
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

    const [sendMessage] = useMutation(CREATE_DIALOGUE_MESSAGE);

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
            images: message_images,
            video: message_video,
            gif: message_gif,
            documents: message_docs,
        });
    };

    return (
        <>
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
                    <div className={classes.inputTab} style={{ width: '27%' }}>
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
                            <InputBase
                                name="text"
                                type="text"
                                value={text}
                                className={classes.inputField}
                                placeholder="Type a message"
                                inputProps={{ 'aria-label': 'Send' }}
                                onChange={handleChange}
                                multiline
                                maxRows={5}
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
