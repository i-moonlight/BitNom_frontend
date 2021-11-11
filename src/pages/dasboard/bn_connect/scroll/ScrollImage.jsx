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
    IconButton,
    Typography,
    useTheme,
    Hidden,
    Skeleton,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import { DropzoneArea } from 'react-mui-dropzone';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../../components/Button';
import ReactionButton from '../../../../components/ReactionButton';
import { getUserInitials } from '../../../../utilities/Helpers';
import {
    contentBodyFactory,
    getReactionsSum,
    mentionsFinder,
    getFeed,
} from '../../utilities/functions';
import {
    MUTATION_CREATE_COMMENT,
    MUTATION_CREATE_REACTION,
    MUTATION_REMOVE_REACTION,
    QUERY_POST_BY_ID,
    QUERY_GET_COMMENTS,
    QUERY_LOAD_SCROLLS,
} from '../../utilities/queries';
import EmojiPickerPopover from '../popovers/EmojiPickerPopover';
import Comment from './comment/Comment';
// import LinkCard from './LinkCard';
//import ScrollOptionsPopover from './ScrollOptionsPopover';

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
    //const [scrollOptionAnchorEl, setScrollOptionAnchorEl] = useState(null);
    const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = useState(null);
    const [userReaction, setUserReaction] = useState();
    const [reactionIcon, setReactionIcon] = useState();
    const [openComments, setOpenComments] = useState(false);
    const [comment_text, setCommentText] = useState('');
    const [comment_image, setCommentImage] = useState(null);
    const [fileErrors, setFileErrors] = useState([]);
    const [likeHovered, setLikeHovered] = useState(false);
    const [createCommentErr, setCreateCommentErr] = useState(false);
    const [previewURL, setPreviewURL] = useState();

    //const isScrollOptionOpen = Boolean(scrollOptionAnchorEl);
    const isEmojiPickerOpen = Boolean(emojiPickerAnchorEl);
    const [createReaction] = useMutation(MUTATION_CREATE_REACTION);
    const [removeReaction] = useMutation(MUTATION_REMOVE_REACTION);

    const theme = useTheme();
    const state = useSelector((st) => st);
    const history = useHistory();
    const user = state.auth.user;

    const [createComment] = useMutation(MUTATION_CREATE_COMMENT);
    const { data: postData, loading } = useQuery(QUERY_POST_BY_ID, {
        variables: { _id: postId },
    });

    const scroll = postData?.Posts?.getById;
    const {
        data: commentsData,
        // loading: commentsLoading,
        // error: commentsError,
    } = useQuery(QUERY_GET_COMMENTS, {
        variables: { data: { scroll_id: postId } },
    });

    const onCreateComment = (ICreateComment) => {
        createComment({
            variables: {
                data: ICreateComment,
            },
            refetchQueries: [
                {
                    query: QUERY_LOAD_SCROLLS,
                    variables: {
                        data: { ids: getFeed(profileData), limit: 220 },
                    },
                },
                {
                    query: QUERY_POST_BY_ID,
                    variables: {
                        _id: postId,
                    },
                },
                {
                    query: QUERY_GET_COMMENTS,
                    variables: { data: { scroll_id: postId } },
                },
            ],
        });
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
            scroll: postId,
            image: comment_image,
        });
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
            refetchQueries: [
                {
                    query: QUERY_LOAD_SCROLLS,
                    variables: {
                        data: { ids: getFeed(profileData), limit: 220 },
                    },
                },
                {
                    query: QUERY_POST_BY_ID,
                    variables: {
                        _id: postId,
                    },
                },
            ],
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
            refetchQueries: [
                {
                    query: QUERY_LOAD_SCROLLS,
                    variables: {
                        data: { ids: getFeed(profileData), limit: 220 },
                    },
                },
                {
                    query: QUERY_POST_BY_ID,
                    variables: {
                        _id: postId,
                    },
                },
            ],
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

    const authorInitials = getUserInitials(scroll?.author?.displayName);
    const currentUserInitials = getUserInitials(user?.displayName);

    useEffect(() => {
        const reaction = getUserReaction(scroll);
        setUserReaction(reaction);
        setIcon(reaction);
    }, [getUserReaction, scroll, setIcon]);

    return (
        <>
            {loading && !scroll && (
                <Card
                    variant="outlined"
                    elevation={0}
                    style={{ overflowY: 'auto', width: '100%' }}
                >
                    <CardHeader
                        avatar={
                            <Skeleton
                                animation="wave"
                                variant="circular"
                                width={30}
                                height={30}
                            />
                        }
                        title={
                            <div
                                className=" d-flex align-items-center"
                                style={{ marginBottom: '5px' }}
                            >
                                <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    width="60%"
                                />
                            </div>
                        }
                        subheader={
                            <Skeleton
                                variant="rectangular"
                                height={10}
                                width="10%"
                                animation="wave"
                            />
                        }
                    />
                    <CardContent>
                        <Typography component="p">
                            <Skeleton
                                variant="text"
                                height={40}
                                width="40%"
                                animation="wave"
                            />
                        </Typography>
                        <Typography display="inline">
                            <Skeleton
                                variant="rectangular"
                                width="20%"
                                animation="wave"
                            />
                            <Skeleton
                                variant="rectangular"
                                width="20%"
                                animation="wave"
                            />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={30}
                            animation="wave"
                        />
                    </CardActions>
                </Card>
            )}
            {scroll && (
                <Card
                    variant="outlined"
                    elevation={0}
                    style={{ overflowY: 'auto', width: '100%' }}
                >
                    <div
                        style={{ zIndex: 1 }}
                        //onClick={() => history.push(`/posts/${scroll?._id}`)}
                    >
                        <CardHeader
                            avatar={
                                <Avatar
                                    style={{
                                        backgroundColor: '#fed132',
                                        marginRight: '3px',
                                    }}
                                    src={
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
                                    {moment(scroll?.createdAt).fromNow()}
                                </Typography>
                            }
                        />
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                <Typography
                                    onClick={(e) => contentClickHandler(e)}
                                    dangerouslySetInnerHTML={{
                                        __html: contentBodyFactory(scroll),
                                    }}
                                    style={{ zIndex: 2 }}
                                ></Typography>
                            </Typography>

                            <br />

                            <Typography display="inline" style={{ zIndex: 2 }}>
                                <Typography
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
                        <Button
                            textCase
                            onClick={() => {
                                handleCreateReaction('like');
                                setLikeHovered(false);
                            }}
                            variant="text"
                            startIcon={
                                <ThumbUpRounded className={classes.primary} />
                            }
                        >
                            Like
                        </Button>
                        <Button
                            textCase
                            onClick={() => {
                                handleCreateReaction('love');
                                setLikeHovered(false);
                            }}
                            variant="text"
                            startIcon={
                                <FavoriteRounded className={classes.red} />
                            }
                        >
                            Love
                        </Button>
                        <Button
                            textCase
                            onClick={() => {
                                handleCreateReaction('dislike');
                                setLikeHovered(false);
                            }}
                            variant="text"
                            startIcon={
                                <ThumbDownRounded className={classes.primary} />
                            }
                        >
                            Dislike
                        </Button>
                        <Button
                            textCase
                            onClick={() => {
                                handleCreateReaction('celebrate');
                                setLikeHovered(false);
                            }}
                            variant="text"
                            startIcon={
                                <PanToolRounded className={classes.green} />
                            }
                        >
                            Celebrate
                        </Button>
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
                            >
                                Be the first to comment
                            </Typography>
                        )}
                    </CardActionArea>
                    {openComments && (
                        <div style={{ padding: '5px' }}>
                            <div className="d-flex align-items-center">
                                <Hidden smDown>
                                    <Avatar
                                        style={{
                                            backgroundColor: '#fed132',
                                            marginRight: '3px',
                                        }}
                                        src={
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
                                            commentsData?.Comments?.get
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
                                    //className='m-1 p-1'
                                    onClick={() => {
                                        //setOpenImage(true);
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
                                            <DropzoneArea
                                                clearOnUnmount
                                                dropzoneClass="comment-dropzone"
                                                //id="dropzone"
                                                clickable={true}
                                                onChange={(files) => {
                                                    const errors = [];
                                                    let counter = 0;
                                                    files.map((file) => {
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
                                                                        2500000)
                                                                ) {
                                                                    counter += 1;
                                                                    setFileErrors(
                                                                        []
                                                                    );
                                                                } else {
                                                                    errors.push(
                                                                        'Image is too large. Trim to 1200px by 1350px or less.'
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
                                                    });
                                                }}
                                                acceptedFiles={[
                                                    'image/jpeg',
                                                    'image/png',
                                                ]}
                                                maxFileSize={2500000}
                                                filesLimit={1}
                                                showPreviewsInDropzone
                                                showPreviews={false}
                                                showFileNames={false}
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
                                                setFileErrors([]);
                                                setCommentImage(null);
                                            }}
                                        />
                                    </IconButton>
                                </div>
                            </Card>

                            <div className={classes.inputHelper}>
                                <Typography color="error" variant="body2">
                                    {fileErrors.length > 0 && fileErrors[0]}
                                </Typography>
                            </div>
                            {commentsData &&
                                commentsData?.Comments?.get
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
