import { Box, Container, useMediaQuery, Button } from '@mui/material';
import { useHistory } from 'react-router';

import { useStyles } from '../../utilities/styles.components';

export default function ConnectBar() {
    const classes = useStyles();
    const smDown = useMediaQuery('(max-width:959px)');

    const history = useHistory();

    return (
        <Box className={classes.root}>
            <Container maxWidth="lg">
                <div className={classes.statusBar}>
                    {smDown && (
                        <>
                            <div className="center-horizontal">
                                <Button
                                    className="py-0 mx-1 my-1 fw-bold"
                                    variant="text"
                                    color={
                                        location.pathname.includes(
                                            '/connect'
                                        ) &&
                                        !location.pathname.includes('/connect/')
                                            ? 'primary'
                                            : 'inherit'
                                    }
                                    style={{
                                        textTransform: 'none',
                                    }}
                                    onClick={() => history.push('/connect')}
                                >
                                    Home
                                </Button>
                                <Button
                                    className="py-0 mx-1 my-1 fw-bold"
                                    color={
                                        location.pathname.includes(
                                            '/connect/trending'
                                        )
                                            ? 'primary'
                                            : 'inherit'
                                    }
                                    style={{
                                        textTransform: 'none',
                                    }}
                                    onClick={() =>
                                        history.push('/connect/trending')
                                    }
                                    variant="text"
                                >
                                    Trending
                                </Button>

                                <Button
                                    className="py-0 mx-1 my-1 fw-bold"
                                    color={
                                        location.pathname.includes(
                                            '/connect/profile'
                                        )
                                            ? 'primary'
                                            : 'inherit'
                                    }
                                    style={{
                                        textTransform: 'none',
                                    }}
                                    onClick={() =>
                                        history.push('/connect/profile')
                                    }
                                    variant="text"
                                >
                                    Profile
                                </Button>
                                <Button
                                    className="py-0 mx-1 my-1 fw-bold"
                                    color={
                                        location.pathname.includes(
                                            '/connect/people'
                                        )
                                            ? 'primary'
                                            : 'inherit'
                                    }
                                    style={{
                                        textTransform: 'none',
                                    }}
                                    onClick={() =>
                                        history.push('/connect/people')
                                    }
                                    variant="text"
                                >
                                    People
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </Container>
        </Box>
    );
}
