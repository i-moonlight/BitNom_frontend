import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Divider, Tab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import Forum from './partials/forum/Forum';
import HistoricalData from './partials/HistoricalData';
import Market from './partials/market/Market';
import News from './partials/news/News';
import Overview from './partials/overview/Overview';
// import ProjectInfo from './partials/project_info/ProjectInfo';

export default function CoinDetailsTabPanel({ coinDetail }) {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const classes = useStyles();

    return (
        <div className={'mt-3'}>
            <TabContext value={value}>
                <div>
                    {/* <Divider orientation="horizontal" flexItem></Divider> */}
                    <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        className={'mt-2'}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab
                            label="Overview"
                            value="1"
                            style={custom.tabStyle}
                        />
                        <Tab label="Market" value="2" style={custom.tabStyle} />
                        <Tab label="News" value="3" style={custom.tabStyle} />
                        <Tab label="Forum" value="4" style={custom.tabStyle} />
                        <Tab
                            label="Historical Data"
                            value="5"
                            style={custom.tabStyle}
                        />
                        {/* <Tab
                            label="Project Info."
                            value="6"
                            style={custom.tabStyle}
                        /> */}
                    </TabList>
                    <Divider flexItem></Divider>
                </div>
                <TabPanel value="1" className={classes.tabPanelRoot}>
                    <Overview coinDetail={coinDetail} />
                </TabPanel>
                <TabPanel value="2" className={classes.tabPanelRoot}>
                    <Market />
                </TabPanel>
                <TabPanel value="3" className={classes.tabPanelRoot}>
                    <News coinDetail={coinDetail} />
                </TabPanel>
                <TabPanel value="4" className={classes.tabPanelRoot}>
                    <Forum />
                </TabPanel>
                <TabPanel value="5" className={classes.tabPanelRoot}>
                    <HistoricalData />
                </TabPanel>
                {/* <TabPanel value="6" className={classes.tabPanelRoot}>
                    <ProjectInfo />
                </TabPanel> */}
            </TabContext>
        </div>
    );
}

const useStyles = makeStyles({
    tabPanelRoot: {
        padding: '25px 0',
        margin: 0,
    },
});

const custom = {
    darkTransparent: {
        backgroundColor: 'rgb(68 63 63 / 50%)',
        text: '#fff',
        height: '10px',
        borderRadius: '5px',
        margin: '5px',
        padding: '0.5px 0.5px',
    },
    buttonStyle: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        backgroundColor: '#333333',
        margin: '1px 1px 1px 0',
        borderRadius: '5px',
    },
    greenBg: {
        backgroundColor: 'rgb(16 150 16)',
        text: '#fff',
        height: '10px',
        borderRadius: '5px',
        padding: '5px',
        margin: '2px',
    },
    verticalLine: {
        borderLeft: '2px solid green',
        height: '150px',
        marginTop: '25px',
    },
    tabStyle: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
};
