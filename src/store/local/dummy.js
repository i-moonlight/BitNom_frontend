import {
  AssessmentRounded,
  DescriptionRounded,
  WatchLaterRounded,
} from '@material-ui/icons';

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

export const scrollVariations = [
  {
    name: 'Brian Sadroe',
    username: '@briansadroe',
    hashtags: ['#bitnorm', '#cryptoexchange', '#cryptocurrency'],
    text: 'Tether Integrates With Plasma Sidechain to Reduce Load on Ethereum @Cointelegraph https://cointelegraph.com/news/tether-integrates-with-plasma. Join BitNorm Community and become part of something great.',
    link: {
      image: 'https://picsum.photos/200/300',
      title:
        'Tether Integrates With Plasma Sidechain to Reduce Load on Ethereum',
      description:
        'Tether has integrated the just-launched OMG Network Plasma sidechain, formerly known as OmiseGo, promising cheaper transactions as Ethereum’s fees skyrocket. a plasma-based Ethereum sidechain launched on June 1 by the project formerly known as OmiseGo.',
      url: 'https://cointelegraph.com/news/tether-integrates-with-plasma',
      hostname: 'cointelegraph.com',
    },
  },
];

export const createPostIcons = [
  { Icon: AssessmentRounded },
  { Icon: WatchLaterRounded },
  { Icon: DescriptionRounded },
];
