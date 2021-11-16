import { useMutation, useQuery } from '@apollo/client';
import {
    CloseRounded,
    FavoriteRounded,
    ImageRounded,
    InsertEmoticon,
    MoreHorizRounded,
    PanToolRounded,
    Send,
    ThumbDownRounded,
    ThumbUpRounded,
} from '@mui/icons-material';
import {
    Avatar,
    Card,
    CardContent,
    Divider,
    Grid,
    IconButton,
    Typography,
    useTheme,
    Hidden,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import { DropzoneArea } from 'react-mui-dropzone';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../../../components/Button';
import ReactionButton from '../../../../../components/ReactionButton';
import { getUserInitials } from '../../../../../utilities/Helpers';
import {
    contentBodyFactory,
    getReactionsSum,
    mentionsFinder,
} from '../../../utilities/functions';
import {
    MUTATION_CREATE_REACTION,
    MUTATION_REMOVE_REACTION,
    QUERY_GET_COMMENTS,
} from '../../../utilities/queries';
import EmojiPickerPopover from '../../popovers/EmojiPickerPopover';
import CommentOptionsPopover from './CommentOptionsPopover';

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
        color: 'inherit',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
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
export default function Comment({
    comment,
    style,
    onCreateComment,
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
    const classes = useStyles();
    const theme = useTheme();
    const [commentOptionAnchorEl, setCommentOptionAnchorEl] = useState(null);
    const isCommentOptionOpen = Boolean(commentOptionAnchorEl);
    const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = useState(null);
    const isEmojiPickerOpen = Boolean(emojiPickerAnchorEl);
    const [openReplies, setOpenReplies] = useState(false);
    const [reply, setReply] = useState('');
    const [userReaction, setUserReaction] = useState();
    const [likeHovered, setLikeHovered] = useState(false);
    const [responseTo, setResponseTo] = useState('');
    const [replyErr, setReplyErr] = useState(false);
    const [previewURL, setPreviewURL] = useState();
    const [fileErrors, setFileErrors] = useState([]);
    const state = useSelector((st) => st);
    const user = state.auth.user;
    const history = useHistory();

    const [createReaction] = useMutation(MUTATION_CREATE_REACTION);
    const [removeReaction] = useMutation(MUTATION_REMOVE_REACTION);
    const {
        data: commentsData,
        // loading: commentsLoading,
        // error: commentsError,
    } = useQuery(QUERY_GET_COMMENTS, {
        variables: { data: { scroll_id: comment?.scroll } },
    });

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
        handleEmojiPickerClose();
        setReply(`${reply} ${emoji.native}`);
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
            refetchQueries: [
                {
                    query: QUERY_GET_COMMENTS,
                    variables: { data: { scroll_id: comment?.scroll } },
                },
            ],
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
            refetchQueries: [
                {
                    query: QUERY_GET_COMMENTS,
                    variables: { data: { scroll_id: comment?.scroll } },
                },
            ],
        });
        setUserReaction();
    };

    const handleCreateReply = (e) => {
        e.preventDefault();
        if (reply.trim() == '' && !comment_image) return setReplyErr(true);

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
        setFileErrors([]);
        setReplyErr(false);
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

    useEffect(() => {
        const reaction = getUserReaction(comment);
        setUserReaction(reaction);
    }, [comment, getUserReaction]);

    const commentUserInitials = getUserInitials(comment?.author?.displayName);
    const currentUserInitials = getUserInitials(user?.displayName);
    //moment js single letter formatting for comments
    moment.updateLocale('en', {
        relativeTime: {
            future: 'in %s',
            past: '%s',
            s: 'now',
            m: '1 min',
            mm: '%d min',
            h: '1 h',
            hh: '%d h',
            d: '1 d',
            dd: '%d d',
            M: '1 month',
            MM: '%d m',
            y: '1 y',
            yy: '%d y',
        },
    });

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
                                <Typography variant="body2" display="inline">
                                    <span
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
                                    </span>
                                    <span display="inline" variant="body2">
                                        . @{comment?.author?._id}
                                    </span>
                                    <span display="inline" variant="body2">
                                        .{' '}
                                        {moment(
                                            comment.creation_date
                                        ).fromNow()}
                                    </span>
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
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                <span
                                    variant="body2"
                                    onClick={(e) => contentClickHandler(e)}
                                    dangerouslySetInnerHTML={{
                                        __html: contentBodyFactory(comment),
                                    }}
                                    style={{ zIndex: 2 }}
                                ></span>

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
                                                            comment.image
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
                                                        comment.image +
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
                                color="inherit"
                                component={Button}
                                onClick={() => {
                                    setOpenReplies(true);
                                    setResponseTo(comment?._id);
                                }}
                                textCase
                                variantAlt="text"
                                className="p-0 my-1"
                                variant="body2"
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
                                            commentsData?.Comments?.get
                                                ?.length > 0
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
                                            .getElementsByClassName(
                                                'reply-dropzone'
                                            )[0]
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
                                <Typography color="error" variant="body2">
                                    {replyErr &&
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
                                                dropzoneClass="reply-dropzone"
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
                                                                    (image.width <=
                                                                        1200) &
                                                                    (image.height <=
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
                                                    });
                                                }}
                                                acceptedFiles={[
                                                    'image/jpeg',
                                                    '.png',
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
                    {commentsData &&
                        commentsData?.Comments?.get
                            .filter(
                                (commentInner) =>
                                    commentInner?.response_to?._id ===
                                    comment?._id
                            )
                            .map((commentInner) => (
                                <Comment
                                    key={commentInner._id}
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
            <EmojiPickerPopover
                emojiPickerId={emojiPickerId}
                emojiPickerAnchorEl={emojiPickerAnchorEl}
                isEmojiPickerOpen={isEmojiPickerOpen}
                handleEmojiPickerClose={handleEmojiPickerClose}
                handleSelectEmoji={handleSelectEmoji}
            />
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
