import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Hidden,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import { ExpandMore, Help } from '@material-ui/icons';
import React from 'react';
import landingImg from '../../../../assets/investor/landing.png';
import scrollImg from '../../../../assets/investor/scroll.svg';
import Button from '../../../../components/Button';
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
    <DarkTheme>
      <div>
        <section style={{ backgroundColor: theme.palette.background.investor }}>
          <Container maxWidth='lg'>
            <Grid container>
              <Grid item sm={6}>
                <div className='my-5'>
                  <Typography variant='h5' className='mt-5 mb-2'>
                    BitNorm Investor Page
                  </Typography>
                  <Typography variant='h4' className='mb-3'>
                    A one-stop data aggregator for the cryptocurrency ecosystem
                  </Typography>
                  <Typography variant='body1' className='mb-3'>
                    BitNorm creates an ecosystem that is fueled by information
                    sharing
                  </Typography>
                  <Button textCase size='large'>
                    Get Started
                  </Button>
                </div>
              </Grid>
              <Grid item sm={6}>
                <div className=' h-100 w-100'>
                  <img className='w-100' src={landingImg} alt='' />
                </div>
              </Grid>
            </Grid>
          </Container>
        </section>

        <section style={{ backgroundColor: theme.palette.background.default }}>
          <Container>
            <img className='w-100' src={scrollImg} alt='' />
          </Container>
        </section>

        <section style={{ backgroundColor: theme.palette.background.default }}>
          <Container>
            <div className='py-5'>
              <Grid container>
                <Grid item sm={8}>
                  <Card>
                    <CardContent>
                      <Grid container>
                        <Grid item xs={12} sm={4}>
                          whitepaper
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          download
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm={4}>
                  learn more
                </Grid>
              </Grid>
            </div>
          </Container>
        </section>

        <section style={{ backgroundColor: theme.palette.background.default }}>
          <Container>
            <div className='py-5'>
              <Grid container>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>base concept</CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Container>
        </section>

        <section style={{ backgroundColor: theme.palette.background.default }}>
          <Container>
            <div className='py-5'>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardContent>problem</CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  soln
                </Grid>
              </Grid>
            </div>
          </Container>
        </section>

        <section style={{ backgroundColor: theme.palette.background.default }}>
          <Container>
            <div className='py-5'>
              <Divider />
            </div>
          </Container>
        </section>

        <section style={{ backgroundColor: theme.palette.background.default }}>
          <Container>
            <div className='py-5'>
              <Card>
                <CardContent>token info</CardContent>
              </Card>
            </div>
          </Container>
        </section>

        <section style={{ backgroundColor: theme.palette.background.default }}>
          <Container>
            <div className='py-5'>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  buy token
                </Grid>
                <Grid item xs={12} sm={6}>
                  max supply
                </Grid>
              </Grid>
            </div>
          </Container>
        </section>

        <section style={{ backgroundColor: theme.palette.background.paper }}>
          <Container>
            <div className='py-5'>
              <Grid container>
                <Grid item xs={12}>
                  <div>Ecosystem</div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  01
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  02
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  03
                </Grid>
              </Grid>
            </div>
          </Container>
        </section>

        <section style={{ backgroundColor: theme.palette.background.default }}>
          <Container>
            <div className='py-5'>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      business model
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      desc
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} sm={6} md={4}>
                      comm engine
                    </Grid>
                    <Hidden smDown>
                      <Grid item xs={12} sm={6} md={4}>
                        img
                      </Grid>
                    </Hidden>
                    <Grid item xs={12} sm={6} md={4}>
                      comm engine
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        <section className='my-3'>
          <Container>
            <Typography className='my-2 mx-2 fw-bold'>
              Investor Health Check
            </Typography>
            <Card>
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
          </Container>
        </section>

        <section
          className='py-3'
          style={{ backgroundColor: theme.palette.background.default }}
        >
          <Container>
            <Card>
              <CardContent>
                <Typography variant='h6' className='mb-3 mt-1'>
                  Our Team
                </Typography>
                <Grid container spacing={2}>
                  {[1, 2, 3].map(item => (
                    <Grid key={item} item xs={12} sm={6} md={4}>
                      <Card>
                        <CardContent>ctt</CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Typography variant='h6' className='mb-3 mt-5'>
                  Development Team
                </Typography>
                <Grid container spacing={2}>
                  {[1, 2, 3].map(item => (
                    <Grid key={item} item xs={12} sm={6} md={4}>
                      <Card>
                        <CardContent>ctt</CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Typography variant='h6' className='mb-3 mt-5'>
                  Moderators
                </Typography>
                <Grid container spacing={2}>
                  {[1, 2, 3].map(item => (
                    <Grid key={item} item xs={12} sm={6} md={4}>
                      <Card>
                        <CardContent>ctt</CardContent>
                      </Card>
                    </Grid>
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

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  accordion: {
    backgroundColor: alpha(theme.palette.primary.main, 0.075),
  },
}));
