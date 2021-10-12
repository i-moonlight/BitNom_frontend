import {
    alpha,
    Card,
    CardActionArea,
    CardContent,
    Hidden,
    Typography,
    useTheme,
} from '@mui/material';
import React from 'react';
import image from '../../../assets/scrolls/image.svg';
import schedule from '../../../assets/scrolls/schedule.svg';
import video from '../../../assets/scrolls/video.svg';
import write from '../../../assets/scrolls/write.svg';
import Button from '../../../components/Button';

export default function CreateScrollCard({
    setOpen,
    setOpenImage,
    setOpenVideo,
    setImageDisabled,
    setVideoDisabled,
}) {
    const theme = useTheme();
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
                                theme.palette.type == 'dark'
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
                        }}
                        variant="text"
                        color="inherit"
                    >
                        <div className="center-horizontal">
                            <img
                                style={{ marginRight: 10, width: 20 }}
                                src={image}
                                alt="img"
                            />
                            <Hidden xsDown>
                                <Typography variant="body2">Image</Typography>
                            </Hidden>
                        </div>
                    </Button>
                    <Button
                        textCase
                        onClick={() => {
                            setOpen(true);
                            setOpenVideo(true);
                            setImageDisabled(true);
                        }}
                        variant="text"
                        color="inherit"
                    >
                        <div className="center-horizontal">
                            <img
                                style={{ marginRight: 10, width: 20 }}
                                src={video}
                                alt="img"
                            />
                            <Hidden xsDown>
                                <Typography variant="body2">Video</Typography>
                            </Hidden>
                        </div>
                    </Button>
                    <Button textCase variant="text" color="inherit">
                        <div className="center-horizontal">
                            <img
                                style={{ marginRight: 10, width: 20 }}
                                src={schedule}
                                alt="img"
                            />
                            <Hidden xsDown>
                                <Typography variant="body2">
                                    Schedule
                                </Typography>
                            </Hidden>
                        </div>
                    </Button>
                    <Button textCase variant="text" color="inherit">
                        <div className="center-horizontal">
                            <img
                                style={{ marginRight: 10, width: 20 }}
                                src={write}
                                alt="img"
                            />
                            <Hidden xsDown>
                                <Typography variant="body2">Article</Typography>
                            </Hidden>
                        </div>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
