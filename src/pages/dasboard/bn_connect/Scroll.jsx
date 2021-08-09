import { useMutation, useQuery } from '@apollo/client';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  CommentRounded,
  ImageRounded,
  MoreVert,
  PersonRounded,
  Send,
  ShareRounded,
  ThumbUpRounded,
} from '@material-ui/icons';
import { DropzoneDialog } from 'material-ui-dropzone';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button';
//import ImagePreview from '../../../components/ImagePreview';
import TextField from '../../../components/TextField';
import {
  MUTATION_CREATE_COMMENT,
  MUTATION_CREATE_REACTION,
  QUERY_GET_COMMENTS,
  QUERY_LOAD_SCROLLS,
} from '../utilities/queries';
import { contentBodyFactory } from '../utilities/functions';
import Comment from './Comment';
// import LinkCard from './LinkCard';
import ScrollOptionsPopover from './ScrollOptionsPopover';
import ScrollPreview from './ScrollPreview';

const scrollOptionId = 'menu-scroll-option';

export default function Scroll({
  scroll,
  setSharedPost,
  setPostToEdit,
  setCommentToEdit,
  setUpdateOpen,
  setUpdateCommentOpen,
  setFlaggedResource,
  setOpenFlag,
  setOpen,
  setImagePreviewOpen,
  setImagePreviewURL,
}) {
  const [scrollOptionAnchorEl, setScrollOptionAnchorEl] = useState(null);
  const [openComments, setOpenComments] = useState(false);
  const [comment_text, setCommentText] = useState('');
  const [comment_image, setCommentImage] = useState(null);
  const [openImage, setOpenImage] = useState(false);
  const [createCommentErr, setCreateCommentErr] = useState(false);
  const isScrollOptionOpen = Boolean(scrollOptionAnchorEl);
  const [createReaction] = useMutation(MUTATION_CREATE_REACTION);

  const [
    createComment,
    {
      data: createCommentData,
      // loading: createCommentLoading,
      // error: createCommentError,
    },
  ] = useMutation(MUTATION_CREATE_COMMENT);

  const {
    data: commentsData,
    // loading: commentsLoading,
    // error: commentsError,
  } = useQuery(QUERY_GET_COMMENTS, {
    variables: { data: { scroll_id: scroll?._id } },
  });

  const onCreateComment = (ICreateComment) => {
    createComment({
      variables: {
        data: ICreateComment,
      },
      refetchQueries: [
        {
          query: QUERY_LOAD_SCROLLS,
        },
        {
          query: QUERY_GET_COMMENTS,
          variables: { data: { scroll_id: scroll?._id } },
        },
      ],
    });
    setCommentText('');
    setCommentImage(null);
    setCreateCommentErr(false);
  };

  const handleCreateComment = (e) => {
    e.preventDefault();
    if (comment_text.trim() == '' && !comment_image)
      return setCreateCommentErr(true);
    onCreateComment({
      content: comment_text,
      scroll: scroll?._id,
      image: comment_image,
    });
  };

  const handleScrollOptionOpen = (event) => {
    setScrollOptionAnchorEl(event.currentTarget);
  };

  const handleScrollOptionClose = () => {
    setScrollOptionAnchorEl(null);
  };

  const handleCreateReaction = (reaction) => {
    createReaction({
      variables: {
        data: {
          _id: scroll?._id,
          type: 'post',
          reaction: reaction,
        },
      },
      refetchQueries: [{ query: QUERY_LOAD_SCROLLS }],
    });
  };
  console.log(scroll);
  useEffect(() => {
    if (createCommentData?.Comments?.create) {
      console.log('comment created');
    }
  }, [createCommentData]);
  console.log(scroll?.content);
  return (
    <>
      <Card style={{ marginBottom: 16 }}>
        <CardHeader
          avatar={
            <Avatar src={scroll?.author?.image} aria-label='recipe'>
              R
            </Avatar>
          }
          action={
            <IconButton
              aria-label='show more'
              aria-controls={scrollOptionId}
              aria-haspopup='true'
              onClick={handleScrollOptionOpen}
              color='inherit'
            >
              <MoreVert />
            </IconButton>
          }
          title={
            <div className='center-horizontal'>
              <Typography style={{ marginRight: 8 }}>
                {scroll?.author?.displayName}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                {`@${scroll?.author?._id}`}
              </Typography>
            </div>
          }
          subheader={moment(scroll?.createdAt).fromNow()}
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            <Typography
              dangerouslySetInnerHTML={{
                __html: contentBodyFactory(scroll),
              }}
            ></Typography>
            {/* <br />
            {scroll?.content_entities?.map((entity) => {
              let colortext = scroll?.content?.slice(
                entity?.offset,
                entity?.offset + entity?.length
              );

              return (
                <a
                  href={entity?.url}
                  className='mx-1 mt-1'
                  key={entity?.offset}
                >
                  {colortext}
                </a>
              );
            })} */}
          </Typography>
          <Grid container spacing={2} className='mb-2'>
            {scroll?.video && (
              <Grid item xs={12}>
                <CardMedia
                  component='video'
                  src={`${process.env.REACT_APP_BACKEND_URL}${scroll?.video}`}
                  controls
                />
              </Grid>
            )}
            {scroll?.images.length > 0 &&
              scroll?.images?.map((imageURL) => (
                <Grid
                  className='mt-3'
                  key={imageURL}
                  item
                  xs={scroll?.images.length > 1 ? 6 : 12}
                  onClick={() => {
                    setImagePreviewURL(
                      process.env.REACT_APP_BACKEND_URL + imageURL
                    );
                    setImagePreviewOpen(true);
                  }}
                >
                  <div
                    style={{
                      height: 200,
                      borderRadius: 8,
                      width: '100%',
                      backgroundImage:
                        'url(' +
                        process.env.REACT_APP_BACKEND_URL +
                        imageURL +
                        ')',
                      backgroundSize: 'cover',
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      backgroundBlendMode: 'soft-light',
                      cursor: 'pointer',
                    }}
                  />
                </Grid>
              ))}
          </Grid>
          {scroll?.shared_resource?._id && (
            <ScrollPreview scroll={scroll?.shared_resource?._id} />
          )}
          <br />
          {`${scroll?.reactions?.likes} ${
            scroll?.reactions?.likes === 1 ? 'Like' : 'Likes'
          } . ${scroll?.comments} ${
            scroll?.comments === 1 ? 'Comment' : 'Comments'
          }`}
        </CardContent>
        <Divider />
        <CardActions className='space-around'>
          <Button
            color='default'
            textCase
            onClick={() => handleCreateReaction('like')}
            variant='text'
            startIcon={<ThumbUpRounded />}
          >
            Like
          </Button>
          <Button
            color='default'
            textCase
            variant='text'
            onClick={() => setOpenComments(true)}
            startIcon={<CommentRounded />}
          >
            Comment
          </Button>
          {!scroll?.shared_resource?._id && (
            <Button
              color='default'
              textCase
              variant='text'
              onClick={() => {
                setOpen(scroll);
                setSharedPost(scroll);
              }}
              startIcon={<ShareRounded />}
            >
              Share
            </Button>
          )}
        </CardActions>
        <Divider />
        <CardContent>
          {!openComments && scroll?.comments < 1 && (
            <Typography color='textSecondary'>
              Be the first to comment
            </Typography>
          )}
          {openComments && (
            <div className='center-horizontal'>
              <Avatar src={scroll?.author?.image} className='mx-2'>
                <PersonRounded />
              </Avatar>
              <TextField
                error={createCommentErr && true}
                errorText={createCommentErr && 'The comment cannot be empty'}
                multiline
                rowsMax={10}
                id='comment-field'
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateComment(e);
                  }
                }}
                placeholder={
                  commentsData?.Comments?.get?.length > 0
                    ? ''
                    : 'Be the first to comment..'
                }
                onChange={(e) =>
                  setCommentText(
                    comment_text?.length >= 250
                      ? e.target.value.substring(0, e.target.value.length - 1)
                      : e.target.value
                  )
                }
                adornment={
                  <IconButton
                    onClick={() => {
                      setOpenImage(true);
                    }}
                    size='small'
                  >
                    <ImageRounded />
                  </IconButton>
                }
                adornmentType='end'
                value={comment_text}
              />
              <IconButton
                className='mx-3'
                onClick={handleCreateComment}
                // size='small'
              >
                <Send />
              </IconButton>
            </div>
          )}
          <DropzoneDialog
            previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
            showAlerts={['error']}
            // useChipsForPreview
            previewText=''
            acceptedFiles={['image/*']}
            cancelButtonText={'cancel'}
            submitButtonText={'submit'}
            maxFileSize={5000000}
            open={openImage}
            filesLimit='1'
            onClose={() => setOpenImage(false)}
            onSave={(files) => {
              setCommentImage(files[0]);
              setOpenImage(false);
            }}
            showPreviewsInDropzone
            showPreviews={false}
            showFileNames={false}
          />
          {commentsData &&
            commentsData?.Comments?.get
              .filter((comment) => !comment.response_to)
              .map((comment) => (
                <Comment
                  scroll={scroll}
                  key={comment._id}
                  setUpdateCommentOpen={setUpdateCommentOpen}
                  setCommentToEdit={setCommentToEdit}
                  comment={comment}
                  setFlaggedResource={setFlaggedResource}
                  setOpenFlag={setOpenFlag}
                  setOpenImage={setOpenImage}
                  onCreateComment={onCreateComment}
                  setImagePreviewURL={setImagePreviewURL}
                  setImagePreviewOpen={setImagePreviewOpen}
                  comment_image={comment_image}
                />
              ))}
        </CardContent>
      </Card>
      <ScrollOptionsPopover
        scroll={scroll}
        scrollOptionId={scrollOptionId}
        scrollOptionAnchorEl={scrollOptionAnchorEl}
        isScrollOptionOpen={isScrollOptionOpen}
        handleScrollOptionClose={handleScrollOptionClose}
        setFlaggedResource={setFlaggedResource}
        setPostToEdit={setPostToEdit}
        setOpenFlag={setOpenFlag}
        setUpdateOpen={setUpdateOpen}
      />
    </>
  );
}
