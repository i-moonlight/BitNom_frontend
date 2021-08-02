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
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';
import { MUTATION_CREATE_BOOKMARK } from '../utilities/queries';

export default function ScrollOptionsPopover({
  scroll,
  setFlaggedResource,
  setOpenFlag,
  scrollOptionId,
  scrollOptionAnchorEl,
  isScrollOptionOpen,
  handleScrollOptionClose,
}) {
  const [
    createBookmark,
    {
      data,
      //  loading,
      //   error
    },
  ] = useMutation(MUTATION_CREATE_BOOKMARK);
  const state = useSelector((state) => state);
  const user = state.auth.user;
  console.log(data);

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
  const handleReportScroll = () => {
    setOpenFlag(true);
    handleScrollOptionClose();
    const resource = Object.assign({ resourceType: 'post' }, scroll);
    setFlaggedResource(resource);
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
        <ListItem button divider onClick={handleReportScroll}>
          <ListItemIcon>
            <FlagOutlined />
          </ListItemIcon>
          <ListItemText
            primary='Report this scroll'
            secondary='Im concerned about this scroll'
          />
        </ListItem>
        {user?._id === scroll?.author?._id && (
          <ListItem button divider>
            <ListItemIcon>
              <FileCopyOutlined />
            </ListItemIcon>
            <ListItemText primary='Edit this scroll' />
          </ListItem>
        )}
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
