import { Button, Snackbar, SnackbarContent, useTheme } from '@material-ui/core';
import React from 'react';

export default function AcceptCookies() {
  const theme = useTheme();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={false}
      autoHideDuration={6000}
      // onClose={handleClose}
    >
      <SnackbarContent
        action={
          <React.Fragment>
            <Button color={theme.palette.text.primary} size='small' textCase>
              I Agree
            </Button>
          </React.Fragment>
        }
        style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
        message='BitNorm uses cookies on this site to enhance your user experience, understand site usage, and assist in our marketing efforts.'
      />
    </Snackbar>
  );
}
