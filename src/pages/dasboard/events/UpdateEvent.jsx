import { useMutation, useQuery } from '@apollo/client';
import { CameraAltRounded, CloseRounded } from '@mui/icons-material';
import {
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    InputBase,
    ListItem,
    ListItemText,
    Modal,
    Paper,
    Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import 'flatpickr/dist/themes/material_blue.css';
import debounce from 'lodash/debounce';
import { useEffect, useRef, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../components/Button';
import {
    MUTATION_DELETE_EVENT,
    MUTATION_UPDATE_EVENT,
    QUERY_EVENT_BY_ID,
    QUERY_LOAD_EVENTS,
    QUERY_SEARCH_USERS,
} from '../utilities/queries';
import LocationInput from './LocationInput';
import OrganizerSearch from './OrganizerSearch';

export default function UpdateEvent({
    openUpdate,
    setOpenUpdate,
    eventToEdit,
    setEventToEdit,
}) {
    const classes = useStyles();
    const [openDelete, setOpenDelete] = useState(false);

    const [descriptionErr, setDescriptionErr] = useState(false);
    const [organizersErr, setOrganizerErr] = useState(false);
    const [tagsErr, setTagsErr] = useState(false);
    const [linkErr, setLinkErr] = useState(false);
    const [locationErr, setLocationErr] = useState(false);
    const [titleErr, setTitleErr] = useState(false);
    const [errors, setErrors] = useState([]);
    const [errorText, setErrorText] = useState('');

    const [eventDescription, setEventDescription] = useState('');
    const [eventLink, setEventLink] = useState('');
    const [eventImage, setEventImage] = useState(undefined);
    const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventTitle, setEventTitle] = useState('');
    const [locationType, setLocationType] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [address, setAddress] = useState('');
    const [previewURL, setPreviewURL] = useState();
    const [tagText, setTagText] = useState('');
    const [eventTags, setEventTags] = useState([]);

    const [eventOrganizers, setEventOrganizers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedValues, setSearchedValues] = useState();
    const [selectedLocation, setSelectedLocation] = useState(null);
    //const theme = useTheme();

    const state = useSelector((st) => st);
    const user = state.auth.user;
    const history = useHistory();

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
        updateEvent,
        {
            loading,
            data,
            //  error
        },
    ] = useMutation(MUTATION_UPDATE_EVENT);

    const [deleteEvent] = useMutation(MUTATION_DELETE_EVENT);

    const onUpdateEvent = (IUpdateEvent) => {
        updateEvent({
            variables: {
                data: IUpdateEvent,
            },
            errorPolicy: 'all',
            refetchQueries: [
                {
                    query: QUERY_EVENT_BY_ID,
                    variables: { _id: eventToEdit?._id },
                },
            ],
        }).then(({ data: updateEventData, errors: updateEventErrors }) => {
            if (updateEventData?.Events?.update) {
                handleCloseEventModal();
            }
            if (updateEventErrors) {
                if (
                    updateEventErrors[0]?.message?.includes(
                        'Unsupported MIME type:'
                    )
                ) {
                    setPreviewURL();
                    setEventImage(null);
                    const message = updateEventErrors[0]?.message;
                    const mime = message?.substring(message?.indexOf(':') + 1);
                    setErrors([
                        `~ Unsupported file type! The original type of your image is ${mime}`,
                    ]);
                } else if (updateEventErrors[0]?.message == 400) {
                    const errorObject = updateEventErrors[0];
                    const errorArr = [];
                    for (const [key, value] of Object.entries(
                        errorObject?.state
                    )) {
                        errorArr.push(`~ ${value[0]}`);
                        if (key === 'title') {
                            setTitleErr(true);
                        } else if (key === 'description') {
                            setDescriptionErr(true);
                        } else if (key === 'organizers') {
                            setOrganizerErr(true);
                        } else if (key === 'link') {
                            setLinkErr(true);
                        } else if (key === 'location') {
                            setLocationErr(true);
                        }
                    }
                    setErrors(errorArr);
                } else {
                    setErrors([
                        `~ Something is wrong! Check your connection or use another image.`,
                    ]);
                }
            }
        });
    };

    useEffect(() => {
        if (eventToEdit?.image !== null && eventToEdit?.image?.trim() !== '') {
            setPreviewURL(
                process.env.REACT_APP_BACKEND_URL + eventToEdit?.image
            );
        }
        if (eventToEdit) {
            setEventTitle(eventToEdit?.title);
            setEventDescription(eventToEdit?.description);
            setEventStartDate(new Date(eventToEdit?.startDate).getTime());
            setEventEndDate(new Date(eventToEdit?.endDate).getTime());
            setEventOrganizers(eventToEdit?.organizers);
            setSearchedValues(eventToEdit?.organizers);
            setEventTags(eventToEdit?.tags);
            setLatitude(eventToEdit?.location?.lat);
            setLongitude(eventToEdit?.location?.long);
            setLocationType(eventToEdit?.location?.type);
            setSelectedLocation(eventToEdit?.location?.address);
            setEventLink(eventToEdit?.link);
            setAddress(eventToEdit?.location?.address);
        }
    }, [eventToEdit]);

    const onDeleteEvent = async (id) => {
        await deleteEvent({
            variables: {
                _id: id,
            },
            refetchQueries: [
                {
                    query: QUERY_LOAD_EVENTS,
                    variables: {
                        data: { host: user?._id, limit: 50 },
                    },
                },
            ],
        });

        handleCloseEventModal();
        history.push(`/dashboard/events`);
    };

    const handleDeleteEvent = (e) => {
        e.preventDefault();
        onDeleteEvent(eventToEdit?._id);
        setOpenDelete(false);
        setOpenUpdate(false);
    };

    const ErrorRef = useRef(null);

    const handleScrollModal = () => {
        ErrorRef?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(handleScrollModal, [errors]);

    const handleCloseEventModal = () => {
        setErrors([]);
        setEventLink('');
        setEventImage(undefined);
        setEventTitle('');
        setEventDescription('');
        setDescriptionErr(false);
        setOrganizerErr(false);
        setTagsErr(false);
        setTitleErr(false);
        setLinkErr(false);
        setLocationErr(false);
        setEventOrganizers([]);
        setEventStartDate('');
        setEventEndDate('');
        setLocationType('');
        setLatitude('');
        setAddress('');
        setLongitude('');
        setEventTags([]);
        setTagText('');
        setPreviewURL();
        setOpenUpdate(false);
        setEventToEdit(null);
    };

    const handleSetTags = () => {
        if (tagText.length < 3) return;
        const exist = eventTags?.filter((tag) => tag === tagText);

        if (exist.length) {
            setErrorText(`${tagText} is already added!`);
            return setTagsErr(true);
        }
        setErrorText('');
        setTagsErr(false);
        setEventTags([...eventTags, tagText]);
        setTagText('');
    };

    const handleSelectLocation = (location) => {
        geocodeByPlaceId(location?.place_id)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                setLatitude(latLng?.lat);
                setLongitude(latLng?.lng);
                setAddress(location?.description);
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.error('Error', error);
            });
    };

    const handleSelectImage = (files) => {
        if (files.length < 1) return;
        let counter = 0;
        files.map((file) => {
            const image = new Image();
            image.addEventListener('load', () => {
                // only select images within width/height/size limits
                if (
                    (image.width <= 1200) &
                    (image.height <= 1350) &
                    (file.size <= 2500000)
                ) {
                    counter += 1;
                } else {
                    return setErrors([
                        ...errors,
                        '~ Image should be less than 1200px by 1350px & below 2mb.',
                    ]);
                }
                if (counter === 1) {
                    setEventImage(file);
                    setPreviewURL(URL.createObjectURL(file));
                    setErrors((prev) =>
                        prev.filter(
                            (item) =>
                                item !==
                                '~ Image should be less than 1200px by 1350px & below 2mb.'
                        )
                    );
                }
            });
            image.src = URL.createObjectURL(file);
        });
    };

    const handleUpdateEvent = (e) => {
        e.preventDefault();

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

        onUpdateEvent({
            event_id: eventToEdit?._id,
            title: eventTitle,
            image: eventImage,
            description: eventDescription,
            tags: eventTags,
            organizers: organizers,
            startDate: new Date(eventStartDate).toISOString(),
            endDate: new Date(eventEndDate).toISOString(),
            link: eventLink,
            location: {
                type: locationType,
                lat: String(latitude),
                long: String(longitude),
                address: String(address),
            },
        });
    };

    return (
        <Modal
            data={data}
            style={{
                outline: 'none',

                '&:focusVisible': {
                    outline: 'none',
                },
            }}
            className="center-horizontal center-vertical w-100"
            open={openUpdate}
        >
            <Grid container>
                <Grid item lg={3} md={2} sm={1} xs={1}></Grid>
                <Grid item lg={6} md={8} sm={10} xs={10}>
                    <Card>
                        <div className="space-between mx-3 my-2 center-horizontal">
                            <Typography variant="body2"></Typography>
                            <Typography variant="body1">
                                Update Event
                            </Typography>
                            <IconButton
                                onClick={() => {
                                    handleCloseEventModal();
                                }}
                                size="small"
                                className="m-1 p-1"
                            >
                                <CloseRounded />
                            </IconButton>
                        </div>

                        <Divider />
                        <CardContent
                            style={{
                                maxHeight: '85vh',
                                overflowY: 'auto',
                            }}
                        >
                            <Card elevation={0}>
                                <div
                                    style={{
                                        height: 300,
                                        borderRadius: 8,
                                        width: '100%',
                                        backgroundImage:
                                            previewURL &&
                                            'url(' + previewURL + ')',
                                        backgroundSize: 'cover',
                                        backgroundColor: !previewURL && '#aaa',
                                        backgroundBlendMode: 'soft-light',
                                        marginBottom: '15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        document
                                            .getElementById(
                                                'update-event-image'
                                            )
                                            .click();
                                    }}
                                >
                                    <CameraAltRounded />
                                    <div style={{ display: 'none' }}>
                                        <input
                                            id="update-event-image"
                                            type="file"
                                            onChange={(e) => {
                                                handleSelectImage(
                                                    Array.from(e.target.files)
                                                );
                                            }}
                                            accept="image/jpeg, image/png"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <TextField
                                        required
                                        fullWidth
                                        variant="outlined"
                                        name="title"
                                        error={titleErr}
                                        className="mb-2"
                                        label="Title"
                                        value={eventTitle}
                                        helperText={
                                            <Typography
                                                variant="body2"
                                                className="space-between"
                                                component="div"
                                            >
                                                <span></span>
                                                <span>{`${eventTitle?.length}/50`}</span>
                                            </Typography>
                                        }
                                        onChange={(e) => {
                                            setEventTitle(
                                                eventTitle?.length >= 50
                                                    ? e.target.value.substring(
                                                          0,
                                                          e.target.value
                                                              .length - 1
                                                      )
                                                    : e.target.value.substring(
                                                          0,
                                                          50
                                                      )
                                            );
                                            setTitleErr(false);
                                        }}
                                    />

                                    <TextField
                                        required
                                        fullWidth
                                        multiline
                                        error={descriptionErr}
                                        variant="outlined"
                                        name="description"
                                        className="mb-2"
                                        label="Description"
                                        rows={4}
                                        value={eventDescription}
                                        helperText={
                                            <Typography
                                                variant="body2"
                                                className="space-between"
                                                component="div"
                                            >
                                                <span></span>
                                                <span>{`${eventDescription?.length}/250`}</span>
                                            </Typography>
                                        }
                                        onChange={(e) => {
                                            setEventDescription(
                                                eventDescription?.length >= 250
                                                    ? e.target.value.substring(
                                                          0,
                                                          e.target.value
                                                              .length - 1
                                                      )
                                                    : e.target.value.substring(
                                                          0,
                                                          250
                                                      )
                                            );
                                            setDescriptionErr(false);
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="link"
                                        error={linkErr}
                                        multiline
                                        className="mb-2"
                                        value={eventLink}
                                        label="Registration or broadcast link"
                                        onChange={(e) => {
                                            setEventLink(
                                                eventLink?.length >= 75
                                                    ? e.target.value.substring(
                                                          0,
                                                          e.target.value
                                                              .length - 1
                                                      )
                                                    : e.target.value.substring(
                                                          0,
                                                          75
                                                      )
                                            );
                                            setLinkErr(false);
                                        }}
                                    />
                                    <Divider />
                                    <div className="mb-3">
                                        <div>
                                            <div>
                                                <Typography variant="body1">
                                                    Organizers
                                                </Typography>
                                                <Typography
                                                    gutterBottom
                                                    variant="body2"
                                                >
                                                    Add a few friends as event
                                                    admins and they will appear
                                                    in the attendees list.
                                                </Typography>
                                            </div>
                                            <>
                                                <OrganizerSearch
                                                    loading={usersLoading}
                                                    searchResults={
                                                        usersData?.Users?.search
                                                    }
                                                    searchedValues={
                                                        searchedValues
                                                    }
                                                    setSearchedValues={
                                                        setSearchedValues
                                                    }
                                                    initialTerm={searchTerm}
                                                    updateSearchTerm={
                                                        setSearchTermDebounced
                                                    }
                                                    setEventOrganizers={
                                                        setEventOrganizers
                                                    }
                                                    setOrganizerErr={
                                                        setOrganizerErr
                                                    }
                                                    setErrorText={setErrorText}
                                                    eventOrganizers={
                                                        eventOrganizers
                                                    }
                                                    organizersErr={
                                                        organizersErr
                                                    }
                                                />
                                                <Typography
                                                    variant="body2"
                                                    className="mt-2 mb-2 space-between"
                                                    component="div"
                                                >
                                                    <span>{`${eventOrganizers?.length}/3 friends`}</span>
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

                                    <div className="mb-3">
                                        <div>
                                            <div>
                                                <Typography variant="body1">
                                                    Tags
                                                </Typography>
                                                <Typography variant="body2">
                                                    Improve discoverability of
                                                    your event by addding tags
                                                    relevant to the subject
                                                    matter.
                                                </Typography>
                                            </div>
                                            <>
                                                <Paper
                                                    elevation={0}
                                                    component="form"
                                                    className={
                                                        classes.paperSearch
                                                    }
                                                >
                                                    {/* <Search color='inherit' /> */}
                                                    <InputBase
                                                        value={tagText}
                                                        //onChange={(e) => setTagText(e.target.value)}
                                                        variant="outlinedInput"
                                                        onChange={(e) =>
                                                            setTagText(
                                                                tagText?.length >=
                                                                    20
                                                                    ? '#'.concat(
                                                                          e.target.value
                                                                              .replace(
                                                                                  /#/g,
                                                                                  ''
                                                                              )
                                                                              .replace(
                                                                                  /\s/g,
                                                                                  ''
                                                                              )
                                                                              .substring(
                                                                                  0,
                                                                                  e
                                                                                      .target
                                                                                      .value
                                                                                      .length -
                                                                                      1
                                                                              )
                                                                      )
                                                                    : '#'.concat(
                                                                          e.target.value
                                                                              .replace(
                                                                                  /#/g,
                                                                                  ''
                                                                              )
                                                                              .replace(
                                                                                  /\s/g,
                                                                                  ''
                                                                              )
                                                                              .substring(
                                                                                  0,
                                                                                  20
                                                                              )
                                                                      )
                                                            )
                                                        }
                                                        className={
                                                            classes.input
                                                        }
                                                        onKeyPress={(e) => {
                                                            if (
                                                                e.key ===
                                                                'Enter'
                                                            ) {
                                                                e.preventDefault();
                                                                handleSetTags();
                                                            }
                                                        }}
                                                        placeholder='eg "CryptoEvent"'
                                                        inputProps={{
                                                            'aria-label':
                                                                'add tags',
                                                        }}
                                                        endAdornment={
                                                            <Button
                                                                onClick={() => {
                                                                    handleSetTags();
                                                                }}
                                                                //disabled={addLoading}
                                                                size="small"
                                                                className="my-1"
                                                                style={{
                                                                    display:
                                                                        eventTags?.length ===
                                                                            5 &&
                                                                        'none',
                                                                }}
                                                            >
                                                                Add
                                                            </Button>
                                                        }
                                                    />
                                                </Paper>

                                                <Typography
                                                    variant="body2"
                                                    className="mt-2 mb-2 space-between"
                                                    component="div"
                                                >
                                                    <span>{`${eventTags?.length}/5 tags`}</span>
                                                    <span>{`${tagText?.length}/20`}</span>
                                                </Typography>
                                                <Typography
                                                    color="error"
                                                    variant="body2"
                                                    className="mb-2"
                                                >
                                                    {tagsErr && errorText}
                                                </Typography>
                                            </>
                                            <div>
                                                {eventTags?.map((item) => (
                                                    <Chip
                                                        color="primary"
                                                        key={item}
                                                        label={item}
                                                        className="me-2 mb-2"
                                                        //disabled={removeLoading}
                                                        onDelete={() => {
                                                            const tags =
                                                                eventTags?.filter(
                                                                    (tag) =>
                                                                        tag !==
                                                                        item
                                                                );
                                                            setEventTags(tags);
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div className="mt-2 mb-3">
                                        <div>
                                            <div>
                                                <Typography variant="body1">
                                                    Location
                                                </Typography>
                                                <Typography
                                                    gutterBottom
                                                    variant="body2"
                                                >
                                                    Let people know the location
                                                    of your event and inform
                                                    attendees where to show up.
                                                </Typography>
                                            </div>
                                            <div
                                                className={
                                                    classes.locationButtons
                                                }
                                            >
                                                <Button
                                                    variant={
                                                        locationType ===
                                                        'physical'
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
                                                        setLocationType(
                                                            'physical'
                                                        );
                                                        setLocationErr(false);
                                                    }}
                                                >
                                                    Venue
                                                </Button>
                                                <Button
                                                    variant={
                                                        locationType ===
                                                        'virtual'
                                                            ? 'contained'
                                                            : 'outlined'
                                                    }
                                                    style={{
                                                        width: '25%',
                                                        textTransform: 'none',
                                                    }}
                                                    disableRipple
                                                    onClick={() => {
                                                        setLocationType(
                                                            'virtual'
                                                        );
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
                                                className="mb-2"
                                                style={{
                                                    display:
                                                        locationType !==
                                                            'physical' &&
                                                        'none',
                                                }}
                                            >
                                                <LocationInput
                                                    handleSelectLocation={
                                                        handleSelectLocation
                                                    }
                                                    locationErr={locationErr}
                                                    errorText={errorText}
                                                    selectedLocation={
                                                        selectedLocation
                                                    }
                                                    setSelectedLocation={
                                                        setSelectedLocation
                                                    }
                                                />
                                            </Grid>
                                        </div>
                                    </div>
                                    <Divider />

                                    <Grid container className="mt-2 mb-3">
                                        <div className="mb-2">
                                            <Typography variant="body1">
                                                Date and Time
                                            </Typography>
                                            <Typography
                                                gutterBottom
                                                variant="body2"
                                            >
                                                Tell event-goers when your event
                                                starts and ends so they can make
                                                plans to attend.
                                            </Typography>
                                        </div>
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            className="mb-2"
                                        >
                                            <Typography
                                                gutterBottom
                                                variant="body2"
                                            >
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
                                                    setEventStartDate(
                                                        new Date(
                                                            date
                                                        ).toISOString()
                                                    );
                                                }}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            className="mb-2"
                                        >
                                            <Typography
                                                gutterBottom
                                                variant="body2"
                                            >
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
                                                    setEventEndDate(
                                                        new Date(
                                                            date
                                                        ).toISOString()
                                                    );
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            </Card>
                            {/* <Divider /> */}
                            <Dialog
                                open={openDelete}
                                onClose={() => setOpenDelete(false)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {'Delete this event?'}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        This can’t be undone and it will be
                                        removed from your profile, the timeline
                                        of any accounts that follow you, and
                                        from the BNConnect platform.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={() => setOpenDelete(false)}
                                        color="primary"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleDeleteEvent}
                                        color="primary"
                                        autoFocus
                                    >
                                        Delete
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            {errors?.length > 0 && (
                                <Card
                                    elevation={0}
                                    style={{
                                        marginTop: '3px',
                                        background: 'transparent',
                                    }}
                                    component="div"
                                    variant="outlined"
                                >
                                    {errors?.map((errItem) => (
                                        <ListItem key={errItem}>
                                            <ListItemText
                                                secondary={
                                                    <Typography
                                                        variant="body2"
                                                        color="error"
                                                    >
                                                        {`${errItem}`}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </Card>
                            )}
                            <div className="space-between mt-1">
                                <div className="center-horizontal"></div>
                                <div>
                                    <Button
                                        style={{
                                            backgroundColor: '#ba000d',
                                            color: '#FFFFFF',
                                            marginRight: '12px',
                                            //display: loading ? 'none' : 'block',
                                        }}
                                        size="small"
                                        disabled={loading ? true : false}
                                        variant="contained"
                                        onClick={() => setOpenDelete(true)}
                                    >
                                        Delete
                                    </Button>

                                    <Button
                                        size="small"
                                        onClick={handleUpdateEvent}
                                        disabled={loading ? true : false}
                                    >
                                        Update
                                    </Button>
                                </div>
                            </div>
                            <div ref={ErrorRef} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Modal>
    );
}

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
