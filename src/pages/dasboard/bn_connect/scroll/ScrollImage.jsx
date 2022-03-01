import { useMutation, useQuery } from '@apollo/client';
import {
    CloseRounded,
    CommentRounded,
    FavoriteRounded,
    ImageRounded,
    InsertEmoticon,
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
import React, { useCallback, useEffect, useState } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../../components/Button';
import ReactionButton from '../../../../components/ReactionButton';
import ReactionHover from '../../../../components/ReactionHover';
import { getDistanceToNowWithSuffix } from '../../../../components/utilities/date.components';
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
    QUERY_POST_BY_ID,
} from '../../utilities/queries';
import SkeletonScrollCard from '../skeleton/SkeletonScrollCard';
import Comment from './comment/Comment';

const EmojiPickerPopover = React.lazy(() =>
    import('../popovers/EmojiPickerPopover')
);

export default function ScrollImage({
    postId,
    profileData,
    setSharedResource,
    setCommentToEdit,
    setUpdateCommentOpen,
    setFlaggedResource,
    setOpenFlag,
    setOpenReactions,
    setResourceReactions,
    setOpen,
    setImagePreviewOpen,
    setImagePreviewURL,
    onClose,
}) {
    const classes = useStyles();

    const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = useState(null);
    const [userReaction, setUserReaction] = useState();
    const [reactionIcon, setReactionIcon] = useState();
    const [openComments, setOpenComments] = useState(false);
    const [comment_text, setCommentText] = useState('');
    const [comment_image, setCommentImage] = useState(null);
    const [likeHovered, setLikeHovered] = useState(false);
    const [errors, setErrors] = useState([]);
    const [previewURL, setPreviewURL] = useState();
    const [loadingMore, setLoadingMore] = useState(false);

    const isEmojiPickerOpen = Boolean(emojiPickerAnchorEl);
    const [createReaction, { data: createReactionData }] = useMutation(
        MUTATION_CREATE_REACTION
    );
    const [removeReaction, { data: removeReactionData }] = useMutation(
        MUTATION_REMOVE_REACTION
    );

    const theme = useTheme();
    const state = useSelector((st) => st);
    const history = useHistory();
    const user = state.auth.user;

    const {
        // loading: commentsLoading,
        data: commentsData,
        // error: commentsError,
        fetchMore,
    } = useQuery(QUERY_GET_COMMENTS, {
        variables: { data: { scroll_id: postId, limit: 8 } },
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
    const { data: postData, loading } = useQuery(QUERY_POST_BY_ID, {
        variables: { _id: postId },
    });

    const scroll = postData?.Posts?.getById;

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

    const handleCreateComment = (e) => {
        e.preventDefault();
        if (comment_text.length < 1) return;
        const mentionsData = mentionsFinder(comment_text);
        onCreateComment({
            content: mentionsData.content,
            content_entities: mentionsData.contentEntities,
            scroll: postId,
            image: comment_image,
        });
        setCommentText('');
        setPreviewURL();
        setCommentImage(null);
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
                    _id: postId,
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
                    _id: postId,
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

    return (
        <>
            {loading && !scroll && <SkeletonScrollCard />}
            {scroll && (
                <Card
                    variant="outlined"
                    elevation={0}
                    style={{ overflowY: 'auto', width: '100%' }}
                >
                    <div style={{ zIndex: 1 }}>
                        <CardHeader
                            avatar={
                                <Avatar
                                    style={{
                                        backgroundColor: '#fed132',
                                        marginRight: '3px',
                                    }}
                                    src={
                                        scroll?.author?.profile_pic &&
                                        process.env.REACT_APP_BACKEND_URL +
                                            scroll?.author?.profile_pic
                                    }
                                    sx={{ width: '30px', height: '30px' }}
                                >
                                    <Typography variant="body2">
                                        {authorInitials}
                                    </Typography>
                                </Avatar>
                            }
                            title={
                                <div className=" d-flex align-items-center">
                                    <Typography
                                        variant="body2"
                                        component="a"
                                        style={{ marginRight: '3px' }}
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
                                    >
                                        {`@${scroll?.author?._id}`}
                                    </Typography>
                                </div>
                            }
                            subheader={
                                <Typography variant="body2">
                                    {getDistanceToNowWithSuffix(
                                        scroll?.createdAt
                                    )}
                                </Typography>
                            }
                        />
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="div"
                            >
                                <Typography
                                    variant="body2"
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

                            <br />

                            <Typography
                                component="div"
                                display="inline"
                                style={{ zIndex: 2 }}
                            >
                                <Typography
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
                                    variant="body2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenComments(true);
                                    }}
                                    className={classes.replies}
                                    display="inline"
                                >
                                    {`${scroll?.comments} ${
                                        scroll?.comments === 1
                                            ? 'Comment'
                                            : 'Comments'
                                    }`}
                                </Typography>
                            </Typography>
                        </CardContent>
                    </div>
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
                                    onClose();
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
                            <Typography
                                className="mx-3 my-2"
                                color="textSecondary"
                                variant="body2"
                            >
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
                                        sx={{ width: '30px', height: '30px' }}
                                    >
                                        <Typography variant="body2">
                                            {currentUserInitials}
                                        </Typography>
                                    </Avatar>
                                </Hidden>
                                <div className="w-100">
                                    <MentionsInput
                                        spellCheck="false"
                                        className="mentions-textarea"
                                        id="content-field"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleCreateComment(e);
                                            }
                                        }}
                                        placeholder={
                                            commentsData?.Comments?.get?.data
                                                ?.length > 0
                                                ? ''
                                                : 'Be the first to comment..'
                                        }
                                        onChange={(e) =>
                                            setCommentText(
                                                comment_text?.length >= 250
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
                                        value={comment_text}
                                    >
                                        <Mention
                                            markup="/*@__id__-__display__*/"
                                            displayTransform={(id, display) =>
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
                                            .getElementById(
                                                'scrollimage-comment-image'
                                            )
                                            .click();
                                    }}
                                >
                                    <ImageRounded />
                                </IconButton>
                                <IconButton
                                    size="small"
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
                                    display: !previewURL && 'none',
                                    height: 300,
                                    borderRadius: 8,
                                    backgroundImage:
                                        previewURL && 'url(' + previewURL + ')',
                                    backgroundSize: 'cover',
                                    marginBottom: '5px',
                                }}
                            >
                                <div className="space-between">
                                    <div>
                                        <div style={{ display: 'none' }}>
                                            <input
                                                id="scrollimage-comment-image"
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

                                            setCommentImage(null);
                                        }}
                                    >
                                        <CloseRounded />
                                    </IconButton>
                                </div>
                            </Card>
                            {commentsData &&
                                commentsData?.Comments?.get?.data
                                    .filter((comment) => !comment.response_to)
                                    .map((comment) => (
                                        <Comment
                                            profileData={profileData}
                                            scroll={scroll}
                                            key={comment._id}
                                            setUpdateCommentOpen={
                                                setUpdateCommentOpen
                                            }
                                            setCommentImage={setCommentImage}
                                            setCommentToEdit={setCommentToEdit}
                                            comment={comment}
                                            setFlaggedResource={
                                                setFlaggedResource
                                            }
                                            setOpenFlag={setOpenFlag}
                                            setOpenReactions={setOpenReactions}
                                            setResourceReactions={
                                                setResourceReactions
                                            }
                                            onCreateComment={onCreateComment}
                                            setImagePreviewURL={
                                                setImagePreviewURL
                                            }
                                            setImagePreviewOpen={
                                                setImagePreviewOpen
                                            }
                                            comment_image={comment_image}
                                        />
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
            )}
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

const emojiPickerId = 'emoji-picker-popover';
