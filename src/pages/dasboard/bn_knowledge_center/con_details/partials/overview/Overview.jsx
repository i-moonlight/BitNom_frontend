import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, styled, Tab } from '@mui/material';
import React, { useState } from 'react';
// import Analysis from './Analysis';
import Developer from './Developer';
import General from './General';

export default function Overview({ coinDetail }) {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const StyledTabList = styled(TabList)({
        borderBottom: '1px solid #e8e8e8',
        height: '20px !important',
        '& .MuiTabs-indicator': {
            opacity: 0,
        },
    });

    const StyledTab = styled((props) => (
        <Tab disableRipple LinkComponent={'div'} {...props} />
    ))(({ theme }) => ({
        minHeight: 36,
        textTransform: 'none',
        fontWeight: 'bold',
        marginRight: theme.spacing(1),
        backgroundColor: theme.palette.mode == 'dark' ? '#333333' : '#e4e4e4',
        borderRadius: '50px',
        '&.Mui-selected': {
            color: '#fff',
            backgroundColor: theme.palette.primary.main,
        },
        '&.Mui-focusVisible': {
            backgroundColor: '#555',
        },
    }));

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <StyledTabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <StyledTab label="General" value="1" />
                    <StyledTab label="Developers" value="2" />
                    {/* <StyledTab label="Widget" value="3" /> */}
                    {/* <StyledTab label="Analysis" value="4" /> */}
                </StyledTabList>
                <TabPanel value="1" className="px-0">
                    <General coinDetail={coinDetail} />
                </TabPanel>
                <TabPanel value="2" className="px-0">
                    <Developer />
                </TabPanel>
                {/* <TabPanel value="3"  className="px-0">
                    <div>
                        <strong>To be discussed</strong>
                    </div>
                </TabPanel> */}
                {/* <TabPanel value="4" className="px-0">
                    <Analysis />
                </TabPanel> */}
            </TabContext>
        </Box>
    );
}
