import {
    alpha,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React from 'react';
import image from '../../../assets/scrolls/image.svg';
// import schedule from '../../../assets/scrolls/schedule.svg';
// import write from '../../../assets/scrolls/write.svg';
import video from '../../../assets/scrolls/video.svg';
import { Button } from '../../../components/Button';
import LazyImage from '../../../components/LazyImage';

export default function CreateScrollCard({
    setOpen,
    setOpenImage,
    setOpenVideo,
    setImageDisabled,
    setVideoDisabled,
}) {
    const theme = useTheme();
    const xsDown = useMediaQuery('(max-width:599px)');

    return (
        <Card variant="outlined" style={{ marginBottom: 12 }}>
            <CardContent>
                <CardActionArea
                    style={{
                        borderRadius: 8,
                    }}
                    onClick={() => setOpen(true)}
                >
                    <Card
                        elevation={0}
                        style={{
                            padding: 8,
                            borderRadius: 8,
                            backgroundColor:
                                theme.palette.mode == 'dark'
                                    ? alpha(theme.palette.common.white, 0.15)
                                    : theme.palette.background.search,
                        }}
                    >
                        <Typography variant="body2" color="textSecondary">
                            Create a post
                        </Typography>
                    </Card>
                </CardActionArea>
                <div className="space-between mt-2 mx-1">
                    <Button
                        textCase
                        onClick={() => {
                            setOpen(true);
                            setOpenImage(true);
                            setVideoDisabled(true);
                            setTimeout(() => {
                                document
                                    .getElementById('create-post-images')
                                    .click();
                            }, 1000);
                        }}
                        variant="text"
                        color="inherit"
                    >
                        <div className="center-horizontal">
                            <LazyImage
                                style={{ marginRight: 10 }}
                                image={{
                                    src: image,
                                    alt: 'Upload Image',
                                    width: 20,
                                }}
                            />
                            {!xsDown && (
                                <Typography variant="body2">Image</Typography>
                            )}
                        </div>
                    </Button>
                    <Button
                        textCase
                        onClick={() => {
                            setOpen(true);
                            setOpenVideo(true);
                            setImageDisabled(true);
                            setTimeout(() => {
                                document
                                    .getElementById('create-post-video')
                                    .click();
                            }, 1000);
                        }}
                        variant="text"
                        color="inherit"
                    >
                        <div className="center-horizontal">
                            <LazyImage
                                style={{ marginRight: 10 }}
                                image={{
                                    src: video,
                                    alt: 'Upload Video',
                                    width: 20,
                                }}
                            />

                            {!xsDown && (
                                <Typography variant="body2">Video</Typography>
                            )}
                        </div>
                    </Button>

                    {/* <Button textCase variant="text" color="inherit">
                        <div className="center-horizontal">
                            <LazyImage
                                style={{ marginRight: 10 }}
                                image={{
                                    src: schedule,
                                    alt: 'Shedule Post',
                                    width: 20,
                                }}
                            />

                            {!xsDown && (
                                <Typography variant="body2">
                                    Schedule
                                </Typography>
                            )}
                        </div>
                    </Button> */}
                    {/* <Button textCase variant="text" color="inherit">
                        <div className="center-horizontal">
                            <LazyImage
                                style={{ marginRight: 10 }}
                                image={{
                                    src: write,
                                    alt: 'Write Article',
                                    width: 20,
                                }}
                            />
                            {!xsDown && (
                                <Typography variant="body2">Article</Typography>
                            )}
                        </div>
                    </Button> */}
                </div>
            </CardContent>
        </Card>
    );
}
