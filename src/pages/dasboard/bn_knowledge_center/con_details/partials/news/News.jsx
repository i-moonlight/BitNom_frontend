import { Button, Card, Typography } from '@mui/material';
import * as React from 'react';
import { useStyles } from '../utils/styles';
import NewsTable from './NewsTable';

export default function News() {
    const [toggleState, setToggleState] = React.useState(1);
    const btnColor = useStyles();

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const getActiveTabClass = (index, className) => {
        return toggleState === index ? className : btnColor.bGNormal;
    };

    return (
        <Typography
            color={'textPrimary'}
            sx={{ width: '100%', typography: 'body1' }}
            component="div"
        >
            <div className={'d-flex m-1'}>
                <Card>
                    <Button
                        color={'inherit'}
                        className={getActiveTabClass(1, btnColor.bGActive)}
                        onClick={() => toggleTab(1)}
                    >
                        Recent
                    </Button>
                    <Button
                        color={'inherit'}
                        className={getActiveTabClass(2, btnColor.bGActive)}
                        onClick={() => toggleTab(2)}
                    >
                        Hot
                    </Button>
                </Card>
            </div>
            <div className={'m-1'}>
                <div
                    className={`content ${getActiveTabClass(
                        1,
                        'active-content'
                    )}`}
                >
                    <NewsTable />
                </div>
                <div
                    className={`content ${getActiveTabClass(
                        2,
                        'active-content'
                    )}`}
                >
                    <h2>.</h2>
                </div>
            </div>
        </Typography>
    );
}
