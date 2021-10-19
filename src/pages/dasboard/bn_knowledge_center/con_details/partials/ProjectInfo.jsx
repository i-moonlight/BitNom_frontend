import { Box, Card, Tab, Tabs, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import * as React from 'react';

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
                    <Typography>{children}</Typography>
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
    tabPanelRoot: {
        padding: '25px 0',
    },
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

export default function ProjectInfo() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const classes = useStyles();

    return (
        <Card>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'none' }}
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
                            <div
                                className={'row'}
                                style={custom.cardsContainer}
                            >
                                <div className={'col-3'}>
                                    <img
                                        src={
                                            'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                        }
                                        className="rounded-circle"
                                        alt="Cinque Terre"
                                        width="30"
                                        height="30"
                                    />
                                </div>
                                <div className={'col-9'}>
                                    <p>
                                        Don Phelix{' '}
                                        <span>Bitcoin Core Contributor</span>
                                    </p>
                                </div>
                            </div>
                            <div
                                className={'row'}
                                style={custom.cardsContainer}
                            >
                                <div className={'col-3'}>
                                    <img
                                        src={
                                            'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                        }
                                        className="rounded-circle"
                                        alt="Cinque Terre"
                                        width="30"
                                        height="30"
                                    />
                                </div>
                                <div className={'col-9'}>
                                    <p>
                                        Don Phelix{' '}
                                        <span>Bitcoin Core Contributor</span>
                                    </p>
                                </div>
                            </div>
                            <div
                                className={'row'}
                                style={custom.cardsContainer}
                            >
                                <div className={'col-3'}>
                                    <img
                                        src={
                                            'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                        }
                                        className="rounded-circle"
                                        alt="Cinque Terre"
                                        width="30"
                                        height="30"
                                    />
                                </div>
                                <div className={'col-9'}>
                                    <p>
                                        Don Phelix{' '}
                                        <span>Bitcoin Core Contributor</span>
                                    </p>
                                </div>
                            </div>
                            <div
                                className={'row'}
                                style={custom.cardsContainer}
                            >
                                <div className={'col-3'}>
                                    <img
                                        src={
                                            'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                        }
                                        className="rounded-circle"
                                        alt="Cinque Terre"
                                        width="30"
                                        height="30"
                                    />
                                </div>
                                <div className={'col-9'}>
                                    <p>
                                        Don Phelix{' '}
                                        <span>Bitcoin Core Contributor</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'mt-5'}>
                        <h4>
                            <strong>Maintainers</strong>
                        </h4>
                        <hr />
                        <div className={'d-flex justify-content-between'}>
                            <div
                                className={'row'}
                                style={custom.cardsContainer}
                            >
                                <div className={'col-3'}>
                                    <img
                                        src={
                                            'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                        }
                                        className="rounded-circle"
                                        alt="Cinque Terre"
                                        width="30"
                                        height="30"
                                    />
                                </div>
                                <div className={'col-9'}>
                                    <p>
                                        Don Phelix{' '}
                                        <span>Bitcoin Core Contributor</span>
                                    </p>
                                </div>
                            </div>
                            <div
                                className={'row'}
                                style={custom.cardsContainer}
                            >
                                <div className={'col-3'}>
                                    <img
                                        src={
                                            'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                        }
                                        className="rounded-circle"
                                        alt="Cinque Terre"
                                        width="30"
                                        height="30"
                                    />
                                </div>
                                <div className={'col-9'}>
                                    <p>
                                        Don Phelix{' '}
                                        <span>Bitcoin Core Contributor</span>
                                    </p>
                                </div>
                            </div>
                            <div
                                className={'row'}
                                style={custom.cardsContainer}
                            >
                                <div className={'col-3'}>
                                    <img
                                        src={
                                            'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                        }
                                        className="rounded-circle"
                                        alt="Cinque Terre"
                                        width="30"
                                        height="30"
                                    />
                                </div>
                                <div className={'col-9'}>
                                    <p>
                                        Don Phelix{' '}
                                        <span>Bitcoin Core Contributor</span>
                                    </p>
                                </div>
                            </div>
                            <div
                                className={'row'}
                                style={custom.cardsContainer}
                            >
                                <div className={'col-3'}>
                                    <img
                                        src={
                                            'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                        }
                                        className="rounded-circle"
                                        alt="Cinque Terre"
                                        width="30"
                                        height="30"
                                    />
                                </div>
                                <div className={'col-9'}>
                                    <p>
                                        Don Phelix{' '}
                                        <span>Bitcoin Core Contributor</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'mt-5'}>
                        <h3>
                            <strong>Creator</strong>
                        </h3>
                        <div className={'d-flex justify-content-between'}>
                            <div
                                className={'row'}
                                style={custom.cardsContainer}
                            >
                                <div className={'col-3'}>
                                    <img
                                        src={
                                            'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                        }
                                        className="rounded-circle"
                                        alt="Cinque Terre"
                                        width="30"
                                        height="30"
                                    />
                                </div>
                                <div className={'col-9'}>
                                    <p>
                                        Don Phelix{' '}
                                        <span>Bitcoin Core Contributor</span>
                                    </p>
                                </div>
                            </div>
                        </div>
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
                            <div
                                className={'row'}
                                style={custom.cardsContainer}
                            >
                                <div className={'col-3'}>
                                    <img
                                        src={
                                            'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                        }
                                        className="rounded-circle"
                                        alt="Cinque Terre"
                                        width="30"
                                        height="30"
                                    />
                                </div>
                                <div className={'col-9'}>
                                    <p>
                                        Don Phelix{' '}
                                        <span>Bitcoin Core Contributor</span>
                                    </p>
                                </div>
                            </div>
                            <div
                                className={'row'}
                                style={custom.cardsContainer}
                            >
                                <div className={'col-3'}>
                                    <img
                                        src={
                                            'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                        }
                                        className="rounded-circle"
                                        alt="Cinque Terre"
                                        width="30"
                                        height="30"
                                    />
                                </div>
                                <div className={'col-9'}>
                                    <p>
                                        Don Phelix{' '}
                                        <span>Bitcoin Core Contributor</span>
                                    </p>
                                </div>
                            </div>
                            <div
                                className={'row'}
                                style={custom.cardsContainer}
                            >
                                <div className={'col-3'}>
                                    <img
                                        src={
                                            'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                        }
                                        className="rounded-circle"
                                        alt="Cinque Terre"
                                        width="30"
                                        height="30"
                                    />
                                </div>
                                <div className={'col-9'}>
                                    <p>
                                        Don Phelix{' '}
                                        <span>Bitcoin Core Contributor</span>
                                    </p>
                                </div>
                            </div>
                            <div
                                className={'row'}
                                style={custom.cardsContainer}
                            >
                                <div className={'col-3'}>
                                    <img
                                        src={
                                            'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                        }
                                        className="rounded-circle"
                                        alt="Cinque Terre"
                                        width="30"
                                        height="30"
                                    />
                                </div>
                                <div className={'col-9'}>
                                    <p>
                                        Don Phelix{' '}
                                        <span>Bitcoin Core Contributor</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </Box>
        </Card>
    );
}
