import {
    Box,
    Card,
    CardContent,
    Divider,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import { useState } from 'react';

export default function InsightCard({ profile }) {
    const [tabValue, setTabValue] = useState(0);
    //   const state = useSelector(st => st);
    //   const user = state.auth.user;

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Card className="mb-3" variant={'outlined'}>
            <CardContent>
                <Typography className="mb-2" variant="body1">
                    Insight Overview
                </Typography>
                <Card variant="outlined">
                    <CardContent>
                        <div className="space-between">
                            <Insight
                                text="Profile Reached"
                                value={profile?.profileReached}
                            />
                            <Divider
                                style={{
                                    width: 1,
                                    height: 60,
                                }}
                                orientation="vertical"
                            />
                            <Insight
                                text="Connection Gained"
                                value={profile?.connections}
                            />
                            <Divider
                                style={{
                                    width: 1,
                                    height: 60,
                                }}
                                orientation="vertical"
                            />
                            <Insight
                                text="Search Appeared"
                                value={profile?.searchAppeared}
                            />
                        </div>
                    </CardContent>
                </Card>
                <div>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        // aria-label='simple tabs example'
                        indicatorColor="primary"
                    >
                        <ProfileTab label="Activities" />
                        <ProfileTab label="Saved Items" />
                        <ProfileTab label="My Connections" />
                    </Tabs>

                    <TabPanel value={tabValue} index={0}>
                        No activities Yet
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        no Saved Items Yet
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        No connections yet
                    </TabPanel>
                </div>
            </CardContent>
        </Card>
    );
}

const Insight = ({ value, text }) => (
    <div className="text-center">
        <Typography color="primary" variant="body1">
            {value}
        </Typography>
        <Typography variant="body1">{text}</Typography>
    </div>
);

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

const ProfileTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightBold,
        fontSize: theme.typography.pxToRem(14),
        margin: 0,
        '&:focus': {
            opacity: 1,
        },
        '&:hover': {
            backgroundColor: theme.palette.background.paper,
        },
    },
}))((props) => <Tab disableRipple {...props} />);
