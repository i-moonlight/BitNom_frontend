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
  const [scroll_text, setScrollText] = useState('');
  const [scroll_images, setScrollImages] = useState([]);
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
  };

  useEffect(() => {
    if (data?.Posts?.create) {
      setOpen(false);
      setScrollText('');
    }
  }, [data]);

  const handleCreatePost = e => {
    e.preventDefault();
    onCreatePost({ content: scroll_text, images: scroll_images });
  };
  const handleFilesChange = e => {
    if (!e.target.files.length) return;
    const images = [];
    for (const file of e.target.files) {
      images.push(file);
    }
    setScrollImages(images.slice(0, 4));
    console.log(scroll_images);
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
                  <input
                    type='file'
                    id='fileUpload'
                    onChange={handleFilesChange}
                    multiple
                    style={{
                      display: 'none',
                      // opacity: 0,
                      position: 'absolute',
                      // zIndex: 2,
                    }}
                  />
                  <label
                    style={{
                      marginRight: 10,
                    }}
                    htmlFor='fileUpload'
                  >
                    <IconButton size='small'>
                      <ImageRounded />
                    </IconButton>
                  </label>
                  <label
                    style={{
                      marginRight: 10,
                    }}
                    htmlFor='fileUpload'
                  >
                    <IconButton size='small'>
                      <VideocamRounded />
                    </IconButton>
                  </label>

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
