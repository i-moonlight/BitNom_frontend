//TODO: Upload video
import { useMutation } from '@apollo/client';
import {
    ChevronRight,
    CloseRounded,
    ImageRounded,
    InsertEmoticon,
    Public,
    VideocamRounded,
} from '@mui/icons-material';
import {
    Avatar,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Modal,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Button } from '../../../../components/Button';
import { getUserInitials } from '../../../../utilities/Helpers';
import {
    getFeed,
    mentionsFinder,
    mentionsUpdate,
} from '../../utilities/functions';
import {
    MUTATION_DELETE_POST,
    MUTATION_UPDATE_POST,
    QUERY_LOAD_SCROLLS,
} from '../../utilities/queries';
import EmojiPickerPopover from '../popovers/EmojiPickerPopover';

const emojiPickerId = 'emoji-picker-popover';
export default function UpdatePost({
    updateScrollOpen,
    setUpdateScrollOpen,
    postToEdit,
    profileData,
    setPostToEdit,
    imageDisabled,
    setOpenImage,
    setImageDisabled,
    videoDisabled,
    setOpenVideo,
    setVideoDisabled,
}) {
    const [updatePostErr, setUpdatePostErr] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [scroll_text, setScrollText] = useState('');
    const [scroll_images, setScrollImages] = useState(null);
    const [scroll_video, setScrollVideo] = useState(undefined);
    const [imagePreviewURLS, setImagePreviewURLS] = useState([]);
    const [videoPreviewURL, setVideoPreviewURL] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = useState(null);

    const isEmojiPickerOpen = Boolean(emojiPickerAnchorEl);

    const state = useSelector((st) => st);
    const user = state.auth.user;

    const [updatePost, { loading }] = useMutation(MUTATION_UPDATE_POST);

    const [deletePost] = useMutation(MUTATION_DELETE_POST);

    const onDeletePost = async (id) => {
        await deletePost({
            variables: {
                _id: id,
            },
            refetchQueries: [
                {
                    query: QUERY_LOAD_SCROLLS,
                    variables: {
                        data: { ids: getFeed(profileData), limit: 220 },
                    },
                },
                {
                    query: QUERY_LOAD_SCROLLS,
                    variables: { data: { author: user?._id, limit: 220 } },
                },
            ],
        });
        setScrollText('');
        setScrollImages(null);
        setScrollVideo(undefined);
        setUpdatePostErr(false);
        setImageDisabled(false);
        setVideoDisabled(false);
        setOpenImage(false);
        setFileType(null);
        setOpenVideo(false);
        setPostToEdit(null);
    };

    const onUpdatePost = async (IUpdatePost) => {
        await updatePost({
            variables: {
                data: IUpdatePost,
            },
            refetchQueries: [
                {
                    query: QUERY_LOAD_SCROLLS,
                    variables: {
                        data: { ids: getFeed(profileData), limit: 220 },
                    },
                },
            ],
        });
        setScrollText('');
        setScrollImages(null);
        setScrollVideo(undefined);
        setUpdatePostErr(false);
        setImageDisabled(false);
        setVideoDisabled(false);
        setOpenImage(false);
        setFileType(null);
        setOpenVideo(false);
        setPostToEdit(null);
        setImagePreviewURLS([]);
        setVideoPreviewURL(null);
    };

    useEffect(() => {
        if (postToEdit?.images.length > 0) {
            setFileType('image');
            setOpenVideo(false);
        } else if (postToEdit?.video?.path) {
            setFileType('video');
            setOpenImage(false);
        }
        if (postToEdit) {
            setScrollText(mentionsUpdate(postToEdit?.content));
        }
        if (postToEdit?.shared_resource?._id) {
            setImageDisabled(true);
            setVideoDisabled(true);
        }
    }, [
        postToEdit,
        setOpenVideo,
        setOpenImage,
        setImageDisabled,
        setVideoDisabled,
    ]);

    const mentions = profileData?.followers?.map?.((item) => {
        return {
            id: item?.userId?._id,
            display: item?.userId?.displayName,
        };
    });

    const handleEmojiPickerOpen = (event) => {
        setEmojiPickerAnchorEl(event.currentTarget);
    };

    const handleEmojiPickerClose = () => {
        setEmojiPickerAnchorEl(null);
    };

    const handleSelectEmoji = (emoji) => {
        handleEmojiPickerClose();
        setScrollText(`${scroll_text} ${emoji.native}`);
    };

    const handleSelectImages = (files) => {
        if (files.length < 1) return;
        if (files.length > 4) {
            return toast.error('You can only upload maximum of 4 images', {
                position: 'bottom-left',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        const previews = [];
        const allowedFiles = [];
        files.forEach((file) => {
            if (file.size > 2500000) {
                previews.splice(0, previews.length);
                allowedFiles.splice(0, allowedFiles.length);
                return toast.error('Each image should be less than 2MB', {
                    position: 'bottom-left',
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                previews.push(URL.createObjectURL(file));
                allowedFiles.push(file);
            }
        });
        setImagePreviewURLS(previews);
        setScrollImages(allowedFiles);
    };

    const handleSelectVideo = (files) => {
        if (files.length < 1) return;
        const file = files[0];
        if (file.size > 4000000) {
            return toast.error('The video should be less than 4MB', {
                position: 'bottom-left',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            setVideoPreviewURL(URL.createObjectURL(file));
            setScrollVideo(file);
        }
    };

    const handleUpdatePost = (e) => {
        e.preventDefault();
        if (scroll_text.trim() == '') return setUpdatePostErr(true);
        const mentionsData = mentionsFinder(scroll_text);
        onUpdatePost({
            post_id: postToEdit?._id,
            content: mentionsData.content,
            content_entities: mentionsData.contentEntities,
            images: scroll_images,
            video: scroll_video,
        });

        setUpdateScrollOpen(false);
    };

    const handleDeletePost = (e) => {
        e.preventDefault();
        onDeletePost(postToEdit?._id);
        setOpenDelete(false);
        setUpdateScrollOpen(false);
    };

    const userInitials = getUserInitials(user?.displayName);

    return (
        <Modal
            style={{
                outline: 'none',

                '&:focusVisible': {
                    outline: 'none',
                },
            }}
            className="center-horizontal center-vertical w-100"
            open={updateScrollOpen}
        >
            <Grid container>
                <Grid item lg={3} md={2} sm={1} xs={1}></Grid>
                <Grid item lg={6} md={8} sm={10} xs={10}>
                    <Card>
                        <div className="space-between mx-3 my-2">
                            <Typography variant="body2"></Typography>
                            <Typography variant="body1">Update Post</Typography>
                            <IconButton
                                onClick={() => {
                                    setUpdateScrollOpen(!updateScrollOpen);
                                    setPostToEdit(null);
                                    setOpenImage(false);
                                    setOpenVideo(false);
                                    setScrollImages(null);
                                    setScrollVideo(null);
                                    setUpdatePostErr(false);
                                    setFileType(null);
                                    setImageDisabled(false);
                                    setVideoDisabled(false);
                                    setImagePreviewURLS([]);
                                    setVideoPreviewURL(null);
                                }}
                                size="small"
                                className="m-1 p-1"
                            >
                                <CloseRounded />
                            </IconButton>
                        </div>

                        <Divider />
                        <CardContent
                            style={{ maxHeight: '500px', overflowY: 'auto' }}
                        >
                            <ListItem className="p-0">
                                <ListItemAvatar>
                                    <Avatar
                                        style={{
                                            backgroundColor: '#fed132',
                                        }}
                                        src={
                                            process.env.REACT_APP_BACKEND_URL +
                                            user?.profile_pic
                                        }
                                    >
                                        {userInitials}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user?.displayName}
                                    secondary={
                                        <Button
                                            textCase
                                            style={{
                                                padding: '0px 10px',
                                                textTransform: 'none',
                                            }}
                                            startIcon={<Public />}
                                            endIcon={
                                                <ChevronRight
                                                    style={{
                                                        transform:
                                                            'rotateZ(90deg)',
                                                    }}
                                                />
                                            }
                                        >
                                            Public
                                        </Button>
                                    }
                                />
                            </ListItem>
                            <MentionsInput
                                spellcheck="false"
                                className="mentions-textarea"
                                id="content-field"
                                placeholder="What's happening"
                                onChange={(e) =>
                                    setScrollText(
                                        scroll_text?.length >= 250
                                            ? e.target.value.substring(
                                                  0,
                                                  e.target.value.length - 1
                                              )
                                            : e.target.value.substring(0, 250)
                                    )
                                }
                                value={scroll_text}
                            >
                                <Mention
                                    markup="/*@__id__-__display__*/"
                                    displayTransform={(id, display) => display}
                                    trigger="@"
                                    data={mentions}
                                    style={{
                                        fontWeight: 900,
                                    }}
                                />
                            </MentionsInput>
                            <Typography color="error" variant="body2">
                                {updatePostErr &&
                                    'The post content cannot be empty'}
                            </Typography>
                            {imagePreviewURLS.length > 0 && (
                                <>
                                    <Grid
                                        container
                                        style={{ margin: '3px 0px' }}
                                    >
                                        {imagePreviewURLS.map((imageURL) => (
                                            <Grid
                                                style={{ padding: '1px' }}
                                                key={imageURL}
                                                item
                                                xs={
                                                    imagePreviewURLS.length > 1
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
                                                        backgroundSize: 'cover',
                                                        backgroundColor:
                                                            'rgba(0,0,0,0.2)',
                                                        backgroundBlendMode:
                                                            'soft-light',
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                            </Grid>
                                        ))}
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
                            <Card
                                style={{
                                    display: 'none',
                                }}
                            >
                                <input
                                    id="update-post-images"
                                    type="file"
                                    onChange={(e) => {
                                        handleSelectImages(
                                            Array.from(e.target.files)
                                        );
                                    }}
                                    accept="image/jpeg, image/png"
                                    multiple
                                />
                                <input
                                    id="update-post-video"
                                    type="file"
                                    onChange={(e) => {
                                        handleSelectVideo(
                                            Array.from(e.target.files)
                                        );
                                    }}
                                    accept="video/mp4"
                                />
                                {/*  <DropzoneArea
                                    clearOnUnmount
                                    dropzoneClass="update-post-dropzone"
                                    clickable={true}
                                    onChange={(files) => {
                                        openVideo
                                            ? handleSelectVideo(files[0])
                                            : handleSelectImages(files);
                                    }}
                                    dropzoneText={
                                        openImage
                                            ? 'Drag n drop images here or click'
                                            : 'Drag n drop a video here or click'
                                    }
                                    acceptedFiles={
                                        openImage
                                            ? ['image/jpeg', 'image/png']
                                            : ['video/*']
                                    }
                                    maxFileSize={openImage ? 2500000 : 4500000}
                                    filesLimit={openImage ? 4 : 1}
                                    showAlerts={false}
                                    showPreviews={false}
                                    showPreviewsInDropzone
                                    previewGridProps={{
                                        container: {
                                            spacing: 1,
                                            direction: 'row',
                                        },
                                    }}
                                    onAlert={(message, variant) => {
                                        if (variant == 'error') {
                                            toast.error(message, {
                                                position: 'bottom-left',
                                                autoClose: 5000,
                                                hideProgressBar: true,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                            });
                                        }
                                    }}
                                /> */}
                            </Card>
                            {(postToEdit?.video?.path ||
                                postToEdit?.images?.length > 0) &&
                                fileType !== null && (
                                    <Card className="mt-2">
                                        <div className="space-between mx-3 my-2">
                                            <Typography variant="body2"></Typography>
                                            <Typography variant="body1"></Typography>
                                            <IconButton
                                                size="small"
                                                className="m-1 p-1"
                                            >
                                                <CloseRounded
                                                    onClick={() => {
                                                        setFileType(null);
                                                        setScrollImages([]);
                                                        setScrollVideo(null);
                                                    }}
                                                />
                                            </IconButton>
                                        </div>
                                        <Grid
                                            container
                                            style={{ margin: '3px 0px' }}
                                        >
                                            {postToEdit?.video?.path && (
                                                <Grid item xs={12}>
                                                    <CardMedia
                                                        component="video"
                                                        src={`${process.env.REACT_APP_BACKEND_URL}${postToEdit?.video?.path}`}
                                                        controls
                                                        preload="metadata"
                                                    />
                                                </Grid>
                                            )}
                                            {postToEdit?.images?.length > 0 &&
                                                postToEdit?.images?.map(
                                                    (imageURL) => (
                                                        <Grid
                                                            style={{
                                                                padding: '1px',
                                                            }}
                                                            key={imageURL}
                                                            item
                                                            xs={
                                                                postToEdit
                                                                    ?.images
                                                                    ?.length > 1
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
                                                                        process
                                                                            .env
                                                                            .REACT_APP_BACKEND_URL +
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
                                    </Card>
                                )}
                            {/* <Divider /> */}
                            <Dialog
                                open={openDelete}
                                onClose={() => setOpenDelete(false)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {'Delete this post?'}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        This can’t be undone and it will be
                                        removed from your profile, the timeline
                                        of any accounts that follow you, and
                                        from the BNConnect platform.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={() => setOpenDelete(false)}
                                        color="primary"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleDeletePost}
                                        color="primary"
                                        autoFocus
                                    >
                                        Delete
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <div className="center-horizontal mt-1">
                                <div className="center-horizontal">
                                    <IconButton
                                        size="small"
                                        onClick={() => {
                                            setOpenVideo(false);
                                            setOpenImage(true);

                                            setFileType(null);
                                            setScrollImages([]);
                                            setScrollVideo(null);
                                            setVideoDisabled(true);
                                            document
                                                .getElementById(
                                                    'update-post-images'
                                                )
                                                .click();
                                        }}
                                        disabled={imageDisabled}
                                    >
                                        <ImageRounded />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => {
                                            setOpenImage(false);
                                            setOpenVideo(true);

                                            setFileType(null);
                                            setScrollImages([]);
                                            setScrollVideo(null);
                                            setImageDisabled(true);
                                            document
                                                .getElementById(
                                                    'update-post-video'
                                                )
                                                .click();
                                        }}
                                        disabled={videoDisabled}
                                    >
                                        <VideocamRounded />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        aria-label="pick emoji"
                                        aria-controls={emojiPickerId}
                                        aria-haspopup="true"
                                        onClick={(e) => {
                                            handleEmojiPickerOpen(e);
                                        }}
                                    >
                                        <InsertEmoticon />
                                    </IconButton>
                                </div>
                                <div>
                                    <Button
                                        style={{
                                            backgroundColor: '#ba000d',
                                            color: '#FFFFFF',
                                            marginRight: '3px',
                                        }}
                                        variant="contained"
                                        onClick={() => setOpenDelete(true)}
                                        size="small"
                                    >
                                        Delete
                                    </Button>
                                    {!loading && (
                                        <Button
                                            size="small"
                                            onClick={handleUpdatePost}
                                        >
                                            Update
                                        </Button>
                                    )}
                                    {loading && (
                                        <Button
                                            size="small"
                                            style={{ margin: '0' }}
                                        >
                                            <CircularProgress
                                                size={24}
                                                thickness={4}
                                            />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                        <EmojiPickerPopover
                            emojiPickerId={emojiPickerId}
                            emojiPickerAnchorEl={emojiPickerAnchorEl}
                            isEmojiPickerOpen={isEmojiPickerOpen}
                            handleEmojiPickerClose={handleEmojiPickerClose}
                            handleSelectEmoji={handleSelectEmoji}
                        />
                    </Card>
                </Grid>
            </Grid>
        </Modal>
    );
}
