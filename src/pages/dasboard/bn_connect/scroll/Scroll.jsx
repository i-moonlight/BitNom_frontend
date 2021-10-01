import { useMutation, useQuery } from "@apollo/client";
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
  useTheme,
  makeStyles,
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import {
  CommentRounded,
  FavoriteRounded,
  ImageRounded,
  MoreVert,
  PanToolRounded,
  Send,
  ShareRounded,
  ThumbDownRounded,
  ThumbUpRounded,
} from "@material-ui/icons";
import { DropzoneDialog } from "material-ui-dropzone";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import Button from "../../../../components/Button";
import ReactionButton from "../../../../components/ReactionButton";
//import ImagePreview from '../../../components/ImagePreview';
import TextField from "../../../../components/TextField";
import { useSelector } from "react-redux";
import { getUserInitials } from "../../../../utilities/Helpers";
import {
  contentBodyFactory,
  getReactionsSum,
  generateRandomColor,
} from "../../utilities/functions";
import {
  MUTATION_CREATE_COMMENT,
  MUTATION_CREATE_REACTION,
  MUTATION_REMOVE_REACTION,
  QUERY_GET_COMMENTS,
  QUERY_LOAD_SCROLLS,
} from "../../utilities/queries";
import Comment from "./comment/Comment";
// import LinkCard from './LinkCard';
import ScrollOptionsPopover from "./ScrollOptionsPopover";
import ScrollPreview from "./ScrollPreview";
import EventPreview from "../../events/EventPreview";

const useStyles = makeStyles((theme) => ({
  clickableTypography: {
    color: "inherit",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
    [theme.breakpoints.down("md")]: {
      textDecoration: "underline",
    },
  },
  replies: {
    color: "inherit",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  red: {
    color: red[500],
  },
  green: {
    color: green[500],
  },
  primary: {
    color: "#006097",
  },
}));

const scrollOptionId = "menu-scroll-option";

export default function Scroll({
  scroll,
  setSharedResource,
  setPostToEdit,
  setCommentToEdit,
  setUpdateOpen,
  setUpdateCommentOpen,
  setFlaggedResource,
  setOpenFlag,
  setOpenReactions,
  setResourceReactions,
  setOpen,
  setImagePreviewOpen,
  setImagePreviewURL,
}) {
  const classes = useStyles();
  const [scrollOptionAnchorEl, setScrollOptionAnchorEl] = useState(null);
  const [userReaction, setUserReaction] = useState();
  const [reactionIcon, setReactionIcon] = useState();
  const [openComments, setOpenComments] = useState(false);
  const [comment_text, setCommentText] = useState("");
  const [comment_image, setCommentImage] = useState(null);
  const [openImage, setOpenImage] = useState(false);
  const [likeHovered, setLikeHovered] = useState(false);
  const [createCommentErr, setCreateCommentErr] = useState(false);
  const isScrollOptionOpen = Boolean(scrollOptionAnchorEl);
  const [createReaction] = useMutation(MUTATION_CREATE_REACTION);
  const [removeReaction] = useMutation(MUTATION_REMOVE_REACTION);

  const theme = useTheme();
  const state = useSelector((st) => st);
  const user = state.auth.user;

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
    setCommentText("");
    setCommentImage(null);
    setCreateCommentErr(false);
  };

  const handleCreateComment = (e) => {
    e.preventDefault();
    if (comment_text.trim() == "" && !comment_image)
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
          type: "post",
          reaction: reaction,
        },
      },
      refetchQueries: [{ query: QUERY_LOAD_SCROLLS }],
    });
    setUserReaction(reaction);
    setIcon(reaction);
  };

  const handleRemoveReaction = () => {
    removeReaction({
      variables: {
        data: {
          _id: scroll?._id,
          type: "post",
        },
      },
      refetchQueries: [{ query: QUERY_LOAD_SCROLLS }],
    });
    setIcon();
    setUserReaction();
  };

  const getUserReaction = useCallback(
    (resource) => {
      let reaction;
      resource?.reacted_to_by?.forEach((item) => {
        if (item?.user_id?._id === user?._id) reaction = item?.reaction_type;
      });
      return reaction;
    },
    [user?._id]
  );

  const setIcon = useCallback(
    (reaction) => {
      if (reaction === "like") {
        setReactionIcon(<ThumbUpRounded className={classes.primary} />);
      } else if (reaction === "love") {
        setReactionIcon(<FavoriteRounded className={classes.red} />);
      } else if (reaction === "dislike") {
        setReactionIcon(<ThumbDownRounded className={classes.primary} />);
      } else if (reaction === "celebrate") {
        setReactionIcon(<PanToolRounded className={classes.green} />);
      } else {
        setReactionIcon();
      }
    },
    [classes.green, classes.primary, classes.red]
  );

  const authorInitials = getUserInitials(scroll?.author?.displayName);
  const currentUserInitials = getUserInitials(user?.displayName);

  useEffect(() => {
    if (createCommentData?.Comments?.create) {
      console.log("comment created");
    }
  }, [createCommentData]);
  useEffect(() => {
    const reaction = getUserReaction(scroll);
    setUserReaction(reaction);
    setIcon(reaction);
  }, [getUserReaction, scroll, setIcon]);

  return (
    <>
      <Card style={{ marginBottom: 16 }}>
        <CardHeader
          avatar={
            <Avatar
              className="c-poiter"
              style={{
                backgroundColor: generateRandomColor(),
              }}
              src={
                process.env.REACT_APP_BACKEND_URL + scroll?.author?.profile_pic
              }
              aria-label="recipe"
            >
              {authorInitials}
            </Avatar>
          }
          action={
            <IconButton
              size="small"
              className="m-1 p-1"
              aria-label="show more"
              aria-controls={scrollOptionId}
              aria-haspopup="true"
              onClick={handleScrollOptionOpen}
              color="inherit"
            >
              <MoreVert />
            </IconButton>
          }
          title={
            <div className="center-horizontal">
              <Typography style={{ marginRight: 8 }}>
                {scroll?.author?.displayName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {`@${scroll?.author?._id}`}
              </Typography>
            </div>
          }
          subheader={moment(scroll?.createdAt).fromNow()}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
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
          <Grid container spacing={2} className="mb-2">
            {scroll?.video && (
              <Grid item xs={12}>
                <CardMedia
                  component="video"
                  src={`${process.env.REACT_APP_BACKEND_URL}${scroll?.video}`}
                  controls
                />
              </Grid>
            )}
            {scroll?.images.length > 0 &&
              scroll?.images?.map((imageURL) => (
                <Grid
                  className="mt-3"
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
                      width: "100%",
                      backgroundImage:
                        "url(" +
                        process.env.REACT_APP_BACKEND_URL +
                        imageURL +
                        ")",
                      backgroundSize: "cover",
                      backgroundColor: "rgba(0,0,0,0.2)",
                      backgroundBlendMode: "soft-light",
                      cursor: "pointer",
                    }}
                  />
                </Grid>
              ))}
          </Grid>
          {scroll?.shared_resource?._id &&
            scroll?.shared_resource?.type === "post" && (
              <ScrollPreview scroll={scroll?.shared_resource?._id} />
            )}
          {scroll?.shared_resource?._id &&
            scroll?.shared_resource?.type === "event" && (
              <EventPreview event={scroll?.shared_resource?._id} />
            )}
          <br />

          <Typography display="inline">
            <Typography
              onClick={() => {
                setOpenReactions(true);
                setResourceReactions(scroll);
              }}
              display="inline"
              className={classes.clickableTypography}
            >
              {`${getReactionsSum(scroll)} ${
                getReactionsSum(scroll) === 1 ? "Reaction" : "Reactions"
              }`}
            </Typography>
            {" . "}
            <Typography
              onClick={() => setOpenComments(true)}
              className={classes.replies}
              display="inline"
            >
              {`${scroll?.comments} ${
                scroll?.comments === 1 ? "Comment" : "Comments"
              }`}
            </Typography>
          </Typography>
        </CardContent>
        <Divider />
        <Card
          style={{
            position: "absolute",
            alignSelf: "baseline",
            borderRadius: 10,
            backgroundColor: theme.palette.background.default,
            display: likeHovered ? "block" : "none",
            transform: "translateY(-28px)",
          }}
          onMouseEnter={() => setLikeHovered(true)}
          onMouseLeave={() => setLikeHovered(false)}
        >
          <Button
            color="default"
            textCase
            onClick={() => {
              handleCreateReaction("like");
              setLikeHovered(false);
            }}
            variant="text"
            startIcon={<ThumbUpRounded className={classes.primary} />}
          >
            Like
          </Button>
          <Button
            color="default"
            textCase
            onClick={() => {
              handleCreateReaction("love");
              setLikeHovered(false);
            }}
            variant="text"
            startIcon={<FavoriteRounded className={classes.red} />}
          >
            Love
          </Button>
          <Button
            color="default"
            textCase
            onClick={() => {
              handleCreateReaction("dislike");
              setLikeHovered(false);
            }}
            variant="text"
            startIcon={<ThumbDownRounded className={classes.primary} />}
          >
            Dislike
          </Button>
          <Button
            color="default"
            textCase
            onClick={() => {
              handleCreateReaction("celebrate");
              setLikeHovered(false);
            }}
            variant="text"
            startIcon={<PanToolRounded className={classes.green} />}
          >
            Celebrate
          </Button>
        </Card>
        <CardActions className="space-around">
          <ReactionButton
            handleRemoveReaction={handleRemoveReaction}
            reaction={userReaction}
            onMouseEnter={() => setLikeHovered(true)}
            setLikeHovered={setLikeHovered}
            onMouseLeave={() => setLikeHovered(false)}
            variant="text"
            color="default"
            textCase
            startIcon={reactionIcon}
          />
          <Button
            color="default"
            textCase
            variant="text"
            onClick={() => setOpenComments(true)}
            startIcon={<CommentRounded />}
          >
            Comment
          </Button>
          {!scroll?.shared_resource?._id && (
            <Button
              color="default"
              textCase
              variant="text"
              onClick={() => {
                setOpen(scroll);
                setSharedResource(scroll);
              }}
              startIcon={<ShareRounded />}
            >
              Share
            </Button>
          )}
        </CardActions>
        <Divider />
        <CardActionArea onClick={() => setOpenComments(true)}>
          {!openComments && scroll?.comments < 1 && (
            <Typography className="mx-3 my-2" color="textSecondary">
              Be the first to comment
            </Typography>
          )}
        </CardActionArea>
        {openComments && (
          <CardContent>
            <div className="center-horizontal">
              <Avatar
                style={{
                  backgroundColor: generateRandomColor(),
                }}
                src={scroll?.author?.image}
                className="mx-2"
              >
                {currentUserInitials}
              </Avatar>
              <TextField
                fullWidth
                error={createCommentErr && true}
                errorText={createCommentErr && "The comment cannot be empty"}
                multiline
                rowsMax={10}
                id="comment-field"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleCreateComment(e);
                  }
                }}
                placeholder={
                  commentsData?.Comments?.get?.length > 0
                    ? ""
                    : "Be the first to comment.."
                }
                onChange={(e) =>
                  setCommentText(
                    comment_text?.length >= 250
                      ? e.target.value.substring(0, e.target.value.length - 1)
                      : e.target.value.substring(0, 250)
                  )
                }
                adornment={
                  <IconButton
                    size="small"
                    className="m-1 p-1"
                    onClick={() => {
                      setOpenImage(true);
                    }}
                  >
                    <ImageRounded />
                  </IconButton>
                }
                adornmentType="end"
                value={comment_text}
              />
              <IconButton
                size="small"
                className="m-1 p-1"
                // className='mx-3'
                onClick={handleCreateComment}
                // size='small'
              >
                <Send />
              </IconButton>
            </div>

            <DropzoneDialog
              previewGridProps={{ container: { spacing: 1, direction: "row" } }}
              showAlerts={["error"]}
              // useChipsForPreview
              previewText=""
              acceptedFiles={["image/*"]}
              cancelButtonText={"cancel"}
              submitButtonText={"submit"}
              maxFileSize={5000000}
              open={openImage}
              filesLimit={1}
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
                    setOpenReactions={setOpenReactions}
                    setResourceReactions={setResourceReactions}
                    setOpenImage={setOpenImage}
                    onCreateComment={onCreateComment}
                    setImagePreviewURL={setImagePreviewURL}
                    setImagePreviewOpen={setImagePreviewOpen}
                    comment_image={comment_image}
                  />
                ))}
          </CardContent>
        )}
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
