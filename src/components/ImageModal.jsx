import { useState, useEffect, useCallback } from 'react';
import { Dialog, Slide, Grid, IconButton, Typography } from '@mui/material';
import {
    ArrowBackIos,
    ArrowForwardIos,
    CloseRounded,
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import ScrollImage from '../pages/dasboard/bn_connect/scroll/ScrollImage';
// import { useQuery } from '@apollo/client';
// import { QUERY_POST_BY_ID } from '../pages/dasboard/utilities/queries';

export default function ImageModal({
    post,
    open,
    onClose,
    imageIndex,
    setImageIndex,

    profileData,
    setSharedResource,
    setCommentToEdit,
    setUpdateCommentOpen,
    setFlaggedResource,
    setOpenFlag,
    setOpenReactions,
    setResourceReactions,
    setOpen,
}) {
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();

    const content = post?.images[imageIndex];
    const numSlides = post?.images?.length;
    const [slideIn, setSlideIn] = useState(true);
    const [slideDirection, setSlideDirection] = useState('down');

    // const { data: postData } = useQuery(QUERY_POST_BY_ID, {
    //     variables: { _id: post?._id },
    // });

    const onArrowClick = useCallback(
        (direction) => {
            const increment = direction === 'left' ? -1 : 1;
            const newIndex = (imageIndex + increment + numSlides) % numSlides;

            const oppDirection = direction === 'left' ? 'right' : 'left';
            setSlideDirection(direction);
            setSlideIn(false);

            setTimeout(() => {
                setImageIndex(newIndex);
                setSlideDirection(oppDirection);
                setSlideIn(true);
            }, 500);
        },
        [imageIndex, numSlides, setImageIndex]
    );

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.keyCode === 39) {
                onArrowClick('right');
            }
            if (e.keyCode === 37) {
                onArrowClick('left');
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onArrowClick]);

    return (
        <Dialog fullWidth={true} maxWidth={'lg'} open={open} onClose={onClose}>
            <div
                className="space-between center-horizontal"
                style={{ margin: '2px' }}
            >
                <Typography variant="body2"></Typography>
                <Typography variant="body1"></Typography>
                <IconButton
                    onClick={() => {
                        onClose();
                    }}
                    size="small"
                    className="m-1 p-1"
                >
                    <CloseRounded />
                </IconButton>
            </div>
            <Grid container className={classes.Container}>
                <Grid item xs={12} md={6} lg={6}>
                    <div className={classes.Carousel}>
                        <div style={{ visibility: numSlides < 2 && 'hidden' }}>
                            <Arrow
                                direction="left"
                                clickFunction={() => onArrowClick('left')}
                            />
                        </div>
                        <Slide in={slideIn} direction={slideDirection}>
                            <img
                                style={{ ...modalStyle }}
                                className={classes.Img}
                                src={
                                    process.env.REACT_APP_BACKEND_URL + content
                                }
                            />
                        </Slide>
                        <div style={{ visibility: numSlides < 2 && 'hidden' }}>
                            <Arrow
                                direction="right"
                                clickFunction={() => onArrowClick('right')}
                            />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    {post && (
                        <div className={classes.Content}>
                            <ScrollImage
                                postId={post?._id}
                                onClose={onClose}
                                setOpen={setOpen}
                                profileData={profileData}
                                setUpdateCommentOpen={setUpdateCommentOpen}
                                setOpenFlag={setOpenFlag}
                                setFlaggedResource={setFlaggedResource}
                                setOpenReactions={setOpenReactions}
                                setResourceReactions={setResourceReactions}
                                setSharedResource={setSharedResource}
                                setCommentToEdit={setCommentToEdit}
                            />
                        </div>
                    )}
                </Grid>
            </Grid>
        </Dialog>
    );
}

function Arrow(props) {
    const { direction, clickFunction } = props;
    const icon =
        direction === 'left' ? (
            <ArrowBackIos fontSize="small" />
        ) : (
            <ArrowForwardIos fontSize="small" />
        );

    return (
        <IconButton color="inherit" onClick={clickFunction}>
            {icon}
        </IconButton>
    );
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        ':focus-visibile:': {
            outline: 'none !important',
        },
    };
}

const useStyles = makeStyles((theme) => ({
    Container: {
        height: '600px',
        overflowX: 'hidden',
    },
    Carousel: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '550px',
        padding: '10px 50px',
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            padding: '5px',
        },
    },
    Content: {
        display: 'flex',
        height: '550px',
        padding: '10px',
        [theme.breakpoints.down('sm')]: {
            padding: '5px',
            alignItems: 'center',
        },
    },
    Arrow: {
        height: '30px',
        cursor: 'pointer',
    },
    Img: {
        margin: 'auto',
        overflow: 'scroll',
        maxWidth: '90%',
        maxHeight: '550px',
    },
}));
