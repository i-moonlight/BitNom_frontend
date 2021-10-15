import { useMutation } from '@apollo/client';
import {
    Card,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Popover,
} from '@mui/material';
import {
    BookmarkBorderRounded,
    PersonAddDisabledOutlined,
} from '@mui/icons-material';
import React from 'react';
import { useSelector } from 'react-redux';

import {
    MUTATION_REMOVE_BOOKMARK,
    GET_BOOKMARKED_COMMENTS,
    GET_BOOKMARKED_SCROLLS,
    GET_BOOKMARKED_EVENTS,
} from '../utilities/queries';

export default function SavedItemsOptionPopover({
    savedItem,
    itemType,
    savedItemOptionId,
    savedItemOptionAnchorEl,
    isSavedItemOptionOpen,
    handleSavedItemOptionClose,
}) {
    const [removeBookmark] = useMutation(MUTATION_REMOVE_BOOKMARK);
    const state = useSelector((st) => st);
    const user = state.auth.user;

    const handleRemoveBookmark = () => {
        removeBookmark({
            variables: {
                data: {
                    _id: savedItem?._id,
                    type: itemType,
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
                {
                    query: GET_BOOKMARKED_SCROLLS,
                    variables: {
                        data: {
                            sortAscending: false,
                        },
                    },
                },
                {
                    query: GET_BOOKMARKED_EVENTS,
                    variables: {
                        data: {
                            sortAscending: true,
                        },
                    },
                },
            ],
        });
        handleSavedItemOptionClose();
    };

    return (
        <Popover
            //removeBookmarkData={removeBookmarkData}
            anchorEl={savedItemOptionAnchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={savedItemOptionId}
            keepMounted
            open={isSavedItemOptionOpen}
            onClose={handleSavedItemOptionClose}
            style={{ marginLeft: 16, width: '100%' }}
        >
            <List
                style={{ padding: 0, paddingBottom: 0 }}
                component={Card}
                variant="outlined"
            >
                <ListItem button divider onClick={handleRemoveBookmark}>
                    <ListItemIcon>
                        <BookmarkBorderRounded />
                    </ListItemIcon>
                    <ListItemText primary="Remove this bookmark" />
                </ListItem>
                {user?._id !== savedItem?.author?._id && (
                    <ListItem button divider>
                        <ListItemIcon>
                            <PersonAddDisabledOutlined />
                        </ListItemIcon>
                        <ListItemText
                            primary={`Unfollow @${
                                savedItem?.author?._id || savedItem?.host?._id
                            }`}
                        />
                    </ListItem>
                )}
            </List>
        </Popover>
    );
}
