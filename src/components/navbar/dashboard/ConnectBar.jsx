/* import {
    Brightness4Rounded,
    Brightness7Rounded,
    ChevronRight,
} from '@mui/icons-material'; */
import { Box, Container, useMediaQuery, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import { useStyles } from '../../utilities/styles.components';

export default function ConnectBar() {
    const classes = useStyles();
    const smDown = useMediaQuery('(max-width:959px)');

    const [selected, setSelected] = useState();
    const history = useHistory();
    useEffect(() => {
        if (
            location.pathname.includes('/connect') &&
            !location.pathname.includes('/connect/')
        ) {
            setSelected(0);
        } else if (location.pathname.includes('/connect/trending')) {
            setSelected(1);
        } else if (location.pathname.includes('/connect/profile')) {
            setSelected(2);
        }
    }, [setSelected]);

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
                                        selected === 0 ? 'primary' : 'inherit'
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
                                        selected === 1 ? 'primary' : 'inherit'
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
                                        selected === 2 ? 'primary' : 'inherit'
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
                            </div>
                        </>
                    )}
                </div>
            </Container>
        </Box>
    );
}
