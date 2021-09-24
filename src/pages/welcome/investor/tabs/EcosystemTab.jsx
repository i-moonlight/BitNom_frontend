import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Container,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { useState } from 'react';
import { ecosystem } from '../../utilities/welcome.data';

export default function EcosystemTab() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='bg-black py-5'>
      <Container maxWidth='lg'>
        {ecosystem.map(({ image, title, text }) => (
          <EcosystemFragment
            key={title}
            title={title}
            image={image}
            text={text}
          />
        ))}
        <Card variant='outlined' className='mt-4'>
          <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
            //   className={classes.accordion}

            elevation={0}
          >
            <AccordionSummary
              expandIcon={<ExpandMore color='primary' />}
              aria-controls={`coming-soon-content`}
            >
              <Typography
                color='primary'
                //  className={classes.heading}
              >
                Coming Soon
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div className='my-2'>
                  <Typography className='fw-bold'>1. BN Social</Typography>
                  <Typography variant='body2'>
                    It is a BitNorm&apos;s social media tool that allows users
                    from all over the world to connect and share ideas about
                    cryptocurrencies. BN Social allows users to build and manage
                    profiles with an emphasis on their activity and interests in
                    cryptocurrencies.
                  </Typography>
                </div>
                <div className='my-2'>
                  <Typography className='fw-bold'>2. Job Board</Typography>
                  <Typography variant='body2'>
                    This will be a feature that will help our users find
                    Cryptocurrency &amp; Bitcoin jobs. Start your new &amp;
                    exciting career in emerging blockchain technology companies.
                  </Typography>
                </div>
                <div className='my-2'>
                  <Typography className='fw-bold'>
                    3. Investment Portfolio
                  </Typography>
                  <Typography variant='body2'>
                    Now you will be able to keep track, all your investment
                    accounts in one place. BitNorm will automatically pulls your
                    investment accounts from more than 50 leading brokerages
                    into a single dashboard to give you a real-time view of
                    every stock, mutual fund, ETF, and option you own
                  </Typography>
                </div>
                <div className='my-2'>
                  <Typography className='fw-bold'>4. Services</Typography>
                  <Typography variant='body2'>
                    It is also BitNorm&apos;s open marketplace. Products and
                    services listed on BNMarket can be purchased using BN
                    tokens. BNMarket provided sellers with a suite of tools that
                    allows them to effectively manage their business.
                  </Typography>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </Card>
      </Container>
    </div>
  );
}

export const EcosystemFragment = ({ image, title, text }) => {
  return (
    <Card className='my-2' elevation={4}>
      <CardContent>
        <div className='d-flex flex-row align-items-start'>
          <img src={image} alt='' className='me-3 w-10' />
          <div>
            <Typography gutterBottom className='fw-bold'>
              {title}
            </Typography>
            <Typography variant='body2'>{text}</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
