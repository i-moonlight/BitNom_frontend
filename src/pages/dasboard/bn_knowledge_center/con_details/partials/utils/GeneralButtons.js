import React from 'react';
import { Button, Chip } from '@mui/material';
import { useStyles } from './styles';

export const GeneralButtons = (props) => {
    const btnColor = useStyles();
    const clickButtonHandler = () => {
        props.setActiveButton(props.id);
        props.setActiveCoinFeature(props.name);
    };
    return (
        <Button
            color={'inherit'}
            className={`${
                props.active ? btnColor.bGActive : btnColor.bGNormal
            }`}
            size={'small'}
            value={props.value}
            name={props.name}
            onClick={clickButtonHandler}
        >
            {props.value}
        </Button>
    );
};

export const GeneralChips = (props) => {
    const btnColor = useStyles();
    const clickChipHandler = () => {
        props.setActiveChip(props.id);
    };
    return (
        <>
            <Chip
                color={'inherit'}
                className={`${
                    props.active ? btnColor.bGActive : btnColor.bGNormal
                }`}
                size={'small'}
                label={props.value}
                value={props.value}
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
