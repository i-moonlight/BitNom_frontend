import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  //IconButton,
  Typography,
} from '@material-ui/core';
//import { MoreVert } from '@material-ui/icons';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { getUserInitials } from '../../../../utilities/Helpers';
import {
  contentBodyFactory,
  getReactionsSum,
  generateRandomColor,
} from '../../utilities/functions';

//const scrollOptionId = 'menu-scroll-option';

export default function ScrollPreview({ scroll }) {
  const history = useHistory();
  const contentClickHandler = e => {
    const targetLink = e.target.closest('a');
    if (!targetLink) return;
    e.preventDefault();
    e.stopPropagation();
    history.push(targetLink.href.substring(location.origin.length));
  };
  const authorInitials = getUserInitials(scroll?.author?.displayName);
  return (
    <>
      <Card variant='outlined' style={{ marginBottom: 16, marginTop: 16 }}>
        <CardHeader
          avatar={
            <Avatar
              style={{
                backgroundColor: generateRandomColor(),
              }}
              src={scroll?.author?.image}
              aria-label='recipe'
            >
              {authorInitials}
            </Avatar>
          }
          title={
            <div className='center-horizontal'>
              <Typography variant='body2' style={{ marginRight: 8 }}>
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
              onClick={e => contentClickHandler(e)}
              dangerouslySetInnerHTML={{
                __html: contentBodyFactory(scroll),
              }}
              style={{ zIndex: 2 }}
            ></Typography>
            <br />
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
                scroll?.images?.map(imageURL => (
                  <Grid
                    className='mt-3'
                    key={imageURL}
                    item
                    xs={scroll?.images.length > 1 ? 6 : 12}
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
            <br />
            <Typography display='inline'>
              <Typography display='inline'>
                {`${getReactionsSum(scroll)} ${
                  getReactionsSum(scroll) === 1 ? 'Reaction' : 'Reactions'
                }`}
              </Typography>
              {' . '}
              <Typography display='inline'>
                {`${scroll?.comments} ${
                  scroll?.comments === 1 ? 'Comment' : 'Comments'
                }`}
              </Typography>
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
