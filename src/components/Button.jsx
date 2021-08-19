import { Button as MuiButton } from '@material-ui/core';
import { useFormikContext } from 'formik';
import React from 'react';
import logo_google from '../assets/components/google.svg';

export default function Button({
  textCase,
  color,
  colorAlt,
  submit,
  onClick,
  variant,
  variantAlt,
  google,
  children,
  ...props
}) {
  const formikContext = useFormikContext();

  let buttonVariant = variantAlt ? variantAlt : variant;
  let buttonColor = colorAlt ? colorAlt : color;

  return (
    <MuiButton
      color={buttonColor ? buttonColor : 'primary'}
      variant={buttonVariant ? buttonVariant : 'contained'}
      disableElevation
      style={{
        backgroundColor: google && '#f2f2f2',
        buttonColor: !buttonColor && google && '#818181',
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
