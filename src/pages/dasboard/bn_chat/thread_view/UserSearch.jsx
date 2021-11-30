import {
    Autocomplete,
    Avatar,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { getUserInitials } from '../../../../utilities/Helpers';
import { generateRandomColor } from '../../utilities/functions';

export default function UserSearch({
    searchResults,
    loading,
    setSearchedValues,
    searchTerm,
    updateSearchTerm,
    setChatRecipients,
    chatRecipients,
    setErrorText,
}) {
    const [term, setTerm] = useState(searchTerm);
    const [inputValue, setInputValue] = useState('');
    return (
        <Autocomplete
            disablePortal
            options={searchResults || []}
            loading={loading}
            value={chatRecipients}
            inputValue={inputValue}
            onChange={(e, values) => {
                setSearchedValues(values);
                setChatRecipients([...values]);
            }}
            onInputChange={(event, newInputValue) => {
                if (chatRecipients?.length === 3) {
                    setErrorText('You can only send upto one chat invite');
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
                    label="users"
                    value={term}
                    variant="outlined"
                    onChange={(e) => {
                        updateSearchTerm(e.target.value);
                        setTerm(e.target.value);
                    }}
                />
            )}
            renderOption={(option) => {
                return (
                    <Grid container alignItems="center">
                        <Avatar
                            src={
                                option?.profile_pic
                                    ? process.env.REACT_APP_BACKEND_URL +
                                      option?.profile_pic
                                    : ''
                            }
                            style={{
                                backgroundColor: generateRandomColor(),
                                marginRight: '5px',
                            }}
                        >
                            {option?.profile_pic
                                ? ''
                                : getUserInitials(option?.displayName)}
                        </Avatar>
                        <Grid item xs>
                            <span
                                key={option?._id}
                                //style={{ fontWeight: part.highlight ? 700 : 400 }}
                            >
                                {option?.displayName}
                            </span>

                            <Typography variant="body2" color="textSecondary">
                                {`@${option?._id}`}
                            </Typography>
                        </Grid>
                    </Grid>
                );
            }}
        />
    );
}
