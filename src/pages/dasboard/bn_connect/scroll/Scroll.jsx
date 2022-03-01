import { useMutation, useQuery } from '@apollo/client';
import {
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
    Divider,
    Grid,
    Hidden,
    IconButton,
    ListItem,
    ListItemText,
    Skeleton,
    Typography,
    useTheme,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../../components/Button';
import ReactionButton from '../../../../components/ReactionButton';
import ReactionHover from '../../../../components/ReactionHover';
import { getDistanceToNowWithSuffix } from '../../../../components/utilities/date.components';
import { loadComments } from '../../../../store/actions/postActions';
import { getUserInitials } from '../../../../utilities/Helpers';
import {
    contentBodyFactory,
    getReactionsSum,
    mentionsFinder,
} from '../../utilities/functions';
import { createCommentResponse } from '../../utilities/optimisticResponseObjects';
import {
    MUTATION_CREATE_COMMENT,
    MUTATION_CREATE_REACTION,
    MUTATION_REMOVE_REACTION,
    QUERY_GET_COMMENTS,
} from '../../utilities/queries';
import SkeletonScrollCard from '../skeleton/SkeletonScrollCard';
import ScrollOptionsPopover from './ScrollOptionsPopover';

const EmojiPickerPopover = React.lazy(() =>
    import('../popovers/EmojiPickerPopover')
);

const scrollOptionId = 'menu-scroll-option';
const emojiPickerId = 'emoji-picker-popover';

const EventPreview = React.lazy(() => import('../../events/EventPreview'));
const ScrollPreview = React.lazy(() => import('./ScrollPreview'));
const Comment = React.lazy(() => import('./comment/Comment'));

export default function Scroll({
    id,
    scroll,
    profileData,
    setSharedResource,
    setPostToEdit,
    setCommentToEdit,
    setUpdateOpen,
    setUpdateCommentOpen,
    setFlaggedResource,
    setOpenFlag,
    setOpenReactions,
    setResourceReactions,
    setOpen,
    setImagePreviewOpen,
    setImagePreviewURL,
    setImageModalOpen,
    setImageIndex,
    setPostToPreview,
    style,
    setOpenShareModal,
}) {
    const [scrollOptionAnchorEl, setScrollOptionAnchorEl] = useState(null);
    const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = useState(null);
    const [userReaction, setUserReaction] = useState();
    const [reactionIcon, setReactionIcon] = useState();
    const [openComments, setOpenComments] = useState(false);
    const [comment_text, setCommentText] = useState('');
    const [comment_image, setCommentImage] = useState(null);
    const [likeHovered, setLikeHovered] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [previewURL, setPreviewURL] = useState();
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const state = useSelector((st) => st);

    const user = state.auth.user;
    // const commentList = state.posts.comments;
    // const comments = commentList[id];

    const isScrollOptionOpen = Boolean(scrollOptionAnchorEl);
    const isEmojiPickerOpen = Boolean(emojiPickerAnchorEl);

    const [createReaction, { data: createReactionData }] = useMutation(
        MUTATION_CREATE_REACTION
    );
    const [removeReaction, { data: removeReactionData }] = useMutation(
        MUTATION_REMOVE_REACTION
    );

    const {
        data: commentsData,
        loading: commentsLoading,
        error: commentsError,
        fetchMore,
    } = useQuery(QUERY_GET_COMMENTS, {
        variables: { data: { scroll_id: scroll?._id, limit: 8 } },
    });

    const [createComment] = useMutation(MUTATION_CREATE_COMMENT, {
        update(cache, { data: createCommentData }) {
            const newComment = createCommentData?.Comments?.create;
            const existingComments = cache.readQuery({
                query: QUERY_GET_COMMENTS,
                variables: { data: { scroll_id: scroll?._id, limit: 8 } },
            });
            const normalizedPostId = cache.identify({
                id: scroll?._id,
                __typename: 'OPost',
            });
            cache.modify({
                id: normalizedPostId,
                fields: {
                    comments(existingCommentCount) {
                        return existingCommentCount + 1;
                    },
                },
            });
            cache.writeQuery({
                query: QUERY_GET_COMMENTS,
                variables: { data: { scroll_id: scroll?._id, limit: 8 } },
                data: {
                    Comments: {
                        get: {
                            _id: existingComments?.Comments?.get?._id,
                            data: [
                                newComment,
                                ...existingComments?.Comments?.get?.data,
                            ],
                            hasMore: existingComments?.Comments?.get?.hasMore,
                        },
                    },
                },
            });
        },
    });

    const loadMore = (offset) => {
        setLoadingMore(true);
        fetchMore({
            variables: {
                data: {
                    scroll_id: scroll?._id,
                    limit: 8,
                    skip: offset,
                },
            },
        }).then(() => {
            setLoadingMore(false);
        });
    };

    const onCreateComment = (ICreateComment) => {
        createComment({
            variables: {
                data: ICreateComment,
            },
            errorPolicy: 'all',
            optimisticResponse: {
                Comments: {
                    create: {
                        content: mentionsFinder(comment_text).content,
                        content_entities:
                            mentionsFinder(comment_text).contentEntities,
                        image: previewURL || '',
                        creation_date: new Date().getTime(),
                        scroll: scroll?._id,
                        author: {
                            __typename: 'OAuthor',
                            _id: user?._id,
                            displayName: user?.displayName,
                            profile_pic: user?.profile_pic,
                            bio: '',
                            type: '',
                            reputation: '',
                        },
                        ...createCommentResponse,
                    },
                },
            },
        }).then(({ data, errors: createCommentErrors }) => {
            if (data?.Comments?.create) {
                setCommentText('');
                setCommentImage(null);
                setErrors([]);
                setPreviewURL();
            }
            if (createCommentErrors) {
                if (
                    createCommentErrors[0]?.message?.includes(
                        'Unsupported MIME type:'
                    )
                ) {
                    setPreviewURL();
                    setCommentImage(null);
                    const message = createCommentErrors[0]?.message;
                    const mime = message?.substring(message?.indexOf(':') + 1);
                    setErrors([
                        `Unsupported file type! The original type of your image is ${mime}`,
                    ]);
                } else if (createCommentErrors[0]?.message == 400) {
                    const errorObject = createCommentErrors[0];
                    const errorArr = [];
                    for (const [key, value] of Object.entries(
                        errorObject?.state
                    )) {
                        errorArr.push(`${value[0]}`);
                        if (key === 'content') {
                            setErrors(errorArr);
                        }
                    }
                    setErrors(errorArr);
                } else {
                    setErrors([
                        `Something is wrong! Check your connection or use another image.`,
                    ]);
                }
            }
        });
    };

    const mentions = profileData?.followers?.map?.((item) => {
        return {
            id: item?.userId?._id,
            display: item?.userId?.displayName,
        };
    });

    const handleCreateComment = (e) => {
        e.preventDefault();
        if (comment_text.length < 1) return;
        const mentionsData = mentionsFinder(comment_text);
        onCreateComment({
            content: mentionsData.content,
            content_entities: mentionsData.contentEntities,
            scroll: scroll?._id,
            image: comment_image,
        });
        setCommentText('');
        setPreviewURL();
        setCommentImage(null);
    };

    const handleCreateReaction = (reaction) => {
        createReaction({
            variables: {
                data: {
                    _id: scroll?._id,
                    type: 'post',
                    reaction: reaction,
                },
            },
            update: (cache, { data }) => {
                const normalizedPostId = cache.identify({
                    id: scroll?._id,
                    __typename: 'OPost',
                });
                const newreactions = data?.Reactions?.create?.reactions;
                const newreactedToBy = data?.Reactions?.create?.reactedToBy;

                cache.modify({
                    id: normalizedPostId,
                    fields: {
                        reactions() {
                            return newreactions;
                        },
                        reacted_to_by() {
                            return newreactedToBy;
                        },
                    },
                });
            },
        });
        setUserReaction(reaction);
        setIcon(reaction);
    };

    const handleRemoveReaction = () => {
        removeReaction({
            variables: {
                data: {
                    _id: scroll?._id,
                    type: 'post',
                },
            },
            update: (cache, { data }) => {
                const normalizedPostId = cache.identify({
                    id: scroll?._id,
                    __typename: 'OPost',
                });
                const newreactions = data?.Reactions?.delete?.reactions;
                const newreactedToBy = data?.Reactions?.delete?.reactedToBy;

                cache.modify({
                    id: normalizedPostId,
                    fields: {
                        reactions() {
                            return newreactions;
                        },
                        reacted_to_by() {
                            return newreactedToBy;
                        },
                    },
                });
            },
        });
        setIcon();
        setUserReaction();
    };

    const handleSelectEmoji = (emoji) => {
        setCommentText(`${comment_text} ${emoji}`);
    };

    const handleSelectImage = (files) => {
        if (files.length < 1) return;
        let counter = 0;
        files.map((file) => {
            const image = new Image();
            image.addEventListener('load', () => {
                // only select images within width/height/size limits
                if (
                    (image.width <= 1200) &
                    (image.height <= 1350) &
                    (file.size <= 2500000)
                ) {
                    counter += 1;
                } else {
                    return setErrors([
                        'Image should be less than 1200px by 1350px & below 2mb.',
                    ]);
                }
                if (counter === 1) {
                    setPreviewURL(URL.createObjectURL(file));
                    setCommentImage(file);
                }
            });
            image.src = URL.createObjectURL(file);
        });
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

    const authorInitials = getUserInitials(scroll?.author?.displayName);
    const currentUserInitials = getUserInitials(user?.displayName);

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

    const comments = commentsData?.Comments?.get?.data;

    useEffect(() => {
        const reaction = getUserReaction(scroll);
        setUserReaction(reaction);
        setIcon(reaction);
    }, [
        getUserReaction,
        scroll,
        setIcon,
        createReactionData,
        removeReactionData,
    ]);

    useEffect(() => {
        !commentsError &&
            !commentsLoading &&
            dispatch(loadComments(commentsData?.Comments?.get?.data, id));
    }, [
        commentsData?.Comments?.get?.data,
        commentsError,
        commentsLoading,
        dispatch,
        id,
    ]);

    return (
        <>
            <Card style={{ ...style, marginBottom: 16 }}>
                <CardHeader
                    avatar={
                        <Avatar
                            style={{
                                backgroundColor: '#fed132',
                            }}
                            src={
                                scroll?.author?.profile_pic &&
                                process.env.REACT_APP_BACKEND_URL +
                                    scroll?.author?.profile_pic
                            }
                        >
                            {authorInitials}
                        </Avatar>
                    }
                    action={
                        <IconButton
                            size="small"
                            className="m-1 p-1"
                            aria-label="post options"
                            aria-controls={scrollOptionId}
                            style={{ zIndex: 2 }}
                            aria-haspopup="true"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleScrollOptionOpen(e);
                            }}
                            color="inherit"
                        >
                            <MoreVert />
                        </IconButton>
                    }
                    title={
                        <div className=" d-flex align-items-center">
                            <Typography
                                component="a"
                                style={{ marginRight: 8, zIndex: 2 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    history.push(
                                        `/users/${scroll?.author?._id}`
                                    );
                                }}
                            >
                                {scroll?.author?.displayName}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="span"
                            >
                                {`@${scroll?.author?._id}`}
                            </Typography>
                        </div>
                    }
                    subheader={getDistanceToNowWithSuffix(scroll?.createdAt)}
                />

                <CardContent
                    style={{ zIndex: 1 }}
                    onClick={() => history.push(`/post/${scroll?._id}`)}
                >
                    <Typography component="div">
                        <Typography
                            variant="body2"
                            component="span"
                            onClick={(e) => contentClickHandler(e)}
                            dangerouslySetInnerHTML={{
                                __html: contentBodyFactory(scroll),
                            }}
                            style={{
                                zIndex: 2,
                                overflowWrap: 'break-word',
                                wordWrap: 'break-word',
                            }}
                        ></Typography>
                    </Typography>
                    <Grid
                        container
                        style={{
                            margin: '3px 0px',
                        }}
                    >
                        {scroll?.video?.path && (
                            <Grid
                                item
                                xs={12}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                style={{ zIndex: 2 }}
                            >
                                <CardMedia
                                    className="br-2"
                                    component="video"
                                    poster={`${process.env.REACT_APP_BACKEND_URL}${scroll?.video?.thumbnail}`}
                                    src={`${process.env.REACT_APP_BACKEND_URL}${scroll?.video?.path}`}
                                    controls
                                />
                            </Grid>
                        )}

                        {scroll?.images.length > 0 &&
                            scroll?.images?.map((imageURL, index) => (
                                <Grid
                                    key={imageURL}
                                    item
                                    style={{
                                        zIndex: 2,
                                        padding: '2px',
                                    }}
                                    xs={scroll?.images.length > 1 ? 6 : 12}
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        setPostToPreview(scroll);
                                        setImageIndex(index);
                                        setImageModalOpen(true);
                                    }}
                                >
                                    <div
                                        style={{
                                            height: 200,
                                            borderRadius: 8,
                                            width: '100%',
                                            backgroundImage:
                                                'url(' +
                                                process.env
                                                    .REACT_APP_BACKEND_URL +
                                                imageURL +
                                                ')',
                                            backgroundSize: 'cover',
                                            backgroundColor: 'rgba(0,0,0,0.2)',
                                            backgroundBlendMode: 'soft-light',
                                            cursor: 'pointer',
                                        }}
                                    />
                                </Grid>
                            ))}
                    </Grid>

                    {scroll?.shared_resource?._id &&
                        scroll?.shared_resource?.type === 'post' && (
                            <Suspense fallback={<SkeletonScrollCard />}>
                                <ScrollPreview
                                    scroll={scroll?.shared_resource?._id}
                                />
                            </Suspense>
                        )}

                    {scroll?.shared_resource?._id &&
                        scroll?.shared_resource?.type === 'event' && (
                            <Suspense fallback={<SkeletonScrollCard />}>
                                <EventPreview
                                    event={scroll?.shared_resource?._id}
                                />
                            </Suspense>
                        )}

                    <br />

                    <Typography display="inline" style={{ zIndex: 2 }}>
                        <Typography
                            component="span"
                            color="textSecondary"
                            variant="body2"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenReactions(true);
                                setResourceReactions(scroll);
                            }}
                            display="inline"
                            className={classes.clickableTypography}
                        >
                            {`${getReactionsSum(scroll)} ${
                                getReactionsSum(scroll) === 1
                                    ? 'Reaction'
                                    : 'Reactions'
                            }`}
                        </Typography>
                        {' . '}
                        <Typography
                            color="textSecondary"
                            component="span"
                            variant="body2"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenComments(true);
                            }}
                            className={classes.replies}
                            display="inline"
                        >
                            {`${scroll?.comments} ${
                                scroll?.comments === 1 ? 'Comment' : 'Comments'
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
                        backgroundColor: theme.palette.background.default,
                        display: likeHovered ? 'block' : 'none',
                        transform: 'translateY(-28px)',
                        zIndex: 2,
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    onMouseEnter={() => setLikeHovered(true)}
                    onMouseLeave={() => setLikeHovered(false)}
                >
                    <ReactionHover
                        setLikeHovered={setLikeHovered}
                        handleCreateReaction={handleCreateReaction}
                        likeHovered={likeHovered}
                        reaction={userReaction}
                    />
                </Card>
                <CardActions
                    className="space-around"
                    style={{
                        zIndex: 2,
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <ReactionButton
                        handleRemoveReaction={handleRemoveReaction}
                        reaction={userReaction}
                        onMouseEnter={() => setLikeHovered(true)}
                        setLikeHovered={setLikeHovered}
                        onMouseLeave={() => setLikeHovered(false)}
                        variant="text"
                        textCase
                        startIcon={reactionIcon}
                    />
                    <Button
                        textCase
                        variant="text"
                        onClick={() => setOpenComments(true)}
                        startIcon={<CommentRounded />}
                    >
                        Comment
                    </Button>
                    {!scroll?.shared_resource?._id && (
                        <Button
                            textCase
                            variant="text"
                            onClick={() => {
                                setOpen(scroll);
                                setSharedResource(scroll);
                            }}
                            startIcon={<ShareRounded />}
                        >
                            Share
                        </Button>
                    )}
                </CardActions>
                <Divider />
                <CardActionArea onClick={() => setOpenComments(true)}>
                    {!openComments && scroll?.comments < 1 && (
                        <Typography className="mx-3 my-2" color="textSecondary">
                            Be the first to comment
                        </Typography>
                    )}
                </CardActionArea>
                {openComments && (
                    <div className={classes.commentSection}>
                        <div className="d-flex align-items-center">
                            <Hidden smDown>
                                <Avatar
                                    style={{
                                        backgroundColor: '#fed132',
                                        marginRight: '3px',
                                    }}
                                    src={
                                        user?.profile_pic &&
                                        process.env.REACT_APP_BACKEND_URL +
                                            user?.profile_pic
                                    }
                                    sx={{
                                        width: '30px',
                                        height: '30px',
                                    }}
                                >
                                    <Typography variant="body2">
                                        {currentUserInitials}
                                    </Typography>
                                </Avatar>
                            </Hidden>
                            <div className="w-100">
                                <MentionsInput
                                    spellcheck="false"
                                    className="mentions-textarea"
                                    id="content-field"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleCreateComment(e);
                                        }
                                    }}
                                    placeholder={
                                        comments?.length > 0
                                            ? ''
                                            : 'Be the first to comment..'
                                    }
                                    onChange={(e) =>
                                        setCommentText(
                                            comment_text?.length >= 250
                                                ? e.target.value.substring(
                                                      0,
                                                      e.target.value.length - 1
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
                                        displayTransform={(_id, display) =>
                                            display
                                        }
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
                                aria-controls={emojiPickerId}
                                aria-haspopup="true"
                                onClick={(e) => {
                                    handleEmojiPickerOpen(e);
                                }}
                            >
                                <InsertEmoticon />
                            </IconButton>
                            <IconButton
                                size="small"
                                onClick={() => {
                                    document
                                        .getElementById('scroll-comment-image')
                                        .click();
                                }}
                            >
                                <ImageRounded />
                            </IconButton>
                            <IconButton
                                size="small"
                                className="m-1 p-1"
                                onClick={handleCreateComment}
                            >
                                <Send />
                            </IconButton>
                        </div>
                        <div className={classes.inputHelper}>
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
                        </div>
                        <Card
                            style={{
                                display: previewURL ? 'block' : 'none',
                                height: 300,
                                borderRadius: 8,
                                width: '100%',
                                backgroundImage:
                                    previewURL && 'url(' + previewURL + ')',
                                backgroundSize: 'cover',
                            }}
                        >
                            <div className="space-between">
                                <div>
                                    <div style={{ display: 'none' }}>
                                        <input
                                            id="scroll-comment-image"
                                            type="file"
                                            onChange={(e) => {
                                                handleSelectImage(
                                                    Array.from(e.target.files)
                                                );
                                            }}
                                            accept="image/jpeg, image/png"
                                        />
                                    </div>
                                </div>
                                <IconButton
                                    size="small"
                                    color="primary"
                                    className="m-1 p-1"
                                    onClick={() => {
                                        setPreviewURL();

                                        setCommentImage(null);
                                    }}
                                >
                                    <CloseRounded />
                                </IconButton>
                            </div>
                        </Card>

                        {comments
                            ?.filter((comment) => !comment.response_to)
                            .map((comment) => (
                                <Suspense
                                    key={comment?._id}
                                    fallback={
                                        <div className="ms-4 d-flex align-items-center justify-content-start my-2 ">
                                            <Skeleton
                                                className="me-2"
                                                animation="wave"
                                                variant="circular"
                                                width={40}
                                                height={40}
                                            />
                                            <div>
                                                <Skeleton
                                                    animation="wave"
                                                    variant="text"
                                                    width={200}
                                                />
                                                <Skeleton
                                                    animation="wave"
                                                    variant="text"
                                                    width={80}
                                                />
                                            </div>
                                        </div>
                                    }
                                >
                                    <Comment
                                        profileData={profileData}
                                        scroll={scroll}
                                        id={comment._id}
                                        setUpdateCommentOpen={
                                            setUpdateCommentOpen
                                        }
                                        setCommentImage={setCommentImage}
                                        setCommentToEdit={setCommentToEdit}
                                        comment={comment}
                                        setFlaggedResource={setFlaggedResource}
                                        setOpenFlag={setOpenFlag}
                                        setOpenReactions={setOpenReactions}
                                        setResourceReactions={
                                            setResourceReactions
                                        }
                                        onCreateComment={onCreateComment}
                                        setImagePreviewURL={setImagePreviewURL}
                                        setImagePreviewOpen={
                                            setImagePreviewOpen
                                        }
                                        comment_image={comment_image}
                                    />
                                </Suspense>
                            ))}
                        {commentsData?.Comments?.get?.data?.length > 0 &&
                            commentsData?.Comments?.get?.hasMore &&
                            !loadingMore && (
                                <Grid align="center">
                                    <Button
                                        size="small"
                                        textCase
                                        variant="text"
                                        onClick={() =>
                                            loadMore(
                                                commentsData?.Comments?.get
                                                    ?.data?.length
                                            )
                                        }
                                    >
                                        more comments...
                                    </Button>
                                </Grid>
                            )}
                        {loadingMore && (
                            <Grid align="center">
                                <Typography color="primary">
                                    Loading ...
                                </Typography>
                            </Grid>
                        )}
                    </div>
                )}
            </Card>
            <ScrollOptionsPopover
                scroll={scroll}
                scrollOptionId={scrollOptionId}
                scrollOptionAnchorEl={scrollOptionAnchorEl}
                isScrollOptionOpen={isScrollOptionOpen}
                handleScrollOptionClose={handleScrollOptionClose}
                setFlaggedResource={setFlaggedResource}
                setPostToEdit={setPostToEdit}
                setOpenFlag={setOpenFlag}
                setUpdateOpen={setUpdateOpen}
                setOpenShareModal={setOpenShareModal}
                setSharedResource={setSharedResource}
            />
            <EmojiPickerPopover
                emojiPickerId={emojiPickerId}
                emojiPickerAnchorEl={emojiPickerAnchorEl}
                isEmojiPickerOpen={isEmojiPickerOpen}
                handleEmojiPickerClose={handleEmojiPickerClose}
                handleSelectEmoji={handleSelectEmoji}
            />
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    clickableTypography: {
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
            color: 'inherit',
        },
        [theme.breakpoints.down('md')]: {
            textDecoration: 'underline',
        },
    },
    replies: {
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
            color: 'inherit',
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
    commentSection: {
        padding: '5px 4px',
        [theme.breakpoints.up('md')]: {
            padding: '15px',
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
