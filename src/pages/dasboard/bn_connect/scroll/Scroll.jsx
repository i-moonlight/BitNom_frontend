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
import { toast } from 'react-toastify';
import { Button } from '../../../../components/Button';
import { getDistanceToNowWithSuffix } from '../../../../components/utilities/date.components';
import ReactionButton from '../../../../components/ReactionButton';
import ReactionHover from '../../../../components/ReactionHover';
import { loadComments } from '../../../../store/actions/postActions';
import { getUserInitials } from '../../../../utilities/Helpers';
import {
    contentBodyFactory,
    getReactionsSum,
    mentionsFinder,
} from '../../utilities/functions';
import {
    MUTATION_CREATE_COMMENT,
    MUTATION_CREATE_REACTION,
    MUTATION_REMOVE_REACTION,
    QUERY_GET_COMMENTS,
    QUERY_LOAD_SCROLLS,
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
    const [createCommentErr, setCreateCommentErr] = useState(false);
    const [previewURL, setPreviewURL] = useState();

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

    const [createReaction] = useMutation(MUTATION_CREATE_REACTION);
    const [removeReaction] = useMutation(MUTATION_REMOVE_REACTION);
    const [createComment] = useMutation(MUTATION_CREATE_COMMENT);

    //TODO
    const {
        data: commentsData,
        loading: commentsLoading,
        error: commentsError,
    } = useQuery(QUERY_GET_COMMENTS, {
        variables: { data: { scroll_id: scroll?._id } },
    });

    const onCreateComment = (ICreateComment) => {
        createComment({
            variables: {
                data: ICreateComment,
            },
            errorPolicy: 'all',
            refetchQueries: [
                {
                    query: QUERY_LOAD_SCROLLS,
                },
                {
                    query: QUERY_GET_COMMENTS,
                    variables: { data: { scroll_id: scroll?._id } },
                },
            ],
        }).then(({ data, errors }) => {
            if (data?.Comments?.create) {
                setCommentText('');
                setCommentImage(null);
                setCreateCommentErr(false);
                setPreviewURL();
            }
            if (errors) {
                if (errors[0]?.message?.includes('Unsupported MIME type:')) {
                    setPreviewURL();
                    setCommentImage(null);
                    const message = errors[0]?.message;
                    const mime = message?.substring(message?.indexOf(':') + 1);
                    toast.error(
                        `Unsupported file type! The original type of your image is ${mime}`
                    );
                } else {
                    toast.error(
                        `Something is wrong! Check your connection or use another image.`
                    );
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
        if (comment_text.trim() == '' && !comment_image)
            return setCreateCommentErr(true);

        const mentionsData = mentionsFinder(comment_text);
        onCreateComment({
            content: mentionsData.content,
            content_entities: mentionsData.contentEntities,
            scroll: scroll?._id,
            image: comment_image,
        });
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
            refetchQueries: [{ query: QUERY_LOAD_SCROLLS }],
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
            refetchQueries: [{ query: QUERY_LOAD_SCROLLS }],
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
                    return toast.error(
                        'Image should be less than 1200px by 1350px & below 2mb.',
                        {
                            autoClose: 5000,
                        }
                    );
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

    const comments = commentsData?.Comments?.get;

    useEffect(() => {
        const reaction = getUserReaction(scroll);
        setUserReaction(reaction);
        setIcon(reaction);
    }, [getUserReaction, scroll, setIcon]);

    useEffect(() => {
        !commentsError &&
            !commentsLoading &&
            dispatch(loadComments(commentsData?.Comments?.get, id));
    }, [
        commentsData?.Comments?.get,
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
                    // subheader={moment(scroll?.createdAt).fromNow()}
                    subheader={getDistanceToNowWithSuffix(scroll?.createdAt)}
                />

                <CardContent
                    style={{ zIndex: 1 }}
                    onClick={() => history.push(`/posts/${scroll?._id}`)}
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
                            <Typography color="error" variant="body2">
                                {createCommentErr &&
                                    'The comment content cannot be empty'}
                            </Typography>
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
