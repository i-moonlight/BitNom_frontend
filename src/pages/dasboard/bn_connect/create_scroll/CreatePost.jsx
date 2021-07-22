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
} from '@material-ui/core';
import {
  ChevronRight,
  CloseRounded,
  ImageRounded,
  VideocamRounded,
  Person,
  Public,
} from '@material-ui/icons';
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
  const [scroll_text, setScrollText] = useState('');
  const [scroll_images, setScrollImages] = useState([]);
  const [scroll_video, setScrollVideo] = useState();
  const theme = useTheme();
  const state = useSelector((state) => state);
  const user = state.auth.user;
  const [createPost, { loading, data, error }] =
    useMutation(MUTATION_CREATE_POST);
  const onCreatePost = (ICreatePost) => {
    createPost({
      variables: {
        data: ICreatePost,
      },
      refetchQueries: [{ query: QUERY_LOAD_SCROLLS }],
    });
  };

  useEffect(() => {
    if (data?.Posts?.create) {
      setScrollText('');
      setScrollImages([]);
      setScrollVideo(undefined);
      setOpen(false);
    }
  }, [data]);

  const handleCreatePost = (e) => {
    e.preventDefault();
    onCreatePost({
      content: scroll_text,
      images: scroll_images,
      video: scroll_video,
    });
  };
  const handleImagesUpload = (e) => {
    if (!e.target.files.length) return;
    const images = [];
    for (const file of e.target.files) {
      images.push(file);
    }
    setScrollImages(images.slice(0, 4));
    console.log(scroll_images);
  };
  const handleVideoUpload = (e) => {
    if (!e.target.files) return;
    setScrollVideo(e.target.files[0]);
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
              <CloseRounded onClick={() => setOpen(!open)} />
            </div>

            <Divider />
            <CardContent>
              <ListItem className='p-0'>
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user?.displayName}
                  secondary={
                    <Button
                      variant='text'
                      style={{
                        backgroundColor: theme.palette.background.default,
                        padding: '0px 5px',
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
                style={{ border: 'none' }}
                fullWidth
                multiline
                rows={5}
                rowsMax={10}
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
              <Button
                onClick={() => {
                  setScrollText(scroll_text?.length ? scroll_text + ' #' : '#');
                  document.getElementById('content-field').focus();
                }}
                variant='text'
                style={{ textTransform: 'none' }}
                color='primary'
              >
                <Typography>Add Hashtags</Typography>
              </Button>
              <Divider />
              <div className='space-between mt-3'>
                <div className='center-horizontal'>
                  <label htmlFor='imageUpload'>
                    <ImageRounded
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 10,
                      }}
                    />
                  </label>
                  <input
                    type='file'
                    id='imageUpload'
                    onChange={handleImagesUpload}
                    accept='.jpg,.png'
                    multiple
                    style={{ display: 'none' }}
                  />
                  <label htmlFor='videoUpload'>
                    <VideocamRounded
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 10,
                      }}
                    />
                  </label>
                  <input
                    type='file'
                    id='videoUpload'
                    accept='.mp4,.mkv'
                    onChange={handleVideoUpload}
                    style={{ display: 'none' }}
                  />
                  {createPostIcons.map(({ Icon }, i = 0) => {
                    return (
                      <Icon
                        key={`${Math.random() * 1000}`}
                        onClick={() => setActive(i)}
                        style={{
                          color: active === i && theme.palette.primary.main,
                          width: 30,
                          height: 30,
                          marginRight: 10,
                        }}
                      />
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
        <Grid item lg={3} md={2} sm={1} xs={1}></Grid>
      </Grid>
    </Modal>
  );
}
