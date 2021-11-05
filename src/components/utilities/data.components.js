import React from 'react';
// import popup3 from '../../assets/landing/popup3.svg';
// import popup4 from '../../assets/landing/popup4.svg';
// import popup7 from '../../assets/landing/popup7.svg';
// import popup9 from '../../assets/landing/popup9.svg';

const popup1 = React.lazy(() => import('../../assets/landing/popup1.svg'));

const popup2 = React.lazy(() => import('../../assets/landing/popup2.svg'));

const popup5 = React.lazy(() => import('../../assets/landing/popup5.svg'));

const popup6 = React.lazy(() => import('../../assets/landing/popup6.svg'));

const popup8 = React.lazy(() => import('../../assets/landing/popup8.svg'));

export const menuEcosystem = [
    { icon: popup1, text: 'AI Engine' },
    { icon: popup2, text: 'Services' },
    // { icon: popup3, text: 'BN Social Center' },
    // { icon: popup4, text: 'BN Marketplace' },
    { icon: popup5, text: 'Knowledge Center' },
];

export const menuProduct = [
    { icon: popup6, text: 'Investor Page', link: '/investors' },
    // { icon: popup7, text: 'Crypto API' },
    { icon: popup8, text: 'Widgets and Bots' },
    // { icon: popup9, text: 'Mobile App' },
];

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
        link: '/connect',
    },
    {
        label: 'Cryptocurrency',
        link: '/knowledge_center/cryptocurrency',
        // menuItems: [
        //     { label: 'Crypto-tinder' },
        //     { label: 'Forum' },
        //     { label: 'Cryptocurrency' },
        //     { label: 'Bitcointalk' },
        // ],
    },
    // { label: 'Exchange' },
    // { label: 'Services' },
    // { label: 'Job Board' },
    { label: 'Events', link: '/events' },
    { label: 'BN Chat', link: '/chat' },
    {
        label: 'Investors',
        extLink: '/investors',
        // menuItems: [
        // { label: 'Investor page', link: '/investors' },
        // { label: 'Crypto API' },
        // { label: 'Widgets and bots' },
        // { label: 'Mobile App' },
        // ],
    },
    // {
    //     label: 'More',
    //     menuItems: [
    //         { label: 'Help Center', link: '/faqs' },
    //         { label: 'BN Community' },
    //         { label: 'About' },
    //         { label: 'BN for business' },
    //         { label: 'BN Moderators' },
    //     ],
    // },
];

export const investorTabs = [
    { label: 'Investor page', hash: '#' },
    { label: 'Ecosystem', hash: '#ecosystem' },
    { label: 'Roadmap', hash: '#roadmap' },
];
