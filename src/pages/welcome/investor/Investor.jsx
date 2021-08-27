import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { AddCircleRounded, ArrowRightAltRounded } from '@material-ui/icons';
import React from 'react';
import bottomBg from '../../../assets/investor/bottom.svg';
import headerBg from '../../../assets/investor/header.svg';
import techImg from '../../../assets/investor/image_4.png';
import tokenImg from '../../../assets/investor/image_5.png';
import investorBg from '../../../assets/investor/investors.svg';
import Button from '../../../components/Button';
import Form from '../../../components/Form';
import TextField from '../../../components/TextField';
import Wrapper from '../Wrapper';

export default function Investor() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Wrapper investor>
      <Container component={Paper} maxWidth='lg' className={classes.container}>
        <Grid container spacing={2}>
          <Grid item md={2} lg={3}></Grid>
          <Grid item xs={12} sm={12} md={8} lg={6}>
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

              <Typography variant='body2' gutterBottom>
                The cryptocurrency market is one of the investment and trading
                markets that has developed quite significantly in recent months.
                Cryptocurrency has proven itself as an investment instrument and
                digital asset that can be traded and have value. Currently, by
                investing in cryptocurrencies such as Bitcoin, Ethereum, or
                other cryptocurrencies, a person has the opportunity to be able
                to get a return that is many times their investment.
              </Typography>
              <Typography variant='body2' gutterBottom>
                However, high returns, make the cryptocurrency market unstable
                and pose a high risk for crypto-investors, especially for
                beginners.
              </Typography>
              <Typography variant='body2' gutterBottom>
                Seeing this, BitNorm is here as a platform that makes it easier
                for investors to invest in the cryptocurrency market. BitNorm is
                the Ultimate Crypto-Intelligence Suite that will provide users
                with the best information, overviews, and insights possible on
                the cryptocurrency market. The BITNORM Coin helps direct
                investors on their investment decisions.
              </Typography>
            </section>

            <section>
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
                        label='Name'
                      />
                      <TextField
                        className='mx-2'
                        name='email'
                        placeHolder='Email Address'
                        label='Email'
                      />
                      <Button textCase endIcon={<ArrowRightAltRounded />}>
                        Subscribe
                      </Button>
                    </div>
                  </Form>
                </CardContent>
              </Card>
            </section>

            <section>
              <Typography gutterBottom className='text-bold'>
                Overview
              </Typography>
              <Typography gutterBottom variant='body2' className=''>
                Bitnorm will design a platform that will merge all type of
                crypto users together where they will be able to share amongst
                one another useful information about the market . The platform
                itself will offer an intuitive interface where market relevant
                market data and information will be provided. The platform will
                be imbedded will several relevance market analytical tools and
                some relevant data engines that will be useful for the users to
                make polite financial decision.
              </Typography>
              <Typography gutterBottom variant='body2' className=''>
                Bitnorm Platform will be useful for Crypto investors , most
                especially users who are new to the industry . They will receive
                guides and relevant information to succeed in their trading
                careers. Bitnorm will function like a crypto social media that
                will connects investors, Project owners , crypto bloggers ,
                traders and more together .Through this channel, useful
                information can be shared among the users.
              </Typography>
            </section>

            <section
              style={{
                backgroundColor: '#006097',
                backgroundImage: `url('${investorBg}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                // height: 200,
              }}
            >
              <div className='p-3'>
                <Typography gutterBottom className='text-bold'>
                  Investors
                </Typography>
                <Typography gutterBottom variant='body2' className=''>
                  The investors utilize diverse accounts on diverse project
                  environments to be well informed of unique and potential
                  projects All through news, blogs, and other important
                  information pols to help navigate their decision. The Ultimate
                  Crypto-Intelligence Suite Your gateway to the cryptocurrency
                  ecosystem.
                </Typography>
                <Button>Get Whitepaper</Button>
              </div>
            </section>

            <section>
              <div className='my-2'>
                <Typography gutterBottom className='text-bold'>
                  Problem
                </Typography>
                <Typography gutterBottom variant='body2' className=''>
                  Crypto investors/traders have to maintain multiple accounts on
                  multiple platforms to have a overview of their trading
                  signals, latest crypto news, blogs, forums to make informed
                  decision. There is no integrated environment that allows this.
                </Typography>
              </div>
              <div className='my-2'>
                <Typography gutterBottom className='text-bold'>
                  Solution
                </Typography>
                <Typography gutterBottom variant='body2' className=''>
                  BITNORM solves this problem by combining all of this
                  much-needed functionality and data with one simple use
                  ecosystem platform. BITNORM creates its own token called BN on
                  this platform. BN gives the extract time data and social media
                  collaboration platforms. BN platform always collects cookies
                  for analytic. BITNORM platform users are always firstly
                  communicating with each other. First to get the trading and
                  investment deals to others users.
                </Typography>
                <Typography gutterBottom variant='body2' className=''>
                  This platform provides real-time communication to each
                  other&apos;s users. Its work time of reward, multichain token
                  locking, superior cutting edge.
                </Typography>
              </div>
              <div className='my-2'>
                <Typography gutterBottom className='text-bold'>
                  Technology Used
                </Typography>
                <Typography gutterBottom variant='body2' className=''>
                  Our Crypto Intelligence Ecosystem connects the dots across
                  validated data sets and block chains built on highly secure
                  and performant services. We aim to connect as close to the
                  exchanges as possible and to make our Al produced weights
                  available to partners and customers as DAAS.
                </Typography>
              </div>
              <img src={techImg} alt='' className='w-100' />
              <div className='my-2'>
                <Typography gutterBottom className='text-bold'>
                  BN Token
                </Typography>
                <Typography gutterBottom variant='body2' className=''>
                  BN token is a utility, <b>Ethereum ERC20- token</b>, specially
                  designed for the BitNorm ecosystem. ERC20 tokens enable a
                  uniform, standard set of rules governing how tokens behave and
                  function on the Ethereum network. This is crucial for
                  heightened stability and network cohesiveness. Ethereum has a
                  first-mover advantage and continues to have the largest market
                  cap.
                </Typography>
                <Typography gutterBottom variant='body2' className=''>
                  <b>ERC20</b> allows for seamless interaction with other smart
                  contracts and decentralized applications on the Ethereum
                  blockchain.
                </Typography>
                <img src={tokenImg} alt='' className='w-100' />
              </div>
            </section>

            <section>
              {['panel1', 'panel2', 'panel3'].map(panel => (
                <Accordion
                  key={panel}
                  expanded={expanded === panel}
                  onChange={handleChange(panel)}
                  className={classes.accordion}
                  elevation={4}
                >
                  <AccordionSummary
                    expandIcon={<AddCircleRounded color='primary' />}
                    aria-controls={`${panel}bh-content`}
                    id={`${panel}bh-header`}
                  >
                    <Typography className={classes.heading}>
                      How to give a Tip to Creator?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Nulla facilisi. Phasellus sollicitudin nulla et quam
                      mattis feugiat. Aliquam eget maximus est, id dignissim
                      quam.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </section>

            <section
              className='my-5'
              style={{
                backgroundColor: '#006097',
                backgroundImage: `url('${bottomBg}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                // height: 200,
              }}
            >
              <div className='p-2'>
                <Typography gutterBottom className='text-bold'>
                  WHO WILL BITNORM ULTIMATELY SERVE?
                </Typography>
                <Typography gutterBottom variant='body2' className=''>
                  Underlying all activities on the BitNorm application are 3 key
                  ideologies: learn, share, and profit. Our goal, therefore, is
                  to unite learners, professionals, and businesses all under one
                  roof with each one of the benefits from the other.
                </Typography>
                <Button>Get Started</Button>
              </div>
            </section>
          </Grid>
          <Grid item md={2} lg={3}></Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  container: {
    backgroundColor: theme.palette.background.default,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  accordion: {
    backgroundColor: theme.palette.background.default,
  },
}));
