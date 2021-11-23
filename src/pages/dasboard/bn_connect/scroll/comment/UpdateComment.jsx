//TODO: Upload video
import { useMutation } from '@apollo/client';
import {
    ChevronRight,
    CloseRounded,
    ImageRounded,
    InsertEmoticon,
    Public,
} from '@mui/icons-material';
import {
    Avatar,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
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
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Button } from '../../../../../components/Button';
import { getUserInitials } from '../../../../../utilities/Helpers';
import {
    mentionsFinder,
    mentionsUpdate,
    getFeed,
} from '../../../utilities/functions';
import {
    MUTATION_DELETE_COMMENT,
    MUTATION_UPDATE_COMMENT,
    QUERY_GET_COMMENTS,
    QUERY_LOAD_SCROLLS,
} from '../../../utilities/queries';
import EmojiPickerPopover from '../../popovers/EmojiPickerPopover';

export default function UpdateComment({
    updateCommentOpen,
    setUpdateCommentOpen,
    commentToEdit,
    setCommentToEdit,
    setOpenImage,
    profileData,
}) {
    const [updateCommentErr, setUpdateCommentErr] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [comment_text, setCommentText] = useState('');
    const [comment_image, setCommentImage] = useState(undefined);
    const [openDelete, setOpenDelete] = useState(false);
    const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = useState(null);
    const [previewURL, setPreviewURL] = useState();
    const [fileErrors, setFileErrors] = useState([]);

    const emojiPickerId = 'emoji-picker-popover';
    const isEmojiPickerOpen = Boolean(emojiPickerAnchorEl);

    const state = useSelector((st) => st);
    const user = state.auth.user;

    const [updateComment, { loading }] = useMutation(MUTATION_UPDATE_COMMENT);

    const [deleteComment] = useMutation(MUTATION_DELETE_COMMENT);

    const onDeleteComment = async (id) => {
        await deleteComment({
            variables: {
                _id: id,
            },
            refetchQueries: [
                {
                    query: QUERY_LOAD_SCROLLS,
                    variables: {
                        data: { ids: getFeed(profileData), limit: 220 },
                    },
                },
                {
                    query: QUERY_GET_COMMENTS,
                    variables: { data: { scroll_id: commentToEdit?.scroll } },
                },
            ],
        });
        setCommentText('');
        setCommentImage(undefined);
        setUpdateCommentErr(false);
        setOpenImage(false);
        setFileType(null);
        setCommentToEdit(null);
    };

    const onUpdateComment = async (IUpdateComment) => {
        await updateComment({
            variables: {
                data: IUpdateComment,
            },
            refetchQueries: [
                {
                    query: QUERY_LOAD_SCROLLS,
                    variables: {
                        data: { ids: getFeed(profileData), limit: 220 },
                    },
                },
                {
                    query: QUERY_GET_COMMENTS,
                    variables: { data: { scroll_id: commentToEdit?.scroll } },
                },
            ],
        });
        setCommentText('');
        setCommentImage(undefined);
        setUpdateCommentErr(false);
        setOpenImage(false);
        setFileType(null);
        setCommentToEdit(null);
        setPreviewURL();
        setFileErrors([]);
    };

    const handleEmojiPickerOpen = (event) => {
        setEmojiPickerAnchorEl(event.currentTarget);
    };

    const handleEmojiPickerClose = () => {
        setEmojiPickerAnchorEl(null);
    };

    const handleSelectEmoji = (emoji) => {
        handleEmojiPickerClose();
        setCommentText(`${comment_text} ${emoji.native}`);
    };

    useEffect(() => {
        if (commentToEdit?.image.trim() !== '') {
            setFileType('image');
        }
        if (commentToEdit) {
            setCommentText(mentionsUpdate(commentToEdit?.content));
        }
    }, [commentToEdit]);

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
                    return toast.error(
                        'Image should be less than 1200px by 1350px & below 2mb.',
                        {
                            position: 'bottom-left',
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
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

    const handleUpdateComment = (e) => {
        e.preventDefault();
        if (comment_text.trim() == '') return setUpdateCommentErr(true);

        const mentionsData = mentionsFinder(comment_text);
        onUpdateComment({
            comment_id: commentToEdit?._id,
            content: mentionsData.content,
            content_entities: mentionsData.contentEntities,
            image: comment_image,
        });
        setUpdateCommentOpen(false);
    };

    const handleDeleteComment = (e) => {
        e.preventDefault();
        onDeleteComment(commentToEdit?._id);
        setOpenDelete(false);
        setUpdateCommentOpen(false);
    };

    const userInitials = getUserInitials(user?.displayName);

    return (
        <>
            <Modal
                style={{
                    outline: 'none',

                    '&:focusVisible': {
                        outline: 'none',
                    },
                }}
                className="center-horizontal center-vertical w-100"
                open={updateCommentOpen}
            >
                <Grid container>
                    <Grid item lg={3} md={2} sm={1} xs={1}></Grid>
                    <Grid item lg={6} md={8} sm={10} xs={10}>
                        <Card>
                            <div className="space-between mx-3 my-2">
                                <Typography variant="body2"></Typography>
                                <Typography variant="body1">
                                    Update Comment
                                </Typography>
                                <IconButton
                                    onClick={() => {
                                        setUpdateCommentOpen(
                                            !updateCommentOpen
                                        );
                                        setCommentToEdit(null);
                                        setOpenImage(false);
                                        setCommentImage(undefined);
                                        setUpdateCommentErr(false);
                                        setFileType(null);
                                        setPreviewURL();
                                        setFileErrors([]);
                                    }}
                                    size="small"
                                    className="m-1 p-1"
                                >
                                    <CloseRounded />
                                </IconButton>
                            </div>

                            <Divider />
                            <CardContent
                                style={{
                                    maxHeight: '85vh',
                                    overflowY: 'auto',
                                }}
                            >
                                <ListItem className="p-0">
                                    <ListItemAvatar>
                                        <Avatar
                                            style={{
                                                backgroundColor: '#fed132',
                                            }}
                                            src={
                                                user?.profile_pic &&
                                                process.env
                                                    .REACT_APP_BACKEND_URL +
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
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleUpdateComment(e);
                                        }
                                    }}
                                    placeholder="Write Comment"
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
                                <Typography color="error" variant="body2">
                                    {updateCommentErr &&
                                        'The comment content cannot be empty'}
                                </Typography>
                                <Card
                                    style={{
                                        display: previewURL ? 'block' : 'none',
                                        height: 300,
                                        borderRadius: 8,
                                        width: '100%',
                                        backgroundImage:
                                            previewURL &&
                                            'url(' + previewURL + ')',
                                        backgroundSize: 'cover',
                                        marginTop: '5px',
                                    }}
                                >
                                    <div className="space-between">
                                        <div>
                                            <div style={{ display: 'none' }}>
                                                <input
                                                    id="updating-comment-image"
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
                                            <CloseRounded color="secondary" />
                                        </IconButton>
                                    </div>
                                </Card>

                                <div>
                                    <Typography color="error" variant="body2">
                                        {fileErrors.length > 0 && fileErrors[0]}
                                    </Typography>
                                </div>
                                {commentToEdit?.image?.trim() !== '' &&
                                    fileType !== null && (
                                        <Card
                                            style={{
                                                height: 300,
                                                borderRadius: 8,
                                                width: '100%',
                                                backgroundImage:
                                                    'url(' +
                                                    process.env
                                                        .REACT_APP_BACKEND_URL +
                                                    commentToEdit?.image +
                                                    ')',
                                                backgroundSize: 'cover',
                                                cursor: 'pointer',
                                                marginTop: '5px',
                                            }}
                                        >
                                            <div className="space-between mx-3 my-2">
                                                <Typography variant="body2"></Typography>
                                                <IconButton
                                                    size="small"
                                                    className="m-1 p-1"
                                                    onClick={() => {
                                                        setFileType(null);
                                                        setCommentImage(null);
                                                    }}
                                                >
                                                    <CloseRounded />
                                                </IconButton>
                                            </div>
                                        </Card>
                                    )}
                                {/* <Divider /> */}
                                <Dialog
                                    open={openDelete}
                                    onClose={() => setOpenDelete(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {'Delete this comment?'}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            This can’t be undone and it will be
                                            removed from your profile and from
                                            the BNConnect platform.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            onClick={() => setOpenDelete(false)}
                                            color="primary"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={handleDeleteComment}
                                            color="primary"
                                            autoFocus
                                        >
                                            Delete
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                <EmojiPickerPopover
                                    emojiPickerId={emojiPickerId}
                                    emojiPickerAnchorEl={emojiPickerAnchorEl}
                                    isEmojiPickerOpen={isEmojiPickerOpen}
                                    handleEmojiPickerClose={
                                        handleEmojiPickerClose
                                    }
                                    handleSelectEmoji={handleSelectEmoji}
                                />
                                <div className="space-between mt-1">
                                    <div className="center-horizontal">
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
                                                setFileType(null);
                                                setCommentImage(null);
                                                document
                                                    .getElementById(
                                                        'update-comment-image'
                                                    )
                                                    .click();
                                            }}
                                        >
                                            <ImageRounded />
                                        </IconButton>
                                    </div>
                                    <div>
                                        <Button
                                            style={{
                                                backgroundColor: '#ba000d',
                                                color: '#FFFFFF',
                                                marginRight: '3px',
                                            }}
                                            variant="contained"
                                            size="small"
                                            onClick={() => setOpenDelete(true)}
                                        >
                                            Delete
                                        </Button>
                                        {!loading && (
                                            <Button
                                                size="small"
                                                onClick={handleUpdateComment}
                                            >
                                                Update
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
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
        </>
    );
}
