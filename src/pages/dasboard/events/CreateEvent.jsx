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
} from '@material-ui/core';
import { CloseRounded, ImageRounded } from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import moment from 'moment';
import Button from '../../../components/Button';
import { MUTATION_CREATE_EVENT, QUERY_LOAD_EVENTS } from '../utilities/queries';
import LocationInput from './LocationInput';

export default function CreateEvent({ open, setOpen }) {
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [linkErr, setLinkErr] = useState(false);
  const [locationErr, setLocationErr] = useState(false);
  const [titleErr, setTitleErr] = useState(false);
  const [dateErr, setDateErr] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [eventDescription, setEventDescription] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [eventImage, setEventImage] = useState(null);
  const [eventDate, setEventDate] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [locationType, setLocationType] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');
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

  const onCreateEvent = async (ICreateEvent) => {
    await createEvent({
      variables: {
        data: ICreateEvent,
      },
      refetchQueries: [
        {
          query: QUERY_LOAD_EVENTS,
          variables: { data: { host: user?._id, limit: 220 } },
        },
      ],
    });
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

  const handleCreateEvent = (e) => {
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
    onCreateEvent({
      title: eventTitle,
      image: eventImage,
      description: eventDescription,
      date: eventDate,
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
              <Typography variant='body1'>Create Event</Typography>
              <IconButton size='small' className='m-1 p-1'>
                <CloseRounded
                  onClick={() => {
                    setOpen(!open);
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
                        defaultValue={moment.utc(new Date())}
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
                      //clickable={true}
                      onChange={(files) => {
                        setEventImage(files[0]);
                      }}
                      dropzoneText={'Drag n drop event banner or click'}
                      acceptedFiles={['image/*']}
                      maxFileSize={5000000}
                      filesLimit={1}
                      showAlerts={['error']}
                      //dropzoneClass='create-event-dropzone'
                      showPreviews={false}
                      showPreviewsInDropzone
                      previewGridProps={{
                        container: { spacing: 1, direction: 'row' },
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* <Divider /> */}
              <div className='space-between mt-1'>
                <div className='center-horizontal'>
                  <IconButton
                    size='small'
                    className='m-1 p-1'
                    onClick={() => {
                      /*  document
                        .getElementsByClassName('create-event-dropzone')[0]
                        .click(); */
                      setOpenImage(true);
                    }}
                    style={{
                      marginRight: 10,
                    }}
                  >
                    <ImageRounded />
                  </IconButton>
                </div>
                {!loading && <Button onClick={handleCreateEvent}>Save</Button>}
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
