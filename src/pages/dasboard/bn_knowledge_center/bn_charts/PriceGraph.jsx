import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            display: false,
        },
        y: {
            display: false,
        },
    },
    elements: {
        point: {
            radius: 0,
        },
    },
};

export default function PriceGraph({ sparkline }) {
    const labels = sparkline.price;

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: sparkline.price,
                borderColor:
                    labels[labels.length - 1] < labels[labels.length - 2]
                        ? '#00ff00'
                        : 'rgb(255, 99, 132)',
                borderWidth: 1,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return <Line options={options} data={data} />;
}
