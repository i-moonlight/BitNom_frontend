import {
    Avatar,
    Box,
    Card,
    CardContent,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import * as React from 'react';

export default function ProjectInfo() {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Typography
            color={'textPrimary'}
            sx={{ width: '100%', typography: 'body1' }}
            component="div"
        >
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderColor: 'none', minWidth: '100px' }}
                    style={custom.tabsContainer}
                >
                    <Tab
                        style={custom.tabStyle}
                        label="Team"
                        {...tabProps(0)}
                    />
                    <Tab
                        style={custom.tabStyle}
                        label="Investors"
                        {...tabProps(1)}
                    />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <div>
                        <h4>
                            <strong>Team</strong>
                        </h4>
                        <hr />
                        <div className={'d-flex justify-content-between'}>
                            {[1, 2, 3, 4].map((item) => (
                                <TeamCard key={item} />
                            ))}
                        </div>
                    </div>
                    <div className={'mt-5'}>
                        <h4>
                            <strong>Maintainers</strong>
                        </h4>
                        <hr />
                        {[1, 2, 3, 4].map((item) => (
                            <TeamCard key={item} />
                        ))}
                    </div>
                    <div className={'mt-5'}>
                        <h3>
                            <strong>Creator</strong>
                        </h3>
                        {[1].map((item) => (
                            <TeamCard key={item} />
                        ))}
                    </div>
                </TabPanel>
                <TabPanel
                    value={value}
                    index={1}
                    classes={{ root: classes.tabPanelRoot }}
                >
                    <div>
                        <h4>
                            <strong>Investors</strong>
                        </h4>
                        <hr />
                        <div className={'d-flex justify-content-between'}>
                            {[1, 2, 3, 4].map((item) => (
                                <TeamCard key={item} />
                            ))}
                        </div>
                    </div>
                </TabPanel>
            </Box>
        </Typography>
    );
}

function TeamCard() {
    return (
        <Card>
            <CardContent>
                <div className="d-flex align-items-center">
                    <Avatar
                        className="me-2"
                        src=" https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png"
                    />
                    <div>
                        <Typography>Don Phelix</Typography>
                        <Typography variant="body2" color="textSecondary">
                            Bitcoin Core Contributor
                        </Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function tabProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
const useStyles = makeStyles({
    tabPanelRoot: { padding: '25px 0' },
});

const custom = {
    tabStyle: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    tabsContainer: {
        backgroundColor: 'rgb(68 63 63 / 50%)',
    },
    cardsContainer: {
        width: '200px',
        backgroundColor: 'rgb(68 63 63 / 50%)',
        borderRadius: '5px',
        marginLeft: '20px',
    },
};
