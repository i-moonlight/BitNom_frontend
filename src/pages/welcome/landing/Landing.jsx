import { makeStyles } from '@material-ui/core';
import React from 'react';
import AcceptCookies from '../AcceptCookies';
import InfrastructureSection from './InfrastructureSection';
import ProjectSection from './ProjectSection';
import Wrapper from '../Wrapper';
import HeaderSection from './HeaderSection';
import InvestorSection from './InvestorSection';
import LayersSection from './LayersSection';
import ServicesSection from './ServicesSection';
import SponsorsSection from './SponsorsSection';
import TransitionSection from './TransitionSection';

export const INVESTOR_CARD_DISPLACEMENT = 200;

export default function Landing() {
  return (
    <Wrapper>
      <HeaderSection />
      <SponsorsSection />
      <ProjectSection />
      <InfrastructureSection />
      <TransitionSection />
      <LayersSection />
      <InvestorSection />
      <ServicesSection />
      <AcceptCookies />
    </Wrapper>
  );
}

export const useStyles = makeStyles(() => ({
  sectionText: {
    lineHeight: '1.8em',
    marginBottom: 16,
  },
  cardImg: {
    width: 100,
    height: 100,
    padding: 10,
  },
}));
