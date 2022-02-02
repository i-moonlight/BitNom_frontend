import { Box, Container, Tabs, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useStyles } from '../../utilities/styles.components';
import { BitTab } from './TabsBar';

const menuItems = [
    { label: 'Home', path: '/connect' },
    { label: 'Trending', path: '/connect/trending' },
    { label: 'Profile', path: '/connect/profile' },
    { label: 'People', path: '/connect/people' },
];

export default function ConnectBar() {
    const [activeTab, setActiveTab] = useState(0);
    const classes = useStyles();
    const smDown = useMediaQuery('(max-width:959px)');

    const history = useHistory();

    // useMemo(() => function, input)

    useEffect(() => {
        menuItems.map(({ path }, index) => {
            if (window.location.pathname === path) {
                setActiveTab(index);
            }
        });
    }, []);

    return (
        <Box className={classes.root}>
            <Container maxWidth="lg">
                {smDown && (
                    <Tabs
                        value={activeTab}
                        onChange={(ev, index) => {
                            setActiveTab(index);
                        }}
                        indicatorColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {menuItems.map(({ label, path }) => {
                            return (
                                <BitTab
                                    key={`${label}`}
                                    label={label}
                                    aria-haspopup="true"
                                    onClick={() => {
                                        history.push(path);
                                        // setActiveTab(index);
                                    }}
                                />
                            );
                        })}
                    </Tabs>
                )}

                {/*  */}
            </Container>
        </Box>
    );
}
