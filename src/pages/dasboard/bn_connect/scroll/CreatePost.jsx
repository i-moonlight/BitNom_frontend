//TODO: Upload video
import { useMutation } from '@apollo/client';
import {
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Typography,
  //useTheme,
} from '@material-ui/core';
import {
  ChevronRight,
  CloseRounded,
  ImageRounded,
  Public,
  VideocamRounded,
} from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../../components/Button';
import TextField from '../../../../components/TextField';
import { createPostIcons } from '../../../../store/local/dummy';
import { getUserInitials } from '../../../../utilities/Helpers';
import { generateRandomColor, getFeed } from '../../utilities/functions';
import {
  MUTATION_CREATE_POST,
  QUERY_LOAD_SCROLLS,
} from '../../utilities/queries';
import ScrollPreview from './ScrollPreview';

export default function CreatePost({
  open,
  setOpen,
  openImage,
  imageDisabled,
  setOpenImage,
  setImageDisabled,
  openVideo,
  profileData,
  videoDisabled,
  setOpenVideo,
  setVideoDisabled,
  sharedPost,
  setSharedPost,
}) {
  const [createPostErr, setCreatePostErr] = useState(null);

  const [scroll_text, setScrollText] = useState('');
  const [scroll_images, setScrollImages] = useState([]);
  const [scroll_video, setScrollVideo] = useState(null);
  //const theme = useTheme();
  const state = useSelector((st) => st);
  const user = state.auth.user;
  const [
    createPost,
    {
      loading,
      data,
      //  error
    },
  ] = useMutation(MUTATION_CREATE_POST);

  const userInitials = getUserInitials(user?.displayName);

  const onCreatePost = async (ICreatePost) => {
    await createPost({
      variables: {
        data: ICreatePost,
      },
      refetchQueries: [
        {
          query: QUERY_LOAD_SCROLLS,
          variables: { data: { ids: getFeed(profileData), limit: 220 } },
        },
        {
          query: QUERY_LOAD_SCROLLS,
          variables: { data: { author: user?._id, limit: 220 } },
        },
      ],
    });
    setScrollText('');
    setScrollImages([]);
    setScrollVideo(null);
    setSharedPost(null);
    setCreatePostErr(false);
    setImageDisabled(false);
    setVideoDisabled(false);
    setOpenImage(false);
    setOpenVideo(false);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (scroll_text.trim() == '') return setCreatePostErr(true);
    const sharedResource = sharedPost
      ? { _id: sharedPost?._id, type: 'post' }
      : null;
    const flag = sharedPost ? sharedPost?.is_flag : null;
    onCreatePost({
      content: scroll_text,
      images: scroll_images,
      video: scroll_video,
      shared_resource: sharedResource,
      is_flag: flag,
    });
    setOpen(false);
  };

  return (
    <Modal
      data={data}
      style={{
        outline: 'none',

        '&:focus-visible': {
          outline: 'none',
        },
      }}
      className='center-horizontal center-vertical w-100'
      open={open}
    >
      <Grid container>
        <Grid item lg={3} md={2} sm={1} xs={1}></Grid>
        <Grid item lg={6} md={8} sm={10} xs={10}>
          <Card>
            <div className='space-between mx-3 my-2 center-horizontal'>
              <Typography variant='body2'></Typography>
              <Typography variant='body1'>Create Post</Typography>
              <IconButton size='small' className='m-1 p-1'>
                <CloseRounded
                  onClick={() => {
                    setOpen(!open);
                    setOpenImage(false);
                    setOpenVideo(false);
                    setScrollImages([]);
                    setScrollVideo(null);
                    setCreatePostErr(false);
                    setSharedPost(null);
                    setImageDisabled(false);
                    setVideoDisabled(false);
                  }}
                />
              </IconButton>
            </div>

            <Divider />
            <CardContent style={{ maxHeight: '500px', overflowY: 'auto' }}>
              <ListItem className='p-0'>
                <ListItemAvatar>
                  <Avatar
                    style={{
                      backgroundColor: generateRandomColor(),
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
                      variant='text'
                      style={{
                        //backgroundColor: theme.palette.background.default,
                        padding: '0px 10px',
                      }}
                      startIcon={<Public />}
                      endIcon={
                        <ChevronRight
                          style={{
                            transform: 'rotateZ(90deg)',
                          }}
                        />
                      }
                    >
                      Public
                    </Button>
                  }
                />
              </ListItem>
              <TextField
                fullWidth
                multiline
                variant='standard'
                error={createPostErr && true}
                errorText={createPostErr && 'The post content cannot be empty'}
                rows={5}
                id='content-field'
                placeholder="What's happening"
                onChange={(e) =>
                  setScrollText(
                    scroll_text?.length >= 250
                      ? e.target.value.substring(0, e.target.value.length - 1)
                      : e.target.value.substring(0, 250)
                  )
                }
                value={scroll_text}
              />
              <Card
                style={{ display: openImage || openVideo ? 'block' : 'none' }}
              >
                <DropzoneArea
                  clearOnUnmount
                  onChange={(files) => {
                    openImage
                      ? setScrollImages(files)
                      : setScrollVideo(files[0]);
                  }}
                  dropzoneText={
                    openImage
                      ? 'Drag n drop images here or click'
                      : 'Drag n drop a video here or click'
                  }
                  acceptedFiles={openImage ? ['image/*'] : ['video/*']}
                  maxFileSize={5000000}
                  filesLimit={openImage ? 4 : 1}
                  showAlerts={['error']}
                  showPreviews={false}
                  showPreviewsInDropzone
                  previewGridProps={{
                    container: { spacing: 1, direction: 'row' },
                  }}
                />
              </Card>
              {sharedPost && <ScrollPreview scroll={sharedPost} />}
              {/* <Divider /> */}
              <div className='space-between mt-1'>
                <div className='center-horizontal'>
                  <IconButton
                    size='small'
                    className='m-1 p-1'
                    onClick={() => {
                      setOpenImage(true);
                      setVideoDisabled(true);
                    }}
                    disabled={imageDisabled}
                    style={{
                      marginRight: 10,
                    }}
                  >
                    <ImageRounded />
                  </IconButton>
                  <IconButton
                    size='small'
                    className='m-1 p-1'
                    onClick={() => {
                      setOpenVideo(true);
                      setImageDisabled(true);
                    }}
                    disabled={videoDisabled}
                    style={{
                      marginRight: 10,
                    }}
                  >
                    <VideocamRounded />
                  </IconButton>
                  {createPostIcons.map(({ Icon }) => {
                    return (
                      <IconButton
                        size='small'
                        className='m-1 p-1'
                        key={`${Math.random() * 1000}`}
                        style={{
                          marginRight: 10,
                        }}
                      >
                        <Icon />
                      </IconButton>
                    );
                  })}
                </div>
                {!loading && <Button onClick={handleCreatePost}>Post</Button>}
                {loading && (
                  <Button size='small' style={{ margin: '0' }}>
                    <CircularProgress size={24} thickness={4} />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Modal>
  );
}
