import { makeStyles } from '@mui/styles';
import AcceptCookies from '../AcceptCookies';
import CoinMarquee from '../CoinMarquee';
import Wrapper from '../Wrapper';
import HeaderSection from './HeaderSection';
import InfrastructureSection from './InfrastructureSection';
import InvestorSection from './InvestorSection';
import LayersSection from './LayersSection';
import ProjectSection from './ProjectSection';
import ServicesSection from './ServicesSection';
import TransitionSection from './TransitionSection';

export const INVESTOR_CARD_DISPLACEMENT = 200;

export default function Landing() {
    return (
        <Wrapper>
            <HeaderSection />
            <CoinMarquee />
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
