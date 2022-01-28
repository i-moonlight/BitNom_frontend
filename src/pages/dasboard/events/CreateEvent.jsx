import { useLazyQuery, useMutation } from '@apollo/client';
import { CameraAltRounded, CloseRounded } from '@mui/icons-material';
import {
    Card,
    CardContent,
    Chip,
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
//import { toast } from 'react-toastify';
import { Button } from '../../../components/Button';
import {
    MUTATION_CREATE_EVENT,
    QUERY_LOAD_EVENTS,
    QUERY_SEARCH_USERS,
} from '../utilities/queries';
import LocationInput from './LocationInput';
import OrganizerSearch from './OrganizerSearch';

export default function CreateEvent({ open, setOpen }) {
    const classes = useStyles();

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
    const [eventImage, setEventImage] = useState(null);
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

    const state = useSelector((st) => st);
    const user = state.auth.user;

    const setSearchTermDebounced = debounce(setSearchTerm, 500);

    const [searchUsers, { data: usersData, loading: usersLoading }] =
        useLazyQuery(QUERY_SEARCH_USERS);

    const [createEvent, { loading, data }] = useMutation(MUTATION_CREATE_EVENT);

    const onCreateEvent = (ICreateEvent) => {
        createEvent({
            variables: {
                data: ICreateEvent,
            },
            errorPolicy: 'all',
            refetchQueries: [
                {
                    query: QUERY_LOAD_EVENTS,
                    variables: { data: { host: user?._id, limit: 50 } },
                },
            ],
        }).then(({ data: createEventData, errors: createEventErrors }) => {
            if (createEventData?.Events?.create) {
                handleCloseEventModal();
            }
            if (createEventErrors) {
                if (
                    createEventErrors[0]?.message?.includes(
                        'Unsupported MIME type:'
                    )
                ) {
                    setPreviewURL();
                    setEventImage(null);
                    const message = createEventErrors[0]?.message;
                    const mime = message?.substring(message?.indexOf(':') + 1);
                    setErrors([
                        `~ Unsupported file type! The original type of your image is ${mime}`,
                    ]);
                } else if (createEventErrors[0]?.message == 400) {
                    const errorObject = createEventErrors[0];
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

    const handleSelectLocation = (location) => {
        geocodeByPlaceId(location?.place_id)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                setLatitude(latLng?.lat);
                setLongitude(latLng?.lng);
                setAddress(location?.description);
            })
            .catch(() => {});
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

    const handleCloseEventModal = () => {
        setErrors([]);

        setEventLink('');
        setEventImage(null);
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
        setOpen(false);
    };

    const ErrorRef = useRef(null);

    const handleScrollModal = () => {
        ErrorRef?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(handleScrollModal, [errors]);

    const handleCreateEvent = (e) => {
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
                type: String(locationType),
                lat: String(latitude),
                long: String(longitude),
                address: String(address),
            },
        });
    };

    useEffect(() => {
        searchTerm.length > 0 &&
            searchUsers({
                variables: {
                    params: { searchString: searchTerm },
                },
                context: { clientName: 'users' },
            });
    }, [searchTerm, searchUsers]);

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
            open={open}
        >
            <Grid container>
                <Grid item lg={3} md={2} sm={1} xs={1}></Grid>
                <Grid item lg={6} md={8} sm={10} xs={10}>
                    <Card>
                        <div className="space-between mx-3 my-2 center-horizontal">
                            <Typography variant="body2"></Typography>
                            <Typography variant="body1">
                                Create Event
                            </Typography>
                            <IconButton
                                size="small"
                                className="m-1 p-1"
                                onClick={() => {
                                    handleCloseEventModal();
                                }}
                            >
                                <CloseRounded />
                            </IconButton>
                        </div>

                        <Divider />
                        <CardContent
                            style={{
                                maxHeight: '85vh',
                                overflowY: 'scroll',
                            }}
                            id="createEventModal"
                        >
                            <div variant="elevation" elevation={0}>
                                <div
                                    style={{
                                        height: 200,
                                        borderRadius: 8,
                                        width: '100%',
                                        backgroundImage:
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
                                            .getElementById('event-image')
                                            .click();
                                    }}
                                >
                                    <CameraAltRounded />
                                    <div style={{ display: 'none' }}>
                                        <input
                                            id="event-image"
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
                                                <span>{`${eventDescription?.length}/300`}</span>
                                            </Typography>
                                        }
                                        onChange={(e) => {
                                            setEventDescription(
                                                eventDescription?.length >= 300
                                                    ? e.target.value.substring(
                                                          0,
                                                          e.target.value
                                                              .length - 1
                                                      )
                                                    : e.target.value.substring(
                                                          0,
                                                          300
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
                                            <div></div>
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
                                    <div className="mt-3 mb-3">
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
                                                    className={
                                                        classes.physicalEvent
                                                    }
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
                                                    className={
                                                        classes.virtualEvent
                                                    }
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

                                    <Grid container className="mt-3 mb-3">
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
                            </div>

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

                            {/* <Divider /> */}
                            <div className="space-between mt-1">
                                <div className="center-horizontal"></div>

                                <Button
                                    disabled={loading}
                                    size="small"
                                    onClick={handleCreateEvent}
                                >
                                    Save
                                </Button>
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
    physicalEvent: {
        width: '25%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginRight: '5px',
        },
        marginRight: '10px',
    },
    virtualEvent: {
        width: '25%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        textTransform: 'none',
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
