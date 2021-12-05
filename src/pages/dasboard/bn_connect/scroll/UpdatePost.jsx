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
import React, { useEffect, useState } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button } from '../../../../components/Button';
import { getUserInitials } from '../../../../utilities/Helpers';
import { mentionsFinder, mentionsUpdate } from '../../utilities/functions';
import {
    MUTATION_DELETE_POST,
    MUTATION_UPDATE_POST,
} from '../../utilities/queries';

const EmojiPickerPopover = React.lazy(() =>
    import('../popovers/EmojiPickerPopover')
);

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
    postView,
}) {
    //const [updatePostErr, setUpdatePostErr] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [errors, setErrors] = useState([]);
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
    const history = useHistory();

    const [updatePost, { loading }] = useMutation(MUTATION_UPDATE_POST);

    const [deletePost] = useMutation(MUTATION_DELETE_POST);

    const onDeletePost = async (id) => {
        await deletePost({
            variables: {
                _id: id,
            },
            update(cache) {
                const normalizedId = cache.identify({
                    id,
                    __typename: 'OPost',
                });
                cache.evict({ id: normalizedId });
                cache.gc();
            },
        });
        handleCloseModal();
        if (postView) history.push('/connect');
    };

    const onUpdatePost = async (IUpdatePost) => {
        await updatePost({
            variables: {
                data: IUpdatePost,
            },
            errorPolicy: 'all',
        }).then(({ data: updatePostData, errors: updatePostErrors }) => {
            if (updatePostData?.Posts?.update) {
                handleCloseModal();
            }
            if (updatePostErrors) {
                if (
                    updatePostErrors[0]?.message?.includes(
                        'Unsupported MIME type:'
                    )
                ) {
                    const errorMsg = updatePostErrors[0]?.message;
                    const mime = errorMsg?.substring(
                        errorMsg?.indexOf(':') + 1
                    );

                    setErrors([
                        `Unsupported file type! The original type of your image is ${mime}`,
                    ]);
                    setImagePreviewURLS([]);
                    setScrollImages([]);
                    setScrollVideo(null);
                } else if (updatePostErrors[0]?.message == 400) {
                    const errorObject = updatePostErrors[0];
                    const errorArr = [];
                    for (const [key, value] of Object.entries(
                        errorObject?.state
                    )) {
                        errorArr.push(`~ ${value[0]}`);
                        if (key === 'content') {
                            setErrors(['The post content cannot be empty.']);
                        }
                    }
                    setErrors(errorArr);
                } else {
                    setErrors([
                        `Something is wrong! Check your connection and refresh the page.`,
                    ]);
                }
            }
        });
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

    const handleCloseModal = () => {
        setUpdateScrollOpen(!updateScrollOpen);
        setPostToEdit(null);
        setOpenImage(false);
        setOpenVideo(false);
        setScrollImages(null);
        setScrollVideo(null);
        setErrors([]);
        setFileType(null);
        setImageDisabled(false);
        setVideoDisabled(false);
        setImagePreviewURLS([]);
        setVideoPreviewURL(null);
    };

    const handleEmojiPickerOpen = (event) => {
        setEmojiPickerAnchorEl(event.currentTarget);
    };

    const handleEmojiPickerClose = () => {
        setEmojiPickerAnchorEl(null);
    };

    const handleSelectEmoji = (emoji) => {
        //handleEmojiPickerClose();
        setScrollText(`${scroll_text} ${emoji}`);
    };

    const handleSelectImages = (files) => {
        if (files.length < 1) return;
        if (files.length > 4) {
            return setErrors(['You can only upload a maximum of 4 images']);
        }
        const previews = [];
        const allowedFiles = [];
        files.forEach((file) => {
            if (file.size > 2500000) {
                previews.splice(0, previews.length);
                allowedFiles.splice(0, allowedFiles.length);
                return setErrors(['Each image should be less than 2MB']);
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
            return setErrors(['The video should be less than 4MB']);
        } else {
            setVideoPreviewURL(URL.createObjectURL(file));
            setScrollVideo(file);
        }
    };

    const handleUpdatePost = (e) => {
        e.preventDefault();
        if (scroll_text.trim() == '') {
            return setErrors(['The post content cannot be empty.']);
        }
        const mentionsData = mentionsFinder(scroll_text);
        onUpdatePost({
            post_id: postToEdit?._id,
            content: mentionsData.content,
            content_entities: mentionsData.contentEntities,
            images: scroll_images,
            video: scroll_video,
        });
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
                                    handleCloseModal();
                                }}
                                size="small"
                                className="m-1 p-1"
                            >
                                <CloseRounded />
                            </IconButton>
                        </div>

                        <Divider />
                        <CardContent
                            style={{ maxHeight: '85vh', overflowY: 'auto' }}
                        >
                            <ListItem className="p-0">
                                <ListItemAvatar>
                                    <Avatar
                                        style={{
                                            backgroundColor: '#fed132',
                                        }}
                                        src={
                                            user?.profile_pic &&
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
                                spellCheck="false"
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
                                                onClick={() => {
                                                    setFileType(null);
                                                    setScrollImages([]);
                                                    setScrollVideo(null);
                                                }}
                                            >
                                                <CloseRounded />
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
                            {errors?.length > 0 && (
                                <Card
                                    elevation={0}
                                    style={{
                                        marginTop: '3px',
                                        background: 'transparent',
                                    }}
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
                            <div className="space-between mt-1">
                                <div className="center-horizontal">
                                    <IconButton
                                        size="small"
                                        onClick={() => {
                                            setOpenVideo(false);
                                            setOpenImage(true);
                                            setImagePreviewURLS([]);
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
                                        style={{
                                            display: imageDisabled && 'none',
                                        }}
                                    >
                                        <ImageRounded />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => {
                                            setOpenImage(false);
                                            setOpenVideo(true);
                                            setVideoPreviewURL(null);
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
                                        style={{
                                            display: videoDisabled && 'none',
                                        }}
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
                                            display: loading && 'none',
                                        }}
                                        variant="contained"
                                        onClick={() => setOpenDelete(true)}
                                        size="small"
                                    >
                                        Delete
                                    </Button>

                                    <Button
                                        size="small"
                                        onClick={handleUpdatePost}
                                        disabled={loading}
                                    >
                                        Update
                                    </Button>
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
