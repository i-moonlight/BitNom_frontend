/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 10/19/21
 * Time: 7:28 AM
 */

import { useTheme } from '@emotion/react';
import { Card } from '@mui/material';

import ApexCharts from 'react-apexcharts';

const series = [
    {
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
        name: 'series2',
        data: [11, 32, 45, 32, 34, 52, 41],
    },
];

export default function PriceChart() {
    const theme = useTheme();

    return (
        <Card>
            <ApexCharts
                options={themeOptions(theme)}
                series={series}
                type="area"
                height={350}
            />
        </Card>
    );
}

// ############################################################
function themeOptions(theme) {
    return {
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '2018-09-19T00:00:00',
                '2018-09-19T01:30:00',
                '2018-09-19T02:30:00',
                '2018-09-19T03:30:00',
                '2018-09-19T04:30:00',
                '2018-09-19T05:30:00',
                '2018-09-19T06:30:00',
            ],
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm',
            },
        },
        fill: {
            // colors: [theme.palette.primary.light, theme.palette.success.light],
            type:'gradient'
        },
        colors: [theme.palette.primary.main, theme.palette.success.main],
        chart: {
            toolbar: {
                show: false,
            },
        },
        legend: {
            show: false,
        },
    };
}
