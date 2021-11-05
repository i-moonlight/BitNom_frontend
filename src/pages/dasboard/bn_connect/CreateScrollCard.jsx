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
import { Button } from '../../../components/Button';

const image = React.lazy(() => import('../../../assets/scrolls/image.svg'));
const schedule = React.lazy(() =>
    import('../../../assets/scrolls/schedule.svg')
);
const video = React.lazy(() => import('../../../assets/scrolls/video.svg'));
const write = React.lazy(() => import('../../../assets/scrolls/write.svg'));

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
                            {!xsDown && (
                                <Typography variant="body2">Video</Typography>
                            )}
                        </div>
                    </Button>
                    <Button textCase variant="text" color="inherit">
                        <div className="center-horizontal">
                            <img
                                style={{ marginRight: 10, width: 20 }}
                                src={schedule}
                                alt="img"
                            />
                            {!xsDown && (
                                <Typography variant="body2">
                                    Schedule
                                </Typography>
                            )}
                        </div>
                    </Button>
                    <Button textCase variant="text" color="inherit">
                        <div className="center-horizontal">
                            <img
                                style={{ marginRight: 10, width: 20 }}
                                src={write}
                                alt="img"
                            />
                            {!xsDown && (
                                <Typography variant="body2">Article</Typography>
                            )}
                        </div>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
