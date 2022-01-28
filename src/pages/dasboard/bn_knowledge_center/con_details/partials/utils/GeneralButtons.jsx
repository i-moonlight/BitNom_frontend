import { ButtonBase, Typography } from '@mui/material';
import React from 'react';
import { useStyles } from './styles';

export const GeneralButton = ({
    setActiveButton,
    setActiveCoinFeature,
    setChartDuration,
    active,
    id,
    value,
}) => {
    const btnColor = useStyles();

    const clickButtonHandler = () => {
        setActiveButton && setActiveButton(id);
        setActiveCoinFeature && setActiveCoinFeature(name);
        setChartDuration && setChartDuration(value);
    };

    return (
        <ButtonBase
            color={'inherit'}
            className={`${
                active ? btnColor.bGActive : btnColor.bGNormal
            } me-1 px-2 py-1 br-1`}
            size={'small'}
            value={value}
            onClick={clickButtonHandler}
        >
            <Typography variant="body2">{value}</Typography>
        </ButtonBase>
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
        name: '24h',
        value: 'day',
    },
    {
        name: '7d',
        value: 'week',
    },
    {
        name: '30d',
        value: 'month',
    },
    {
        name: '1yr',
        value: 'year',
    },
];
