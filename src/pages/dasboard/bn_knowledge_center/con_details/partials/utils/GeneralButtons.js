/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 11/15/21
 * Time: 11:24 PM
 */
import React from 'react';
import { Button, Chip } from '@mui/material';
import { useStyles } from './styles';

export const GeneralButtons = (props) => {
    const btnColor = useStyles();
    const clickButtonHandler = () => {
        props.setActiveButton(props.id);
    };
    return (
        <Button
            color={'inherit'}
            className={`${
                props.active ? btnColor.bGActive : btnColor.bGNormal
            }`}
            size={'small'}
            value={props.value}
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
        name: 'Price',
        value: 'Price',
    },
    {
        name: 'Market Cap',
        value: 'Market Cap',
    },
    {
        name: 'Trading views',
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
