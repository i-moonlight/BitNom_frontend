/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 10/13/21
 * Time: 9:51 AM
 */

import { TabContext, TabList, TabPanel } from '@mui/lab';
import {Box,Tab} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {useState} from 'react';
import General from './General';
import Developer from './Developer';
import Analysis from './Analysis';

const useStyles = makeStyles({
    tabPanelRoot: {
        padding: '25px 0',
    },
});
export default function Overview() {
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
            minWidth: '120px'
        },
        coinsBorder: {
            borderLeft: '5px solid blue',
            minWidth: '250px',
        },
    };
    const classes = useStyles();

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext sx={{ width: '100%', typography: 'body1' }} value={value}>
                <div >
                    <TabList onChange={handleChange} aria-label="lab API tabs example" className={'m-1'}
                        variant="scrollable" allowScrollButtonsMobile crollButtons>
                        <Tab label="General" className={'m-2'} value="1" style={custom.buttonStyle}/>
                        <Tab label="Developers" className={'m-2'} value="2" style={custom.buttonStyle}/>
                        <Tab label="Widget" className={'m-2'} value="3" style={custom.buttonStyle} />
                        <Tab label="Analysis" className={'m-2'} value="4" style={custom.buttonStyle}/>
                    </TabList>
                </div>

                {/*General*/}
                <TabPanel value="1" classes={{ root: classes.tabPanelRoot }}>
                   <General />
                </TabPanel>

                {/*Developers*/}
                <TabPanel value="2" classes={{ root: classes.tabPanelRoot }}>
                    <Developer />
                </TabPanel>

                {/*Widget*/}
                <TabPanel value="3" classes={{ root: classes.tabPanelRoot }}>
                    <div>
                        <strong>To be discussed</strong>
                    </div>
                </TabPanel>

                {/*Analyse*/}
                <TabPanel value="4" classes={{ root: classes.tabPanelRoot }}>
                    <Analysis />
                </TabPanel>
            </TabContext>
        </Box>
    );
}
