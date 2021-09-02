import { useMutation } from '@apollo/client';
import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
} from '@material-ui/core';
import {
  BookmarkBorderRounded,
  FileCopyOutlined,
  FlagOutlined,
  PersonAddDisabledOutlined,
} from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../../../components/Button';
import {
  MUTATION_CREATE_BOOKMARK,
  GET_BOOKMARKED_COMMENTS,
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
  const [
    createBookmark,
    {
      data: bookmarkData,
      //  loading,
      //   error
    },
  ] = useMutation(MUTATION_CREATE_BOOKMARK);
  const state = useSelector(st => st);
  const user = state.auth.user;

  useEffect(() => {
    if (bookmarkData?.bookmarks?.create == true) {
      console.log(bookmarkData?.bookmarks?.create);
    }
  }, [bookmarkData]);

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
    handleCommentOptionClose();
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
    >
      <List
        style={{ padding: 0, paddingBottom: 0 }}
        component={Card}
        variant='outlined'
      >
        <ListItem button divider onClick={handleCreateBookmark}>
          <ListItemIcon>
            <BookmarkBorderRounded />
          </ListItemIcon>
          <ListItemText
            primary='Save this comment'
            secondary='Add this to your bookmarks'
          />
        </ListItem>
        <ListItem button divider onClick={handleReportComment}>
          <ListItemIcon>
            <FlagOutlined />
          </ListItemIcon>
          <ListItemText
            primary='Report this comment'
            secondary='Im concerned about this comment'
          />
        </ListItem>
        {user?._id === comment?.author?._id && (
          <ListItem button divider onClick={handleEditComment}>
            <ListItemIcon>
              <FileCopyOutlined />
            </ListItemIcon>
            <ListItemText primary='Edit this comment' />
          </ListItem>
        )}
        {user?._id !== comment?.author?._id && (
          <ListItem button divider>
            <ListItemIcon>
              <PersonAddDisabledOutlined />
            </ListItemIcon>
            <ListItemText primary={`Unfollow @${comment?.author?._id}`} />
          </ListItem>
        )}
        <Divider />
        <div className='m-2'>
          <Button fullWidth textCase>
            Support by tipping
          </Button>
        </div>
      </List>
    </Popover>
  );
}
