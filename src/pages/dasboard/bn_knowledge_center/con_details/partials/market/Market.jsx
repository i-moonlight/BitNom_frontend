import { Typography } from '@mui/material';
import * as React from 'react';
import { Fragment } from 'react';
import { useStyles } from '../utils/styles';
import MarketTable from './MarketTable';
import './style.css';

export default function Market() {
    const [
        toggleState,
        // setToggleState
    ] = React.useState(1);
    const btnColor = useStyles();

    // const toggleTab = (index) => {
    //     setToggleState(index);
    // };

    const getActiveClasses = (index, className) => {
        return toggleState === index ? className : btnColor.bGNormal;
    };

    return (
        <Fragment>
            <Typography
                color={'textPrimary'}
                sx={{ width: '100%', typography: 'body1' }}
                component="div"
            >
                <div className={'d-flex'}>
                    {/* <div className={'d-flex'}>
                        <Card className={'m-1'}>
                            <Button
                                color={'inherit'}
                                className={getActiveClasses(
                                    1,
                                    btnColor.bGActive
                                )}
                                onClick={() => toggleTab(1)}
                                size={'small'}
                            >
                                Spot
                            </Button>
                            <Button
                                color={'inherit'}
                                className={getActiveClasses(
                                    2,
                                    btnColor.bGActive
                                )}
                                onClick={() => toggleTab(2)}
                                size={'small'}
                            >
                                Perpetual
                            </Button>
                            <Button
                                color={'inherit'}
                                className={getActiveClasses(
                                    3,
                                    btnColor.bGActive
                                )}
                                onClick={() => toggleTab(3)}
                                size={'small'}
                            >
                                Futures
                            </Button>
                        </Card>
                    </div> */}
                </div>
                <div>
                    <div
                        className={`content ${getActiveClasses(
                            1,
                            'active-content'
                        )}`}
                    >
                        <MarketTable />
                    </div>
                    <div
                        className={`content ${getActiveClasses(
                            2,
                            'active-content'
                        )}`}
                    >
                        <h2>.</h2>
                    </div>
                    <div
                        className={`content ${getActiveClasses(
                            3,
                            'active-content'
                        )}`}
                    >
                        <h2>.</h2>
                    </div>
                </div>
            </Typography>
        </Fragment>
    );
}
