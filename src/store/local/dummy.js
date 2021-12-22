import {
    AssessmentRounded,
    DescriptionRounded,
    WatchLaterRounded,
} from '@mui/icons-material';

export const status = [
    { title: 'Crypto', value: '6,847' },
    { title: 'Exchange', value: '4,847' },
    { title: 'Market Cap', value: '$6,847,233,445' },
    { title: 'Dominance', value: 'BTC:42.1% ETH:20.0%' },
    { title: 'BN Token', value: '0.04' },
];

export const tabs = [
    {
        label: 'BN Connect',
    },
    {
        label: 'BN Knowledge Center',
        menuItems: [
            { label: 'Crypto-tinder' },
            { label: 'Forum' },
            { label: 'Cryptocurrency' },
            { label: 'Bitcointalk' },
        ],
    },
    { label: 'Exchange' },
    { label: 'Services' },
    { label: 'Job Board' },
    {
        label: 'Product',
        menuItems: [
            { label: 'Investor page' },
            { label: 'Crypto API' },
            { label: 'Widgets and bots' },
            { label: 'Mobile App' },
        ],
    },
    {
        label: 'More',
        menuItems: [
            { label: 'Help Center' },
            { label: 'BN Community' },
            { label: 'About' },
            { label: 'BN for business' },
            { label: 'BN Moderators' },
        ],
    },
];

export const createPostIcons = [
    { Icon: AssessmentRounded },
    { Icon: WatchLaterRounded },
    { Icon: DescriptionRounded },
];
