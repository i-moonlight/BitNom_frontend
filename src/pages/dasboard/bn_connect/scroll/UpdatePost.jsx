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
import { DropzoneArea } from 'react-mui-dropzone';
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
    openImage,
    imageDisabled,
    setOpenImage,
    setImageDisabled,
    openVideo,
    videoDisabled,
    setOpenVideo,
    setVideoDisabled,
}) {
    const [updatePostErr, setUpdatePostErr] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [scroll_text, setScrollText] = useState('');
    const [scroll_images, setScrollImages] = useState(null);
    const [scroll_video, setScrollVideo] = useState(undefined);
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
                // {
                //     query: QUERY_LOAD_SCROLLS,
                //     variables: {
                //         data: { ids: getFeed(profileData), limit: 220 },
                //     },
                // },
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
    };

    useEffect(() => {
        if (postToEdit?.images.length > 0) {
            setFileType('image');
        } else if (postToEdit?.video?.path) {
            setFileType('video');
        }
        if (postToEdit) {
            setScrollText(mentionsUpdate(postToEdit?.content));
        }
    }, [postToEdit]);

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

                '&:focus-visible': {
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
                            {/*  <TextField
                fullWidth
                multiline
                variant='standard'
                error={updatePostErr && true}
                errorText={updatePostErr && 'The post content cannot be empty'}
                rows={5}
                id='update-scroll-field'
                placeholder="What's happening"
                onChange={(e) =>
                  setScrollText(
                    scroll_text?.length >= 250
                      ? e.target.value.substring(0, e.target.value.length - 1)
                      : e.target.value
                  )
                }
                value={scroll_text}
              /> */}
                            <Card
                                style={{
                                    display:
                                        openImage || openVideo
                                            ? 'block'
                                            : 'none',
                                }}
                            >
                                <DropzoneArea
                                    clearOnUnmount
                                    onChange={(files) => {
                                        openImage
                                            ? setScrollImages(files)
                                            : setScrollVideo(files[0]);
                                    }}
                                    dropzoneText={
                                        openImage
                                            ? 'Drag n drop images here or click'
                                            : 'Drag n drop a video here or click'
                                    }
                                    acceptedFiles={
                                        openImage
                                            ? ['.jpeg', '.png']
                                            : ['video/*']
                                    }
                                    maxFileSize={5000000}
                                    filesLimit={openImage ? 4 : 1}
                                    showAlerts={['error']}
                                    showPreviews={false}
                                    showPreviewsInDropzone
                                    previewGridProps={{
                                        container: {
                                            spacing: 1,
                                            direction: 'row',
                                        },
                                    }}
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
                                            spacing={2}
                                            className="mb-2"
                                        >
                                            {postToEdit?.video?.path && (
                                                <Grid item xs={12}>
                                                    <CardMedia
                                                        component="video"
                                                        src={`${process.env.REACT_APP_BACKEND_URL}${postToEdit?.video?.path}`}
                                                        controls
                                                    />
                                                </Grid>
                                            )}
                                            {postToEdit?.images?.length > 0 &&
                                                postToEdit?.images?.map(
                                                    (imageURL) => (
                                                        <Grid
                                                            className="mt-3"
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
                            <div className="space-between mt-1">
                                <div className="center-horizontal">
                                    <IconButton
                                        size="small"
                                        className="m-1 p-1"
                                        onClick={() => {
                                            setOpenImage(true);
                                            setFileType(null);
                                            setScrollImages([]);
                                            setScrollVideo(null);
                                            setVideoDisabled(true);
                                        }}
                                        disabled={imageDisabled}
                                        style={{
                                            marginRight: 10,
                                        }}
                                    >
                                        <ImageRounded />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        className="m-1 p-1"
                                        onClick={() => {
                                            setOpenVideo(true);
                                            setFileType(null);
                                            setScrollImages([]);
                                            setScrollVideo(null);
                                            setImageDisabled(true);
                                        }}
                                        disabled={videoDisabled}
                                        style={{
                                            marginRight: 10,
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
                                            marginRight: '12px',
                                        }}
                                        variant="contained"
                                        onClick={() => setOpenDelete(true)}
                                    >
                                        Delete
                                    </Button>
                                    {!loading && (
                                        <Button onClick={handleUpdatePost}>
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
