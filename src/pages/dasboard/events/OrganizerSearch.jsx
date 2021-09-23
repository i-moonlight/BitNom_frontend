import React, { useState } from 'react';
import {
  TextField,
  Grid,
  makeStyles,
  Typography,
  Avatar,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { PersonRounded, ImageRounded, Search } from '@material-ui/icons';
import parse from 'autosuggest-highlight/parse';
import { generateRandomColor } from '../utilities/functions';
import { getUserInitials } from '../../../utilities/Helpers';
const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

function OrganizerSearch({
  searchResults,
  loading,
  initialTerm,
  updateSearchTerm,
  setEventOrganizers,
  setOrganizerErr,
  setErrorText,
}) {
  const classes = useStyles();
  const [term, setTerm] = useState(initialTerm);
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Autocomplete
      options={searchResults || []}
      loading={loading}
      value={value}
      onChange={(event, newValue) => {
        console.log(newValue, 'VALUE');
        if (value?.length === 3) {
          setErrorText('You can only add up to 3 friends');
          return setOrganizerErr(true);
        }
        /* const exist = value?.filter(
          (organizer) => organizer?.id === organizerName
        );

        if (exist.length) {
          setErrorText(`${organizerName} is already added!`);
          return setOrganizerErr(true);
        } */
        setErrorText('');
        setOrganizerErr(false);
        setValue(newValue);
        setEventOrganizers([...newValue]);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        console.log(newInputValue, 'INVALUE');
      }}
      multiple
      filterSelectedOptions
      getOptionLabel={(option) => option?._id}
      renderInput={(params) => (
        <TextField
          {...params}
          value={term}
          variant='outlined'
          onChange={(e) => {
            updateSearchTerm(e.target.value);
            setTerm(e.target.value);
          }}
        />
      )}
      renderOption={(option) => {
        /*  const matches = match(option?.displayName, inputValue);
        const parts = parse(option?.displayName, matches);
        ); */
        return (
          <Grid container alignItems='center'>
            <Avatar
              src={
                option?.profile_pic
                  ? process.env.REACT_APP_BACKEND_URL + option?.profile_pic
                  : ''
              }
              style={{
                backgroundColor: generateRandomColor(),
                marginRight: '5px',
              }}
            >
              {option?.profile_pic ? '' : getUserInitials(option?.displayName)}
            </Avatar>
            <Grid item xs>
              <span
                key={option?._id}
                //style={{ fontWeight: part.highlight ? 700 : 400 }}
              >
                {option?.displayName}
              </span>

              <Typography variant='body2' color='textSecondary'>
                {`@${option?.displayName}`}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}

export default OrganizerSearch;
