import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Card,
  CardContent,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import { ArrowForwardRounded, ExpandMore, Help } from '@material-ui/icons';
import React from 'react';
import headerBg from '../../../../assets/investor/header.svg';
import techImg from '../../../../assets/investor/image_4.png';
import tokenImg from '../../../../assets/investor/image_5.png';
import investorBg from '../../../../assets/investor/investors.svg';
import Button from '../../../../components/Button';
import Form from '../../../../components/Form';
import TextField from '../../../../components/TextField';
import DarkTheme from '../../../../utilities/DarkTheme';
import { healthCheck } from '../../utilities/welcome.data';

export default function InvestorTab() {
  const [expanded, setExpanded] = React.useState(healthCheck[0].title);
  const classes = useStyles();
  const theme = useTheme();

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <section className='text-center my-4'>
        <Typography variant='h4'>BITNORM</Typography>
        <Typography gutterBottom>
          A one-stop data aggregator for the cryptocurrency ecosystem
        </Typography>
        <div
          className='my-3'
          style={{
            backgroundImage: `url('${headerBg}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: 200,
          }}
        />

        <Typography className='my-3' variant='body2' gutterBottom>
          The cryptocurrency market is one of the investment and trading markets
          that has developed quite significantly in recent months.
          Cryptocurrency has proven itself as an investment instrument and
          digital asset that can be traded and have value. Currently, by
          investing in cryptocurrencies such as Bitcoin, Ethereum, or other
          cryptocurrencies, a person has the opportunity to be able to get a
          return that is many times their investment.
        </Typography>
        <Typography className='my-3' variant='body2' gutterBottom>
          However, high returns, make the cryptocurrency market unstable and
          pose a high risk for crypto-investors, especially for beginners.
        </Typography>
        <Typography className='my-3' variant='body2' gutterBottom>
          Seeing this, BitNorm is here as a platform that makes it easier for
          investors to invest in the cryptocurrency market. BitNorm is the
          Ultimate Crypto-Intelligence Suite that will provide users with the
          best information, overviews, and insights possible on the
          cryptocurrency market. The BITNORM Coin helps direct investors on
          their investment decisions.
        </Typography>
      </section>

      {/* <section className='my-3'>
        <Card>
          <CardContent>
            <Form
              initialValues={{
                name: '',
                email: '',
              }}
            >
              <div className='center-horizontal space-between'>
                <TextField
                  name='name'
                  placeHolder='Full Names'
                  label='Full Name'
                  fullWidth
                />
                <TextField
                  className='mx-2'
                  name='email'
                  placeHolder='Email Address'
                  label='Email Address'
                  fullWidth
                />
              </div>
              <Button
                // fullWidth
                textCase
                endIcon={<ArrowForwardRounded />}
              >
                Subscribe
              </Button>
            </Form>
          </CardContent>
        </Card>
      </section> */}

      <section className='my-4'>
        <Typography gutterBottom className='text-bold'>
          Overview
        </Typography>
        <Typography gutterBottom variant='body2' className=''>
          Bitnorm will design a platform that will merge all type of crypto
          users together where they will be able to share amongst one another
          useful information about the market . The platform itself will offer
          an intuitive interface where market relevant market data and
          information will be provided. The platform will be imbedded will
          several relevance market analytical tools and some relevant data
          engines that will be useful for the users to make polite financial
          decision.
        </Typography>
        <Typography gutterBottom variant='body2' className=''>
          Bitnorm Platform will be useful for Crypto investors , most especially
          users who are new to the industry . They will receive guides and
          relevant information to succeed in their trading careers. Bitnorm will
          function like a crypto social media that will connects investors,
          Project owners , crypto bloggers , traders and more together .Through
          this channel, useful information can be shared among the users.
        </Typography>
      </section>

      <section
        style={{
          backgroundColor: '#006097',
          backgroundImage: `url('${investorBg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          borderRadius: 20,
          // height: 200,
        }}
      >
        <div className='p-4 text-center'>
          <DarkTheme>
            <Typography color='textPrimary' gutterBottom className='fw-bold'>
              Investors
            </Typography>
            <Typography color='textPrimary' gutterBottom>
              The investors utilize diverse accounts on diverse project
              environments to be well informed of unique and potential projects
              All through news, blogs, and other important information pols to
              help navigate their decision. The Ultimate Crypto-Intelligence
              Suite Your gateway to the cryptocurrency ecosystem.
            </Typography>
            <Button textCase color='inherit' className='mt-2 px-5 fw-bold'>
              Get Whitepaper
            </Button>
          </DarkTheme>
        </div>
      </section>

      <section className='my-5'>
        <div className='my-3'>
          <Typography gutterBottom className='text-bold'>
            Problem
          </Typography>
          <Typography gutterBottom variant='body2' className=''>
            Crypto investors/traders have to maintain multiple accounts on
            multiple platforms to have a overview of their trading signals,
            latest crypto news, blogs, forums to make informed decision. There
            is no integrated environment that allows this.
          </Typography>
        </div>
        <div className='my-3'>
          <Typography gutterBottom className='text-bold'>
            Solution
          </Typography>
          <Typography gutterBottom variant='body2' className=''>
            BITNORM solves this problem by combining all of this much-needed
            functionality and data with one simple use ecosystem platform.
            BITNORM creates its own token called BN on this platform. BN gives
            the extract time data and social media collaboration platforms. BN
            platform always collects cookies for analytic. BITNORM platform
            users are always firstly communicating with each other. First to get
            the trading and investment deals to others users.
          </Typography>
          <Typography gutterBottom variant='body2' className=''>
            This platform provides real-time communication to each other&apos;s
            users. Its work time of reward, multichain token locking, superior
            cutting edge.
          </Typography>
        </div>
        <div className='my-3'>
          <Typography gutterBottom className='text-bold'>
            Technology Used
          </Typography>
          <Typography gutterBottom variant='body2' className=''>
            Our Crypto Intelligence Ecosystem connects the dots across validated
            data sets and block chains built on highly secure and performant
            services. We aim to connect as close to the exchanges as possible
            and to make our Al produced weights available to partners and
            customers as DAAS.
          </Typography>
        </div>
        <img src={techImg} alt='' className='w-100' />
        <div className='my-3'>
          <Typography gutterBottom className='text-bold'>
            BN Token
          </Typography>
          <Typography gutterBottom variant='body2' className=''>
            BN token is a utility, <b>Ethereum ERC20- token</b>, specially
            designed for the BitNorm ecosystem. ERC20 tokens enable a uniform,
            standard set of rules governing how tokens behave and function on
            the Ethereum network. This is crucial for heightened stability and
            network cohesiveness. Ethereum has a first-mover advantage and
            continues to have the largest market cap.
          </Typography>
          <Typography gutterBottom variant='body2' className=''>
            <b>ERC20</b> allows for seamless interaction with other smart
            contracts and decentralized applications on the Ethereum blockchain.
          </Typography>
          <div className='text-center my-4'>
            <span
              className='w-50 fw-bold  py-2 px-5 '
              style={{
                backgroundColor: alpha(theme.palette.primary.main, 0.125),
                color: theme.palette.primary.main,
              }}
            >
              Maximum Supply: 200 M
            </span>
            <img src={tokenImg} alt='' className='w-80 my-3' />
          </div>
        </div>
      </section>

      <section className='my-3'>
        <Card className={classes.accordionCard}>
          <Typography className='my-2 mx-2 fw-bold'>
            Investor Health Check
          </Typography>
          {healthCheck.map(({ title, text }) => (
            <Accordion
              key={title}
              expanded={expanded === title}
              onChange={handleChange(title)}
              className={classes.accordion}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<ExpandMore color='primary' />}
                aria-controls={`${title}bh-content`}
                id={`${title}bh-header`}
              >
                <Typography color='primary' className={classes.heading}>
                  <Help className='me-2' /> {title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{text}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Card>
      </section>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  accordionCard: {
    backgroundColor: theme.palette.background.default,
  },
  accordion: {
    backgroundColor: alpha(theme.palette.primary.main, 0.075),
  },
}));
