import { useMutation, useQuery } from '@apollo/client';
import {
    CloseRounded,
    ImageRounded,
    InsertEmoticon,
    MoreHorizRounded,
    Send,
} from '@mui/icons-material';
import {
    Avatar,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    Hidden,
    IconButton,
    ListItem,
    ListItemText,
    Typography,
    useTheme,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../../../components/Button';
import ReactionButton from '../../../../../components/ReactionButton';
import ReactionHover from '../../../../../components/ReactionHover';
import { getDistanceToNow } from '../../../../../components/utilities/date.components';
import { loadComments } from '../../../../../store/actions/postActions';
import { getUserInitials } from '../../../../../utilities/Helpers';
import {
    contentBodyFactory,
    getReactionsSum,
    mentionsFinder,
} from '../../../utilities/functions';
import { createReplyResponse } from '../../../utilities/optimisticResponseObjects';
import {
    MUTATION_CREATE_COMMENT,
    MUTATION_CREATE_REACTION,
    MUTATION_REMOVE_REACTION,
    QUERY_GET_COMMENTS,
} from '../../../utilities/queries';
import CommentOptionsPopover from './CommentOptionsPopover';

const EmojiPickerPopover = React.lazy(() =>
    import('../../popovers/EmojiPickerPopover')
);

export default function Comment({
    id,
    comment,
    style,
    //onCreateComment,
    comment_image,
    scroll,
    setCommentImage,
    setCommentToEdit,
    setUpdateCommentOpen,
    setFlaggedResource,
    setOpenFlag,
    setOpenReactions,
    setResourceReactions,
    setImagePreviewURL,
    setImagePreviewOpen,
    profileData,
}) {
    const [commentOptionAnchorEl, setCommentOptionAnchorEl] = useState(null);
    const isCommentOptionOpen = Boolean(commentOptionAnchorEl);
    const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = useState(null);
    const isEmojiPickerOpen = Boolean(emojiPickerAnchorEl);
    const [openReplies, setOpenReplies] = useState(false);
    const [reply, setReply] = useState('');
    const [userReaction, setUserReaction] = useState();
    const [likeHovered, setLikeHovered] = useState(false);
    const [responseTo, setResponseTo] = useState('');
    //const [replyErr, setReplyErr] = useState(false);
    const [previewURL, setPreviewURL] = useState();
    const [fileErrors, setFileErrors] = useState([]);
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const state = useSelector((st) => st);

    const user = state.auth.user;
    // const commentList = state.posts.comments;
    // const comments = commentList[id];

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
    } = useQuery(QUERY_GET_COMMENTS, {
        variables: { data: { scroll_id: comment?.scroll, limit: 8 } },
    });
    const [createComment] = useMutation(MUTATION_CREATE_COMMENT, {
        update(cache, { data: createCommentData }) {
            const newComment = createCommentData?.Comments?.create;
            const existingComments = cache.readQuery({
                query: QUERY_GET_COMMENTS,
                variables: { data: { scroll_id: scroll?._id, limit: 8 } },
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
            const normalizedPostId = cache.identify({
                id: scroll?._id,
                __typename: 'OPost',
            });
            const normalizedCommentId = cache.identify({
                id: id,
                __typename: 'OComment',
            });
            cache.modify({
                id: normalizedCommentId,
                fields: {
                    replies(existingReplyCount) {
                        return existingReplyCount + 1;
                    },
                },
            });
            cache.modify({
                id: normalizedPostId,
                fields: {
                    comments(existingCommentCount) {
                        return existingCommentCount + 1;
                    },
                },
            });
        },
    });

    const onCreateComment = (ICreateComment) => {
        createComment({
            variables: {
                data: ICreateComment,
            },
            errorPolicy: 'all',
            optimisticResponse: {
                Comments: {
                    create: {
                        content: mentionsFinder(reply).content,
                        content_entities: mentionsFinder(reply).contentEntities,
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
                        response_to: {
                            _id: comment?._id,
                            author: {
                                _id: comment?.author?._id,
                            },
                        },
                        ...createReplyResponse,
                    },
                },
            },
        }).then(({ data, errors: createCommentErrors }) => {
            if (data?.Comments?.create) {
                setCommentImage(null);
                setErrors([]);
                setPreviewURL();
                setReply('');

                setFileErrors([]);
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

    const handleCommentOptionOpen = (event) => {
        setCommentOptionAnchorEl(event.currentTarget);
    };

    const handleCommentOptionClose = () => {
        setCommentOptionAnchorEl(null);
    };

    const handleEmojiPickerOpen = (event) => {
        setEmojiPickerAnchorEl(event.currentTarget);
    };

    const handleEmojiPickerClose = () => {
        setEmojiPickerAnchorEl(null);
    };

    const handleSelectEmoji = (emoji) => {
        setReply(`${reply} ${emoji}`);
    };

    const handleCreateReaction = (reaction) => {
        createReaction({
            variables: {
                data: {
                    _id: comment?._id,
                    type: 'comment',
                    reaction: reaction,
                },
            },
            update: (cache, { data }) => {
                const normalizedCommentId = cache.identify({
                    id: comment?._id,
                    __typename: 'OComment',
                });
                const newreactions = data?.Reactions?.create?.reactions;
                const newreactedToBy = data?.Reactions?.create?.reactedToBy;

                cache.modify({
                    id: normalizedCommentId,
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
    };

    const handleRemoveReaction = () => {
        removeReaction({
            variables: {
                data: {
                    _id: comment?._id,
                    type: 'comment',
                },
            },
            update: (cache, { data }) => {
                const normalizedCommentId = cache.identify({
                    id: comment?._id,
                    __typename: 'OComment',
                });
                const newreactions = data?.Reactions?.delete?.reactions;
                const newreactedToBy = data?.Reactions?.delete?.reactedToBy;

                cache.modify({
                    id: normalizedCommentId,
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
        setUserReaction();
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

    const handleCreateReply = (e) => {
        e.preventDefault();
        if (reply.trim() == '') return;
        const mentionsData = mentionsFinder(reply);
        onCreateComment({
            content: mentionsData.content,
            content_entities: mentionsData.contentEntities,
            scroll: scroll?._id,
            image: comment_image,
            response_to: responseTo,
        });
        setReply('');
        setPreviewURL();
        setCommentImage(null);
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

    const commentUserInitials = getUserInitials(comment?.author?.displayName);
    const currentUserInitials = getUserInitials(user?.displayName);

    const comments = commentsData?.Comments?.get?.data;

    useEffect(() => {
        const reaction = getUserReaction(comment);
        setUserReaction(reaction);
    }, [comment, getUserReaction, createReactionData, removeReactionData]);

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
            <div style={style} className="d-flex flex-row flex-start">
                <Avatar
                    style={{
                        backgroundColor: '#fed132',
                        zIndex: 0,
                        marginRight: '3px',
                    }}
                    src={
                        process.env.REACT_APP_BACKEND_URL +
                        comment?.author?.profile_pic
                    }
                    sx={{ width: '30px', height: '30px' }}
                >
                    <Typography variant="body2">
                        {commentUserInitials}
                    </Typography>
                </Avatar>
                <div className="mb-3 flex-1 w-100">
                    <Card
                        style={{
                            backgroundColor: theme.palette.background.comment,
                        }}
                        elevation={0}
                    >
                        <CardContent>
                            <div className="center-horizontal space-between w-100">
                                <Typography
                                    component="div"
                                    variant="body2"
                                    display="inline"
                                >
                                    <Typography
                                        variant="body2"
                                        component="a"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            history.push(
                                                `/users/${comment?.author?._id}`
                                            );
                                        }}
                                    >
                                        {comment?.author?.displayName}
                                    </Typography>
                                    <Typography
                                        display="inline"
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        . @{comment?.author?._id}
                                    </Typography>
                                    <Typography
                                        display="inline"
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        .{' '}
                                        {getDistanceToNow(
                                            comment?.creation_date
                                        )}
                                    </Typography>
                                </Typography>
                                <IconButton
                                    size="small"
                                    aria-label="show more"
                                    aria-controls={commentOptionId}
                                    aria-haspopup="true"
                                    onClick={handleCommentOptionOpen}
                                >
                                    <MoreHorizRounded />
                                </IconButton>
                            </div>
                            <Typography variant="body2" component="div">
                                <Typography
                                    variant="body2"
                                    onClick={(e) => contentClickHandler(e)}
                                    dangerouslySetInnerHTML={{
                                        __html: contentBodyFactory(comment),
                                    }}
                                    style={{
                                        zIndex: 2,
                                        overflowWrap: 'break-word',
                                        wordWrap: 'break-word',
                                    }}
                                ></Typography>

                                {comment?.image.length > 0 && (
                                    <Grid container spacing={2}>
                                        <Grid
                                            className="mt-2"
                                            key={comment?.image}
                                            item
                                            xs={12}
                                            onClick={() => {
                                                setImagePreviewURL &&
                                                    setImagePreviewURL(
                                                        process.env
                                                            .REACT_APP_BACKEND_URL +
                                                            comment?.image
                                                    );
                                                setImagePreviewOpen(true);
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
                                                        comment?.image +
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
                                    </Grid>
                                )}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card
                        style={{
                            position: 'absolute',
                            alignSelf: 'baseline',
                            borderRadius: 10,
                            backgroundColor: theme.palette.background.default,
                            display: likeHovered ? 'block' : 'none',
                            transform: 'translateY(-28px)',
                            zIndex: 10,
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
                    <div className="center-horizontal">
                        <ReactionButton
                            handleRemoveReaction={handleRemoveReaction}
                            reaction={userReaction}
                            setLikeHovered={setLikeHovered}
                            onMouseEnter={() => setLikeHovered(true)}
                            onMouseLeave={() => setLikeHovered(false)}
                            variant="text"
                            textCase
                        />
                        <Typography
                            className={classes.clickableTypography}
                            variant="body2"
                            color="textSecondary"
                            onClick={() => {
                                setOpenReactions(true);
                                setResourceReactions(comment);
                            }}
                        >
                            {`${getReactionsSum(comment)} ${
                                getReactionsSum(comment) === 1
                                    ? 'Reaction'
                                    : 'Reactions'
                            }`}
                        </Typography>
                        <Divider orientation="vertical" />
                        {/* {comment?.response_to ? '' : '.'} */}
                        {!comment?.response_to && (
                            <Typography
                                color="textSecondary"
                                component={Button}
                                onClick={() => {
                                    setOpenReplies(true);
                                    setResponseTo(comment?._id);
                                }}
                                textCase
                                variantAlt="text"
                                variant="body2"
                                className={classes.replies}
                            >
                                Reply
                            </Typography>
                        )}
                        {!comment?.response_to && (
                            <>
                                <Typography
                                    style={{ margin: '3px' }}
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    .
                                </Typography>
                                <Typography
                                    className="p-0 my-2"
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {`${comment?.replies} ${
                                        comment?.replies === 1
                                            ? 'Reply'
                                            : 'Replies'
                                    }`}
                                </Typography>
                            </>
                        )}
                    </div>
                    {openReplies && (
                        <>
                            <div className="center-horizontal">
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
                                        sx={{ width: '30px', height: '30px' }}
                                    >
                                        <Typography variant="body2">
                                            {currentUserInitials}
                                        </Typography>
                                    </Avatar>
                                </Hidden>
                                <div className="w-100">
                                    <MentionsInput
                                        // spellCheck="false"
                                        className="mentions-textarea"
                                        id="content-field"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleCreateReply(e);
                                            }
                                        }}
                                        placeholder={
                                            comments?.length > 0
                                                ? ''
                                                : 'Be the first to comment..'
                                        }
                                        onChange={(e) =>
                                            setReply(
                                                reply?.length >= 250
                                                    ? e.target.value.substring(
                                                          0,
                                                          e.target.value
                                                              .length - 1
                                                      )
                                                    : e.target.value.substring(
                                                          0,
                                                          250
                                                      )
                                            )
                                        }
                                        value={reply}
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
                                            .getElementById('reply-image')
                                            .click();
                                    }}
                                >
                                    <ImageRounded />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    onClick={handleCreateReply}
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
                                                id="reply-image"
                                                type="file"
                                                onChange={(e) => {
                                                    handleSelectImage(
                                                        Array.from(
                                                            e.target.files
                                                        )
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
                                            setFileErrors([]);
                                            setCommentImage(null);
                                        }}
                                    >
                                        <CloseRounded />
                                    </IconButton>
                                </div>
                            </Card>

                            <div className={classes.inputHelper}>
                                <Typography color="error" variant="body2">
                                    {fileErrors.length > 0 && fileErrors[0]}
                                </Typography>
                            </div>
                        </>
                    )}
                    {comments
                        ?.filter(
                            (commentInner) =>
                                commentInner?.response_to?._id === comment?._id
                        )
                        ?.map((commentInner) => (
                            <Comment
                                key={commentInner._id}
                                id={commentInner._id}
                                comment={commentInner}
                                setCommentImage={setCommentImage}
                                setUpdateCommentOpen={setUpdateCommentOpen}
                                setCommentToEdit={setCommentToEdit}
                                setImagePreviewURL={setImagePreviewURL}
                                setImagePreviewOpen={setImagePreviewOpen}
                                setFlaggedResource={setFlaggedResource}
                                setOpenFlag={setOpenFlag}
                                setOpenReactions={setOpenReactions}
                                setResourceReactions={setResourceReactions}
                            />
                        ))}
                </div>
            </div>
            <Suspense
                fallback={() => (
                    <div>
                        <CircularProgress />
                    </div>
                )}
            >
                <EmojiPickerPopover
                    emojiPickerId={emojiPickerId}
                    emojiPickerAnchorEl={emojiPickerAnchorEl}
                    isEmojiPickerOpen={isEmojiPickerOpen}
                    handleEmojiPickerClose={handleEmojiPickerClose}
                    handleSelectEmoji={handleSelectEmoji}
                />
            </Suspense>
            <CommentOptionsPopover
                setFlaggedResource={setFlaggedResource}
                setOpenFlag={setOpenFlag}
                setOpenReactions={setOpenReactions}
                setResourceReactions={setResourceReactions}
                setUpdateCommentOpen={setUpdateCommentOpen}
                setCommentToEdit={setCommentToEdit}
                comment={comment}
                commentOptionId={commentOptionId}
                commentOptionAnchorEl={commentOptionAnchorEl}
                isCommentOptionOpen={isCommentOptionOpen}
                handleCommentOptionClose={handleCommentOptionClose}
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
    replies: {
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
            color: 'inherit',
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

const commentOptionId = 'menu-comment-option';
const emojiPickerId = 'emoji-picker-popover';
