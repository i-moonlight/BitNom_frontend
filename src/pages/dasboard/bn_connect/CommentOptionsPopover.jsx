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
import React from 'react';
import Button from '../../../components/Button';
import {
  MUTATION_CREATE_BOOKMARK,
  MUTATION_CREATE_FLAG,
} from '../utilities/queries';

export default function CommentOptionsPopover({
  comment,
  commentOptionId,
  setFlaggedResource,
  setOpenFlag,
  commentOptionAnchorEl,
  isCommentOptionOpen,
  handleCommentOptionClose,
}) {
  const [
    createBookmark,
    {
      data,
      //  loading,
      //   error
    },
  ] = useMutation(MUTATION_CREATE_BOOKMARK);

  console.log(data);

  const [
    createFlag,
    {
      // loading: flagLoading,
      // data: flagData,
      error: flagError,
    },
  ] = useMutation(MUTATION_CREATE_FLAG);

  flagError && console.log(flagError);

  const handleCreateBookmark = () => {
    createBookmark({
      variables: {
        data: {
          _id: comment?._id,
          type: 'comment',
        },
      },
    });
  };

  const handleReportComment = () => {
    setOpenFlag(true);
    handleCommentOptionClose();
    const resource = Object.assign({ resourceType: 'comment' }, comment);
    setFlaggedResource(resource);
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
        <ListItem button divider>
          <ListItemIcon>
            <FileCopyOutlined />
          </ListItemIcon>
          <ListItemText primary='Copy this comment' />
        </ListItem>
        <ListItem button divider>
          <ListItemIcon>
            <PersonAddDisabledOutlined />
          </ListItemIcon>
          <ListItemText primary={`Unfollow @${comment?.author?._id}`} />
        </ListItem>
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
