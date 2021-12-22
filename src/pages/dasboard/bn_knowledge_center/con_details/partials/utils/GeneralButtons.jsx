import { Button } from '@mui/material';
import React from 'react';
import { useStyles } from './styles';

export const GeneralButton = ({
    setActiveButton,
    setActiveCoinFeature,
    active,
    id,
    value,
}) => {
    const btnColor = useStyles();

    const clickButtonHandler = () => {
        setActiveButton(id);
        setActiveCoinFeature(name);
    };

    return (
        <Button
            color={'inherit'}
            className={`${
                active ? btnColor.bGActive : btnColor.bGNormal
            } me-1 mb-1`}
            size={'small'}
            value={value}
            onClick={clickButtonHandler}
        >
            {value}
        </Button>
    );
};

export const buttonData = [
    {
        name: 'price',
        value: 'Price',
    },
    {
        name: 'market_cap',
        value: 'Market Cap',
    },
    {
        name: 'trading_views',
        value: 'Trading views',
    },
];

export const chipLabels = [
    {
        name: '1d',
        value: '1d',
    },
    {
        name: '2d',
        value: '2d',
    },
    {
        name: '1m',
        value: '1m',
    },
    {
        name: '3m',
        value: '3m',
    },
    {
        name: '1y',
        value: '1y',
    },
    {
        name: 'YTD',
        value: 'YTD',
    },
    {
        name: 'ALL',
        value: 'ALL',
    },
];
