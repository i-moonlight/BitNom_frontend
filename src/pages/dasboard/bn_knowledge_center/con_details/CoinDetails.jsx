/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 10/13/21
 * Time: 6:53 AM
 */
import {
    ArrowDropDown,
    Facebook,
    GitHub,
    KeyboardArrowRightSharp,
    LinkOutlined,
    ShareTwoTone,
    Star,
    Telegram,
    Twitter,
} from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Card, Container, Tab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Button from '../../../../components/Button';
import Screen from '../../../../components/Screen';
import Forum from './partials/Forum';
import HistoricalData from './partials/HistoricalData';
import Market from './partials/Market';
import News from './partials/News';
import Overview from './partials/Overview';
import ProjectInfo from './partials/ProjectInfo';

const useStyles = makeStyles({
    tabPanelRoot: {
        padding: '25px 0',
    },
});

export default function CoinDetails() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const custom = {
        darkTransparent: {
            backgroundColor: 'rgb(68 63 63 / 50%)',
            text: '#fff',
            height: '10px',
            borderRadius: '5px',
            margin: '5px',
            padding: '0.5px 0.5px',
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

    const classes = useStyles();

    return (
        <Screen>
            <Container>
                {/*Links to menus and coins*/}
                <Card>
                    <div className="m-3">
                        <a className="text-secondary">CryptoCurrencies</a>{' '}
                        <KeyboardArrowRightSharp />
                        <a className="text-secondary">Coins</a>
                        <KeyboardArrowRightSharp />
                        <a>Bitcoin</a>
                    </div>
                </Card>

                {/*Coin Details*/}
                <Card className="container mt-3">
                    <div className="row">
                        <div
                            className="col-7 mt-3 d-flex justify-content-between"
                            style={{ marginRight: '5px' }}
                        >
                            <div className={'m-1'}>
                                <img
                                    alt={'Bitcoin image'}
                                    src={
                                        'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579'
                                    }
                                />
                            </div>
                            <div className={'m-1'}>
                                <p>
                                    <span className={'text-secondary'}>
                                        Bitocoin (BTC){' '}
                                    </span>
                                    <a style={custom.greenBg}>#1</a> <Star />
                                </p>
                                <p>
                                    <span className={'display-6'}>
                                        $47,811.67
                                    </span>{' '}
                                    <span className={'text-danger'}>
                                        {' '}
                                        <ArrowDropDown /> 7.76%
                                    </span>
                                </p>
                                <p>
                                    <a
                                        className={
                                            'btn btn-secondary btn-sm m-1'
                                        }
                                    >
                                        Coin
                                    </a>
                                    <a
                                        className={
                                            'btn btn-secondary btn-sm m-1'
                                        }
                                    >
                                        On 2,267,548 watchlists
                                    </a>
                                </p>
                            </div>
                            <div className={'m-1'}>
                                <p>
                                    <strong>Price Change 24hrs</strong>
                                </p>
                                <p className={'text-success'}>$1,687,456,435</p>
                                <p>Availability Supply</p>
                                <p className={'text-success'}>18,834,400</p>
                            </div>
                            <div className={'m-1'}>
                                <p>
                                    <strong>Market cap</strong>
                                </p>
                                <p className={'text-success'}>$1,687,456,435</p>
                                <p>Total Supply</p>
                                <p className={'text-success'}>18,834,400</p>
                            </div>
                            <hr style={custom.verticalLine} />
                        </div>
                        <div className="col-4">
                            <h4 className="mt-4 mb-4">Info:</h4>
                            {/*style={{ borderLeft: '0.1em solid green', padding: '0.5em' }}*/}
                            <div>
                                <div className={'m-3'}>
                                    <div className={'row'}>
                                        <div className={'col-4'}>
                                            <strong
                                                style={{ marginRight: '25px' }}
                                                className="text-secondary"
                                            >
                                                Website
                                            </strong>
                                        </div>
                                        <div className={'col-7'}>
                                            <a
                                                className={
                                                    'btn btn-secondary btn-sm m-1'
                                                }
                                            >
                                                <LinkOutlined />
                                                bitcoin.org
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className={'m-3'}>
                                    <div className={'row'}>
                                        <div className={'col-4'}>
                                            <strong
                                                style={{ marginRight: '25px' }}
                                                className="text-secondary"
                                            >
                                                Explorer
                                            </strong>
                                        </div>
                                        <div className={'col-7'}>
                                            <a
                                                className={
                                                    'btn btn-secondary btn-sm m-1'
                                                }
                                            >
                                                Blockchain
                                            </a>
                                            <a
                                                className={
                                                    'btn btn-secondary btn-sm m-1'
                                                }
                                            >
                                                BTC
                                            </a>
                                            <a
                                                className={
                                                    'btn btn-secondary btn-sm m-1'
                                                }
                                            >
                                                TokenView
                                            </a>
                                            <a
                                                className={
                                                    'btn btn-secondary btn-sm m-1'
                                                }
                                            >
                                                OKLink
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className={'m-3'}>
                                    <div className={'row'}>
                                        <div className={'col-4'}>
                                            <strong
                                                style={{ marginRight: '25px' }}
                                                className="text-secondary"
                                            >
                                                Community
                                            </strong>
                                        </div>
                                        <div className={'col-7'}>
                                            <a
                                                className={
                                                    'btn btn-secondary btn-sm m-1'
                                                }
                                            >
                                                {' '}
                                                <Twitter /> Twitter{' '}
                                            </a>
                                            <a
                                                className={
                                                    'btn btn-secondary btn-sm m-1'
                                                }
                                            >
                                                {' '}
                                                <Telegram /> Telegram{' '}
                                            </a>
                                            <a
                                                className={
                                                    'btn btn-secondary btn-sm m-1'
                                                }
                                            >
                                                {' '}
                                                <Facebook /> Facebook{' '}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className={'m-3'}>
                                    <div className={'row'}>
                                        <div className={'col-4'}>
                                            <strong
                                                style={{ marginRight: '25px' }}
                                                className="text-secondary"
                                            >
                                                Source Code
                                            </strong>
                                        </div>
                                        <div className={'col-7'}>
                                            <a
                                                className={
                                                    'btn btn-secondary btn-sm m-1'
                                                }
                                            >
                                                {' '}
                                                <GitHub /> Github{' '}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className={'m-3'}>
                                    <div className={'row'}>
                                        <div className={'col-4'}>
                                            <strong
                                                style={{ marginRight: '25px' }}
                                                className="text-secondary"
                                            >
                                                Tags
                                            </strong>
                                        </div>
                                        <div className={'col-7'}>
                                            <a
                                                className={
                                                    'btn btn-secondary btn-sm m-1'
                                                }
                                            >
                                                Cryptocurrency
                                            </a>
                                            <a
                                                className={
                                                    'btn btn-secondary btn-sm m-1'
                                                }
                                            >
                                                Bitcoin
                                            </a>
                                            <a
                                                className={
                                                    'btn btn-secondary btn-sm m-1'
                                                }
                                            >
                                                Mineable
                                            </a>
                                            <a
                                                className={
                                                    'btn btn-secondary btn-sm m-1'
                                                }
                                            >
                                                Store of Value
                                            </a>
                                            <br />
                                            <br />
                                            <a className="text-primary">
                                                <strong>See all</strong>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className={'mt-3'}>
                    <TabContext
                        value={value}
                        variant="standard"
                        style={{ minWidth: '50%' }}
                    >
                        {/*<hr/>*/}
                        <Card sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                className={'m-2'}
                            >
                                <Tab
                                    label="Overview"
                                    value="1"
                                    style={custom.tabStyle}
                                />
                                <Tab
                                    label="Market"
                                    value="2"
                                    style={custom.tabStyle}
                                />
                                <Tab
                                    label="News"
                                    value="3"
                                    style={custom.tabStyle}
                                />
                                <Tab
                                    label="Forum"
                                    value="4"
                                    style={custom.tabStyle}
                                />
                                <Tab
                                    label="Historical Data"
                                    value="5"
                                    style={custom.tabStyle}
                                />
                                <Tab
                                    label="Project Info."
                                    value="6"
                                    style={custom.tabStyle}
                                />
                                <Button
                                    textColor={'inherit'}
                                    style={{ marginLeft: '5%' }}
                                >
                                    <ShareTwoTone />
                                    <span style={{ marginLeft: '5px' }}>
                                        Share
                                    </span>
                                </Button>
                            </TabList>
                        </Card>
                        {/*<hr/>*/}
                        <TabPanel
                            value="1"
                            classes={{ root: classes.tabPanelRoot }}
                        >
                            <Overview />
                        </TabPanel>
                        <TabPanel
                            value="2"
                            classes={{ root: classes.tabPanelRoot }}
                        >
                            <Market />
                        </TabPanel>
                        <TabPanel
                            value="3"
                            classes={{ root: classes.tabPanelRoot }}
                        >
                            <News />
                        </TabPanel>
                        <TabPanel
                            value="4"
                            classes={{ root: classes.tabPanelRoot }}
                        >
                            <Forum />
                        </TabPanel>
                        <TabPanel
                            value="5"
                            classes={{ root: classes.tabPanelRoot }}
                        >
                            <HistoricalData />
                        </TabPanel>
                        <TabPanel
                            value="6"
                            classes={{ root: classes.tabPanelRoot }}
                        >
                            <ProjectInfo />
                        </TabPanel>
                    </TabContext>
                </div>
            </Container>
        </Screen>
    );
}
