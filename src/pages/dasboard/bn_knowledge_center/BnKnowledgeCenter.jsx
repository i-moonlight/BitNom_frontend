import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Container, Divider, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import Screen from '../../../components/Screen';
import Categories from './sub_sections/Categories';
import CryptoCurrency from './sub_sections/CryptoCurrency';
import TopSection from './sub_sections/fragments/TopSection';
// import GainersAndLosers from './sub_sections/GainersAndLosers';
// import RecentlyAdded from './sub_sections/RecentlyAdded';
// import WatchList from './sub_sections/WatchList';
// import HeatMap from './sub_sections/HeatMap';

export default function BnKnowledgeCenter() {
    const [value, setValue] = useState('2');

    const classes = useStyles();

    const handleTabChanges = (event, newValue) => {
        setValue(newValue);
    };

    const StyledTabList = styled(TabList)({
        borderBottom: '1px solid #e8e8e8',
        '& .MuiTabs-indicator': {
            display: value == 1 && 'none',
        },
    });

    return (
        <Screen>
            <Container maxWidth="lg">
                <TopSection />
                <br />
                <section>
                    <TabContext value={value}>
                        <StyledTabList
                            onChange={handleTabChanges}
                            aria-label="Tab list for cryptocurrency section"
                            variant="scrollable"
                            scrollButtons="auto"
                            className="px-0 mx-0"
                        >
                            {/* <Tab
                                label={'Watchlist'}
                                className={classes.buttonStyle}
                                value="1"
                            /> */}
                            <Tab
                                label="Cryptocurrencies"
                                value="2"
                                className={classes.tabStyle}
                            />
                            <Tab
                                label="Categories"
                                value="4"
                                className={classes.tabStyle}
                            />
                            {/* <Tab
                                label="Recently Added"
                                value="6"
                                className={classes.tabStyle}
                            /> */}
                            {/* <Tab
                                label="Gainers and Losers"
                                value="5"
                                className={classes.tabStyle}
                            /> */}
                            {/* <Tab
                                label="Heatmap"
                                value="7"
                                className={classes.tabStyle}
                            /> */}
                        </StyledTabList>
                        <Divider flexItem />
                        {/* <TabPanel value="1" className="px-0">
                            <div>
                                <WatchList />
                            </div>
                        </TabPanel> */}
                        <TabPanel value="2" className="px-0">
                            <div>
                                <CryptoCurrency />
                            </div>
                        </TabPanel>
                        <TabPanel value="4" className="px-0">
                            <div>
                                <Categories />
                            </div>
                        </TabPanel>
                        {/* <TabPanel value="5" className="px-0">
                            <div>
                                <GainersAndLosers />
                            </div>
                        </TabPanel> */}
                        {/* <TabPanel value="6" className="px-0">
                            <div>
                                <RecentlyAdded />
                            </div>
                        </TabPanel> */}
                        {/* <TabPanel value="7" className="px-0">
                            <div>
                                <HeatMap />
                            </div>
                        </TabPanel> */}
                    </TabContext>
                </section>
            </Container>
        </Screen>
    );
}

const useStyles = makeStyles((theme) => ({
    tabStyle: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    buttonStyle: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        backgroundColor: theme.palette.mode === 'dark' ? '#3e4041' : '#eeeeee',
        color:
            theme.palette.mode == 'dark'
                ? '#fff !important'
                : '#646464 !important',
    },
}));
