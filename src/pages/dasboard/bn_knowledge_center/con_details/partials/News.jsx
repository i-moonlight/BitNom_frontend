/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 10/17/21
 * Time: 11:02 AM
 */

import { LinkSharp } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Tab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';

const useStyles = makeStyles({
    tabPanelRoot: {
        padding: '25px 0',
    },
});

export default function News() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const classes = useStyles();

    const custom = {
        tabStyle: {
            textTransform: 'capitalize',
            backgroundColor: 'rgb(68 63 63 / 50%)',
            borderRadius: '5px',
            marginRight: '5px',
            fontWeight: 'bold',
        },
        coinsBorder: {
            borderLeft: '5px solid blue',
            minWidth: '250px',
        },
    };

    return (
        <Card sx={{ width: '100%', typography: 'body1' }}>
            <div className={'m-3'}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={handleChange}
                            variant="scrollable"
                            allowScrollButtonsMobile
                            scrollButtons
                            aria-label="Bitcoin New tab"
                        >
                            <h6 className={'m-3'}>
                                <strong>BitCoin Markets</strong>
                            </h6>
                            <Tab
                                label="Recent"
                                value="1"
                                style={custom.tabStyle}
                            />
                            <Tab
                                label="Hot"
                                value="2"
                                style={custom.tabStyle}
                            />
                        </TabList>
                    </Box>
                    <TabPanel
                        value="1"
                        classes={{ root: classes.tabPanelRoot }}
                    >
                        <div className={'row m-3'}>
                            <Card className={'col-sm-12 col-md-3 col-lg-3 m-3'}>
                                <div>
                                    <img
                                        src={
                                            'https://miro.medium.com/max/1024/1*2lw5D9tul5b2f4bTe8YeAw.jpeg'
                                        }
                                        alt={'markets'}
                                        className={'img-thumbnail'}
                                        height={'200'}
                                    />
                                </div>
                                <div>
                                    <p>
                                        Bitcoin EFT Approval{' '}
                                        {'Hangs in the balance'} , Hopes Up on
                                        Nes SEC Chairman
                                    </p>
                                </div>

                                <div
                                    className={
                                        'd-flex justify-content-between text-secondary'
                                    }
                                >
                                    <p>@4Min ago</p>
                                    <p>
                                        Bitcoin Warrior <LinkSharp />
                                    </p>
                                </div>
                            </Card>
                            <Card className={'col-sm-12 col-md-3 col-lg-3 m-3'}>
                                <div>
                                    <img
                                        src={
                                            'https://miro.medium.com/max/1024/1*2lw5D9tul5b2f4bTe8YeAw.jpeg'
                                        }
                                        alt={'markets'}
                                        className={'img-thumbnail'}
                                        height={'200'}
                                    />
                                </div>
                                <div>
                                    <p>
                                        Bitcoin EFT Approval{' '}
                                        {'Hangs in the balance'} , Hopes Up on
                                        Nes SEC Chairman
                                    </p>
                                </div>

                                <div
                                    className={
                                        'd-flex justify-content-between text-secondary'
                                    }
                                >
                                    <p>@4Min ago</p>
                                    <p>
                                        Bitcoin Warrior <LinkSharp />
                                    </p>
                                </div>
                            </Card>
                            <Card className={'col-sm-12 col-md-3 col-lg-3 m-3'}>
                                <div>
                                    <img
                                        src={
                                            'https://miro.medium.com/max/1024/1*2lw5D9tul5b2f4bTe8YeAw.jpeg'
                                        }
                                        alt={'markets'}
                                        className={'img-thumbnail'}
                                        height={'200'}
                                    />
                                </div>
                                <div>
                                    <p>
                                        Bitcoin EFT Approval{' '}
                                        {'Hangs in the balance'} , Hopes Up on
                                        Nes SEC Chairman
                                    </p>
                                </div>

                                <div
                                    className={
                                        'd-flex justify-content-between text-secondary'
                                    }
                                >
                                    <p>@4Min ago</p>
                                    <p>
                                        Bitcoin Warrior <LinkSharp />
                                    </p>
                                </div>
                            </Card>
                            <Card className={'col-sm-12 col-md-3 col-lg-3 m-3'}>
                                <div>
                                    <img
                                        src={
                                            'https://miro.medium.com/max/1024/1*2lw5D9tul5b2f4bTe8YeAw.jpeg'
                                        }
                                        alt={'markets'}
                                        className={'img-thumbnail'}
                                        height={'200'}
                                    />
                                </div>
                                <div>
                                    <p>
                                        Bitcoin EFT Approval{' '}
                                        {'Hangs in the balance'} , Hopes Up on
                                        Nes SEC Chairman
                                    </p>
                                </div>

                                <div
                                    className={
                                        'd-flex justify-content-between text-secondary'
                                    }
                                >
                                    <p>@4Min ago</p>
                                    <p>
                                        Bitcoin Warrior <LinkSharp />
                                    </p>
                                </div>
                            </Card>
                            <Card className={'col-sm-12 col-md-3 col-lg-3 m-3'}>
                                <div>
                                    <img
                                        src={
                                            'https://miro.medium.com/max/1024/1*2lw5D9tul5b2f4bTe8YeAw.jpeg'
                                        }
                                        alt={'markets'}
                                        className={'img-thumbnail'}
                                        height={'200'}
                                    />
                                </div>
                                <div>
                                    <p>
                                        Bitcoin EFT Approval{' '}
                                        {'Hangs in the balance'} , Hopes Up on
                                        Nes SEC Chairman
                                    </p>
                                </div>

                                <div
                                    className={
                                        'd-flex justify-content-between text-secondary'
                                    }
                                >
                                    <p>@4Min ago</p>
                                    <p>
                                        Bitcoin Warrior <LinkSharp />
                                    </p>
                                </div>
                            </Card>
                            <Card className={'col-sm-12 col-md-3 col-lg-3 m-3'}>
                                <div>
                                    <img
                                        src={
                                            'https://miro.medium.com/max/1024/1*2lw5D9tul5b2f4bTe8YeAw.jpeg'
                                        }
                                        alt={'markets'}
                                        className={'img-thumbnail'}
                                        height={'200'}
                                    />
                                </div>
                                <div>
                                    <p>
                                        Bitcoin EFT Approval{' '}
                                        {'Hangs in the balance'} , Hopes Up on
                                        Nes SEC Chairman
                                    </p>
                                </div>

                                <div
                                    className={
                                        'd-flex justify-content-between text-secondary'
                                    }
                                >
                                    <p>@4Min ago</p>
                                    <p>
                                        Bitcoin Warrior <LinkSharp />
                                    </p>
                                </div>
                            </Card>
                            <Card className={'col-sm-12 col-md-3 col-lg-3 m-3'}>
                                <div>
                                    <img
                                        src={
                                            'https://miro.medium.com/max/1024/1*2lw5D9tul5b2f4bTe8YeAw.jpeg'
                                        }
                                        alt={'markets'}
                                        className={'img-thumbnail'}
                                        height={'200'}
                                    />
                                </div>
                                <div>
                                    <p>
                                        Bitcoin EFT Approval{' '}
                                        {'Hangs in the balance'} , Hopes Up on
                                        Nes SEC Chairman
                                    </p>
                                </div>

                                <div
                                    className={
                                        'd-flex justify-content-between text-secondary'
                                    }
                                >
                                    <p>@4Min ago</p>
                                    <p>
                                        Bitcoin Warrior <LinkSharp />
                                    </p>
                                </div>
                            </Card>
                            <Card className={'col-sm-12 col-md-3 col-lg-3 m-3'}>
                                <div>
                                    <img
                                        src={
                                            'https://miro.medium.com/max/1024/1*2lw5D9tul5b2f4bTe8YeAw.jpeg'
                                        }
                                        alt={'markets'}
                                        className={'img-thumbnail'}
                                        height={'200'}
                                    />
                                </div>
                                <div>
                                    <p>
                                        Bitcoin EFT Approval{' '}
                                        {'Hangs in the balance'} , Hopes Up on
                                        Nes SEC Chairman
                                    </p>
                                </div>

                                <div
                                    className={
                                        'd-flex justify-content-between text-secondary'
                                    }
                                >
                                    <p>@4Min ago</p>
                                    <p>
                                        Bitcoin Warrior <LinkSharp />
                                    </p>
                                </div>
                            </Card>
                            <Card className={'col-sm-12 col-md-3 col-lg-3 m-3'}>
                                <div>
                                    <img
                                        src={
                                            'https://miro.medium.com/max/1024/1*2lw5D9tul5b2f4bTe8YeAw.jpeg'
                                        }
                                        alt={'markets'}
                                        className={'img-thumbnail'}
                                        height={'200'}
                                    />
                                </div>
                                <div>
                                    <p>
                                        Bitcoin EFT Approval{' '}
                                        {'Hangs in the balance'} , Hopes Up on
                                        Nes SEC Chairman
                                    </p>
                                </div>

                                <div
                                    className={
                                        'd-flex justify-content-between text-secondary'
                                    }
                                >
                                    <p>@4Min ago</p>
                                    <p>
                                        Bitcoin Warrior <LinkSharp />
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </TabPanel>
                    <TabPanel
                        value="2"
                        classes={{ root: classes.tabPanelRoot }}
                    >
                        .
                    </TabPanel>
                </TabContext>
            </div>
        </Card>
    );
}
