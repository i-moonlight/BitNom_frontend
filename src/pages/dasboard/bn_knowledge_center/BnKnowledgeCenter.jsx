import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Container, Divider, Tab } from '@mui/material';
import React, { useState } from 'react';
import Screen from '../../../components/Screen';
import Categories from './sub_sections/Categories';
import CryptoCurrency from './sub_sections/CryptoCurrency';
import TopSection from './sub_sections/fragments/TopSection';
import GainersAndLosers from './sub_sections/GainersAndLosers';
import HeatMap from './sub_sections/HeatMap';
import RecentlyAdded from './sub_sections/RecentlyAdded';
import WatchList from './sub_sections/WatchList';

export default function BnKnowledgeCenter() {
    const [value, setValue] = useState('2');

    const handleTabChanges = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Screen>
            <Container>
                <TopSection />
                <br />
                <section>
                    <TabContext value={value}>
                        <TabList
                            onChange={handleTabChanges}
                            aria-label="Tab list for cryptocurrency section"
                            variant="scrollable"
                            allowScrollButtonsMobile
                            scrollButtons
                        >
                            <Tab
                                label={'Watchlist'}
                                style={custom.buttonStyle}
                                value="1"
                            />
                            <Tab
                                label="Cryptocurrency"
                                value="2"
                                style={custom.tabStyle}
                            />
                            <Tab
                                label="Category"
                                value="4"
                                style={custom.tabStyle}
                            />
                            <Tab
                                label="Recently Added"
                                value="6"
                                style={custom.tabStyle}
                            />
                            <Tab
                                label="Gainers and Losers"
                                value="5"
                                style={custom.tabStyle}
                            />
                            <Tab
                                label="Heatmap"
                                value="7"
                                style={custom.tabStyle}
                            />
                        </TabList>
                        <Divider flexItem />
                        <TabPanel value="1">
                            <div>
                                <WatchList />
                            </div>
                        </TabPanel>
                        <TabPanel value="2">
                            <div>
                                <CryptoCurrency />
                            </div>
                        </TabPanel>
                        <TabPanel value="4">
                            <div>
                                <Categories />
                            </div>
                        </TabPanel>
                        <TabPanel value="5">
                            <div>
                                <GainersAndLosers />
                            </div>
                        </TabPanel>
                        <TabPanel value="6">
                            <div>
                                <RecentlyAdded />
                            </div>
                        </TabPanel>
                        <TabPanel value="7">
                            <div>
                                <HeatMap />
                            </div>
                        </TabPanel>
                    </TabContext>
                </section>
            </Container>
        </Screen>
    );
}

const custom = {
    tabStyle: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    buttonStyle: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        backgroundColor: '#333333',
        margin: '15px 10px 0px 0',
        borderRadius: '5px 5px 0 0',
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
