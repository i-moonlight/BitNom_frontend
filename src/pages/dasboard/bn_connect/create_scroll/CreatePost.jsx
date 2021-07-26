import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  CircularProgress,
  Typography,
  useTheme,
  Icon,
  IconButton,
} from '@material-ui/core';
import {
  ChevronRight,
  CloseRounded,
  ImageRounded,
  VideocamRounded,
  Person,
  Public,
} from '@material-ui/icons';
import { DropzoneDialog } from 'material-ui-dropzone';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import {
  MUTATION_CREATE_POST,
  QUERY_LOAD_SCROLLS,
} from '../../utilities/queries';
import Button from '../../../../components/Button';
import TextField from '../../../../components/TextField';
import { createPostIcons } from '../../../../store/local/dummy';

export default function CreatePost({ open, setOpen }) {
  const [active, setActive] = useState(4);
  const [createPostErr, setCreatePostErr] = useState(null);
  const [openImage, setOpenImage] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [scroll_text, setScrollText] = useState('');
  const [scroll_images, setScrollImages] = useState([]);
  const [scroll_video, setScrollVideo] = useState();
  const theme = useTheme();
  const state = useSelector(state => state);
  const user = state.auth.user;
  const [createPost, { loading, data, error }] =
    useMutation(MUTATION_CREATE_POST);
  const onCreatePost = ICreatePost => {
    createPost({
      variables: {
        data: ICreatePost,
      },
      refetchQueries: [{ query: QUERY_LOAD_SCROLLS }],
    });
    setScrollText('');
    setScrollImages([]);
    setScrollVideo(undefined);
    setCreatePostErr(false);
  };

  useEffect(() => {
    if (data?.Posts?.create) {
      console.log(data);
      setOpen(false);
    }
  }, [data]);

  const handleCreatePost = e => {
    e.preventDefault();
    if (scroll_text.trim() == '') return setCreatePostErr(true);

    onCreatePost({
      content: scroll_text,
      images: scroll_images,
      video: scroll_video,
    });
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
              <Typography></Typography>
              <Typography variant='h6'>Create Post</Typography>
              <IconButton size='small'>
                <CloseRounded onClick={() => setOpen(!open)} />
              </IconButton>
            </div>

            <Divider />
            <CardContent>
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
                error={createPostErr && true}
                errorText={createPostErr && 'The post content cannot be empty'}
                rows={5}
                rowsMax={10}
                id='content-field'
                placeholder="What's happening"
                onChange={e =>
                  setScrollText(
                    scroll_text?.length >= 250
                      ? e.target.value.substring(0, e.target.value.length - 1)
                      : e.target.value
                  )
                }
                value={scroll_text}
              />
              {/* <Button
                onClick={() => {
                  setScrollText(scroll_text?.length ? scroll_text + ' #' : '#');
                  document.getElementById('content-field').focus();
                }}
                variant='text'
                style={{ textTransform: 'none' }}
                color='primary'
              >
                <Typography>Add Hashtags</Typography>
              </Button> */}
              {/* <Divider /> */}
              <div className='space-between mt-1'>
                <div className='center-horizontal'>
                  <IconButton
                    onClick={() => {
                      setOpenImage(true);
                    }}
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
                    }}
                    size='small'
                    style={{
                      marginRight: 10,
                    }}
                  >
                    <VideocamRounded />
                  </IconButton>

                  <DropzoneDialog
                    acceptedFiles={['image/*']}
                    cancelButtonText={'cancel'}
                    submitButtonText={'submit'}
                    maxFileSize={5000000}
                    open={openImage}
                    filesLimit='4'
                    onClose={() => setOpenImage(false)}
                    onSave={files => {
                      setScrollImages(files);
                      setOpenImage(false);
                    }}
                    showPreviews={true}
                  />
                  <DropzoneDialog
                    acceptedFiles={['video/*']}
                    cancelButtonText={'cancel'}
                    submitButtonText={'submit'}
                    maxFileSize={5000000}
                    open={openVideo}
                    filesLimit='1'
                    onClose={() => setOpenVideo(false)}
                    onSave={files => {
                      setScrollVideo(files[0]);
                      setOpenVideo(false);
                    }}
                    showPreviews={true}
                  />

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
