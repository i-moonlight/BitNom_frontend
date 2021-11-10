import { useMutation, useQuery } from '@apollo/client';
import {
    ChevronRight,
    CloseRounded,
    ImageRounded,
    Public,
    VideocamRounded,
    InsertEmoticon,
} from '@mui/icons-material';
import {
    Avatar,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Modal,
    Typography,
    CardMedia,
} from '@mui/material';
import { DropzoneArea } from 'react-mui-dropzone';
import { useState, useEffect } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components/Button';
//import TextField from '../../../../components/TextField';
import { createPostIcons } from '../../../../store/local/dummy';
import { getUserInitials } from '../../../../utilities/Helpers';
import { loadScrolls } from '../../../../store/actions/postActions';
import EventPreview from '../../events/EventPreview';
import EmojiPickerPopover from '../popovers/EmojiPickerPopover';
import { getFeed, mentionsFinder } from '../../utilities/functions';
import {
    MUTATION_CREATE_POST,
    QUERY_LOAD_SCROLLS,
} from '../../utilities/queries';
import ScrollPreview from './ScrollPreview';

const emojiPickerId = 'emoji-picker-popover';
export default function CreatePost({
    open,
    setOpen,
    openImage,
    imageDisabled,
    setOpenImage,
    setImageDisabled,
    openVideo,
    profileData,
    videoDisabled,
    setOpenVideo,
    setVideoDisabled,
    sharedResource,
    setSharedResource,
}) {
    const [createPostErr, setCreatePostErr] = useState(null);

    const [scroll_text, setScrollText] = useState('');
    const [scroll_images, setScrollImages] = useState([]);
    const [scroll_video, setScrollVideo] = useState(null);
    const [imagePreviewURLS, setImagePreviewURLS] = useState([]);
    const [videoPreviewURL, setVideoPreviewURL] = useState(null);
    const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = useState(null);

    const isEmojiPickerOpen = Boolean(emojiPickerAnchorEl);

    const dispatch = useDispatch();
    const state = useSelector((st) => st);
    const user = state.auth.user;
    const [createPost, { loading, data, error }] =
        useMutation(MUTATION_CREATE_POST);

    const {
        loading: feedLoading,
        data: feedData,
        error: feedError,
    } = useQuery(QUERY_LOAD_SCROLLS, {
        variables: {
            data: { ids: getFeed(profileData), limit: 220 },
        },
    });

    const userInitials = getUserInitials(user?.displayName);

    const onCreatePost = async (ICreatePost) => {
        await createPost({
            variables: {
                data: ICreatePost,
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
        setScrollImages([]);
        setScrollVideo(null);
        setSharedResource(null);
        setCreatePostErr(false);
        setImageDisabled(false);
        setVideoDisabled(false);
        setOpenImage(false);
        setOpenVideo(false);
        setImagePreviewURLS([]);
        setVideoPreviewURL(null);
    };

    useEffect(() => {
        !error && !loading && dispatch(loadScrolls(feedData?.Posts?.get));
    }, [
        dispatch,
        feedData?.Posts?.get,
        feedError,
        feedLoading,
        error,
        loading,
    ]);

    useEffect(() => {
        if (sharedResource) {
            setImageDisabled(true);
            setVideoDisabled(true);
        }
    }, [sharedResource, setImageDisabled, setVideoDisabled]);

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
        const previews = [];
        files.forEach((file) => {
            previews.push(URL.createObjectURL(file));
        });
        setImagePreviewURLS(previews);
        setScrollImages(files);
    };

    const handleSelectVideo = (file) => {
        if (!file) return;
        setVideoPreviewURL(URL.createObjectURL(file));
        setScrollVideo(file);
    };

    const handleCreatePost = (e) => {
        e.preventDefault();

        if (scroll_text.trim() == '') return setCreatePostErr(true);
        let sharedResourceType;
        if (sharedResource?.__typename === 'OPost') {
            sharedResourceType = 'post';
        } else if (sharedResource?.__typename === 'OEvent') {
            sharedResourceType = 'event';
        }
        const shared = sharedResource
            ? { _id: sharedResource?._id, type: sharedResourceType }
            : null;
        const flag = sharedResource ? sharedResource?.is_flag : null;

        const mentionsData = mentionsFinder(scroll_text);
        onCreatePost({
            content: mentionsData.content,
            content_entities: mentionsData.contentEntities,
            images: scroll_images,
            video: scroll_video,
            shared_resource: shared,
            is_flag: flag,
        });
        setOpen(false);
    };

    return (
        <Modal
            data={data}
            style={{
                outline: 'none',

                '&:focus-visible': {
                    outline: 'none',
                },
            }}
            className="center-horizontal center-vertical w-100"
            open={open}
        >
            <Grid container>
                <Grid item lg={3} md={2} sm={1} xs={1}></Grid>
                <Grid item lg={6} md={8} sm={10} xs={10}>
                    <Card>
                        <div className="space-between mx-3 my-2 center-horizontal">
                            <Typography variant="body2"></Typography>
                            <Typography variant="body1">
                                {sharedResource
                                    ? `Share to your followers`
                                    : 'Create Post'}
                            </Typography>
                            <IconButton
                                onClick={() => {
                                    setOpen(!open);
                                    setOpenImage(false);
                                    setScrollText('');
                                    setOpenVideo(false);
                                    setScrollImages([]);
                                    setScrollVideo(null);
                                    setCreatePostErr(false);
                                    setSharedResource(null);
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
                                            variant="text"
                                            style={{
                                                //backgroundColor: theme.palette.background.default,
                                                padding: '0px 10px',
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
                                {createPostErr &&
                                    'The post content cannot be empty'}
                            </Typography>
                            {imagePreviewURLS.length > 0 && (
                                <>
                                    {/*  <div className="space-between mx-3 my-2 center-horizontal">
                                        <Typography variant="body2"></Typography>
                                        <Typography variant="body1"></Typography>
                                        <IconButton
                                            onClick={() => {
                                                setScrollImages([]);
                                                setImagePreviewURLS([]);
                                            }}
                                            size="small"
                                        >
                                            <CloseRounded />
                                        </IconButton>
                                    </div> */}
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
                                    marginTop: '3px',
                                    display: 'none',
                                }}
                            >
                                <DropzoneArea
                                    clearOnUnmount
                                    dropzoneClass="post-dropzone"
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
                            {sharedResource &&
                                sharedResource?.__typename === 'OPost' && (
                                    <ScrollPreview scroll={sharedResource} />
                                )}
                            {sharedResource &&
                                sharedResource?.__typename === 'OEvent' && (
                                    <EventPreview event={sharedResource} />
                                )}
                            {/* <Divider /> */}
                            <div className="space-between mt-1">
                                <div className="center-horizontal">
                                    <IconButton
                                        size="small"
                                        //className="m-1 p-1"
                                        onClick={() => {
                                            setOpenImage(true);
                                            setVideoDisabled(true);
                                            document
                                                .getElementsByClassName(
                                                    'post-dropzone'
                                                )[0]
                                                .click();
                                        }}
                                        disabled={imageDisabled}
                                        style={{
                                            marginRight: '2px',
                                        }}
                                    >
                                        <ImageRounded />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        //className="m-1 p-1"
                                        onClick={() => {
                                            setOpenVideo(true);
                                            setImageDisabled(true);
                                            document
                                                .getElementsByClassName(
                                                    'post-dropzone'
                                                )[0]
                                                .click();
                                        }}
                                        disabled={videoDisabled}
                                        style={{
                                            marginRight: '2px',
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
                                        style={{
                                            marginRight: '2px',
                                        }}
                                    >
                                        <InsertEmoticon />
                                    </IconButton>
                                    {createPostIcons.map(({ Icon }) => {
                                        return (
                                            <IconButton
                                                size="small"
                                                //className="m-1 p-1"
                                                key={`${Math.random() * 1000}`}
                                                style={{
                                                    marginRight: '2px',
                                                }}
                                            >
                                                <Icon />
                                            </IconButton>
                                        );
                                    })}
                                </div>
                                {!loading && (
                                    <Button onClick={handleCreatePost}>
                                        Post
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
