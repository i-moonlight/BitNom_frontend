import React from 'react';
import { Button, Chip } from '@mui/material';
import { useStyles } from './styles';

export const GeneralButtons = ({
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
            className={`${active ? btnColor.bGActive : btnColor.bGNormal}`}
            size={'small'}
            value={value}
            name={name}
            onClick={clickButtonHandler}
        >
            {value}
        </Button>
    );
};

export const GeneralChips = ({ setActiveChip, id, active, value }) => {
    const btnColor = useStyles();

    const clickChipHandler = () => {
        setActiveChip(id);
    };

    return (
        <>
            <Chip
                color={'inherit'}
                className={`${active ? btnColor.bGActive : btnColor.bGNormal}`}
                size={'small'}
                label={value}
                value={value}
                onClick={clickChipHandler}
            />
        </>
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
