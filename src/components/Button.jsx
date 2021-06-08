import React from 'react';
import { Button as MuiButton } from '@material-ui/core';
import logo_google from '../assets/google.png';

export default function Button({ color, variant, google, children, ...props }) {
  return (
    <MuiButton
      color={color ? color : 'primary'}
      variant={variant ? variant : 'contained'}
      disableElevation
      style={{
        backgroundColor: google && '#f2f2f2',
        color: google && '#818181',
      }}
      {...props}
    >
      {google && (
        <img src={logo_google} alt='' style={{ width: 20, marginRight: 16 }} />
      )}
      {children}
    </MuiButton>
  );
}
