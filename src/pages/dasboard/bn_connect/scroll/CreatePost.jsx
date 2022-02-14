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
import { Button } from '../../../../components/Button';
//import { loadScrolls, loadFeed } from '../../../../store/actions/postActions';
import { getUserInitials } from '../../../../utilities/Helpers';
import EventPreview from '../../events/EventPreview';
import { mentionsFinder } from '../../utilities/functions';
import {
    MUTATION_CREATE_POST,
    QUERY_GET_FEED,
    QUERY_LOAD_SCROLLS,
} from '../../utilities/queries';
import ScrollPreview from './ScrollPreview';

const EmojiPickerPopover = React.lazy(() =>
    import('../popovers/EmojiPickerPopover')
);

const emojiPickerId = 'emoji-picker-popover';

export default function CreatePost({
    open,
    setOpen,
    imageDisabled,
    setOpenImage,
    setImageDisabled,
    profileData,
    videoDisabled,
    setOpenVideo,
    setVideoDisabled,
    sharedResource,
    setSharedResource,
}) {
    const [errors, setErrors] = useState([]);
    const [scroll_text, setScrollText] = useState('');
    const [scroll_images, setScrollImages] = useState([]);
    const [scroll_video, setScrollVideo] = useState(null);
    const [imagePreviewURLS, setImagePreviewURLS] = useState([]);
    const [videoPreviewURL, setVideoPreviewURL] = useState(null);
    const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = useState(null);

    const isEmojiPickerOpen = Boolean(emojiPickerAnchorEl);

    //const dispatch = useDispatch();
    const state = useSelector((st) => st);
    const user = state.auth.user;

    const [createPost, { loading, data }] = useMutation(MUTATION_CREATE_POST, {
        update(cache, { data: createPostData }) {
            const newPost = createPostData?.Posts?.create;
            const existingFeed = cache.readQuery({
                query: QUERY_GET_FEED,
                variables: {
                    data: { feed_id: user?._id, limit: 10 },
                },
            });

            cache.writeQuery({
                query: QUERY_GET_FEED,
                variables: {
                    data: { feed_id: user?._id, limit: 10 },
                },
                data: {
                    Feed: {
                        get: {
                            _id: existingFeed?.Feed?.get?._id,
                            data: [newPost, ...existingFeed?.Feed?.get?.data],
                            hasMore: existingFeed?.Feed?.get?.hasMore,
                        },
                    },
                },
            });
        },
    });

    const userInitials = getUserInitials(user?.displayName);

    const onCreatePost = (ICreatePost) => {
        createPost({
            variables: {
                data: ICreatePost,
            },
            errorPolicy: 'all',
            refetchQueries: [
                {
                    query: QUERY_LOAD_SCROLLS,
                    variables: {
                        data: { author: user?._id, limit: 220 },
                    },
                },
            ],
        }).then(({ data: createPostData, errors: createPostErrors }) => {
            if (createPostData?.Posts?.create) {
                handleCloseModal();
            }
            if (createPostErrors) {
                if (
                    createPostErrors[0]?.message?.includes(
                        'Unsupported MIME type:'
                    )
                ) {
                    const errorMsg = createPostErrors[0]?.message;
                    const mime = errorMsg?.substring(
                        errorMsg?.indexOf(':') + 1
                    );

                    setErrors([
                        `Your image(s) have an unsupported file type (${mime})`,
                    ]);

                    setImagePreviewURLS([]);
                    setScrollImages([]);
                    setScrollVideo(null);
                } else {
                    setErrors([
                        `Something is wrong! Check your connection and refresh the page.`,
                    ]);
                }
            }
        });
    };

    useEffect(() => {
        if (sharedResource) {
            setImageDisabled(true);
            setVideoDisabled(true);
        }
    }, [setImageDisabled, setVideoDisabled, sharedResource]);

    const mentions = profileData?.followers?.map?.((item) => {
        return {
            id: item?.userId?._id,
            display: item?.userId?.displayName,
        };
    });

    const handleCloseModal = () => {
        setOpen(!open);
        setOpenImage(false);
        setScrollText('');
        setOpenVideo(false);
        setScrollImages([]);
        setScrollVideo(null);
        setErrors([]);
        setSharedResource(null);
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
            if (file.size > 2000000) {
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

    const handleCreatePost = (e) => {
        e.preventDefault();

        if (scroll_text.trim() == '') {
            return setErrors(['The post content cannot be empty.']);
        }

        let sharedResourceType;
        if (sharedResource != null) {
            if (sharedResource?.__typename === 'OPost') {
                sharedResourceType = 'post';
            } else if (sharedResource?.__typename === 'OEvent') {
                sharedResourceType = 'event';
            }
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
    };

    return (
        <Modal
            data={data}
            style={{
                outline: 'none',

                '&:focusVisible': {
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
                        <div
                            className="space-between center-horizontal"
                            style={{ margin: '2px' }}
                        >
                            <Typography variant="body2"></Typography>
                            <Typography variant="body1">
                                {sharedResource
                                    ? `Share to your friends`
                                    : 'Create Post'}
                            </Typography>
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
                                                //backgroundColor: theme.palette.background.default,
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
                                    marginTop: '3px',
                                    display: 'none',
                                }}
                            >
                                <input
                                    id="create-post-images"
                                    type="file"
                                    onChange={(e) => {
                                        handleSelectImages(
                                            Array.from(e.target.files)
                                        );
                                    }}
                                    accept="image/jpeg, image/png, image/gif"
                                    multiple
                                />
                                <input
                                    id="create-post-video"
                                    type="file"
                                    onChange={(e) => {
                                        handleSelectVideo(
                                            Array.from(e.target.files)
                                        );
                                    }}
                                    accept="video/mp4"
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
                            {errors?.length > 0 && (
                                <Card
                                    elevation={0}
                                    style={{
                                        marginTop: '3px',
                                        background: 'transparent',
                                    }}
                                    component="div"
                                    //variant="outlined"
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
                                            setOpenImage(true);
                                            setVideoDisabled(true);

                                            document
                                                .getElementById(
                                                    'create-post-images'
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
                                            setOpenVideo(true);
                                            setImageDisabled(true);

                                            document
                                                .getElementById(
                                                    'create-post-video'
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
                                    {/* {createPostIcons.map(({ Icon }) => {
                                        return (
                                            <IconButton
                                                size="small"
                                                key={`${Math.random() * 1000}`}
                                            >
                                                <Icon />
                                            </IconButton>
                                        );
                                    })} */}
                                </div>
                                {loading ? (
                                    <CircularProgress
                                        color="primary"
                                        size={24}
                                        thickness={4}
                                    />
                                ) : (
                                    <Button
                                        size="small"
                                        onClick={handleCreatePost}
                                        //disabled={loading}
                                    >
                                        Post
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

/*  optimisticResponse: {
                Posts: {
                    create: {
                        content: mentionsFinder(scroll_text).content,
                        content_entities:
                            mentionsFinder(scroll_text).contentEntities,
                        images: imagePreviewURLS,
                        video: videoPreviewURL,
                        createdAt: new Date().getTime(),
                        author: {
                            __typename: 'OAuthor',
                            _id: user?._id,
                            displayName: user?.displayName,
                            profile_pic: user?.profile_pic,
                            bio: '',
                            type: '',
                            reputation: '',
                        },
                        ...createPostResponse,
                    },
                },
            }, */
