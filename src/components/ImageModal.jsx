import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Dialog, Grid, IconButton, Slide, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useCallback, useEffect, useState } from 'react';
import ScrollImage from '../pages/dasboard/bn_connect/scroll/ScrollImage';

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
    setImagePreviewURL,
    setImagePreviewOpen,
}) {
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();

    const content = post?.images[imageIndex];
    const numSlides = post?.images?.length;
    const [slideIn, setSlideIn] = useState(true);
    const [slideDirection, setSlideDirection] = useState('down');

    const mdDown = useMediaQuery('(max-width:1279px)');

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
                    {post && !mdDown && (
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
                                setImagePreviewOpen={setImagePreviewOpen}
                                setImagePreviewURL={setImagePreviewURL}
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
        ':focusVisibile:': {
            outline: 'none !important',
        },
    };
}

const useStyles = makeStyles((theme) => ({
    Container: {
        height: '550px',
        overflowX: 'hidden',
        overflowY: 'auto',
        [theme.breakpoints.down('md')]: {
            height: 'fit-content',
            padding: '5px',
        },
    },
    Carousel: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '500px',
        padding: '10px',
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            padding: '5px',
            height: 'fit-content',
        },
    },
    Content: {
        display: 'flex',
        height: '550px',
        padding: '10px',
        /* [theme.breakpoints.down('sm')]: {
            padding: '5px',
            alignItems: 'center',
            height: 'fit-content',
        }, */
    },
    Arrow: {
        height: '30px',
        cursor: 'pointer',
    },
    Img: {
        margin: 'auto',
        overflow: 'scroll',
        maxWidth: '90%',
        maxHeight: '500px',
        // minHeight: '100px',
    },
}));
