import { useQuery } from '@apollo/client';
import { KeyboardArrowRight } from '@mui/icons-material';
import {
    Card,
    Container,
    Grid,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import Screen from '../../../components/Screen';
import SEO from '../../../components/SEO';
import { GET_USER_NOTIFICATIONS } from '../utilities/queries';
import NotificationsListCard from './NotificationsListCard';

export default function Notifications() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const classes = useStyles();
    const mdDown = useMediaQuery('(max-width:1279px)');

    const { loading, data } = useQuery(GET_USER_NOTIFICATIONS, {
        context: { clientName: 'notifications' },
    });

    return (
        <Screen>
            <SEO
                title="Notifications | Bitnorm"
                url={`${window.location.origin}/notifications`}
                description={`Notifications from your activity on Bitnorm`}
            />
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {!mdDown && (
                            <Grid item lg={3}>
                                <SideBarMenu
                                    selectedIndex={selectedIndex}
                                    setSelectedIndex={setSelectedIndex}
                                />
                            </Grid>
                        )}
                        <Grid item xs={12} sm={12} md={8} lg={6}>
                            <NotificationsListCard
                                selectedIndex={selectedIndex}
                                setSelectedIndex={setSelectedIndex}
                                notifications={data?.Notification?.get}
                                loading={loading}
                            />
                        </Grid>
                        <Grid item md={4} lg={3}></Grid>
                    </Grid>
                </Container>
            </div>
        </Screen>
    );
}

function SideBarMenu({ selectedIndex, setSelectedIndex }) {
    const classes = useStyles();
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <Card
            variant="outlined"
            color="text.primary"
            className={classes.sidebar}
        >
            <List
                component="nav"
                aria-label="secondary mailbox folders"
                style={{
                    padding: 0,
                }}
            >
                <ListItem
                    button
                    disableRipple
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemText primary="All Notifications" />
                    <ListItemSecondaryAction>
                        <KeyboardArrowRight />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem
                    button
                    disableRipple
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                >
                    <ListItemText primary="Comments and Mentions" />
                    <ListItemSecondaryAction>
                        <KeyboardArrowRight />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem
                    button
                    disableRipple
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <ListItemText primary="Reactions" />
                    <ListItemSecondaryAction>
                        <KeyboardArrowRight />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem
                    button
                    disableRipple
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                >
                    <ListItemText primary="Your Content" />
                    <ListItemSecondaryAction>
                        <KeyboardArrowRight />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem
                    button
                    disableRipple
                    selected={selectedIndex === 4}
                    onClick={(event) => handleListItemClick(event, 4)}
                >
                    <ListItemText primary="Your Profile" />
                    <ListItemSecondaryAction>
                        <KeyboardArrowRight />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem
                    button
                    disableRipple
                    selected={selectedIndex === 5}
                    onClick={(event) => handleListItemClick(event, 5)}
                >
                    <ListItemText primary="Job Board" />
                    <ListItemSecondaryAction>
                        <KeyboardArrowRight />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem
                    button
                    disableRipple
                    selected={selectedIndex === 6}
                    onClick={(event) => handleListItemClick(event, 6)}
                >
                    <ListItemText primary="Forum" />
                    <ListItemSecondaryAction>
                        <KeyboardArrowRight />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem
                    button
                    disableRipple
                    selected={selectedIndex === 7}
                    onClick={(event) => handleListItemClick(event, 7)}
                >
                    <ListItemText primary="Announcements" />
                    <ListItemSecondaryAction>
                        <KeyboardArrowRight />
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </Card>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
    // sidebar: {
    //     width: '100%',
    //     maxWidth: 360,
    //     background: 'transparent',
    //     //color: theme.typography.textPrimary,
    // },
}));
