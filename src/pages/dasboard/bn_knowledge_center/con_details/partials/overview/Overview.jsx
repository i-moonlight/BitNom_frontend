import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React, { useState } from 'react';
import Analysis from './Analysis';
import Developer from './Developer';
import General from './General';

export default function Overview({ coinDetail }) {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext
                sx={{ width: '100%', typography: 'body1' }}
                value={value}
            >
                <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    className={'m-1'}
                    variant="scrollable"
                    allowScrollButtonsMobile
                    scrollButtons
                >
                    <Tab
                        label="General"
                        className={'m-2'}
                        value="1"
                        style={custom.buttonStyle}
                    />
                    <Tab
                        label="Developers"
                        className={'m-2'}
                        value="2"
                        style={custom.buttonStyle}
                    />
                    <Tab
                        label="Widget"
                        className={'m-2'}
                        value="3"
                        style={custom.buttonStyle}
                    />
                    <Tab
                        label="Analysis"
                        className={'m-2'}
                        value="4"
                        style={custom.buttonStyle}
                    />
                </TabList>

                <TabPanel value="1">
                    <General coinDetail={coinDetail} />
                </TabPanel>
                <TabPanel value="2">
                    <Developer />
                </TabPanel>
                <TabPanel value="3">
                    {/* <div>
                        <strong>To be discussed</strong>
                    </div> */}
                </TabPanel>
                <TabPanel value="4">
                    <Analysis />
                </TabPanel>
            </TabContext>
        </Box>
    );
}

const custom = {
    tabStyle: {
        textTransform: 'capitalize',
    },
    buttonStyle: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        backgroundColor: '#333333',
        margin: '5px 5px 5px 0',
        borderRadius: '50px',
        minWidth: '120px',
    },
    coinsBorder: {
        borderLeft: '5px solid blue',
        minWidth: '250px',
    },
};
