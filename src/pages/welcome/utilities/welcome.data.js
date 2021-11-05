import React from 'react';

const ecosystem1 = React.lazy(() =>
    import('../../../assets/investor/ecosystem1.svg')
);
const ecosystem2 = React.lazy(() =>
    import('../../../assets/investor/ecosystem2.svg')
);
const ecosystem3 = React.lazy(() =>
    import('../../../assets/investor/ecosystem3.svg')
);
const ecosystem4 = React.lazy(() =>
    import('../../../assets/investor/ecosystem4.svg')
);
const ecosystem5 = React.lazy(() =>
    import('../../../assets/investor/ecosystem5.svg')
);
const ecosystem6 = React.lazy(() =>
    import('../../../assets/investor/ecosystem6.svg')
);
const image1 = React.lazy(() =>
    import('../../../assets/investor/team/team (1).png')
);
const image2 = React.lazy(() =>
    import('../../../assets/investor/team/team (2).png')
);
const image3 = React.lazy(() =>
    import('../../../assets/investor/team/team (3).png')
);
// const image4 = React.lazy(() => import('../../../assets/investor/team/team (4).png'));
const image5 = React.lazy(() =>
    import('../../../assets/investor/team/team (5).png')
);
const image6 = React.lazy(() =>
    import('../../../assets/investor/team/team (6).png')
);
const media2Img = React.lazy(() => import('../../../assets/landing/img7.png'));
const media1Img = React.lazy(() => import('../../../assets/landing/img8.png'));
const media3Img = React.lazy(() => import('../../../assets/landing/img9.png'));

export const platformLayers = [
    {
        image: media2Img,
        title: 'BN Social Center',
        text: 'BN connect is a platform that allows our users from all over the world to connect and share ideas about cryptocurrencies.',
    },
    {
        image: media3Img,
        title: 'BN Marketplace',
        text: 'It is an open marketplace to make it easier for people to buy and sell in their community using BN Tokens.',
    },
    {
        image: media1Img,
        title: 'BN Knowledge Center',
        text: 'It is at the heart of the BN product. It is also the driving force of both BN Connect and BN Marketplace alike',
    },
];

export const ecosystem = [
    {
        id: 0,
        image: ecosystem1,
        title: 'AI Engine',
        text: 'Our premium service use advance machine learning training, deployment and inferencing to make accurate predictions on your behalf also featuring an integratable service forfor partners to use as part of their service offerings.',
    },
    {
        id: 1,
        image: ecosystem2,
        title: 'Big Data Engine',
        text: 'Advanced crypto data warehouse with all the crypto data you would need across the WWW and have easy integratable APIs to access this service',
    },
    {
        id: 2,
        image: ecosystem3,
        title: 'Community Engine',
        text: 'Featuring crypto forums, blogs and an integrated chat platform for social collaboration.',
    },
    {
        id: 3,
        image: ecosystem4,
        title: 'Indexation Engine',
        text: 'Our real time coin data service featuring real time analytics and data integration across cryptocurrencies and technologies.',
    },
    {
        id: 4,
        image: ecosystem5,
        title: 'Market Analysis Engine',
        text: 'Our fundamentals and latest market news analytics service integrated with the partners such as Coingecko',
    },
    {
        id: 5,
        image: ecosystem6,
        title: 'Trading Engine',
        text: 'Our full fledged trading platform featuring trade management with copy trades and portfolio management wallet integration and payment platform integrations.',
    },
];

export const roadMap = [
    {
        year: '2017',
        bg: '#F36E6C',
        quaters: [
            {
                name: 'Q1',
                state: 'completed',
                text: null,
                list: ['Proposed solution study', 'Market research'],
            },
            {
                name: 'Q2',
                state: 'completed',
                text: null,
                list: ['Private fundraising.'],
            },
            {
                name: 'Q3',
                state: 'completed',
                text: null,
                list: ['Team formulation', 'POC development.'],
            },
            {
                name: 'Q4',
                state: 'completed',
                text: null,
                list: ['POC development.'],
            },
        ],
    },
    {
        year: '2018',
        bg: '#FFBB00',
        quaters: [
            {
                name: 'Q1',
                state: 'completed',
                text: null,
                list: [
                    'Development halt due to shortage of funds',
                    'Development team dissolution',
                ],
            },
        ],
    },
    {
        year: '2019',
        bg: '#C53E8E',
        quaters: [
            {
                name: 'Q1',
                state: 'completed',
                text: null,
                list: ['Feasibility study', 'Market research.'],
            },
            {
                name: 'Q2',
                state: 'completed',
                text: null,
                list: ['Team formulation', 'POC development.'],
            },
            {
                name: 'Q3',
                state: 'completed',
                text: null,
                list: ['POC completion.', 'Solution refinement'],
            },
            {
                name: 'Q4',
                state: 'completed',
                text: null,
                list: [
                    'MVP definition',
                    'Product documentation',
                    'MVP development commenced',
                ],
            },
        ],
    },
    {
        year: '2020',
        bg: '#00A2FF',
        quaters: [
            {
                name: 'Q1',
                state: 'completed',
                text: 'Indexation engine development',
                list: ['Cryptocurrencies', 'Exchanges', 'Related news'],
            },
            {
                name: 'Q2',
                state: 'completed',
                text: null,
                list: [
                    'Services engine development',
                    'BitNorm chat application',
                ],
            },
            {
                name: 'Q3',
                state: 'completed',
                text: null,
                list: [
                    'Team expansion',
                    'Data collection & entry commenced',
                    'Community engine development',
                    'Scrolls - Forums - Blogs',
                ],
            },
            {
                name: 'Q4',
                state: 'completed',
                text: null,
                list: [
                    'MVP beta release',
                    'User feedback collection',
                    'Solution refinement',
                    'Release Version v1.0 definition',
                ],
            },
        ],
    },
    {
        year: '2021',
        bg: '#FED132',
        quaters: [
            {
                name: 'Q1',
                state: 'completed',
                text: null,
                list: [
                    'Version 1.0 whitepaper',
                    'Community engagement',
                    'Reward programs development',
                    'Fundraising (Private sale, IEO, ICO & IDO)',
                ],
            },
            {
                name: 'Q2',
                state: 'ongoing',
                text: null,
                list: [
                    'Listing of BN on major exchanges',
                    'BNConnect platform  development',
                    'Launch of BNConnect platform',
                ],
            },
            {
                name: 'Q3',
                state: 'upcoming',
                text: null,
                list: [
                    'BNConnect feature release marketing',
                    'Feature usage assessment',
                    'Feature refinement',
                ],
            },
            {
                name: 'Q4',
                state: 'upcoming',
                text: null,
                list: [
                    'BN knowledge center development',
                    'Finalize design on platform-driven BN token circulation system',
                    'Implement platform-driven BN token circulation system.',
                ],
            },
        ],
    },
    {
        year: '2022',
        bg: '#4A69D7',
        quaters: [
            {
                name: 'Q1',
                state: 'upcoming',
                text: null,
                list: [
                    'BN knowledge center feature release marketing',
                    'Feature usage assessment',
                    'Feature refinement',
                ],
            },
            {
                name: 'Q2',
                state: 'upcoming',
                text: null,
                list: ['BNMarket platform  development'],
            },
            {
                name: 'Q3',
                state: 'upcoming',
                text: null,
                list: ['BNMarket platform  development'],
            },
            {
                name: 'Q4',
                state: 'upcoming',
                text: null,
                list: [
                    'BNMarket feature release marketing',
                    'Feature usage assessment',
                    'Feature refinement',
                ],
            },
        ],
    },
];

export const healthCheck = [
    {
        title: 'What problem are we solving?',
        text: 'In a space where information is ridiculously fragmented, BitNorm provides unified, real-time insights across every crypto project’s full range of activities, on every  blockchain (platform) all in one place.',
    },
    {
        title: 'Do you have a prototype?',
        text: 'In a space where information is ridiculously fragmented, BitNorm provides unified, real-time insights across every crypto project’s full range of activities, on every  blockchain (platform) all in one place.',
    },
    {
        title: 'Is it scalable?',
        text: 'In a space where information is ridiculously fragmented, BitNorm provides unified, real-time insights across every crypto project’s full range of activities, on every  blockchain (platform) all in one place.',
    },
    {
        title: 'Revenue projections?',
        text: 'In a space where information is ridiculously fragmented, BitNorm provides unified, real-time insights across every crypto project’s full range of activities, on every  blockchain (platform) all in one place.',
    },
];

export const footerLinks = [
    [
        { title: true, text: 'COMPANY' },
        { link: '/', text: 'Home' },
        { link: '/#', text: 'About Us' },
        { link: '/#', text: 'White Paper' },
        // { link: '', text: 'Brand Guidelines' },
        { link: '/roadmap', text: 'RoadMap' },
        // { link: '', text: 'Blogs' },
    ],
    [
        { title: true, text: 'GET INVOLVED' },
        { link: '/investors#', text: 'Donate to BN' },
        // { link: '/', text: 'Developers' },
        // { link: '/', text: 'Documentation' },
        // { link: '/', text: 'Partner' },
        { link: '/#', text: 'Career' },
        { link: '/investors', text: 'Investor Page' },
    ],
    [
        { title: true, text: 'SOCIAL' },
        { link: '/redirect?link=https://twitter.com/BitNorm', text: 'Twitter' },
        {
            link: '/redirect?link=https://www.linkedin.com/company/bitnorm',
            text: 'LinkedIn',
        },
        {
            link: '/redirect?link=https://t.me/BitNorm_Official',
            text: 'Telegram',
        },
        {
            link: '/redirect?link=https://www.reddit.com/user/Bitnorm_Official/',
            text: 'Reddit',
        },
        {
            link: '/redirect?link=https://www.youtube.com/channel/UCTEWkRX9RTQGXifuzD2VBOg',
            text: 'Youtube',
        },
    ],
    [
        { title: true, text: 'GET IN TOUCH' },
        {
            link: '/redirect?link=mailto:contact@bitnorm.com',
            text: 'contact@bitnorm.com',
        },
        // {
        //   link: '/redirect?link=mailto:hello@bitnorm.com',
        //   text: 'hello@bitnorm.com',
        // },
        { title: true, text: 'EXPLORE' },
        { link: '/#', text: 'BN Token' },
        { link: '/faqs', text: 'How to buy BN Token' },
    ],
];

export const team = [
    {
        name: 'Alexander van der Drift',
        role: 'CEO and Founder',
        category: 'ceo',
        socials: { linkedIn: '', email: '' },
        desc: 'A sample of the information availed by these engines includes; a regularly updated index of all cryptocurrencies, tokens and cryptocurrency- and blockchain-related projects, insight into the source codes of the various cryptocurrencies, tokens and cryptocurrency- and blockchain-related projects, the various blockchains’ network data, market data and news (sentiment) data. I am passionate about inclusivity and I have steered the development of this great product with a mind for newbies, developers, investors, traders and quantitative researchers alike. At the end of the day, we are all looking to turn a buck from the cryptocurrencies ecosystem. I welcome your support and company as we move forward into the future with BitNorm..',
        image: image1,
    },
    // {
    //   name: 'Yann van Ewijk',
    //   role: 'Advisor',
    //   category: 'advisor',
    //   socials: { linkedIn: '', email: '' },
    //   desc: '',
    //   image: image4,
    // },
    {
        name: 'Alwin de Romijn',
        role: 'Business Advisor',
        category: 'advisor',
        socials: { linkedIn: '', email: '' },
        desc: 'When I first learned about the existence of Bitcoin at the end of 2009 and read the “Satoshi” Bitcoin whitepaper, I immediately trusted this revolutionary system and the freedom that it brought with it.  As an early Bitcoin miner and staff member of various online forums I acquired a great deal of knowledge and want to use it to promote Bitcoin in The Netherlands and to make it big.  Bitcoin should be a household word.',
        image: image2,
    },
    {
        name: 'Frederick Smits',
        role: 'Business Advisor',
        category: 'advisor',
        socials: { linkedIn: '', email: '' },
        desc: 'I love growing companies and building high-performing teams. Strong trackrecord with several successful ventures as MD. Additionally, I have a keen affinity with Python / Data Science / Machine Learning',
        image: image3,
    },
    {
        name: 'Doctorthee',
        role: 'Business Advisor',
        category: 'advisor',
        socials: { linkedIn: '', email: '' },
        desc: 'I have worked on several projects including Reddcoin. His experience in UX/UI designs benefits our team',
        image: image5,
    },
    {
        name: 'Justin Blekemolen',
        role: 'Business Advisor',
        category: 'advisor',
        socials: { linkedIn: '', email: '' },
        desc: 'Investment specialist with a strong focus on charts',
        image: image6,
    },
    {
        name: 'Samuel Mwangi',
        role: 'Team Lead',
        category: 'dev',
        socials: { linkedIn: '', email: '' },
        desc: '',
        image: '',
    },
    {
        name: 'Lawrence Maluki',
        role: 'Product Designer',
        category: 'dev',
        socials: { linkedIn: '', email: '' },
        desc: '',
        image: '',
    },
    {
        name: 'Loise Njeri',
        role: 'Product Manager',
        category: 'dev',
        socials: { linkedIn: '', email: '' },
        desc: '',
        image: '',
    },
    {
        name: 'Mark Aloo',
        role: 'Frontend Lead',
        category: 'dev',
        socials: { linkedIn: '', email: '' },
        desc: '',
        image: '',
    },
    {
        name: 'Jack Mkimbo',
        role: 'Backend Lead',
        category: 'dev',
        socials: { linkedIn: '', email: '' },
        desc: '',
        image: '',
    },
    {
        name: 'Nic Mtungu',
        role: 'UI/UX Designer',
        category: 'dev',
        socials: { linkedIn: '', email: '' },
        desc: '',
        image: '',
    },
    {
        name: 'Mark Mburu',
        role: 'Developer',
        category: 'dev',
        socials: { linkedIn: '', email: '' },
        desc: '',
        image: '',
    },
    {
        name: 'Victor Kiprotich',
        role: 'Backend Developer',
        category: 'dev',
        socials: { linkedIn: '', email: '' },
        desc: '',
        image: '',
    },
    {
        name: 'Evans Kiptoo',
        role: 'Developer',
        category: 'dev',
        socials: { linkedIn: '', email: '' },
        desc: '',
        image: '',
    },
];
