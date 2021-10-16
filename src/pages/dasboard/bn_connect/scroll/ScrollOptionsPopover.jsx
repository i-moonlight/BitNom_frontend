import { useMutation } from '@apollo/client';
import {
    BookmarkBorderRounded,
    FileCopyOutlined,
    FlagOutlined,
    PersonAddDisabledOutlined,
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
import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../../../components/Button';
import {
    GET_BOOKMARKED_SCROLLS,
    MUTATION_CREATE_BOOKMARK,
    MUTATION_UNFOLLOW_USER,
    QUERY_FETCH_PROFILE,
} from '../../utilities/queries';

export default function ScrollOptionsPopover({
    scroll,
    setFlaggedResource,
    setOpenFlag,
    setUpdateOpen,
    setPostToEdit,
    scrollOptionId,
    scrollOptionAnchorEl,
    isScrollOptionOpen,
    handleScrollOptionClose,
}) {
    const [createBookmark] = useMutation(MUTATION_CREATE_BOOKMARK);
    const [unFollowUser] = useMutation(MUTATION_UNFOLLOW_USER);
    const state = useSelector((st) => st);
    const user = state.auth.user;

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
    };

    const handleCreateBookmark = () => {
        createBookmark({
            variables: {
                data: {
                    _id: scroll?._id,
                    type: 'post',
                },
            },
            refetchQueries: [
                {
                    query: GET_BOOKMARKED_SCROLLS,
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
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        handleScrollOptionClose();
    };
    const handleReportScroll = () => {
        setOpenFlag(true);
        handleScrollOptionClose();
        const resource = Object.assign({ resourceType: 'post' }, scroll);
        setFlaggedResource(resource);
    };
    const handleEditScroll = () => {
        setPostToEdit(scroll);
        setUpdateOpen(true);
        handleScrollOptionClose();
    };

    return (
        <Popover
            anchorEl={scrollOptionAnchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={scrollOptionId}
            keepMounted
            open={isScrollOptionOpen}
            onClose={handleScrollOptionClose}
            style={{ marginLeft: 16, width: '100%' }}
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
                        primary="Save this post"
                        secondary="Add this to your bookmarks"
                    />
                </ListItem>
                <ListItem button divider onClick={handleReportScroll}>
                    <ListItemIcon>
                        <FlagOutlined />
                    </ListItemIcon>
                    <ListItemText
                        primary="Report this post"
                        secondary="Im concerned about this post"
                    />
                </ListItem>
                {user?._id === scroll?.author?._id && (
                    <ListItem button divider onClick={handleEditScroll}>
                        <ListItemIcon>
                            <FileCopyOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Edit this post" />
                    </ListItem>
                )}
                {user?._id !== scroll?.author?._id && (
                    <ListItem
                        button
                        divider
                        onClick={() => handleUnFollowUser(scroll?.author?._id)}
                    >
                        <ListItemIcon>
                            <PersonAddDisabledOutlined />
                        </ListItemIcon>
                        <ListItemText
                            primary={`Unfollow @${scroll?.author?._id}`}
                        />
                    </ListItem>
                )}
                <Divider />
                <div className="m-2">
                    <Button fullWidth textCase>
                        Support by tipping
                    </Button>
                </div>
            </List>
        </Popover>
    );
}
