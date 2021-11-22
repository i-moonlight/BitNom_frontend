/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 10/18/21
 * Time: 5:43 AM
 */

import {
    Button,
    Card,
    Typography,
} from '@mui/material';
import * as React from 'react';
import {useStyles} from '../utils/styles';
import './styles.css';
import RecentTab from './RecentTab';

export default function Forum() {

    const [toggleState, setToggleState] = React.useState(1);
    const btnColor = useStyles();

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const getActiveClass = (index, className) => {
        return toggleState === index ? className : btnColor.bGNormal;
    };
    return (
        <React.Fragment>
            <Typography color={'textPrimary'} component={'div'}>
                <div className={'d-flex'}>
                    {/*<div className={'mt-1 me-4'}>*/}
                    {/*    <h4 className={'fw-bold'}>Bitcoin Threads</h4>*/}
                    {/*</div>*/}
                        <Card>
                            <Button
                                color={'inherit'}
                                className={getActiveClass(1, btnColor.bGActive)}
                                onClick={() => toggleTab(1)}
                                size={'small'}>
                                Recent
                            </Button>
                            <Button
                                color={'inherit'}
                                className={getActiveClass(2, btnColor.bGActive)}
                                onClick={() => toggleTab(2)}
                                size={'small'}>
                                Hot
                            </Button>
                            <Button
                                color={'inherit'}
                                className={getActiveClass(3, btnColor.bGActive)}
                                onClick={() => toggleTab(3)}
                                size={'small'}>
                                Last Month
                            </Button>
                        </Card>
                </div>
                <div>
                    <div className={`content ${getActiveClass(1, 'active-content')}`}>
                        <RecentTab />
                    </div>
                    <div className={`content ${getActiveClass(2, 'active-content')}`}>
                        <h2>.</h2>
                    </div>
                    <div className={`content ${getActiveClass(3, 'active-content')}`}>
                        <h2>.</h2>
                    </div>
                </div>
            </Typography>
        </React.Fragment>
    );
}

