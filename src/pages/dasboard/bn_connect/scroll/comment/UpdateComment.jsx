//TODO: Upload video
import { useMutation } from '@apollo/client';
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
    useTheme,
} from '@material-ui/core';
import {
    ChevronRight,
    CloseRounded,
    ImageRounded,
    Public,
    InsertEmoticon,
} from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';
import React, { useEffect, useState } from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import { useSelector } from 'react-redux';
import Button from '../../../../../components/Button';
import { getUserInitials } from '../../../../../utilities/Helpers';
import {
    generateRandomColor,
    mentionsFinder,
    mentionsUpdate,
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
    openImage,
    setOpenImage,
    profileData,
}) {
    const [updateCommentErr, setUpdateCommentErr] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [comment_text, setCommentText] = useState('');
    const [comment_image, setCommentImage] = useState(undefined);
    const [openDelete, setOpenDelete] = useState(false);
    const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = useState(null);

    const emojiPickerId = 'emoji-picker-popover';
    const isEmojiPickerOpen = Boolean(emojiPickerAnchorEl);

    const theme = useTheme();
    const state = useSelector((st) => st);
    const user = state.auth.user;
    const [
        updateComment,
        {
            loading,
            data,
            //  error
        },
    ] = useMutation(MUTATION_UPDATE_COMMENT);
    const [
        deleteComment,
        {
            //loading: deleteLoading,
            data: deleteData,
            //  error
        },
    ] = useMutation(MUTATION_DELETE_COMMENT);

    const onDeleteComment = async (id) => {
        await deleteComment({
            variables: {
                _id: id,
            },
            refetchQueries: [
                { query: QUERY_LOAD_SCROLLS },
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
        if (data?.Comment?.update) {
            console.log(data, deleteData);
        }
    }, [data, deleteData]);

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

                    '&:focus-visible': {
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
                                <IconButton size="small" className="m-1 p-1">
                                    <CloseRounded
                                        onClick={() => {
                                            setUpdateCommentOpen(
                                                !updateCommentOpen
                                            );
                                            setCommentToEdit(null);
                                            setOpenImage(false);
                                            setCommentImage(undefined);
                                            setUpdateCommentErr(false);
                                            setFileType(null);
                                        }}
                                    />
                                </IconButton>
                            </div>

                            <Divider />
                            <CardContent
                                style={{
                                    maxHeight: '500px',
                                    overflowY: 'auto',
                                }}
                            >
                                <ListItem className="p-0">
                                    <ListItemAvatar>
                                        <Avatar
                                            style={{
                                                backgroundColor:
                                                    generateRandomColor(),
                                            }}
                                            src={user?.profile_pic}
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
                                                    backgroundColor:
                                                        theme.palette.background
                                                            .default,
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
                                    spellcheck="false"
                                    className="mentions-textarea"
                                    id="content-field"
                                    /* onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateComment(e);
                  }
                }} */
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
                                        display: openImage ? 'block' : 'none',
                                    }}
                                >
                                    <DropzoneArea
                                        clearOnUnmount
                                        onChange={(files) => {
                                            setCommentImage(files[0]);
                                        }}
                                        dropzoneText={
                                            'Drag n drop an image here or click'
                                        }
                                        acceptedFiles={['image/*']}
                                        maxFileSize={5000000}
                                        filesLimit={1}
                                        showAlerts={['error']}
                                        showPreviews={false}
                                        showPreviewsInDropzone
                                        previewGridProps={{
                                            container: {
                                                spacing: 1,
                                                direction: 'row',
                                            },
                                        }}
                                    />
                                </Card>
                                {commentToEdit?.image?.trim() !== '' &&
                                    fileType !== null && (
                                        <Card>
                                            <div className="space-between mx-3 my-2">
                                                <Typography variant="body2"></Typography>
                                                <Typography variant="body1"></Typography>
                                                <IconButton
                                                    size="small"
                                                    className="m-1 p-1"
                                                >
                                                    <CloseRounded
                                                        onClick={() => {
                                                            setFileType(null);
                                                            setCommentImage(
                                                                null
                                                            );
                                                        }}
                                                    />
                                                </IconButton>
                                            </div>
                                            <Grid
                                                container
                                                spacing={2}
                                                className="mb-2"
                                            >
                                                <Grid
                                                    className="mt-3"
                                                    key={commentToEdit?.image}
                                                    item
                                                    xs={12}
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
                                                                commentToEdit?.image +
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
                                            </Grid>
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
                                            className="m-1 p-1"
                                            onClick={() => {
                                                setOpenImage(true);
                                                setFileType(null);
                                                setCommentImage(null);
                                            }}
                                            style={{
                                                marginRight: 10,
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
                                                marginRight: '12px',
                                            }}
                                            variant="contained"
                                            onClick={() => setOpenDelete(true)}
                                        >
                                            Delete
                                        </Button>
                                        {!loading && (
                                            <Button
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
