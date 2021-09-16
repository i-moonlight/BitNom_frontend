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
} from '@material-ui/icons';
//import { DropzoneArea } from 'material-ui-dropzone';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';
//import TextField from '../../../components/TextField';
import { getUserInitials } from '../../../utilities/Helpers';
import { generateRandomColor } from '../utilities/functions';
import { MUTATION_CREATE_EVENT } from '../utilities/queries';

export default function CreateEvent({ open, setOpen, profileData }) {
  //const [descriptionErr, setDescriptionErr] = useState(null);
  //const [titleErr, setTitleErr] = useState(null);

  const [eventDescription, setEventDescription] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [eventImage, setEventImage] = useState(null);
  const [eventDate, setEventDate] = useState(null);
  const [eventTitle, setEventTitle] = useState(null);
  const [locationType, setLocationType] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [openImage, setOpenImage] = useState(false);
  //const theme = useTheme();
  const state = useSelector((st) => st);
  const user = state.auth.user;
  const [
    createEvent,
    {
      loading,
      data,
      //  error
    },
  ] = useMutation(MUTATION_CREATE_EVENT);

  const userInitials = getUserInitials(user?.displayName);

  const onCreateEvent = async (ICreateEvent) => {
    await createEvent({
      variables: {
        data: ICreateEvent,
      },
      /*  refetchQueries: [
        {
          query: QUERY_LOAD_EVENTS,
          variables: { data: { host: user?._id, limit: 220 } },
        },
      ], */
    });
    setEventLink('');
    setEventImage(null);
    setEventTitle(null);
    setEventDescription(null);
    //setDescriptionErr(false);
    //setTitleErr(false);
    setEventDate(null);
    setLocationType(null);
    setOpenImage(false);
    setLatitude(null);
    setLongitude(null);
  };

  const handleCreateEvent = () => {
    /* e.preventDefault();
    if (eventDescription.trim() == '') return setDescriptionErr(true);
    if (eventTitle.trim() == '') return setTitleErr(true); */

    onCreateEvent({
      title: eventTitle,
      image: eventImage,
      description: eventDescription,
      date: eventDate,
      link: eventLink,
      location: {
        type: locationType,
        lat: latitude,
        long: longitude,
      },
    });
    setOpen(false);
  };

  return (
    <Modal
      openImage={openImage}
      profileData={profileData}
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
              <Typography variant='body1'>Create Event</Typography>
              <IconButton size='small' className='m-1 p-1'>
                <CloseRounded
                  onClick={() => {
                    setOpen(!open);
                    setEventLink('');
                    setEventImage(null);
                    setEventTitle(null);
                    setEventDescription(null);
                    //setDescriptionErr(false);
                    //setTitleErr(false);
                    setEventDate(null);
                    setLocationType(null);
                    setOpenImage(false);
                    setLatitude(null);
                    setLongitude(null);
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

              {/* <Divider /> */}
              <div className='space-between mt-1'>
                <div className='center-horizontal'>
                  <IconButton
                    size='small'
                    className='m-1 p-1'
                    onClick={() => {
                      setOpenImage(true);
                    }}
                    style={{
                      marginRight: 10,
                    }}
                  >
                    <ImageRounded />
                  </IconButton>
                </div>
                {!loading && <Button onClick={handleCreateEvent}>Post</Button>}
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
