import { Image, VideoLibrary } from '@mui/icons-material';
import { Card, IconButton, List, ListItem } from '@mui/material';
import React from 'react';
import { useStyles } from '../utils/styles';

export default function MediaUploadPanel({
    //handleAttachFileOpen,
    handleImageOpen,
    handleVideoLibrary,
    //handleGifOpen,
}) {
    const classes = useStyles();
    return (
        <Card>
            <List className={classes.uploadPanel}>
                {/*  <ListItem>
                    <IconButton
                        size="small"
                        className={'m-1 p-1' + classes.iconButton}
                        aria-label="search"
                        onClick={() => handleAttachFileOpen()}
                    >
                        <AttachFile />
                    </IconButton>
                </ListItem> */}
                <ListItem>
                    <IconButton
                        size="small"
                        className={'m-1 p-1' + classes.iconButton}
                        aria-label="search"
                        onClick={() => handleImageOpen()}
                    >
                        <Image />
                    </IconButton>
                </ListItem>
                <ListItem>
                    <IconButton
                        size="small"
                        className={'m-1 p-1' + classes.iconButton}
                        aria-label="search"
                        onClick={() => handleVideoLibrary()}
                    >
                        <VideoLibrary />
                    </IconButton>
                </ListItem>
                {/*  <ListItem>
                    <IconButton
                        size="small"
                        className={'m-1 p-1' + classes.iconButton}
                        aria-label="search"
                        onClick={() => handleGifOpen()}
                    >
                        <Gif />
                    </IconButton>
                </ListItem> */}
            </List>
        </Card>
    );
}
