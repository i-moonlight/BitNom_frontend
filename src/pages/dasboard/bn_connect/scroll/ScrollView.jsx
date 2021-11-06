import { useMutation, useQuery } from '@apollo/client';
import {
    ArrowBack,
    CloseRounded,
    CommentRounded,
    FavoriteRounded,
    ImageRounded,
    InsertEmoticon,
    MoreVert,
    PanToolRounded,
    Send,
    ShareRounded,
    ThumbDownRounded,
    ThumbUpRounded,
} from '@mui/icons-material';
import {
    Avatar,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Hidden,
    IconButton,
    Typography,
    useTheme,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
//import ImagePreview from '../../../components/ImagePreview';
//import TextField from '../../../../components/TextField';
import { Mention, MentionsInput } from 'react-mentions';
import { DropzoneArea } from 'react-mui-dropzone';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Button } from '../../../../components/Button';
import ImagePreview from '../../../../components/ImagePreview';
import ReactionButton from '../../../../components/ReactionButton';
import Screen from '../../../../components/Screen';
import SEO from '../../../../components/SEO';
import { getUserInitials } from '../../../../utilities/Helpers';
import EventPreview from '../../events/EventPreview';
import {
    contentBodyFactory,
    getReactionsSum,
    getTopComments,
    mentionsFinder,
} from '../../utilities/functions';
import {
    MUTATION_CREATE_COMMENT,
    MUTATION_CREATE_REACTION,
    MUTATION_REMOVE_REACTION,
    QUERY_FETCH_PROFILE,
    QUERY_GET_COMMENTS,
    QUERY_LOAD_SCROLLS,
    QUERY_POST_BY_ID,
} from '../../utilities/queries';
import EmojiPickerPopover from '../popovers/EmojiPickerPopover';
import FlagResourceModal from '../popovers/FlagResourceModal';
import ReactionsModal from '../popovers/ReactionsModal';
import UserCard from '../UserCard';
import Comment from './comment/Comment';
import UpdateComment from './comment/UpdateComment';
import CreatePost from './CreatePost';
import FilterButton from './FilterButton';
// import LinkCard from './LinkCard';
import ScrollOptionsPopover from './ScrollOptionsPopover';
import ScrollPreview from './ScrollPreview';
import UpdatePost from './UpdatePost';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
    clickableTypography: {
        color: 'inherit',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        },
        [theme.breakpoints.down('md')]: {
            textDecoration: 'underline',
        },
    },
    replies: {
        color: 'inherit',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    inputHelper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '10px',
        padding: '0px 10px 0px 5px',
        [theme.breakpoints.up('md')]: {
            padding: '0px 30px 0px 20px',
        },
    },
    red: {
        color: red[500],
    },
    green: {
        color: green[500],
    },
    primary: {
        color: '#006097',
    },
}));

const scrollOptionId = 'menu-scroll-option';
const emojiPickerId = 'emoji-picker-popover';
function PostView({ match }) {
    const classes = useStyles();
    const [updateScrollOpen, setUpdateScrollOpen] = useState(false);
    const [updateCommentOpen, setUpdateCommentOpen] = useState(false);
    const [openFlag, setOpenFlag] = useState(false);
    const [openReactions, setOpenReactions] = useState(false);
    const [resourceReactions, setResourceReactions] = useState(null);
    const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
    const [imagePreviewURL, setImagePreviewURL] = useState(null);
    const [createScrollOpen, setCreateScrollOpen] = useState(false);
    const [sharedResource, setSharedResource] = useState(null);
    const [postToEdit, setPostToEdit] = useState(null);
    const [commentToEdit, setCommentToEdit] = useState(null);
    const [flaggedResource, setFlaggedResource] = useState(null);
    //const [openImage, setOpenImage] = useState(false);
    const [openVideo, setOpenVideo] = useState(false);
    const [videoDisabled, setVideoDisabled] = useState(false);
    const [imageDisabled, setImageDisabled] = useState(false);
    const [previewURL, setPreviewURL] = useState();
    const [fileErrors, setFileErrors] = useState([]);

    const [scrollOptionAnchorEl, setScrollOptionAnchorEl] = useState(null);
    const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = useState(null);
    const [userReaction, setUserReaction] = useState();
    const [reactionIcon, setReactionIcon] = useState();
    const [openComments, setOpenComments] = useState(true);
    const [commentFilter, setCommentFilter] = useState(0);
    const [comment_text, setCommentText] = useState('');
    const [comment_image, setCommentImage] = useState(null);
    const [openImage, setOpenImage] = useState(false);
    const [likeHovered, setLikeHovered] = useState(false);
    const [createCommentErr, setCreateCommentErr] = useState(false);

    const isScrollOptionOpen = Boolean(scrollOptionAnchorEl);
    const isEmojiPickerOpen = Boolean(emojiPickerAnchorEl);
    const [createReaction] = useMutation(MUTATION_CREATE_REACTION);
    const [removeReaction] = useMutation(MUTATION_REMOVE_REACTION);

    const theme = useTheme();
    const state = useSelector((st) => st);
    const history = useHistory();
    const user = state.auth.user;

    const { loading: postLoading, data: postData } = useQuery(
        QUERY_POST_BY_ID,
        {
            variables: { _id: match?.params?.id },
        }
    );
    const {
        //  loading,
        data: profileData,
    } = useQuery(QUERY_FETCH_PROFILE, {
        context: { clientName: 'users' },
    });
    const [
        createComment,
        {
            data: createCommentData,
            // loading: createCommentLoading,
            // error: createCommentError,
        },
    ] = useMutation(MUTATION_CREATE_COMMENT);

    const {
        data: commentsData,
        // loading: commentsLoading,
        // error: commentsError,
    } = useQuery(QUERY_GET_COMMENTS, {
        variables: { data: { scroll_id: postData?.Posts?.getById?._id } },
    });

    const onCreateComment = (ICreateComment) => {
        createComment({
            variables: {
                data: ICreateComment,
            },
            refetchQueries: [
                {
                    query: QUERY_LOAD_SCROLLS,
                },
                {
                    query: QUERY_GET_COMMENTS,
                    variables: {
                        data: { scroll_id: postData?.Posts?.getById?._id },
                    },
                },
            ],
        });
        if (!createCommentData) console.log(createCommentData);
        setCommentText('');
        setCommentImage(null);
        setCreateCommentErr(false);
        setFileErrors([]);
        setPreviewURL();
    };

    const mentions = profileData?.followers?.map?.((item) => {
        return {
            id: item?.userId?._id,
            display: item?.userId?.displayName,
        };
    });

    const handleCreateComment = (e) => {
        e.preventDefault();
        if (comment_text.trim() == '' && !comment_image)
            return setCreateCommentErr(true);

        const mentionsData = mentionsFinder(comment_text);
        onCreateComment({
            content: mentionsData.content,
            content_entities: mentionsData.contentEntities,
            scroll: postData?.Posts?.getById?._id,
            image: comment_image,
        });
    };

    const handleScrollOptionOpen = (event) => {
        setScrollOptionAnchorEl(event.currentTarget);
    };

    const handleScrollOptionClose = () => {
        setScrollOptionAnchorEl(null);
    };

    const handleEmojiPickerOpen = (event) => {
        setEmojiPickerAnchorEl(event.currentTarget);
    };

    const handleEmojiPickerClose = () => {
        setEmojiPickerAnchorEl(null);
    };

    const handleCreateReaction = (reaction) => {
        createReaction({
            variables: {
                data: {
                    _id: postData?.Posts?.getById?._id,
                    type: 'post',
                    reaction: reaction,
                },
            },
            refetchQueries: [{ query: QUERY_LOAD_SCROLLS }],
        });
        setUserReaction(reaction);
        setIcon(reaction);
    };

    const handleRemoveReaction = () => {
        removeReaction({
            variables: {
                data: {
                    _id: postData?.Posts?.getById?._id,
                    type: 'post',
                },
            },
            refetchQueries: [{ query: QUERY_LOAD_SCROLLS }],
        });
        setIcon();
        setUserReaction();
    };

    const handleSelectEmoji = (emoji) => {
        handleEmojiPickerClose();
        setCommentText(`${comment_text} ${emoji.native}`);
    };

    const getUserReaction = useCallback(
        (resource) => {
            let reaction;
            resource?.reacted_to_by?.forEach((item) => {
                if (item?.user_id?._id === user?._id)
                    reaction = item?.reaction_type;
            });
            return reaction;
        },
        [user?._id]
    );

    const setIcon = useCallback(
        (reaction) => {
            if (reaction === 'like') {
                setReactionIcon(<ThumbUpRounded className={classes.primary} />);
            } else if (reaction === 'love') {
                setReactionIcon(<FavoriteRounded className={classes.red} />);
            } else if (reaction === 'dislike') {
                setReactionIcon(
                    <ThumbDownRounded className={classes.primary} />
                );
            } else if (reaction === 'celebrate') {
                setReactionIcon(<PanToolRounded className={classes.green} />);
            } else {
                setReactionIcon();
            }
        },
        [classes.green, classes.primary, classes.red]
    );

    const contentClickHandler = (e) => {
        const targetLink = e.target.closest('a');
        if (!targetLink) return;
        e.preventDefault();
        e.stopPropagation();
        if (targetLink.target == '_blank') {
            window.open(targetLink.href, '_blank');
        } else {
            history.push(targetLink.href.substring(location.origin.length));
        }
    };

    const authorInitials = getUserInitials(
        postData?.Posts?.getById?.author?.displayName
    );
    const currentUserInitials = getUserInitials(user?.displayName);

    useEffect(() => {
        const reaction = getUserReaction(postData?.Posts?.getById);
        setUserReaction(reaction);
        setIcon(reaction);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const latestComments = commentsData?.Comments?.get.filter(
        (comment) => !comment.response_to
    );

    const topComments = commentsData?.Comments?.get
        .filter((comment) => !comment.response_to)
        .sort((a, b) => getTopComments(b) - getTopComments(a));

    return (
        <Screen>
            <SEO
                title="Post | Bitnorm"
                url={`${window.location.origin}/posts/${postData?.Posts?.getById?._id}`}
                description={postData?.Posts?.getById?.content}
                image={
                    postData?.Posts?.getById?.images?.length > 0 ||
                    postData?.Posts?.getById?.video?.thumbnail
                        ? postData?.Posts?.getById?.video?.thumbnail
                            ? process.env.REACT_APP_BACKEND_URL +
                              postData?.Posts?.getById?.video?.thumbnail
                            : process.env.REACT_APP_BACKEND_URL +
                              postData?.Posts?.getById?.images[0]
                        : null
                }
            />
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        <Hidden mdDown>
                            <Grid item lg={3}>
                                <UserCard
                                    scrolls={state?.postCount?.postCount}
                                    following={
                                        profileData?.Users?.profile?.following
                                            ?.length
                                    }
                                    followers={
                                        profileData?.Users?.profile?.followers
                                            ?.length
                                    }
                                    setOpen={(open) =>
                                        setCreateScrollOpen(open)
                                    }
                                    events={0}
                                />
                            </Grid>
                        </Hidden>
                        <Grid item xs={12} sm={12} md={8} lg={6}>
                            <Card style={{ marginBottom: 12 }}>
                                <CardHeader
                                    avatar={
                                        <IconButton
                                            size="small"
                                            className="m-1 p-1"
                                            aria-label="back"
                                            color="inherit"
                                            onClick={() =>
                                                history.push(`/connect`)
                                            }
                                        >
                                            <ArrowBack />
                                        </IconButton>
                                    }
                                />
                            </Card>
                            <Grid item align="center">
                                {postLoading && (
                                    <CircularProgress
                                        color="primary"
                                        size={60}
                                        thickness={6}
                                    />
                                )}
                            </Grid>
                            {postData?.Posts?.getById && (
                                <Card
                                    style={{ marginBottom: 16, zIndex: 1 }}
                                    onClick={() =>
                                        history.push(
                                            `/posts/${postData?.Posts?.getById?._id}`
                                        )
                                    }
                                >
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                style={{
                                                    backgroundColor: '#fed132',
                                                }}
                                                src={
                                                    process.env
                                                        .REACT_APP_BACKEND_URL +
                                                    postData?.Posts?.getById
                                                        ?.author?.profile_pic
                                                }
                                            >
                                                {authorInitials}
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton
                                                size="small"
                                                className="m-1 p-1"
                                                aria-label="show more"
                                                aria-controls={scrollOptionId}
                                                aria-haspopup="true"
                                                onClick={handleScrollOptionOpen}
                                                color="inherit"
                                            >
                                                <MoreVert />
                                            </IconButton>
                                        }
                                        title={
                                            <div className=" d-flex align-items-center">
                                                <Typography
                                                    component="a"
                                                    style={{
                                                        marginRight: 8,
                                                        zIndex: 2,
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        history.push(
                                                            `/users/${postData?.Posts?.getById?.author?._id}`
                                                        );
                                                    }}
                                                >
                                                    {
                                                        postData?.Posts?.getById
                                                            ?.author
                                                            ?.displayName
                                                    }
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                    {`@${postData?.Posts?.getById?.author?._id}`}
                                                </Typography>
                                            </div>
                                        }
                                        subheader={moment(
                                            postData?.Posts?.getById?.createdAt
                                        ).fromNow()}
                                    />
                                    <CardContent>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            <Typography
                                                onClick={(e) =>
                                                    contentClickHandler(e)
                                                }
                                                dangerouslySetInnerHTML={{
                                                    __html: contentBodyFactory(
                                                        postData?.Posts?.getById
                                                    ),
                                                }}
                                                style={{ zIndex: 2 }}
                                            ></Typography>
                                        </Typography>
                                        <Grid
                                            container
                                            spacing={2}
                                            className="mb-2"
                                        >
                                            {postData?.Posts?.getById?.video
                                                ?.path && (
                                                <Grid item xs={12}>
                                                    <CardMedia
                                                        className="br-2"
                                                        component="video"
                                                        poster={`${process.env.REACT_APP_BACKEND_URL}${postData?.Posts?.getById?.video?.thumbnail}`}
                                                        src={`${process.env.REACT_APP_BACKEND_URL}${postData?.Posts?.getById?.video?.path}`}
                                                        controls
                                                    />
                                                </Grid>
                                            )}
                                            {postData?.Posts?.getById?.images
                                                .length > 0 &&
                                                postData?.Posts?.getById?.images?.map(
                                                    (imageURL) => (
                                                        <Grid
                                                            className="mt-3"
                                                            key={imageURL}
                                                            item
                                                            xs={
                                                                postData?.Posts
                                                                    ?.getById
                                                                    ?.images
                                                                    .length > 1
                                                                    ? 6
                                                                    : 12
                                                            }
                                                            onClick={() => {
                                                                setImagePreviewURL(
                                                                    process.env
                                                                        .REACT_APP_BACKEND_URL +
                                                                        imageURL
                                                                );
                                                                setImagePreviewOpen(
                                                                    true
                                                                );
                                                            }}
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
                                        {postData?.Posts?.getById
                                            ?.shared_resource?._id &&
                                            postData?.Posts?.getById
                                                ?.shared_resource?.type ===
                                                'post' && (
                                                <ScrollPreview
                                                    scroll={
                                                        postData?.Posts?.getById
                                                            ?.shared_resource
                                                            ?._id
                                                    }
                                                />
                                            )}
                                        {postData?.Posts?.getById
                                            ?.shared_resource?._id &&
                                            postData?.Posts?.getById
                                                ?.shared_resource?.type ===
                                                'event' && (
                                                <EventPreview
                                                    event={
                                                        postData?.Posts?.getById
                                                            ?.shared_resource
                                                            ?._id
                                                    }
                                                />
                                            )}
                                        <br />

                                        <Typography display="inline">
                                            <Typography
                                                onClick={() => {
                                                    setOpenReactions(true);
                                                    setResourceReactions(
                                                        postData?.Posts?.getById
                                                    );
                                                }}
                                                display="inline"
                                                className={
                                                    classes.clickableTypography
                                                }
                                            >
                                                {`${getReactionsSum(
                                                    postData?.Posts?.getById
                                                )} ${
                                                    getReactionsSum(
                                                        postData?.Posts?.getById
                                                    ) === 1
                                                        ? 'Reaction'
                                                        : 'Reactions'
                                                }`}
                                            </Typography>
                                            {' . '}
                                            <Typography
                                                onClick={() =>
                                                    setOpenComments(true)
                                                }
                                                className={classes.replies}
                                                display="inline"
                                            >
                                                {`${
                                                    postData?.Posts?.getById
                                                        ?.comments
                                                } ${
                                                    postData?.Posts?.getById
                                                        ?.comments === 1
                                                        ? 'Comment'
                                                        : 'Comments'
                                                }`}
                                            </Typography>
                                        </Typography>
                                    </CardContent>
                                    <Divider />
                                    <Card
                                        style={{
                                            position: 'absolute',
                                            alignSelf: 'baseline',
                                            borderRadius: 10,
                                            backgroundColor:
                                                theme.palette.background
                                                    .default,
                                            display: likeHovered
                                                ? 'block'
                                                : 'none',
                                            transform: 'translateY(-28px)',
                                        }}
                                        onMouseEnter={() =>
                                            setLikeHovered(true)
                                        }
                                        onMouseLeave={() =>
                                            setLikeHovered(false)
                                        }
                                    >
                                        <Button
                                            color="default"
                                            textCase
                                            onClick={() => {
                                                handleCreateReaction('like');
                                                setLikeHovered(false);
                                            }}
                                            variant="text"
                                            startIcon={
                                                <ThumbUpRounded
                                                    className={classes.primary}
                                                />
                                            }
                                        >
                                            Like
                                        </Button>
                                        <Button
                                            color="default"
                                            textCase
                                            onClick={() => {
                                                handleCreateReaction('love');
                                                setLikeHovered(false);
                                            }}
                                            variant="text"
                                            startIcon={
                                                <FavoriteRounded
                                                    className={classes.red}
                                                />
                                            }
                                        >
                                            Love
                                        </Button>
                                        <Button
                                            color="default"
                                            textCase
                                            onClick={() => {
                                                handleCreateReaction('dislike');
                                                setLikeHovered(false);
                                            }}
                                            variant="text"
                                            startIcon={
                                                <ThumbDownRounded
                                                    className={classes.primary}
                                                />
                                            }
                                        >
                                            Dislike
                                        </Button>
                                        <Button
                                            color="default"
                                            textCase
                                            onClick={() => {
                                                handleCreateReaction(
                                                    'celebrate'
                                                );
                                                setLikeHovered(false);
                                            }}
                                            variant="text"
                                            startIcon={
                                                <PanToolRounded
                                                    className={classes.green}
                                                />
                                            }
                                        >
                                            Celebrate
                                        </Button>
                                    </Card>
                                    <CardActions className="space-around">
                                        <ReactionButton
                                            handleRemoveReaction={
                                                handleRemoveReaction
                                            }
                                            reaction={userReaction}
                                            onMouseEnter={() =>
                                                setLikeHovered(true)
                                            }
                                            setLikeHovered={setLikeHovered}
                                            onMouseLeave={() =>
                                                setLikeHovered(false)
                                            }
                                            variant="text"
                                            color="default"
                                            textCase
                                            startIcon={reactionIcon}
                                        />
                                        <Button
                                            color="default"
                                            textCase
                                            variant="text"
                                            onClick={() =>
                                                setOpenComments(true)
                                            }
                                            startIcon={<CommentRounded />}
                                        >
                                            Comment
                                        </Button>
                                        {!postData?.Posts?.getById
                                            ?.shared_resource?._id && (
                                            <Button
                                                color="default"
                                                textCase
                                                variant="text"
                                                onClick={() => {
                                                    setCreateScrollOpen(
                                                        postData?.Posts?.getById
                                                    );
                                                    setSharedResource(
                                                        postData?.Posts?.getById
                                                    );
                                                }}
                                                startIcon={<ShareRounded />}
                                            >
                                                Share
                                            </Button>
                                        )}
                                    </CardActions>
                                    <Divider />
                                    <CardActionArea
                                        onClick={() => setOpenComments(true)}
                                    >
                                        {!openComments &&
                                            postData?.Posts?.getById?.comments <
                                                1 && (
                                                <Typography
                                                    className="mx-3 my-2"
                                                    color="textSecondary"
                                                >
                                                    Be the first to comment
                                                </Typography>
                                            )}
                                    </CardActionArea>
                                    {openComments && (
                                        <CardContent>
                                            <div className="d-flex align-items-center">
                                                <Avatar
                                                    style={{
                                                        backgroundColor:
                                                            '#fed132',
                                                    }}
                                                    src={
                                                        process.env
                                                            .REACT_APP_BACKEND_URL +
                                                        user?.profile_pic
                                                    }
                                                    className="mx-2"
                                                >
                                                    {currentUserInitials}
                                                </Avatar>
                                                <div className="w-100">
                                                    <MentionsInput
                                                        spellcheck="false"
                                                        className="mentions-textarea"
                                                        id="content-field"
                                                        onKeyPress={(e) => {
                                                            if (
                                                                e.key ===
                                                                'Enter'
                                                            ) {
                                                                handleCreateComment(
                                                                    e
                                                                );
                                                            }
                                                        }}
                                                        placeholder={
                                                            commentsData
                                                                ?.Comments?.get
                                                                ?.length > 0
                                                                ? ''
                                                                : 'Be the first to comment..'
                                                        }
                                                        onChange={(e) =>
                                                            setCommentText(
                                                                comment_text?.length >=
                                                                    250
                                                                    ? e.target.value.substring(
                                                                          0,
                                                                          e
                                                                              .target
                                                                              .value
                                                                              .length -
                                                                              1
                                                                      )
                                                                    : e.target.value.substring(
                                                                          0,
                                                                          250
                                                                      )
                                                            )
                                                        }
                                                        value={comment_text}
                                                    >
                                                        <Mention
                                                            markup="/*@__id__-__display__*/"
                                                            displayTransform={(
                                                                id,
                                                                display
                                                            ) => display}
                                                            trigger="@"
                                                            data={mentions}
                                                            style={{
                                                                fontWeight: 900,
                                                            }}
                                                        />
                                                    </MentionsInput>
                                                </div>
                                                <IconButton
                                                    size="small"
                                                    aria-label="pick emoji"
                                                    aria-controls={
                                                        emojiPickerId
                                                    }
                                                    aria-haspopup="true"
                                                    onClick={(e) => {
                                                        handleEmojiPickerOpen(
                                                            e
                                                        );
                                                    }}
                                                >
                                                    <InsertEmoticon />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    //className='m-1 p-1'
                                                    onClick={() => {
                                                        document
                                                            .getElementsByClassName(
                                                                'comment-dropzone'
                                                            )[0]
                                                            .click();
                                                    }}
                                                >
                                                    <ImageRounded />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    className="m-1 p-1"
                                                    onClick={
                                                        handleCreateComment
                                                    }
                                                >
                                                    <Send />
                                                </IconButton>
                                            </div>
                                            <div
                                                className={classes.inputHelper}
                                            >
                                                <Typography
                                                    color="error"
                                                    variant="body2"
                                                >
                                                    {createCommentErr &&
                                                        'The comment content cannot be empty'}
                                                </Typography>
                                            </div>

                                            <Card
                                                style={{
                                                    display: previewURL
                                                        ? 'block'
                                                        : 'none',
                                                    height: 300,
                                                    borderRadius: 8,
                                                    width: '100%',
                                                    backgroundImage:
                                                        previewURL &&
                                                        'url(' +
                                                            previewURL +
                                                            ')',
                                                    backgroundSize: 'cover',
                                                }}
                                            >
                                                <div className="space-between">
                                                    <div>
                                                        <div
                                                            style={{
                                                                display: 'none',
                                                            }}
                                                        >
                                                            <DropzoneArea
                                                                clearOnUnmount
                                                                dropzoneClass="comment-dropzone"
                                                                //id="dropzone"
                                                                clickable={true}
                                                                onChange={(
                                                                    files
                                                                ) => {
                                                                    const errors =
                                                                        [];
                                                                    let counter = 0;
                                                                    files.map(
                                                                        (
                                                                            file
                                                                        ) => {
                                                                            const image =
                                                                                new Image();
                                                                            image.addEventListener(
                                                                                'load',
                                                                                () => {
                                                                                    // only select images within width/height/size limits
                                                                                    if (
                                                                                        (image.width <
                                                                                            1200) &
                                                                                        (image.height <
                                                                                            1350) &
                                                                                        (file.size <
                                                                                            5000000)
                                                                                    ) {
                                                                                        counter += 1;
                                                                                        setFileErrors(
                                                                                            []
                                                                                        );
                                                                                    } else {
                                                                                        errors.push(
                                                                                            'Image is too large. Trim to 1200px by 1200px or less.'
                                                                                        );
                                                                                        setFileErrors(
                                                                                            errors
                                                                                        );
                                                                                    }
                                                                                    if (
                                                                                        counter ===
                                                                                        1
                                                                                    ) {
                                                                                        setPreviewURL(
                                                                                            URL.createObjectURL(
                                                                                                file
                                                                                            )
                                                                                        );
                                                                                        setCommentImage(
                                                                                            file
                                                                                        );
                                                                                    }
                                                                                }
                                                                            );
                                                                            image.src =
                                                                                URL.createObjectURL(
                                                                                    file
                                                                                );
                                                                        }
                                                                    );
                                                                }}
                                                                acceptedFiles={[
                                                                    'image/jpeg',
                                                                    'image/png',
                                                                ]}
                                                                maxFileSize={
                                                                    2500000
                                                                }
                                                                filesLimit={1}
                                                                showPreviewsInDropzone
                                                                showPreviews={
                                                                    false
                                                                }
                                                                showFileNames={
                                                                    false
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <IconButton
                                                        size="small"
                                                        color="primary"
                                                        className="m-1 p-1"
                                                    >
                                                        <CloseRounded
                                                            onClick={() => {
                                                                setPreviewURL();
                                                                setFileErrors(
                                                                    []
                                                                );
                                                                setCommentImage(
                                                                    null
                                                                );
                                                            }}
                                                        />
                                                    </IconButton>
                                                </div>
                                            </Card>

                                            <div
                                                className={classes.inputHelper}
                                            >
                                                <Typography
                                                    color="error"
                                                    variant="body2"
                                                >
                                                    {fileErrors.length > 0 &&
                                                        fileErrors[0]}
                                                </Typography>
                                            </div>
                                            {postData?.Posts?.getById
                                                ?.comments > 0 && (
                                                <Typography
                                                    display="inline"
                                                    className="space-between"
                                                    style={{
                                                        margin: '15px 0px',
                                                    }}
                                                >
                                                    <FilterButton
                                                        setCommentFilter={
                                                            setCommentFilter
                                                        }
                                                    />
                                                </Typography>
                                            )}

                                            {commentFilter === 0 &&
                                                topComments?.map((comment) => (
                                                    <Comment
                                                        profileData={
                                                            profileData
                                                        }
                                                        scroll={
                                                            postData?.Posts
                                                                ?.getById
                                                        }
                                                        key={comment._id}
                                                        setUpdateCommentOpen={
                                                            setUpdateCommentOpen
                                                        }
                                                        setCommentToEdit={
                                                            setCommentToEdit
                                                        }
                                                        comment={comment}
                                                        setFlaggedResource={
                                                            setFlaggedResource
                                                        }
                                                        setOpenFlag={
                                                            setOpenFlag
                                                        }
                                                        setOpenReactions={
                                                            setOpenReactions
                                                        }
                                                        setResourceReactions={
                                                            setResourceReactions
                                                        }
                                                        setOpenImage={
                                                            setOpenImage
                                                        }
                                                        onCreateComment={
                                                            onCreateComment
                                                        }
                                                        setImagePreviewURL={
                                                            setImagePreviewURL
                                                        }
                                                        setImagePreviewOpen={
                                                            setImagePreviewOpen
                                                        }
                                                        comment_image={
                                                            comment_image
                                                        }
                                                    />
                                                ))}
                                            {commentFilter === 1 &&
                                                latestComments?.map(
                                                    (comment) => (
                                                        <Comment
                                                            profileData={
                                                                profileData
                                                            }
                                                            scroll={
                                                                postData?.Posts
                                                                    ?.getById
                                                            }
                                                            key={comment._id}
                                                            setUpdateCommentOpen={
                                                                setUpdateCommentOpen
                                                            }
                                                            setCommentToEdit={
                                                                setCommentToEdit
                                                            }
                                                            comment={comment}
                                                            setFlaggedResource={
                                                                setFlaggedResource
                                                            }
                                                            setOpenFlag={
                                                                setOpenFlag
                                                            }
                                                            setOpenReactions={
                                                                setOpenReactions
                                                            }
                                                            setResourceReactions={
                                                                setResourceReactions
                                                            }
                                                            setOpenImage={
                                                                setOpenImage
                                                            }
                                                            onCreateComment={
                                                                onCreateComment
                                                            }
                                                            setImagePreviewURL={
                                                                setImagePreviewURL
                                                            }
                                                            setImagePreviewOpen={
                                                                setImagePreviewOpen
                                                            }
                                                            comment_image={
                                                                comment_image
                                                            }
                                                        />
                                                    )
                                                )}
                                        </CardContent>
                                    )}
                                </Card>
                            )}
                        </Grid>
                        <Grid item md={4} lg={3}>
                            <Hidden smDown>
                                <Typography></Typography>
                                {/*  <TrendingPostsCard
                                    trending={trendingData?.Posts?.get}
                                    loading={trendingLoading}
                                />
                                <SuggestedPeopleCard
                                    profileData={profileData?.Users?.profile}
                                    suggestedUsers={suggestedUsers}
                                /> */}
                            </Hidden>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <CreatePost
                profileData={profileData?.Users?.profile}
                open={createScrollOpen}
                setOpen={(open) => setCreateScrollOpen(open)}
                openImage={openImage}
                imageDisabled={imageDisabled}
                videoDisabled={videoDisabled}
                setImageDisabled={setImageDisabled}
                setVideoDisabled={setVideoDisabled}
                setOpenImage={setOpenImage}
                openVideo={openVideo}
                setOpenVideo={setOpenVideo}
                sharedResource={sharedResource}
                setSharedResource={setSharedResource}
            />
            <UpdatePost
                profileData={profileData?.Users?.profile}
                updateScrollOpen={updateScrollOpen}
                postToEdit={postToEdit}
                setPostToEdit={setPostToEdit}
                setUpdateScrollOpen={(UpdateScrollOpen) =>
                    setUpdateScrollOpen(UpdateScrollOpen)
                }
                openImage={openImage}
                imageDisabled={imageDisabled}
                videoDisabled={videoDisabled}
                setImageDisabled={setImageDisabled}
                setVideoDisabled={setVideoDisabled}
                setOpenImage={setOpenImage}
                openVideo={openVideo}
                setOpenVideo={setOpenVideo}
            />
            <UpdateComment
                profileData={profileData?.Users?.profile}
                updateCommentOpen={updateCommentOpen}
                commentToEdit={commentToEdit}
                setCommentToEdit={setCommentToEdit}
                setUpdateCommentOpen={(UpdateCommentOpen) =>
                    setUpdateCommentOpen(UpdateCommentOpen)
                }
                openImage={openImage}
                setOpenImage={setOpenImage}
            />
            <ImagePreview
                open={imagePreviewOpen}
                imgURL={imagePreviewURL}
                onClose={() => {
                    setImagePreviewOpen(false);
                    setImagePreviewURL(null);
                }}
            />
            <FlagResourceModal
                openFlag={openFlag}
                setOpenFlag={setOpenFlag}
                flaggedResource={flaggedResource}
                setFlaggedResource={setFlaggedResource}
            />
            <ReactionsModal
                openReactions={openReactions}
                setOpenReactions={setOpenReactions}
                resourceReactions={resourceReactions}
                setResourceReactions={setResourceReactions}
            />
            <ScrollOptionsPopover
                scroll={postData?.Posts?.getById}
                scrollOptionId={scrollOptionId}
                scrollOptionAnchorEl={scrollOptionAnchorEl}
                isScrollOptionOpen={isScrollOptionOpen}
                handleScrollOptionClose={handleScrollOptionClose}
                setFlaggedResource={setFlaggedResource}
                setPostToEdit={setPostToEdit}
                setOpenFlag={setOpenFlag}
                setUpdateOpen={setUpdateScrollOpen}
            />
            <EmojiPickerPopover
                emojiPickerId={emojiPickerId}
                emojiPickerAnchorEl={emojiPickerAnchorEl}
                isEmojiPickerOpen={isEmojiPickerOpen}
                handleEmojiPickerClose={handleEmojiPickerClose}
                handleSelectEmoji={handleSelectEmoji}
            />
        </Screen>
    );
}

export default PostView;
