import React from 'react';
import { useFormikContext } from 'formik';
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';

export default function TextField({
  name,
  label,
  placeholder,
  errorText,
  defaultValue,
  adornment,
  adornmentType,
  type,
  ...defaultProps
}) {
  const { handleChange, errors, setFieldTouched, touched } = name
    ? useFormikContext()
    : {};

  return (
    <FormControl
      id="formik-input"
      fullWidth
      variant="outlined"
      color="primary"
      style={{ marginTop: 8, marginBottom: 8, padding: 0 }}
      size="small"
    >
      {label && (
        <InputLabel
          style={{ color: errorText && '#F44336' }}
          htmlFor="formik-input"
        >
          {label}
        </InputLabel>
      )}
      <OutlinedInput
        fullWidth
        label={label}
        error={name && touched[name] && errors[name] && true}
        defaultValue={defaultValue ? defaultValue : null}
        placeholder={placeholder}
        onChange={name && handleChange(name)}
        onBlur={() => name && setFieldTouched(name)}
        type={type}
        startAdornment={
          adornment && adornmentType !== 'end' ? (
            <InputAdornment position="start">{adornment}</InputAdornment>
          ) : null
        }
        endAdornment={
          adornment && adornmentType === 'end' ? (
            <InputAdornment position="end">{adornment}</InputAdornment>
          ) : null
        }
        {...defaultProps}
      />
      {name && touched[name] && errors[name] ? (
        <small
          className="ml-5 mt-1 text-sm text-start"
          style={{ color: '#F44336' }}
        >
          {errors[name]}
        </small>
      ) : null}
      {errorText && (
        <small
          className="ml-5 mt-1 text-sm text-start"
          style={{ color: '#F44336' }}
        >
          {errorText}
        </small>
      )}
    </FormControl>
  );
}
