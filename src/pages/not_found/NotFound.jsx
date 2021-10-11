import { makeStyles } from '@material-ui/core';
import { Container, Typography } from '@material-ui/core';
import React from 'react';
// import { useStyles } from '../welcome/landing/Landing';
import Wrapper from '../welcome/Wrapper';

export default function NotFound() {
    const classes = useStyles();
    return (
        <Wrapper>
            <Container className={classes.root} maxWidth="lg">
                <div className="my-5 py-5">
                    <Typography
                        className="mt-5 mb-2"
                        color="textSecondary"
                        variant="h2"
                    >
                        404: Not Found
                    </Typography>
                    <Typography
                        className="mb-5"
                        color="textSecondary"
                        variant="h4"
                    >
                        Sorry ... We cannot find what youre looking for
                    </Typography>
                </div>
            </Container>
        </Wrapper>
    );
}

const useStyles = makeStyles(() => ({
    root: {
        minHeight: window.innerHeight * 0.6,
    },
}));
