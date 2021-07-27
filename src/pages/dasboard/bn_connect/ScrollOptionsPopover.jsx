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
import { useMutation } from '@apollo/client';
import React from 'react';
import {
  MUTATION_CREATE_BOOKMARK,
  MUTATION_CREATE_FLAG,
} from '../utilities/queries';
import Button from '../../../components/Button';

export default function ScrollOptionsPopover({
  scroll,
  scrollOptionId,
  scrollOptionAnchorEl,
  isScrollOptionOpen,
  handleScrollOptionClose,
}) {
  const [createBookmark, { loading, data, error }] = useMutation(
    MUTATION_CREATE_BOOKMARK
  );

  const [
    createFlag,
    { loading: flagLoading, data: flagData, error: flagError },
  ] = useMutation(MUTATION_CREATE_FLAG);

  const handleCreateBookmark = () => {
    createBookmark({
      variables: {
        data: {
          _id: scroll?._id,
          type: 'post',
        },
      },
    });
  };

  const handleCreateFlag = () => {
    createFlag({
      variables: {
        data: {
          _id: scroll?._id,
          type: 'post',
        },
      },
    });
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
        variant='outlined'
      >
        <ListItem button divider onClick={handleCreateBookmark}>
          <ListItemIcon>
            <BookmarkBorderRounded />
          </ListItemIcon>
          <ListItemText
            primary='Save this scroll'
            secondary='Add this to your bookmarks'
          />
        </ListItem>
        <ListItem button divider onClick={handleCreateFlag}>
          <ListItemIcon>
            <FlagOutlined />
          </ListItemIcon>
          <ListItemText
            primary='Report this scroll'
            secondary='Im concerned about this scroll'
          />
        </ListItem>
        <ListItem button divider>
          <ListItemIcon>
            <FileCopyOutlined />
          </ListItemIcon>
          <ListItemText primary='Copy this scroll' />
        </ListItem>
        <ListItem button divider>
          <ListItemIcon>
            <PersonAddDisabledOutlined />
          </ListItemIcon>
          <ListItemText primary={`Unfollow @${scroll?.author?._id}`} />
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
