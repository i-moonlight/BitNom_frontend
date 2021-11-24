import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Autocomplete, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import throttle from 'lodash/throttle';
import React from 'react';

function loadScript(src, position, id) {
    if (!position) {
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}));

export default function LocationInput({
    handleSelectLocation,
    locationErr,
    errorText,
    selectedLocation,
    setSelectedLocation,
}) {
    const classes = useStyles();
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const loaded = React.useRef(false);

    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}&libraries=places`,
                document.querySelector('head'),
                'google-maps'
            );
        }

        loaded.current = true;
    }

    const fetchP = React.useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(
                    request,
                    callback
                );
            }, 200),
        []
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current =
                new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === '') {
            setOptions(selectedLocation ? [selectedLocation] : []);
            return undefined;
        }

        fetchP({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [];

                if (selectedLocation) {
                    newOptions = [selectedLocation];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [selectedLocation, inputValue, fetchP]);

    return (
        <Autocomplete
            id="google-map-demo"
            style={{ width: '100%' }}
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.description
            }
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={selectedLocation}
            onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setSelectedLocation(newValue);
                handleSelectLocation(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Event venue"
                    variant="outlined"
                    fullWidth
                    error={locationErr}
                    className="mt-3 mb-2"
                    helperText={
                        <Typography variant="body2" className="space-between">
                            <span>{locationErr && errorText}</span>
                            <span></span>
                        </Typography>
                    }
                />
            )}
            renderOption={(props, option) => {
                return (
                    <Grid {...props} container alignItems="center">
                        <Grid item>
                            <LocationOnIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs>
                            <span
                                key={
                                    option === 'string'
                                        ? option
                                        : option?.description
                                }
                                //style={{ fontWeight: part.highlight ? 700 : 400 }}
                            >
                                {option === 'string'
                                    ? option
                                    : option?.structured_formatting?.main_text}
                            </span>

                            <Typography variant="body2" color="textSecondary">
                                {option === 'string'
                                    ? option
                                    : option?.description}
                            </Typography>
                        </Grid>
                    </Grid>
                );
            }}
        />
    );
}
