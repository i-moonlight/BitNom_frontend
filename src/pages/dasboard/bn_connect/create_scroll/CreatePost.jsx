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
  useTheme,
} from '@material-ui/core';
import {
  ChevronRight,
  CloseRounded,
  ImageRounded,
  Person,
  Public,
  VideocamRounded,
} from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../../components/Button';
import TextField from '../../../../components/TextField';
import { createPostIcons } from '../../../../store/local/dummy';
import {
  MUTATION_CREATE_POST,
  QUERY_LOAD_SCROLLS,
} from '../../utilities/queries';
import ScrollPreview from '../ScrollPreview';

export default function CreatePost({
  open,
  setOpen,
  openImage,
  imageDisabled,
  setOpenImage,
  setImageDisabled,
  openVideo,
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
  const theme = useTheme();
  const state = useSelector((state) => state);
  const user = state.auth.user;
  const [
    createPost,
    {
      loading,
      data,
      //  error
    },
  ] = useMutation(MUTATION_CREATE_POST);

  const onCreatePost = async (ICreatePost) => {
    await createPost({
      variables: {
        data: ICreatePost,
      },
      refetchQueries: [{ query: QUERY_LOAD_SCROLLS }],
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

  useEffect(() => {
    if (data?.Posts?.create) {
      //console.log(data);
    }
  }, [data]);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (scroll_text.trim() == '') return setCreatePostErr(true);
    let sharedResource = sharedPost
      ? { _id: sharedPost?._id, type: 'post' }
      : null;
    let flag = sharedPost ? sharedPost?.is_flag : null;
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
            <div className='space-between mx-3 my-2'>
              <Typography variant='body2'></Typography>
              <Typography variant='body1'>Create Post</Typography>
              <IconButton size='small'>
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
                  <Avatar src={user?.photo}>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user?.displayName}
                  secondary={
                    <Button
                      textCase
                      style={{
                        backgroundColor: theme.palette.background.default,
                        padding: '0px 10px',
                        textTransform: 'none',
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
                      : e.target.value
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
                    openImage ? setScrollImages(files) : setScrollVideo(null);
                  }}
                  dropzoneText={
                    openImage
                      ? 'Drag n drop images here or click'
                      : 'Drag n drop a video here or click'
                  }
                  acceptedFiles={openImage ? ['image/*'] : ['video/*']}
                  maxFileSize={5000000}
                  filesLimit={openImage ? '4' : '1'}
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
                    onClick={() => {
                      setOpenImage(true);
                      setVideoDisabled(true);
                    }}
                    disabled={imageDisabled}
                    size='small'
                    style={{
                      marginRight: 10,
                    }}
                  >
                    <ImageRounded />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setOpenVideo(true);
                      setImageDisabled(true);
                    }}
                    disabled={videoDisabled}
                    size='small'
                    style={{
                      marginRight: 10,
                    }}
                  >
                    <VideocamRounded />
                  </IconButton>
                  {createPostIcons.map(({ Icon }) => {
                    return (
                      <IconButton
                        key={`${Math.random() * 1000}`}
                        size='small'
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
