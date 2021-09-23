import { useMutation, useQuery } from '@apollo/client';
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
  Paper,
  InputBase,
  Chip,
  makeStyles,
} from '@material-ui/core';

import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { CloseRounded, ImageRounded } from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import debounce from 'lodash/debounce';
import Button from '../../../components/Button';
import {
  MUTATION_CREATE_EVENT,
  QUERY_LOAD_EVENTS,
  QUERY_SEARCH_USERS,
} from '../utilities/queries';
import LocationInput from './LocationInput';
import OrganizerSearch from './OrganizerSearch';

const useStyles = makeStyles((theme) => ({
  paperSearch: {
    padding: '0px 4px',
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.profileCard,
  },
  locationButtons: {
    display: 'flex',
    marginTop: theme.spacing(2),
    alignItems: 'center',
  },
  paperSearchAlt: {
    padding: '0px 4px',
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  timeField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  datePicker: {
    border: '1px solid',
    color: theme.palette.getContrastText(theme.palette.background.paper),
    padding: '0px 4px',
    borderColor: 'rgba(0, 96, 151, 0.5)',
    borderRadius: '4px',
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    '&:hover, &:focus': {
      borderColor: theme.palette.primary.main,
    },
    height: '2rem',
  },
}));

export default function CreateEvent({ open, setOpen }) {
  const classes = useStyles();

  const [descriptionErr, setDescriptionErr] = useState(false);
  const [organizersErr, setOrganizerErr] = useState(false);
  const [tagsErr, setTagsErr] = useState(false);
  const [linkErr, setLinkErr] = useState(false);
  const [locationErr, setLocationErr] = useState(false);
  const [titleErr, setTitleErr] = useState(false);
  const [dateErr, setDateErr] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [eventDescription, setEventDescription] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [eventImage, setEventImage] = useState(null);
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [locationType, setLocationType] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');
  const [openImage, setOpenImage] = useState(false);
  const [previewURL, setPreviewURL] = useState();
  const [tagText, setTagText] = useState('');
  const [eventTags, setEventTags] = useState([]);
  const [organizerName, setOrganizerName] = useState('');
  const [eventOrganizers, setEventOrganizers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //const theme = useTheme();
  const state = useSelector((st) => st);
  const user = state.auth.user;

  const setSearchTermDebounced = debounce(setSearchTerm, 500);

  const { data: usersData, loading: usersLoading } = useQuery(
    QUERY_SEARCH_USERS,
    {
      variables: {
        params: { searchString: searchTerm },
      },
      context: { clientName: 'users' },
    }
  );

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
  console.log(eventOrganizers, 'ORGS');
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
    if (locationType.trim() == '') {
      setErrorText('The event must have a location');
      return setLocationErr(true);
    }
    if (locationType === 'virtual') {
      setLatitude('');
      setAddress('');
      setLongitude('');
    }
    if (locationType === 'virtual' && eventLink.trim() == '') {
      setLatitude('');
      setAddress('');
      setLongitude('');
      setErrorText('Virtual events must have event links');
      return setLinkErr(true);
    }
    if (
      locationType === 'physical' &&
      (String(latitude).trim() == '' ||
        String(longitude).trim() == '' ||
        String(address).trim() == '')
    ) {
      setErrorText('Please provide the venue for this event');
      return setLocationErr(true);
    }
    if (eventStartDate.trim() == '' && eventEndDate.trim() == '') {
      setErrorText('The event dates must be set');
      return setDateErr(true);
    }
    if (eventStartDate.trim() == '') {
      setErrorText('The event start date must be set');
      return setDateErr(true);
    }
    if (eventEndDate.trim() == '') {
      setErrorText('The event end date must be set');
      return setDateErr(true);
    }
    if (new Date(eventEndDate).getTime() < new Date(eventStartDate).getTime()) {
      setErrorText(
        'The event end date cannot be before the event starting time'
      );
      return setDateErr(true);
    }

    let organizers = [];

    if (eventOrganizers?.length) {
      organizers = eventOrganizers?.map((item) => {
        return {
          _id: item._id,
          displayName: item?.displayName,
          profile_pic: item?.profile_pic,
          bio: item?.bio,
        };
      });
    }

    onCreateEvent({
      title: eventTitle,
      image: eventImage,
      description: eventDescription,
      tags: eventTags,
      organizers: organizers,
      startDate: eventStartDate,
      endDate: eventEndDate,
      link: eventLink,
      location: {
        type: locationType,
        lat: String(latitude),
        long: String(longitude),
        address: String(address),
      },
    });
    setDateErr(false);
    setEventLink('');
    setEventImage(null);
    setEventTitle('');
    setEventDescription('');
    setDescriptionErr(false);
    setOrganizerErr(false);
    setTagsErr(false);
    setTitleErr(false);
    setLinkErr(false);
    setDateErr(false);
    setLocationErr(false);
    setOrganizerName('');
    setEventOrganizers([]);
    setEventStartDate('');
    setEventEndDate('');
    setLocationType('');
    setOpenImage(false);
    setLatitude('');
    setAddress('');
    setLongitude('');
    setEventTags([]);
    setTagText('');
    setPreviewURL();
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
                    setOrganizerErr(false);
                    setTagsErr(false);
                    setTitleErr(false);
                    setLinkErr(false);
                    setDateErr(false);
                    setLocationErr(false);
                    setEventStartDate('');
                    setEventEndDate('');
                    setLocationType('');
                    setOpenImage(false);
                    setLatitude('');
                    setAddress('');
                    setLongitude('');
                    setEventTags([]);
                    setTagText('');
                    setPreviewURL();
                    setOrganizerName('');
                    setEventOrganizers([]);
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
                    variant='outlined'
                    name='title'
                    error={titleErr}
                    errorText={errorText}
                    className='mb-2'
                    label='Title'
                    value={eventTitle}
                    helperText={
                      <Typography variant='body2' className='space-between'>
                        <span>{titleErr && errorText}</span>
                        <span>{`${eventTitle?.length}/50`}</span>
                      </Typography>
                    }
                    onChange={(e) => {
                      setEventTitle(
                        eventTitle?.length >= 50
                          ? e.target.value.substring(
                              0,
                              e.target.value.length - 1
                            )
                          : e.target.value.substring(0, 50)
                      );
                      setTitleErr(false);
                    }}
                  />

                  <TextField
                    required
                    fullWidth
                    multiline
                    error={descriptionErr}
                    variant='outlined'
                    name='description'
                    className='mb-2'
                    label='Description'
                    rows={4}
                    value={eventDescription}
                    helperText={
                      <Typography variant='body2' className='space-between'>
                        <span>{descriptionErr && errorText}</span>
                        <span>{`${eventDescription?.length}/250`}</span>
                      </Typography>
                    }
                    onChange={(e) => {
                      setEventDescription(
                        eventDescription?.length >= 250
                          ? e.target.value.substring(
                              0,
                              e.target.value.length - 1
                            )
                          : e.target.value.substring(0, 250)
                      );
                      setDescriptionErr(false);
                    }}
                  />

                  <TextField
                    fullWidth
                    variant='outlined'
                    name='link'
                    error={linkErr}
                    multiline
                    className='mb-2'
                    value={eventLink}
                    label='Registration or broadcast link'
                    onChange={(e) => {
                      setEventLink(
                        eventLink?.length >= 75
                          ? e.target.value.substring(
                              0,
                              e.target.value.length - 1
                            )
                          : e.target.value.substring(0, 75)
                      );
                      setLinkErr(false);
                    }}
                    helperText={
                      <Typography variant='body2' className='space-between'>
                        <span>{linkErr && errorText}</span>
                        <span></span>
                      </Typography>
                    }
                  />
                  <Divider />
                  <div className='mb-3'>
                    <div>
                      <div>
                        <Typography variant='body1'>Organizers</Typography>
                        <Typography gutterBottom variant='body2'>
                          Add a few friends as event admins and they will appear
                          in the attendees list.
                        </Typography>
                      </div>
                      <>
                        {/* <Paper
                          elevation={0}
                          component='form'
                          className={classes.paperSearch}
                        >
                          
                          <InputBase
                            value={organizerName}
                            //onChange={(e) => setTagText(e.target.value)}
                            variant='outlinedInput'
                            onChange={(e) =>
                              setOrganizerName(
                                organizerName?.length >= 15
                                  ? e.target.value.substring(
                                      0,
                                      e.target.value.length - 1
                                    )
                                  : e.target.value.substring(0, 15)
                              )
                            }
                            className={classes.input}
                            placeholder='eg "@username"'
                            inputProps={{ 'aria-label': 'add organizers' }}
                            endAdornment={
                              <Button
                                onClick={() => {
                                  if (!organizerName.length) return;
                                  const exist = eventOrganizers?.filter(
                                    (organizer) => organizer === organizerName
                                  );

                                  if (exist.length) {
                                    setErrorText(
                                      `${organizerName} is already added!`
                                    );
                                    return setOrganizerErr(true);
                                  }
                                  setErrorText('');
                                  setOrganizerErr(false);
                                  setEventOrganizers([
                                    ...eventOrganizers,
                                    organizerName,
                                  ]);
                                  setOrganizerName('');
                                }}
                                //disabled={addLoading}
                                size='small'
                                className='my-1'
                                style={{
                                  display:
                                    eventOrganizers?.length === 3 && 'none',
                                }}
                              >
                                Add
                              </Button>
                            }
                          />
                        </Paper> */}
                        <OrganizerSearch
                          loading={usersLoading}
                          searchResults={usersData?.Users?.search}
                          initialTerm={searchTerm}
                          updateSearchTerm={setSearchTermDebounced}
                          setEventOrganizers={setEventOrganizers}
                          setOrganizerErr={setOrganizerErr}
                          setErrorText={setErrorText}
                        />
                        <Typography
                          variant='body2'
                          className='mt-2 mb-2 space-between'
                        >
                          <span>{`${eventOrganizers?.length}/3 friends`}</span>
                        </Typography>
                        <Typography variant='body2' className='mt-2 mb-2'>
                          <Typography color='error'>
                            {organizersErr && errorText}
                          </Typography>
                        </Typography>
                      </>
                      <div>
                        {/* {eventOrganizers?.map((item) => (
                          <Chip
                            color='primary'
                            key={item}
                            label={item}
                            className='me-2 mb-2'
                            //disabled={removeLoading}
                            onDelete={() => {
                              const organizers = eventOrganizers?.filter(
                                (organizer) => organizer !== item
                              );
                              setEventOrganizers(organizers);
                            }}
                          />
                        ))} */}
                      </div>
                    </div>
                  </div>

                  <div className='mb-3'>
                    <div>
                      <div>
                        <Typography variant='body1'>Tags</Typography>
                        <Typography variant='body2'>
                          Improve discoverability of your event by addding tags
                          relevant to the subject matter.
                        </Typography>
                      </div>
                      <>
                        <Paper
                          elevation={0}
                          component='form'
                          className={classes.paperSearch}
                        >
                          {/* <Search color='inherit' /> */}
                          <InputBase
                            value={tagText}
                            //onChange={(e) => setTagText(e.target.value)}
                            variant='outlinedInput'
                            onChange={(e) =>
                              setTagText(
                                tagText?.length >= 20
                                  ? e.target.value.substring(
                                      0,
                                      e.target.value.length - 1
                                    )
                                  : e.target.value.substring(0, 20)
                              )
                            }
                            className={classes.input}
                            placeholder='eg "#Crypto"'
                            inputProps={{ 'aria-label': 'add tags' }}
                            endAdornment={
                              <Button
                                onClick={() => {
                                  if (!tagText.length) return;
                                  const exist = eventTags?.filter(
                                    (tag) => tag === tagText
                                  );

                                  if (exist.length) {
                                    setErrorText(
                                      `${tagText} is already added!`
                                    );
                                    return setTagsErr(true);
                                  }
                                  setErrorText('');
                                  setTagsErr(false);
                                  setEventTags([...eventTags, tagText]);
                                  setTagText('');
                                }}
                                //disabled={addLoading}
                                size='small'
                                className='my-1'
                                style={{
                                  display: eventTags?.length === 5 && 'none',
                                }}
                              >
                                Add
                              </Button>
                            }
                          />
                        </Paper>

                        <Typography
                          variant='body2'
                          className='mt-2 mb-2 space-between'
                        >
                          <span>{`${eventTags?.length}/5 tags`}</span>
                          <span>{`${tagText?.length}/20`}</span>
                        </Typography>
                        <Typography
                          color='error'
                          variant='body2'
                          className='mb-2'
                        >
                          {tagsErr && errorText}
                        </Typography>
                      </>
                      <div>
                        {eventTags?.map((item) => (
                          <Chip
                            color='primary'
                            key={item}
                            label={item}
                            className='me-2 mb-2'
                            //disabled={removeLoading}
                            onDelete={() => {
                              const tags = eventTags?.filter(
                                (tag) => tag !== item
                              );
                              setEventTags(tags);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <div className='mt-2 mb-3'>
                    <div>
                      <div>
                        <Typography variant='body1'>Location</Typography>
                        <Typography gutterBottom variant='body2'>
                          Let people know the location of your event and inform
                          attendees where to show up.
                        </Typography>
                      </div>
                      <div className={classes.locationButtons}>
                        <Button
                          variant={
                            locationType === 'physical'
                              ? 'contained'
                              : 'outlined'
                          }
                          textCase
                          disableRipple
                          style={{
                            width: '25%',
                            marginRight: '10px',
                            textTransform: 'none',
                          }}
                          onClick={() => {
                            setLocationType('physical');
                            setLocationErr(false);
                          }}
                        >
                          Venue
                        </Button>
                        <Button
                          variant={
                            locationType === 'virtual'
                              ? 'contained'
                              : 'outlined'
                          }
                          style={{
                            width: '25%',
                            textTransform: 'none',
                          }}
                          disableRipple
                          onClick={() => {
                            setLocationType('virtual');
                            setLocationErr(false);
                          }}
                        >
                          Online Event
                        </Button>
                      </div>
                      <Grid
                        item
                        xs={12}
                        lg={12}
                        container
                        className='mb-2'
                        style={{
                          display: locationType !== 'physical' && 'none',
                        }}
                      >
                        <LocationInput
                          handleSelectLocation={handleSelectLocation}
                          locationErr={locationErr}
                          errorText={errorText}
                        />
                      </Grid>
                      <Typography
                        color='error'
                        variant='body2'
                        className='mb-2'
                      >
                        {locationErr && errorText}
                      </Typography>
                    </div>
                  </div>
                  <Divider />

                  <Grid container className='mt-2 mb-3'>
                    <div className='mb-2'>
                      <Typography variant='body1'>Date and Time</Typography>
                      <Typography gutterBottom variant='body2'>
                        Tell event-goers when your event starts and ends so they
                        can make plans to attend.
                      </Typography>
                    </div>
                    <Grid item xs={12} md={6} className='mb-2'>
                      <Typography gutterBottom variant='body2'>
                        Start Date*
                      </Typography>
                      <Flatpickr
                        data-enable-time
                        className={classes.datePicker}
                        value={eventStartDate}
                        options={{
                          minDate: 'today',
                          dateFormat: 'F J Y at h:i',
                        }}
                        onChange={(date) => {
                          setEventStartDate(new Date(date).toISOString());
                          setDateErr(false);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} className='mb-2'>
                      <Typography gutterBottom variant='body2'>
                        End Date*
                      </Typography>
                      <Flatpickr
                        data-enable-time
                        className={classes.datePicker}
                        value={eventEndDate}
                        options={{
                          minDate: 'today',
                          dateFormat: 'F J Y at h:i',
                        }}
                        onChange={(date) => {
                          setEventEndDate(new Date(date).toISOString());
                          setDateErr(false);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Typography color='error' variant='body2'>
                    {dateErr && errorText}
                  </Typography>

                  <div
                    style={{
                      display: openImage ? 'block' : 'none',
                    }}
                    className='mt-2'
                  >
                    <DropzoneArea
                      clearOnUnmount
                      clickable={true}
                      onChange={(files) => {
                        setEventImage(files[0]);
                        if (files[0]) {
                          setPreviewURL(URL.createObjectURL(files[0]));
                        }
                      }}
                      dropzoneText={'Drag n drop event banner or click'}
                      acceptedFiles={['image/*']}
                      maxFileSize={5000000}
                      filesLimit={1}
                      showAlerts={['error']}
                      dropzoneClass='create-event-dropzone'
                      showPreviews={false}
                      showPreviewsInDropzone
                      previewGridProps={{
                        container: { spacing: 1, direction: 'row' },
                      }}
                    />
                  </div>
                  {previewURL && (
                    <Card
                      style={{
                        height: 300,
                        borderRadius: 8,
                        width: '100%',
                        backgroundImage: 'url(' + previewURL + ')',
                        backgroundSize: 'cover',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        backgroundBlendMode: 'soft-light',
                      }}
                    >
                      <div className='space-between mx-3 my-2'>
                        <Typography variant='body2'></Typography>
                        <Typography variant='body1'></Typography>
                        <IconButton
                          color='primary'
                          size='small'
                          className='m-1 p-1'
                        >
                          <CloseRounded
                            onClick={() => {
                              //setFile(null);
                              setEventImage(null);
                              setPreviewURL();
                            }}
                          />
                        </IconButton>
                      </div>
                    </Card>
                  )}
                </CardContent>
              </Card>

              {/* <Divider /> */}
              <div className='space-between mt-1'>
                <div className='center-horizontal'>
                  <IconButton
                    size='small'
                    className='m-1 p-1'
                    onClick={() => {
                      document
                        .getElementsByClassName('create-event-dropzone')[0]
                        .click();
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
