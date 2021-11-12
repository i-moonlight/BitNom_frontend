import { Button, Snackbar, SnackbarContent, useTheme } from '@mui/material';
import { Fragment } from 'react';

export default function AcceptCookies() {
    const theme = useTheme();

    const accepted = true;
    // localStorage.getItem('@AcceptCookies')
    //   ? JSON.parse(localStorage.getItem('@AcceptCookies'))
    //   : false;

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={!accepted}
            autoHideDuration={6000}
        >
            <SnackbarContent
                action={
                    <Fragment>
                        <Button
                            color="inherit"
                            size="small"
                            textCase
                            onClick={() => {
                                localStorage.setItem(
                                    '@AcceptCookies',
                                    JSON.stringify(true)
                                );
                            }}
                        >
                            I Agree
                        </Button>
                    </Fragment>
                }
                style={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                }}
                message="BitNorm uses cookies on this site to enhance your user experience, understand site usage, and assist in our marketing efforts."
            />
        </Snackbar>
    );
}
