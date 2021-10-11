import React, { useState } from 'react';
import { TextField, Grid, Typography, Avatar } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
//import parse from 'autosuggest-highlight/parse';
import { generateRandomColor } from '../utilities/functions';
import { getUserInitials } from '../../../utilities/Helpers';

function OrganizerSearch({
  searchResults,
  searchedValues,
  setSearchedValues,
  loading,
  initialTerm,
  updateSearchTerm,
  setEventOrganizers,
  eventOrganizers,
  setOrganizerErr,
  setErrorText,
  organizersErr,
}) {
  const [term, setTerm] = useState(initialTerm);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Autocomplete
      options={searchResults || []}
      loading={loading}
      value={searchedValues}
      onChange={(event, newValue) => {                                             
        setErrorText('');
        setOrganizerErr(false);
        setSearchedValues(newValue);
        setEventOrganizers([...newValue]);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        if (eventOrganizers?.length === 3) {
          setErrorText('You can only add up to 3 friends');
          return setOrganizerErr(true);
        } else {
          setInputValue(newInputValue);
        }
      }}
      multiple
      filterSelectedOptions
      getOptionLabel={(option) => option?.displayName}
      renderInput={(params) => (
        <TextField
          {...params}
          value={term}
          variant='outlined'
          error={organizersErr}
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
                {`@${option?._id}`}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}

export default OrganizerSearch;
