import { useMutation } from '@apollo/client';
import {
    BookmarkBorderRounded,
    EditOutlined,
    FlagOutlined,
    PersonAddDisabledOutlined,
    PersonAddOutlined,
} from '@mui/icons-material';
import {
    Card,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Popover,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
//import { Button } from '../../../../../components/Button';
import {
    GET_BOOKMARKED_COMMENTS,
    MUTATION_CREATE_BOOKMARK,
    MUTATION_FOLLOW_USER,
    MUTATION_UNFOLLOW_USER,
    QUERY_FETCH_PROFILE,
} from '../../../utilities/queries';

export default function CommentOptionsPopover({
    comment,
    commentOptionId,
    setFlaggedResource,
    setCommentToEdit,
    setUpdateCommentOpen,
    setOpenFlag,
    commentOptionAnchorEl,
    isCommentOptionOpen,
    handleCommentOptionClose,
}) {
    const [createBookmark] = useMutation(MUTATION_CREATE_BOOKMARK);
    const [unFollowUser] = useMutation(MUTATION_UNFOLLOW_USER);
    const [followUser] = useMutation(MUTATION_FOLLOW_USER);
    const state = useSelector((st) => st);
    const user = state.auth.user;

    const handleFollowUser = (user_id) => {
        followUser({
            variables: {
                data: {
                    user_id: user_id,
                },
            },
            context: { clientName: 'users' },
            refetchQueries: [
                {
                    query: QUERY_FETCH_PROFILE,
                    context: { clientName: 'users' },
                },
            ],
        });
        toast.success(`You followed @${user_id}`, {
            position: 'bottom-left',
            autoClose: 2000,
        });
        handleCommentOptionClose();
    };
    const handleUnFollowUser = (user_id) => {
        unFollowUser({
            variables: {
                data: {
                    user_id: user_id,
                },
            },
            context: { clientName: 'users' },
            refetchQueries: [
                {
                    query: QUERY_FETCH_PROFILE,
                    context: { clientName: 'users' },
                },
            ],
        });
        toast.success(`You unfollowed @${user_id}`, {
            position: 'bottom-left',
            autoClose: 2000,
        });
        handleCommentOptionClose();
    };

    const handleCreateBookmark = () => {
        createBookmark({
            variables: {
                data: {
                    _id: comment?._id,
                    type: 'comment',
                },
            },
            refetchQueries: [
                {
                    query: GET_BOOKMARKED_COMMENTS,
                    variables: {
                        data: {
                            sortAscending: false,
                        },
                    },
                },
            ],
        });
        toast.success('Added to saved items', {
            position: 'bottom-left',
            autoClose: 3000,
        });

        handleCommentOptionClose();
    };

    const getFollowStatus = (author) => {
        let followStatus;
        user.following?.forEach((item) => {
            if (item?.userId?._id === author?._id) {
                followStatus = true;
            }
        });
        return followStatus;
    };

    const handleReportComment = () => {
        setOpenFlag(true);
        handleCommentOptionClose();
        const resource = Object.assign({ resourceType: 'comment' }, comment);
        setFlaggedResource(resource);
    };

    const handleEditComment = () => {
        setCommentToEdit(comment);
        setUpdateCommentOpen(true);
        handleCommentOptionClose();
    };

    return (
        <Popover
            anchorEl={commentOptionAnchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={commentOptionId}
            keepMounted
            open={isCommentOptionOpen}
            onClose={handleCommentOptionClose}
            style={{ marginLeft: 16, width: '100%' }}
            disableScrollLock
        >
            <List
                style={{ padding: 0, paddingBottom: 0 }}
                component={Card}
                variant="outlined"
            >
                <ListItem button divider onClick={handleCreateBookmark}>
                    <ListItemIcon>
                        <BookmarkBorderRounded />
                    </ListItemIcon>
                    <ListItemText
                        primary="Save this comment"
                        secondary="Add this to your saved items"
                    />
                </ListItem>
                <ListItem button divider onClick={handleReportComment}>
                    <ListItemIcon>
                        <FlagOutlined />
                    </ListItemIcon>
                    <ListItemText
                        primary="Report this comment"
                        secondary="Im concerned about this comment"
                    />
                </ListItem>
                {user?._id === comment?.author?._id && (
                    <ListItem button divider onClick={handleEditComment}>
                        <ListItemIcon>
                            <EditOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Edit this comment" />
                    </ListItem>
                )}

                {getFollowStatus(comment?.author) &&
                    user?._id !== comment?.author?._id && (
                        <ListItem
                            button
                            divider
                            onClick={() =>
                                handleUnFollowUser(comment?.author?._id)
                            }
                        >
                            <ListItemIcon>
                                <PersonAddDisabledOutlined />
                            </ListItemIcon>
                            <ListItemText
                                primary={`Unfollow @${comment?.author?._id}`}
                            />
                        </ListItem>
                    )}
                {!getFollowStatus(comment?.author) &&
                    user?._id !== comment?.author?._id && (
                        <ListItem
                            button
                            divider
                            onClick={() =>
                                handleFollowUser(comment?.author?._id)
                            }
                        >
                            <ListItemIcon>
                                <PersonAddOutlined />
                            </ListItemIcon>
                            <ListItemText
                                primary={`Follow @${comment?.author?._id}`}
                            />
                        </ListItem>
                    )}
                <Divider />
                {/* <div className="m-2">
                    <Button fullWidth textCase disabled>
                        Support by tipping
                    </Button>
                </div> */}
            </List>
        </Popover>
    );
}
