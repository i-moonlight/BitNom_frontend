import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import {
  ChevronRightRounded,
  CloudDownload,
  ExpandMore,
  Help,
  LinkedIn,
  MailRounded,
  ShareRounded,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
// import Carousel from 'react-material-ui-carousel';
import igImg from '../../../../assets/investor/ig.png';
import supplyImg from '../../../../assets/investor/image_5.png';
import landingImg from '../../../../assets/investor/landing.png';
import learnImg from '../../../../assets/investor/learn.svg';
import modelImg from '../../../../assets/investor/model.png';
import scrollImg from '../../../../assets/investor/scroll.svg';
import token1Img from '../../../../assets/investor/token1.png';
import token2Img from '../../../../assets/investor/token2.png';
import logoImg from '../../../../assets/logo_full.svg';
import Button from '../../../../components/Button';
import { team } from '../../../../store/local/dummy';
import DarkTheme from '../../../../utilities/DarkTheme';
import { ecosystem, healthCheck, roadMap } from '../../utilities/welcome.data';

const ROADMAP_DISPLACEMENT = 100;

export default function InvestorTab() {
  const [expanded, setExpanded] = useState(healthCheck[0].title);
  const [expanded2, setExpanded2] = useState(false);
  const [query, setQuery] = useState(1);
  const [year, setYear] = useState('2021');
  const classes = useStyles();

  const splittedEcosystem = [];

  var i,
    j,
    temporary,
    chunk = query;

  for (i = 0, j = ecosystem.length; i < j; i += chunk) {
    temporary = ecosystem.slice(i, i + chunk);
    splittedEcosystem.push(temporary);
  }

  const xs = useMediaQuery('(min-width:10px) and (max-width:599px)');
  const sm = useMediaQuery('(min-width:600px) and (max-width:959px)');
  const md = useMediaQuery('(min-width:960px)  and (max-width:1279px)');
  const lg = useMediaQuery('(min-width:1280px)');

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    lg && setQuery(3);
    md && setQuery(3);
    sm && setQuery(2);
    xs && setQuery(1);
    console.log({ xs, sm, md, lg });
  }, [xs, sm, md, lg]);

  return (
    <DarkTheme>
      <div>
        <section style={{ backgroundColor: '#000' }}>
          <Container maxWidth='lg'>
            <Paper style={{ backgroundColor: '#000' }}>
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <div className='mt-4 pt-2'>
                    <Typography variant='h5' className='mt-5 mb-2'>
                      BitNorm Investor Page
                    </Typography>
                    <Typography variant='h4' className='mb-3'>
                      A one-stop data aggregator for the cryptocurrency
                      ecosystem
                    </Typography>
                    <Typography variant='h6' className='mb-3'>
                      BitNorm creates an ecosystem that is fueled by information
                      sharing
                    </Typography>
                    <Button textCase size='large'>
                      Get Started
                    </Button>
                  </div>
                </Grid>
                <Hidden xsDown>
                  <Grid item sm={6}>
                    <div className=' h-100 w-100 pt-4'>
                      <img className='w-100' src={landingImg} alt='' />
                    </div>
                  </Grid>
                </Hidden>
              </Grid>
            </Paper>
          </Container>
        </section>
        <section
          className=' h-100 w-100 py-4'
          style={{ backgroundColor: '#000' }}
        >
          <Container>
            <img className='w-100' src={scrollImg} alt='' />
          </Container>
        </section>
        <section style={{ backgroundColor: '#000' }}>
          <Container>
            <div className='py-4'>
              <Grid container spacing={2}>
                <Grid item sm={12} md={8}>
                  <Card style={{ backgroundColor: '#11141C', height: '100%' }}>
                    <CardContent className='m-0 pb-0'>
                      <Grid container spacing={2} className='h-100'>
                        <Grid item xs={12} sm={6} md={4} className='h-100'>
                          <div className='d-flex flex-column bg-white p-3 text-black justify-content-between'>
                            <div>
                              <div className='d-flex align-items-center justify-content-between '>
                                <small className='text-uppercase'>
                                  White Paper
                                </small>

                                <small> 9 months ago</small>
                              </div>
                              <Typography className='lead fw-bold my-2'>
                                First in line: Early technology adopters around
                                the globe
                              </Typography>
                            </div>
                            <img
                              src={logoImg}
                              alt=''
                              className='w-50 align-self-baseline mt-3'
                            />
                          </div>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={8}
                          justifyContent='space-between'
                          className=' d-flex flex-column'
                        >
                          <div>
                            <Typography className='lead' gutterBottom>
                              BitNorm, an all in one platform combining several
                              aspects that we call engines that collectively
                              work together to realize natural and seamless
                              access to the information within the
                              cryptocurrencies ecosystem.
                            </Typography>
                            <Typography className='lead' gutterBottom>
                              This information is presented in multiple formats
                              to cater for both the varying goals of our users
                              and the diversity of our audience
                            </Typography>
                          </div>
                          <div>
                            <Divider />
                            <div className='d-flex align-items-center justify-content-between mt-auto'>
                              <Button
                                color='inherit'
                                textCase
                                variant='text'
                                className='mt-2'
                                endIcon={<CloudDownload />}
                              >
                                Download Whitepaper
                              </Button>
                              <Button
                                color='inherit'
                                textCase
                                variant='text'
                                className='mt-2'
                                startIcon={<ShareRounded />}
                              >
                                Share
                              </Button>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm={12} md={4}>
                  <Card
                    style={{
                      backgroundImage: 'linear-gradient(#006097,#07A1FB)',
                      height: '100%',
                    }}
                  >
                    <CardContent>
                      <img src={learnImg} alt='' className='w-50' />
                      <br />
                      <Button
                        size='large'
                        color='inherit'
                        textCase
                        variant='text'
                        className='mt-2'
                        endIcon={<ChevronRightRounded />}
                      >
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Container>
        </section>
        <section style={{ backgroundColor: '#000' }}>
          <Container>
            <div className='py-4'>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card style={{ backgroundColor: '#11141C' }}>
                    <CardContent>
                      <Typography
                        className='text-uppercase'
                        gutterBottom
                        variant='h5'
                      >
                        Base{' '}
                        <span
                          style={
                            {
                              // background: 'linear-gradient(#006097,#f36e6c)',
                              // WebkitBackgroundClip: 'inherit',
                            }
                          }
                        >
                          Concept
                        </span>
                      </Typography>
                      <Typography className='lead' gutterBottom>
                        Bitnorm will design a platform that will merge all type
                        of crypto users together where they will be able to
                        share amongst one another useful information about the
                        market . The platform itself will offer an intuitive
                        interface where market relevant market data and
                        information will be provided. The platform will be
                        imbedded will several relevance market analytical tools
                        andsome relevant data engines that will be useful for
                        the users to make polite financial decision.
                      </Typography>
                      <Typography className='lead' gutterBottom>
                        Bitnorm Platform will be useful for Crypto investors ,
                        most especially users who are new to the industry . They
                        will receive guides and relevant information to succeed
                        in their trading careers. Bitnorm will function like a
                        crypto social media that will connects investors,
                        Project owners , crypto bloggers , traders and more
                        together .Through this channel, useful information can
                        be shared among the users.
                      </Typography>
                      <Card
                        style={{
                          backgroundColor: '#0C0F19',
                          marginTop: 20,
                          borderRadius: 20,
                        }}
                      >
                        <CardContent>
                          <div className='d-flex p-2 '>
                            <Hidden smDown>
                              <img
                                src={igImg}
                                alt=''
                                className='mx-5'
                                style={{ height: 50 }}
                              />
                            </Hidden>
                            <div>
                              <Typography className='lead'>
                                WHO WILL BITNORM ULTIMATELY SERVE?
                              </Typography>
                              <Typography className='lead'>
                                Our goal, therefore, is to unite learners,
                                professionals, and businesses all under one roof
                                with each one of the benefits from the other.
                              </Typography>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Container>
        </section>
        <section style={{ backgroundColor: '#000' }}>
          <Container>
            <div className='py-4'>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card style={{ backgroundColor: '#11141C' }}>
                    <CardContent>
                      <Typography gutterBottom variant='h5' className='fw-bold'>
                        Problem
                      </Typography>
                      <Typography className='lead'>
                        Crypto investors/traders have to maintain multiple
                        accounts on multiple platforms to have a overview of
                        their trading signals, latest crypto news, blogs, forums
                        to make informed decision. There is no integrated
                        environment that allows this.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    color='textSecondary'
                    gutterBottom
                    variant='h5'
                    className='fw-bold'
                  >
                    Solution
                  </Typography>
                  <Typography className='lead text-white'>
                    BITNORM solves this problem by combining all of this
                    much-needed functionality and data with one simple use
                    ecosystem platform. BITNORM creates its own token called BN
                    on thisplatform. BN gives the extract time data and social
                    media collaboration platforms. BN platform always collects
                    cookies for analytic. BITNORM platform users are always
                    firstly communicating with each other. First to get the
                    trading and investment deals to others users. This platform
                    provides real-time communication to each other&apos;s users.
                    Its work time of reward, multichain token locking, superior
                    cutting edge.
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Container>
        </section>
        <section style={{ backgroundColor: '#000' }}>
          <Container>
            <div className='py-1'>
              <Divider className='color-whit bg-whit' />
            </div>
          </Container>
        </section>
        <section style={{ backgroundColor: '#000' }}>
          <Container>
            <div className='py-3'>
              <Card
                style={{ backgroundImage: 'linear-gradient(#0B072B,#072438)' }}
                className='py-3'
              >
                <Grid container spacing={2} alignItems='center'>
                  <Grid item xs={12} sm={3}>
                    <div className='w-100 text-center'>
                      <img src={token2Img} alt='' className='w-75' />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <div className='px-3'>
                      <Typography color='primary'>BN</Typography>
                      <Typography>Symbol</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div className='px-3'>
                      <Typography noWrap color='primary'>
                        0x42edc1c5ff57Ff5240C90E2D8DfA269D77D68013
                      </Typography>
                      <Typography>Smart Contract address</Typography>
                    </div>
                  </Grid>
                  <Hidden smDown>
                    <Grid item xs={12} sm={3}>
                      <div className='w-100 text-end'>
                        <img src={token1Img} alt='' className='w-75' />
                      </div>
                    </Grid>
                  </Hidden>
                </Grid>
              </Card>
            </div>
          </Container>
        </section>

        <section style={{ backgroundColor: '#000' }}>
          <Container>
            <div className='py-5'>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    gutterBottom
                    variant='h5'
                    className='text-white fw-bold'
                  >
                    BN Token
                  </Typography>
                  <Typography gutterBottom className='lead text-white'>
                    BN token is a utility, Ethereum ERC20- token, specially
                    designed for the BitNorm ecosystem. ERC20 tokens enable a
                    uniform, standard set of rules governing how tokens behave
                    and function on the Ethereum network. This is crucial for
                    heightened stability and network cohesiveness. Ethereum has
                    a first-mover advantage and continues to have the largest
                    market cap.
                  </Typography>
                  <Typography gutterBottom className='lead text-white'>
                    ERC20 allows for seamless interaction with other smart
                    contracts and decentralized applications on the Ethereum
                    blockchain.
                  </Typography>
                  <div>
                    <Button
                      size='large'
                      textCase
                      variant='outlined'
                      className='mt-3'
                      endIcon={<ChevronRightRounded />}
                    >
                      Buy BN
                    </Button>
                    <Button
                      size='large'
                      textCase
                      variant='text'
                      className='mt-3'
                      endIcon={<ChevronRightRounded />}
                    >
                      Visit Price / Chart
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div>
                    <div className='w-100 bg-white text-center mb-2 br-1 py-2 fw-bold'>
                      <Typography color='primary'>
                        Maximum Supply: 200M
                      </Typography>
                    </div>
                    <div className='w-100 br-2 bg-white py-1 text-center'>
                      <img className='w-75' src={supplyImg} alt='' />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Container>
        </section>

        <section id='ecosystem' style={{ backgroundColor: '#0C0F19' }}>
          <Container>
            <div className='py-5'>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    variant='h5'
                    className='text-center text-white mb-3'
                  >
                    BitNorm&apos;s Ecosystem
                  </Typography>
                </Grid>
              </Grid>
              {/* <Carousel
                autoPlay
                indicators
                // navButtonsAlwaysVisible
                // navButtonsAlwaysInvisible
                cycleNavigation
                animation='slide'
              > */}
              {splittedEcosystem?.map(item => (
                <div className='mb-4' key={item[0]?.title}>
                  <Grid container spacing={3}>
                    {item?.map(({ title, text, id }) => (
                      <EcosystemCard
                        key={title}
                        title={title}
                        text={text}
                        index={id}
                      />
                    ))}
                  </Grid>
                </div>
              ))}
              {/* </Carousel> */}
              <Grid container>
                <Card variant='outlined' className='mt-4'>
                  <Accordion
                    expanded={expanded2}
                    onChange={() => setExpanded2(!expanded2)}
                    elevation={0}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore color='primary' />}
                      aria-controls={`coming-soon-content`}
                    >
                      <Typography
                        color='inherit'
                        //  className={classes.heading}
                      >
                        Coming Soon
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div>
                        <div className='my-2'>
                          <Typography className='fw-bold'>
                            1. BN Social
                          </Typography>
                          <Typography variant='body2'>
                            It is a BitNorm&apos;s social media tool that allows
                            users from all over the world to connect and share
                            ideas about cryptocurrencies. BN Social allows users
                            to build and manage profiles with an emphasis on
                            their activity and interests in cryptocurrencies.
                          </Typography>
                        </div>
                        <div className='my-2'>
                          <Typography className='fw-bold'>
                            2. Job Board
                          </Typography>
                          <Typography variant='body2'>
                            This will be a feature that will help our users find
                            Cryptocurrency &amp; Bitcoin jobs. Start your new
                            &amp; exciting career in emerging blockchain
                            technology companies.
                          </Typography>
                        </div>
                        <div className='my-2'>
                          <Typography className='fw-bold'>
                            3. Investment Portfolio
                          </Typography>
                          <Typography variant='body2'>
                            Now you will be able to keep track, all your
                            investment accounts in one place. BitNorm will
                            automatically pulls your investment accounts from
                            more than 50 leading brokerages into a single
                            dashboard to give you a real-time view of every
                            stock, mutual fund, ETF, and option you own
                          </Typography>
                        </div>
                        <div className='my-2'>
                          <Typography className='fw-bold'>
                            4. Services
                          </Typography>
                          <Typography variant='body2'>
                            It is also BitNorm&apos;s open marketplace. Products
                            and services listed on BNMarket can be purchased
                            using BN tokens. BNMarket provided sellers with a
                            suite of tools that allows them to effectively
                            manage their business.
                          </Typography>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </Card>
              </Grid>
            </div>
          </Container>
        </section>

        <section style={{ backgroundColor: '#000' }}>
          <Container>
            <div className='py-4'>
              <Card style={{ backgroundColor: '#161922' }}>
                <div className='my-5 mx-3'>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant='h5'>BUSINESS MODEL</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography>
                          BitNorm combines the four elements necessary to
                          empower users venturing into cryptocurrencies and
                          budding cryptocurrency-related projects and businesses
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4}>
                        <div className='my-5'>
                          <Typography className='my-4 fw-bold '>
                            <span
                              style={{
                                zIndex: 3,
                                position: 'absolute',
                              }}
                            >
                              01.
                            </span>
                            <div
                              style={{
                                backgroundColor: '#D483F5',
                                alignSelf: 'baseline',
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                              }}
                            ></div>
                          </Typography>
                          <Typography className='my-4 fw-bold'>
                            Community Engine
                          </Typography>
                          <Typography>
                            Featuring crypto forums, blogs and an integrated
                            chat platform for social collaboration.
                          </Typography>
                        </div>
                        <div className='my-5'>
                          <Typography className='my-4 fw-bold'>
                            <span
                              style={{
                                zIndex: 3,
                                position: 'absolute',
                              }}
                            >
                              02.
                            </span>
                            <div
                              style={{
                                backgroundColor: '#D483F5',
                                alignSelf: 'baseline',
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                              }}
                            ></div>
                          </Typography>
                          <Typography className='my-4 fw-bold'>
                            Community Engine
                          </Typography>
                          <Typography>
                            Featuring crypto forums, blogs and an integrated
                            chat platform for social collaboration.
                          </Typography>
                        </div>
                      </Grid>
                      <Hidden smDown>
                        <Grid item xs={12} sm={6} md={4}>
                          <div className='w-100'>
                            <img src={modelImg} alt='' className='w-75' />
                          </div>
                        </Grid>
                      </Hidden>
                      <Grid item xs={12} sm={6} md={4}>
                        <div className='my-5'>
                          <Typography className='my-4 fw-bold'>
                            <span
                              style={{
                                zIndex: 3,
                                position: 'absolute',
                              }}
                            >
                              03.
                            </span>
                            <div
                              style={{
                                backgroundColor: '#D483F5',
                                alignSelf: 'baseline',
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                              }}
                            ></div>
                          </Typography>
                          <Typography className='my-4 fw-bold'>
                            Community Engine
                          </Typography>
                          <Typography>
                            Featuring crypto forums, blogs and an integrated
                            chat platform for social collaboration.
                          </Typography>
                        </div>
                        <div className='my-5'>
                          <Typography className='my-4 fw-bold'>
                            <span
                              style={{
                                zIndex: 3,
                                position: 'absolute',
                              }}
                            >
                              04.
                            </span>
                            <div
                              style={{
                                backgroundColor: '#D483F5',
                                alignSelf: 'baseline',
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                              }}
                            ></div>
                          </Typography>
                          <Typography className='my-4 fw-bold'>
                            Community Engine
                          </Typography>
                          <Typography>
                            Featuring crypto forums, blogs and an integrated
                            chat platform for social collaboration.
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </CardContent>
                </div>
              </Card>
            </div>
          </Container>
        </section>

        <section
          id='roadmap'
          style={{
            backgroundColor: '#000',
            paddingBottom: query > 1 && ROADMAP_DISPLACEMENT,
          }}
        >
          <Container>
            <div className='py-4'>
              <Paper style={{ backgroundColor: '#000' }}>
                <div className='my-5 mx-3'>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='h5'>BitNorm Roadmap</Typography>
                      <Typography variant='body2'>
                        The highwayto building a legacy that will foster
                        innovation.
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Card>
                        {roadMap.map(road => (
                          <Button
                            color={road?.year != year && 'inherit'}
                            className='me-2'
                            variant={road?.year != year && 'text'}
                            key={road?.year}
                            onClick={() => setYear(road?.year)}
                          >
                            {road?.year}
                          </Button>
                        ))}
                      </Card>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={3}
                    className='mt-4'
                    style={
                      {
                        // backgroundImage: `url('${roadmapImg}')`,
                        // backgroundSize: 'cover',
                        // backgroundPosition: 'center',
                        // backgroundOrigin: '20px 0px',
                      }
                    }
                  >
                    {roadMap
                      .filter(road => road?.year == year)[0]
                      .quaters.map(({ name, text, list }, index) => (
                        <QuaterCard
                          key={name}
                          index={index}
                          name={name}
                          text={text}
                          list={list}
                          year={year}
                          query={query}
                        />
                      ))}
                  </Grid>
                </div>
              </Paper>
            </div>
          </Container>
        </section>

        <section className='py-5' style={{ backgroundColor: '#0C0F19' }}>
          <Container>
            <Typography className='my-2 mx-2 fw-bold text-white'>
              Investor Health Check
            </Typography>
            <Card elevation={0} style={{ backgroundColor: '#0C0F19' }}>
              {healthCheck.map(({ title, text }) => (
                <Accordion
                  key={title}
                  expanded={expanded === title}
                  onChange={handleChange(title)}
                  className={classes.accordion}
                  elevation={0}
                  variant='outlined'
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
          </Container>
        </section>

        <section className='py-5' style={{ backgroundColor: '#000' }}>
          <Container>
            <Card style={{ backgroundColor: '#11141C' }}>
              <CardContent>
                <Typography className='lead mb-3 mt-1'>
                  A word from our CEO
                </Typography>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid xs={12} sm={4}>
                        <img src={team[0].image} alt='' className='w-100' />
                      </Grid>
                      <Grid xs={12} sm={8}>
                        <div className='d-flex flex-column  mx-3'>
                          <Typography>{team[0].name}</Typography>
                          <Typography color='primary'>
                            {team[0].role}
                          </Typography>
                          <Typography variant='body2'>
                            {team[0].desc}
                          </Typography>
                          <div className='mt-4'>
                            <IconButton size='small'>
                              <MailRounded />
                            </IconButton>
                            <IconButton size='small'>
                              <LinkedIn />
                            </IconButton>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                <Typography className='lead mb-3 mt-5'>Our Advisors</Typography>
                <Grid container spacing={2}>
                  {team
                    .filter(({ category }) => category === 'advisor')
                    .map(member => (
                      <TeamCard key={member?.name} member={member} />
                    ))}
                </Grid>
                <Typography className='lead mb-3 mt-5'>
                  Development Team
                </Typography>
                <Grid container spacing={2}>
                  {team
                    .filter(({ category }) => category === 'dev')
                    .map(member => (
                      <TeamCard key={member?.name} member={member} />
                    ))}
                </Grid>
              </CardContent>
            </Card>
          </Container>
        </section>
      </div>
    </DarkTheme>
  );
}

function TeamCard({ member }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card elevation={0} style={{ backgroundColor: '#1E2126' }}>
        <CardContent>
          <div className='d-flex'>
            {member?.image && (
              <div
                className='w-25'
                style={{
                  backgroundImage: `url('${member?.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
            )}
            <div className='d-flex flex-column  mx-3'>
              <Typography>{member?.name}</Typography>
              <Typography color='primary'>{member?.role}</Typography>
              <div className='mt-4'>
                <IconButton size='small'>
                  <MailRounded />
                </IconButton>
                <IconButton size='small'>
                  <LinkedIn />
                </IconButton>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export function EcosystemCard({ index, title, text }) {
  return (
    <Grid item xs={12} sm={6} md={4} style={{}}>
      <Card
        elevation={0}
        className='h-100 br-3'
        style={{
          backgroundImage: 'linear-gradient(#F36E6C,#006097)',
          '&:hover': {
            backgroundImage: 'linear-gradient(#707070,#191c22)',
          },
        }}
      >
        <CardContent
          style={{
            backgroundC: '#fed132',
          }}
          className='h-100 br-3 p-2 m-0'
        >
          <div
            className='h-100 br-3 p-3'
            style={{
              backgroundColor: '#0C0F19',
            }}
          >
            <Typography variant='h6' className='py-4 fw-bold'>
              0{index + 1}.
            </Typography>
            <Typography className='lead my-4 fw-bold'>{title}</Typography>
            <Typography className='lead mb-3'>{text}</Typography>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

function QuaterCard({ index, name, text, list, year, query }) {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      style={{
        position: query > 1 && index % 2 != 0 && 'relative',
        top: ROADMAP_DISPLACEMENT,
      }}
    >
      <Card
        elevation={0}
        className='h-100 br-3'
        style={{
          backgroundColor: '#1E2126',
          ':&hover': {
            borderWidth: 5,
            borderStyle: 'solid',
            borderImage: 'linear-gradient(to right bottom, #260B3C, #a053df)',
            borderImageSlice: 1,
          },
        }}
      >
        <CardContent>
          <Typography className='fw-bold' variant='h6'>
            {name} {year}
          </Typography>
          <Typography className='lead my-2'>{text}</Typography>
          <Typography className='lead'>
            <ul>
              {list.map(ls => (
                <li key={ls} className=''>
                  {ls}
                </li>
              ))}
            </ul>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  accordion: {
    backgroundColor: '#fff',
    color: '#000',
  },
}));
