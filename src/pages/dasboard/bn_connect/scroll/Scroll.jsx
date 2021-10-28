import { useMutation, useQuery } from '@apollo/client';
import {
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
    CloseRounded,
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
    IconButton,
    Typography,
    useTheme,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import { DropzoneArea } from 'react-mui-dropzone';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
//import ImagePreview from '../../../components/ImagePreview';
//import TextField from '../../../../components/TextField';
import { Mention, MentionsInput } from 'react-mentions';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../../../../components/Button';
import ReactionButton from '../../../../components/ReactionButton';
import { getUserInitials } from '../../../../utilities/Helpers';
import EventPreview from '../../events/EventPreview';
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
import Comment from './comment/Comment';
// import LinkCard from './LinkCard';
import ScrollOptionsPopover from './ScrollOptionsPopover';
import ScrollPreview from './ScrollPreview';

const EmojiPickerPopover = React.lazy(() =>
    import('../popovers/EmojiPickerPopover')
);

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

const scrollOptionId = 'menu-scroll-option';
const emojiPickerId = 'emoji-picker-popover';

export default function Scroll({
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
    style,
}) {
    const classes = useStyles();
    const [scrollOptionAnchorEl, setScrollOptionAnchorEl] = useState(null);
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

    const isScrollOptionOpen = Boolean(scrollOptionAnchorEl);
    const isEmojiPickerOpen = Boolean(emojiPickerAnchorEl);
    const [createReaction] = useMutation(MUTATION_CREATE_REACTION);
    const [removeReaction] = useMutation(MUTATION_REMOVE_REACTION);

    const theme = useTheme();
    const state = useSelector((st) => st);
    const history = useHistory();
    const user = state.auth.user;

    const [createComment] = useMutation(MUTATION_CREATE_COMMENT);

    const {
        data: commentsData,
        // loading: commentsLoading,
        // error: commentsError,
    } = useQuery(QUERY_GET_COMMENTS, {
        variables: { data: { scroll_id: scroll?._id } },
    });

    console.log(scroll, 'SCROLL');
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
                    variables: { data: { scroll_id: scroll?._id } },
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
            scroll: scroll?._id,
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
            <Card style={{ ...style, marginBottom: 16 }}>
                <CardContent
                    style={{ zIndex: 1 }}
                    onClick={() => history.push(`/posts/${scroll?._id}`)}
                >
                    <CardHeader
                        avatar={
                            <Avatar
                                style={{
                                    backgroundColor: '#fed132',
                                }}
                                src={
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
                                >
                                    {`@${scroll?.author?._id}`}
                                </Typography>
                            </div>
                        }
                        subheader={moment(scroll?.createdAt).fromNow()}
                    />

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
                    <Grid container spacing={2} className="mb-2">
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
                            scroll?.images?.map((imageURL) => (
                                <Grid
                                    className="mt-3"
                                    key={imageURL}
                                    item
                                    style={{ zIndex: 2 }}
                                    xs={scroll?.images.length > 1 ? 6 : 12}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setImagePreviewURL(
                                            process.env.REACT_APP_BACKEND_URL +
                                                imageURL
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
                            <ScrollPreview
                                scroll={scroll?.shared_resource?._id}
                            />
                        )}
                    {scroll?.shared_resource?._id &&
                        scroll?.shared_resource?.type === 'event' && (
                            <EventPreview
                                event={scroll?.shared_resource?._id}
                            />
                        )}
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
                        startIcon={<FavoriteRounded className={classes.red} />}
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
                        startIcon={<PanToolRounded className={classes.green} />}
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
                    <CardContent>
                        <div className="d-flex align-items-center">
                            <Avatar
                                style={{
                                    backgroundColor: '#fed132',
                                }}
                                src={scroll?.author?.image}
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
                                        if (e.key === 'Enter') {
                                            handleCreateComment(e);
                                        }
                                    }}
                                    placeholder={
                                        commentsData?.Comments?.get?.length > 0
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
                                                    const image = new Image();
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
                                                            if (counter === 1) {
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
                                            maxFileSize={5000000}
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
                                ))}
                    </CardContent>
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
