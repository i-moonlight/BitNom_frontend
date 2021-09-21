import { useMutation } from '@apollo/client';
import {
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography,
  //useTheme,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { CloseRounded, ImageRounded } from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';
import React, { useState, useEffect } from 'react';
//import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
//import moment from 'moment';
import Button from '../../../components/Button';

import {
  MUTATION_UPDATE_EVENT,
  QUERY_EVENT_BY_ID,
  MUTATION_DELETE_EVENT,
  QUERY_LOAD_EVENTS,
} from '../utilities/queries';
import LocationInput from './LocationInput';

export default function UpdateEvent({
  openUpdate,
  setOpenUpdate,
  eventToEdit,
  setEventToEdit,
}) {
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [linkErr, setLinkErr] = useState(false);
  const [locationErr, setLocationErr] = useState(false);
  const [titleErr, setTitleErr] = useState(false);
  const [dateErr, setDateErr] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [eventDescription, setEventDescription] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [eventImage, setEventImage] = useState(undefined);
  const [eventDate, setEventDate] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [locationType, setLocationType] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');
  const [file, setFile] = useState(null);
  const [openImage, setOpenImage] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  //const theme = useTheme();
  //const state = useSelector((st) => st);
  //const user = state.auth.user;
  const history = useHistory();
  const [
    updateEvent,
    {
      loading,
      data,
      //  error
    },
  ] = useMutation(MUTATION_UPDATE_EVENT);

  const [
    deleteEvent,
    {
      //loading: deleteLoading,
      data: deleteData,
      //  error
    },
  ] = useMutation(MUTATION_DELETE_EVENT);

  const onUpdateEvent = async (IUpdateEvent) => {
    await updateEvent({
      variables: {
        data: IUpdateEvent,
      },
      refetchQueries: [
        {
          query: QUERY_EVENT_BY_ID,
          variables: { _id: eventToEdit?._id },
        },
      ],
    });
  };

  useEffect(() => {
    function getSetDate(date) {
      var now = new Date(date);
      var offset = now.getTimezoneOffset() * 60000;
      var adjustedDate = new Date(now.getTime() - offset);
      var formattedDate = adjustedDate.toISOString().substring(0, 16); // For minute precision
      return formattedDate;
    }
    if (eventToEdit?.image?.trim() !== '' && eventToEdit?.image !== null) {
      setFile(true);
    }
    if (eventToEdit) {
      setEventTitle(eventToEdit?.title);
      setEventDescription(eventToEdit?.description);
      setEventDate(getSetDate(eventToEdit?.date));
      setLatitude(eventToEdit?.location?.lat);
      setLongitude(eventToEdit?.location?.long);
      setLocationType(eventToEdit?.location?.type);
      setEventLink(eventToEdit?.link);
      setAddress(eventToEdit?.location?.address);
    }
  }, [eventToEdit]);

  const onDeleteEvent = async (id) => {
    await deleteEvent({
      variables: {
        _id: id,
      },
      refetchQueries: [{ query: QUERY_LOAD_EVENTS }],
    });
    console.log(deleteData);
    setEventLink('');
    setEventImage(null);
    setEventTitle('');
    setEventDescription('');
    setDescriptionErr(false);
    setTitleErr(false);
    setLinkErr(false);
    setDateErr(false);
    setLocationErr(false);
    setEventDate('');
    setLocationType('');
    setOpenImage(false);
    setLatitude('');
    setAddress('');
    setLongitude('');
    history.push(`/dashboard/events`);
  };

  const handleDeleteEvent = (e) => {
    e.preventDefault();
    onDeleteEvent(eventToEdit?._id);
    setOpenDelete(false);
    setOpenUpdate(false);
  };

  const handleSelectLocation = (location) => {
    geocodeByPlaceId(location?.place_id)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log('Results', location);
        setLatitude(latLng?.lat);
        setLongitude(latLng?.lng);
        setAddress(location?.description);
        console.error('Error', latitude, longitude);
      })
      .catch((error) => console.error('Error', error));
  };

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    if (eventTitle.trim() == '') {
      setErrorText('The event title must be provided');
      return setTitleErr(true);
    }
    if (eventDescription.trim() == '') {
      setErrorText('The event description must be provided');
      return setDescriptionErr(true);
    }
    if (eventDate.trim() == '') {
      setErrorText('The event date and time must be provided');
      return setDateErr(true);
    }
    if (locationType === 'virtual' && eventLink.trim() == '') {
      setErrorText('Virtual events must have event links');
      return setLinkErr(true);
    }
    if (
      locationType === 'physical' &&
      (String(latitude).trim() == '' ||
        String(longitude).trim() == '' ||
        String(address).trim() == '')
    ) {
      setErrorText('Face-to-face events must have a Location');
      return setLocationErr(true);
    }
    onUpdateEvent({
      event_id: eventToEdit?._id,
      title: eventTitle,
      image: eventImage,
      description: eventDescription,
      date: new Date(eventDate).toISOString(),
      link: eventLink,
      location: {
        type: locationType,
        lat: String(latitude),
        long: String(longitude),
        address: String(address),
      },
    });
    setEventLink('');
    setEventImage(null);
    setEventTitle('');
    setEventDescription('');
    setDescriptionErr(false);
    setTitleErr(false);
    setLinkErr(false);
    setDateErr(false);
    setLocationErr(false);
    setEventDate('');
    setLocationType('');
    setOpenImage(false);
    setLatitude('');
    setAddress('');
    setLongitude('');
    setOpenUpdate(false);
    setEventToEdit(null);
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
      open={openUpdate}
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
                    setOpenUpdate(!openUpdate);
                    setEventLink('');
                    setEventImage(null);
                    setEventTitle('');
                    setEventDescription('');
                    setDescriptionErr(false);
                    setTitleErr(false);
                    setLinkErr(false);
                    setDateErr(false);
                    setLocationErr(false);
                    setEventDate('');
                    setLocationType('');
                    setOpenImage(false);
                    setLatitude('');
                    setAddress('');
                    setLongitude('');
                    setEventToEdit(null);
                  }}
                />
              </IconButton>
            </div>

            <Divider />
            <CardContent style={{ maxHeight: '500px', overflowY: 'auto' }}>
              <Card elevation={0}>
                <CardContent>
                  <TextField
                    required
                    fullWidth
                    variant='standard'
                    name='title'
                    error={titleErr}
                    errorText={errorText}
                    className='mb-2'
                    label='Title'
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                  />
                  <TextField
                    required
                    onChange={(e) => setEventDescription(e.target.value)}
                    fullWidth
                    multiline
                    error={descriptionErr}
                    errorText={errorText}
                    variant='standard'
                    name='description'
                    value={eventDescription}
                    className='mb-2'
                    label='Description'
                    //rows={5}
                  />
                  <Grid className='mt-1' container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl>
                        <FormLabel component='legend'>Location</FormLabel>
                        <RadioGroup
                          aria-label='location'
                          name='location'
                          value={locationType}
                          onChange={(e) => setLocationType(e.target.value)}
                          color='primary'
                        >
                          <FormControlLabel
                            value='virtual'
                            control={<Radio color='primary' />}
                            label='Virtual'
                            color='primary'
                            //disabled
                          />
                          <FormControlLabel
                            value='physical'
                            control={<Radio color='primary' />}
                            label='Face-to-face'
                            color='primary'
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormLabel component='legend'>Date &amp; Time</FormLabel>
                      <TextField
                        variant='standard'
                        id='datetime-local'
                        //label='Date &amp; Time'
                        type='datetime-local'
                        error={dateErr}
                        errorText={errorText}
                        defaultValue={eventDate}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          //moment.utc(e.target.value).format()
                          setEventDate(new Date(e.target.value).toISOString());
                        }}
                      />
                    </Grid>
                  </Grid>
                  <div
                    style={{ display: locationType !== 'physical' && 'none' }}
                  >
                    <LocationInput
                      handleSelectLocation={handleSelectLocation}
                      locationErr={locationErr}
                      errorText={errorText}
                    />
                  </div>
                  <TextField
                    fullWidth
                    variant='standard'
                    name='link'
                    error={linkErr}
                    errorText={errorText}
                    className='mb-2'
                    value={eventLink}
                    label='Link'
                    onChange={(e) => setEventLink(e.target.value)}
                  />
                  <div
                    style={{
                      display: openImage ? 'block' : 'none',
                    }}
                    className='mt-2'
                  >
                    <DropzoneArea
                      clearOnUnmount
                      onChange={(files) => {
                        setEventImage(files[0]);
                      }}
                      dropzoneText={'Drag n drop event banner or click'}
                      acceptedFiles={['image/*']}
                      maxFileSize={5000000}
                      filesLimit={1}
                      showAlerts={['error']}
                      showPreviews={false}
                      showPreviewsInDropzone
                      previewGridProps={{
                        container: { spacing: 1, direction: 'row' },
                      }}
                    />
                  </div>
                  {eventToEdit?.image?.trim() !== '' && file !== null && (
                    <Card>
                      <div className='space-between mx-3 my-2'>
                        <Typography variant='body2'></Typography>
                        <Typography variant='body1'></Typography>
                        <IconButton size='small' className='m-1 p-1'>
                          <CloseRounded
                            onClick={() => {
                              setFile(null);
                              setEventImage(null);
                            }}
                          />
                        </IconButton>
                      </div>
                      <Grid container spacing={2} className='mb-2'>
                        <Grid
                          className='mt-3'
                          key={eventToEdit?.image}
                          item
                          xs={12}
                        >
                          <div
                            style={{
                              height: 200,
                              borderRadius: 8,
                              width: '100%',
                              backgroundImage:
                                'url(' +
                                process.env.REACT_APP_BACKEND_URL +
                                eventToEdit?.image +
                                ')',
                              backgroundSize: 'cover',
                              backgroundColor: 'rgba(0,0,0,0.2)',
                              backgroundBlendMode: 'soft-light',
                              cursor: 'pointer',
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  )}
                </CardContent>
              </Card>
              {/* <Divider /> */}
              <Dialog
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
              >
                <DialogTitle id='alert-dialog-title'>
                  {'Delete this event?'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    This can’t be undone and it will be removed from your
                    profile, the timeline of any accounts that follow you, and
                    from the BNConnect platform.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenDelete(false)} color='primary'>
                    Cancel
                  </Button>
                  <Button onClick={handleDeleteEvent} color='primary' autoFocus>
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
              <div className='space-between mt-1'>
                <div className='center-horizontal'>
                  <IconButton
                    size='small'
                    className='m-1 p-1'
                    onClick={() => {
                      setOpenImage(true);
                      setFile(null);
                      setEventImage(null);
                    }}
                    style={{
                      marginRight: 10,
                    }}
                  >
                    <ImageRounded />
                  </IconButton>
                </div>
                <div>
                  <Button
                    style={{
                      backgroundColor: '#ba000d',
                      color: '#FFFFFF',
                      marginRight: '12px',
                    }}
                    variant='contained'
                    onClick={() => setOpenDelete(true)}
                  >
                    Delete
                  </Button>
                  {!loading && (
                    <Button onClick={handleUpdateEvent}>Update</Button>
                  )}
                  {loading && (
                    <Button size='small' style={{ margin: '0' }}>
                      <CircularProgress size={24} thickness={4} />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Modal>
  );
}
