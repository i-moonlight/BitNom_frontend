import React from 'react';
import { Button as MuiButton } from '@material-ui/core';
import logo_google from '../assets/components/google.svg';
import { useFormikContext } from 'formik';

export default function Button({
  textCase,
  color,
  submit,
  onClick,
  variant,
  google,
  children,
  ...props
}) {
  const formikContext = useFormikContext();

  return (
    <MuiButton
      color={color ? color : 'primary'}
      variant={variant ? variant : 'contained'}
      disableElevation
      style={{
        backgroundColor: google && '#f2f2f2',
        color: !color && google && '#818181',
        textTransform: textCase && 'none',
      }}
      onClick={submit ? formikContext.handleSubmit : onClick}
      {...props}
    >
      {google && (
        <img src={logo_google} alt='' style={{ width: 20, marginRight: 16 }} />
      )}
      {children}
    </MuiButton>
  );
}
