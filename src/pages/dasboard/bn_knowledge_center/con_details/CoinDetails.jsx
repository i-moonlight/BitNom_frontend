import {
    ArrowDropDown,
    Facebook,
    GitHub,
    LinkOutlined,
    Star,
    Telegram,
    Twitter,
} from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
    Breadcrumbs,
    Container,
    Divider,
    Skeleton,
    Tab,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components/Button';
import Screen from '../../../../components/Screen';
import Forum from './partials/forum/Forum';
import HistoricalData from './partials/HistoricalData';
import Market from './partials/market/Market';
import News from './partials/news/News';
import Overview from './partials/overview/Overview';
import ProjectInfo from './partials/project_info/ProjectInfo';

export default function CoinDetails({ match }) {
    const [value, setValue] = useState('1');
    const [coinDetail, setCoinDetail] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const classes = useStyles();
    const coin_id = match.params.id;
    const url = `https://api.coingecko.com/api/v3/coins/${coin_id}`;

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
            .then((response) => response.json())
            .then((data) => {
                setCoinDetail(data);
            })
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    setCoinDetail(null);
                }
            });
    }, [url]);

    return (
        <Screen>
            <Container maxWidth="lg">
                {/*Links to menus and coins*/}
                <Breadcrumbs aria-label="breadcrumb" className="m-3">
                    <Link
                        to="/knowledge_center/cryptocurrency"
                        underline="hover"
                        color="inherit"
                        href="/"
                    >
                        CryptoCurrencies
                    </Link>
                    <Typography>{coinDetail?.name}</Typography>
                </Breadcrumbs>

                {/*Coin Details*/}
                {coinDetail ? (
                    <>
                        <div className="mt-3">
                            <div className="d-lg-flex d-md-flex d-sm-block row">
                                <Typography
                                    component="div"
                                    color="textPrimary"
                                    className="d-lg-flex d-md-flex d-sm-block col-lg-7
                         col-md-7 col-sm-12 mt-3 justify-content-evenly"
                                >
                                    <div>
                                        <div>
                                            <img
                                                alt={'Bitcoin image'}
                                                src={coinDetail?.image?.small}
                                            />
                                        </div>
                                        <div>
                                            <p>
                                                <span
                                                    className={'text-secondary'}
                                                >
                                                    {coinDetail?.name}{' '}
                                                    <span
                                                        className={
                                                            'text-uppercase'
                                                        }
                                                    >
                                                        ({coinDetail?.symbol})
                                                    </span>
                                                </span>
                                                <a style={custom.greenBg}>
                                                    #
                                                    {coinDetail?.coingecko_rank}
                                                </a>{' '}
                                                <Star />
                                            </p>
                                            <h5>
                                                <span>$47,811.67</span>{' '}
                                                <span className={'text-danger'}>
                                                    <ArrowDropDown /> 7.76%
                                                </span>
                                            </h5>
                                            <p>
                                                <Button
                                                    variant="contained"
                                                    style={custom.buttonStyle}
                                                >
                                                    Coin
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    style={custom.buttonStyle}
                                                >
                                                    On 2,267,548 watchlists
                                                </Button>
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={'mt-5'}>
                                            <section
                                                className={
                                                    'd-flex justify-content-between'
                                                }
                                            >
                                                <p className={'m-1'}>
                                                    <strong>
                                                        Price Change 24hrs
                                                    </strong>
                                                </p>
                                                <p className={'m-1'}>
                                                    <strong>Market cap</strong>
                                                </p>
                                            </section>
                                            <section
                                                className={
                                                    'd-flex justify-content-between'
                                                }
                                            >
                                                <p
                                                    className={
                                                        'text-success text-sm-end'
                                                    }
                                                >
                                                    $1,687,456
                                                </p>
                                                <p
                                                    className={
                                                        'text-success  text-sm-end'
                                                    }
                                                >
                                                    $1,687,456
                                                </p>
                                            </section>
                                            <section
                                                className={
                                                    'd-flex justify-content-between'
                                                }
                                            >
                                                <p>Availability Supply</p>
                                                <p>Total Supply</p>
                                            </section>
                                            <section
                                                className={
                                                    'd-flex justify-content-between'
                                                }
                                            >
                                                <p className={'text-success'}>
                                                    18,834,400
                                                </p>
                                                <p className={'text-success'}>
                                                    18,834,400
                                                </p>
                                            </section>
                                        </div>
                                    </div>
                                    <hr style={custom.verticalLine} />
                                </Typography>
                                <Typography
                                    component="div"
                                    color="textPrimary"
                                    className="col-lg-5 col-md-5 col-sm-12"
                                >
                                    <h4 className="mt-4">Info:</h4>
                                    <div>
                                        <div className={'m-1'}>
                                            <div className={'row'}>
                                                <div className={'col-3'}>
                                                    <strong className="text-secondary">
                                                        Website
                                                    </strong>
                                                </div>
                                                <div className={'col-9'}>
                                                    <Button
                                                        variant="contained"
                                                        style={
                                                            custom.buttonStyle
                                                        }
                                                    >
                                                        <LinkOutlined />
                                                        bitcoin.org
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={'m-1'}>
                                            <div className={'row'}>
                                                <div className={'col-3'}>
                                                    <strong className="text-secondary">
                                                        Explorer
                                                    </strong>
                                                </div>
                                                <div className={'col-9'}>
                                                    <Button
                                                        variant="contained"
                                                        style={
                                                            custom.buttonStyle
                                                        }
                                                    >
                                                        Blockchain
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        style={
                                                            custom.buttonStyle
                                                        }
                                                    >
                                                        BTC
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        style={
                                                            custom.buttonStyle
                                                        }
                                                    >
                                                        TokenView
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        style={
                                                            custom.buttonStyle
                                                        }
                                                    >
                                                        OKLink
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={'m-1'}>
                                            <div className={'row'}>
                                                <div className={'col-3'}>
                                                    <strong className="text-secondary">
                                                        Community
                                                    </strong>
                                                </div>
                                                <div className={'col-9'}>
                                                    <Button
                                                        variant="contained"
                                                        style={
                                                            custom.buttonStyle
                                                        }
                                                    >
                                                        <Twitter /> Twitter
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        style={
                                                            custom.buttonStyle
                                                        }
                                                    >
                                                        <Telegram /> Telegram
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        style={
                                                            custom.buttonStyle
                                                        }
                                                    >
                                                        <Facebook /> Facebook
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={'m-1'}>
                                            <div className={'row'}>
                                                <div className={'col-3'}>
                                                    <strong className="text-secondary">
                                                        Source Code
                                                    </strong>
                                                </div>
                                                <div className={'col-9'}>
                                                    <Button
                                                        variant="contained"
                                                        style={
                                                            custom.buttonStyle
                                                        }
                                                    >
                                                        <GitHub /> Github
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={'m-1'}>
                                            <div className={'row'}>
                                                <div className={'col-3'}>
                                                    <strong className="text-secondary">
                                                        Tags
                                                    </strong>
                                                </div>
                                                <div className={'col-9'}>
                                                    <Button
                                                        variant="contained"
                                                        style={
                                                            custom.buttonStyle
                                                        }
                                                    >
                                                        Cryptocurrency
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        style={
                                                            custom.buttonStyle
                                                        }
                                                    >
                                                        Bitcoin
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        style={
                                                            custom.buttonStyle
                                                        }
                                                    >
                                                        Mineable
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        style={
                                                            custom.buttonStyle
                                                        }
                                                    >
                                                        Store of Value
                                                    </Button>
                                                    <br />
                                                    <br />
                                                    <a className="text-primary">
                                                        <strong>See all</strong>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Typography>
                            </div>
                        </div>

                        <div className={'mt-3'}>
                            <TabContext value={value} variant="standard">
                                <div>
                                    <Divider
                                        orientation="horizontal"
                                        flexItem
                                    ></Divider>
                                    <TabList
                                        onChange={handleChange}
                                        aria-label="lab API tabs example"
                                        className={'m-2'}
                                        variant="scrollable"
                                        allowScrollButtonsMobile
                                        scrollButtons
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
                                        {/* <Button
                                        textColor={'#333333'}
                                        className={'float-end'}
                                        style={{
                                            marginLeft: '5%',
                                            backgroundColor: '#333333',
                                        }}
                                    >
                                        <ShareTwoTone />
                                        <span style={{ marginLeft: '5px' }}>
                                            Share
                                        </span>
                                    </Button> */}
                                    </TabList>
                                    <Divider
                                        orientation="horizontal"
                                        flexItem
                                    ></Divider>
                                </div>
                                {/*<hr/>*/}
                                <TabPanel
                                    value="1"
                                    classes={{ root: classes.tabPanelRoot }}
                                >
                                    <Overview coinDetail={coinDetail} />
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
                    </>
                ) : (
                    <div className="mt-3">
                        <div className="d-lg-flex d-md-flex d-sm-block row">
                            <div
                                className="d-lg-flex d-md-flex d-sm-block col-lg-7
                         col-md-7 col-sm-12 mt-3 justify-content-evenly"
                            >
                                <div>
                                    <div>
                                        <Skeleton
                                            className="mb-2"
                                            animation="wave"
                                            variant="circular"
                                            height={50}
                                            width={50}
                                        />
                                    </div>
                                    <div>
                                        <Skeleton
                                            animation="wave"
                                            variant="text"
                                        />
                                        <Skeleton
                                            animation="wave"
                                            variant="text"
                                        />
                                        <Skeleton
                                            className="mt-2"
                                            animation="wave"
                                            variant="rectangular"
                                            height={30}
                                            width={200}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className={'mt-5'}>
                                        <section
                                            className={
                                                'd-flex justify-content-between'
                                            }
                                        >
                                            <Skeleton
                                                className="me-2"
                                                animation="wave"
                                                variant="text"
                                                width={100}
                                            />
                                            <Skeleton
                                                animation="wave"
                                                variant="text"
                                                width={100}
                                            />
                                        </section>
                                        <section
                                            className={
                                                'd-flex justify-content-between'
                                            }
                                        >
                                            <Skeleton
                                                className="me-2"
                                                animation="wave"
                                                variant="text"
                                                width={90}
                                            />
                                            <Skeleton
                                                animation="wave"
                                                variant="text"
                                                width={90}
                                            />
                                        </section>
                                        <section
                                            className={
                                                'd-flex justify-content-between'
                                            }
                                        >
                                            <Skeleton
                                                animation="wave"
                                                variant="text"
                                                width="100%"
                                            />
                                        </section>
                                        <section
                                            className={
                                                'd-flex justify-content-between'
                                            }
                                        >
                                            <Skeleton
                                                className="me-2"
                                                animation="wave"
                                                variant="text"
                                                width={100}
                                            />
                                            <Skeleton
                                                animation="wave"
                                                variant="text"
                                                width={100}
                                            />
                                        </section>
                                    </div>
                                </div>
                                <hr style={custom.verticalLine} />
                            </div>
                            <div className="col-lg-5 col-md-5 col-sm-12">
                                <Skeleton
                                    animation="wave"
                                    variant="text"
                                    width={100}
                                />
                                <div>
                                    <div className={'m-1'}>
                                        <div className={'row'}>
                                            <div className={'col-3'}>
                                                <Skeleton
                                                    animation="wave"
                                                    variant="text"
                                                    width={100}
                                                />
                                            </div>
                                            <div className={'col-9'}>
                                                <Skeleton
                                                    className="br-1"
                                                    animation="wave"
                                                    variant="rectangular"
                                                    width={70}
                                                    height={30}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'m-1'}>
                                        <div className={'row'}>
                                            <div className={'col-3'}>
                                                <Skeleton
                                                    animation="wave"
                                                    variant="text"
                                                    width={100}
                                                />
                                            </div>
                                            <div className={'col-9'}>
                                                <Skeleton
                                                    className="br-1"
                                                    animation="wave"
                                                    variant="rectangular"
                                                    width={70}
                                                    height={30}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'m-1'}>
                                        <div className={'row'}>
                                            <div className={'col-3'}>
                                                <Skeleton
                                                    animation="wave"
                                                    variant="text"
                                                    width={100}
                                                />
                                            </div>
                                            <div
                                                className={
                                                    'col-9 d-flex align-items-center'
                                                }
                                            >
                                                <Skeleton
                                                    className="br-1 me-2"
                                                    animation="wave"
                                                    variant="rectangular"
                                                    width={70}
                                                    height={30}
                                                />
                                                <Skeleton
                                                    className="br-1"
                                                    animation="wave"
                                                    variant="rectangular"
                                                    width={70}
                                                    height={30}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'m-1'}>
                                        <div className={'row'}>
                                            <div className={'col-3'}>
                                                <Skeleton
                                                    animation="wave"
                                                    variant="text"
                                                    width={100}
                                                />
                                            </div>
                                            <div className={'col-9'}>
                                                <Skeleton
                                                    className="br-1"
                                                    animation="wave"
                                                    variant="rectangular"
                                                    width={70}
                                                    height={30}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'m-1'}>
                                        <div className={'row'}>
                                            <div className={'col-3'}>
                                                <Skeleton
                                                    animation="wave"
                                                    variant="text"
                                                    width={100}
                                                />
                                            </div>
                                            <div
                                                className={
                                                    'col-9 d-flex align-items-center'
                                                }
                                            >
                                                <Skeleton
                                                    className="br-1 me-2"
                                                    animation="wave"
                                                    variant="rectangular"
                                                    width={70}
                                                    height={30}
                                                />
                                                <Skeleton
                                                    className="br-1"
                                                    animation="wave"
                                                    variant="rectangular"
                                                    width={70}
                                                    height={30}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </Screen>
    );
}

const useStyles = makeStyles({
    tabPanelRoot: {
        padding: '25px 0',
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
