import { List, Star, StarOutline } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
    Button, Card, Container, Divider, Paper, Tab, Table, TableCell,
    TableContainer, TableHead, TableRow,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import Screen from '../../../components/Screen';
import Categories from './sub_sections/Categories';
import { CryptoGazing } from './sub_sections/CryptoGazing';
import GainersAndLosers from './sub_sections/GainersAndLosers';
import HeatMap from './sub_sections/HeatMap';
import RecentlyAdded from './sub_sections/RecentlyAdded';
import TopSection from './sub_sections/fragments/TopSection';
import CryptoCurrency from './sub_sections/CryptoCurrency';
import WatchList from './sub_sections/WatchList';

const useStyles = makeStyles({ tabPanelRoot: { padding: '0px' } });

export default function BnKnowledgeCenter() {
    const [value, setValue] = React.useState('1');
    const handleTabChanges = (event, newValue) => {
        setValue(newValue);
    };
    const classes = useStyles();
    const custom = {
        tabStyle: {
            textTransform: 'capitalize',
            fontWeight: 'bold',
        },
        buttonStyle: {
            textTransform: 'capitalize',
            fontWeight: 'bold',
            backgroundColor: '#333333',
            margin: '15px 15px 15px 0',
            borderRadius: '5px',
            minWidth: '100px',
        },
        listGridStyle: {
            textTransform: 'capitalize',
            fontWeight: 'bold',
            backgroundColor: '#333333',
            margin: '15px 15px 15px 0',
            borderRadius: '5px',
        },
        tableHeader: {
            backgroundColor: '#3e4041',
            color: '#fff',
        },
        verticalLine: {
            borderLeft: '2px solid green',
            height: '35px',
            marginRight: '20px',
        },
        horizontalLine: {
            borderLeft: '5px solid green',
        },
        darkTransparent: {
            backgroundColor: 'rgb(68 63 63 / 50%)',
            text: '#fff',
            height: '10px',
            borderRadius: '5px',
            margin: '5px',
            padding: '0.5px 0.5px',
        },
    };

    return (
        <Screen>
            <Container>
                {/*Crypto Header*/}
                <TopSection />
                <br />
                <section>
                    {/* Tabs */}
                    <TabContext value={value} variant="fullWidth">
                        <div sx={{borderBottom: 1, borderColor: 'divider', paddingLeft: 0, marginLeft: 0}} className={'mb-3'}>
                            <TabList onChange={handleTabChanges} aria-label="Tab list for cryptocurrency section"
                                variant="scrollable" allowScrollButtonsMobile scrollButtons>
                                <Button variant="contained" className={''} style={custom.buttonStyle}>
                                    <Star style={{marginRight: '5px', color: 'orange',}}/>
                                    Portfolio
                                </Button>
                                <Tab label={'Watchlist'} style={custom.buttonStyle} value="2" />

                                <hr style={custom.verticalLine} />
                                <Tab label="Cryptocurrency" value="1" style={custom.tabStyle}/>
                                <Tab label="Cryptogazing" value="3" style={custom.tabStyle}/>
                                <Tab label="Category" value="4" style={custom.tabStyle}/>
                                <Tab label="Recently Added" value="6" style={custom.tabStyle}/>
                                <Tab label="Gainers and Losers" value="5" style={custom.tabStyle}/>
                                <Tab label="Heatmap" value="7" style={custom.tabStyle}/>
                                <Button style={custom.listGridStyle}>
                                    <List />
                                </Button>
                            </TabList>
                            <Divider flexItem />
                        </div>
                        <TabPanel value="1" classes={{ root: classes.tabPanelRoot }}>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <CryptoCurrency />
                            </Paper>
                        </TabPanel>
                        <TabPanel value="2" classes={{ root: classes.tabPanelRoot }}>
                            <Card>
                                <WatchList />
                            </Card>
                        </TabPanel>
                        <TabPanel value="3" classes={{ root: classes.tabPanelRoot }}>
                            <CryptoGazing />
                        </TabPanel>
                        <TabPanel value="4" classes={{ root: classes.tabPanelRoot }}>
                            <Card>
                                <Categories />
                            </Card>
                        </TabPanel>
                        <TabPanel value="5" classes={{ root: classes.tabPanelRoot }}>
                            <Card>
                                <GainersAndLosers />
                            </Card>
                        </TabPanel>
                        <TabPanel value="6" classes={{ root: classes.tabPanelRoot }}>
                            <Card>
                                <RecentlyAdded />
                            </Card>
                        </TabPanel>
                        <TabPanel value="7" classes={{ root: classes.tabPanelRoot }}>
                            <Card>
                                <div>
                                    <HeatMap />
                                </div>
                            </Card>
                        </TabPanel>
                    </TabContext>
                </section>
            </Container>
        </Screen>
    );
}
