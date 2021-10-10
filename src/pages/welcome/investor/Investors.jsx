import { Box, Container, Divider, Paper } from '@material-ui/core';
import React from 'react';
import scrollImg from '../../../assets/investor/scroll.svg';
import DarkTheme from '../../../utilities/DarkTheme';
import Wrapper from '../Wrapper';
import Header from './sections/Header';
import Concept from './sections/Concept';
import Ecosystem from './sections/Ecosystem';
import HealthCheck from './sections/HealthCheck';
import Roadmap from './sections/RoadMap';
import Solution from './sections/Solution';
import Symbol from './sections/Symbol';
import Team from './sections/Team';
import Token from './sections/Token';
import UserBase from './sections/UserBase';
import WhitePaper from './sections/WhitePaper';

export default function Investors() {
    const onTabValue = (val) => {
        switch (val) {
            case 1:
                window.location.hash = '#ecosystem';
                break;
            case 2:
                window.location.hash = '#roadmap';
                break;
            default:
                window.location.hash = '#';
        }
    };

    return (
        <Wrapper investor onTabValue={onTabValue}>
            <Paper>
                <TabPanel value={0} index={0}>
                    <DarkTheme>
                        <div>
                            <Header />
                            <section
                                className=" h-100 w-100 py-4"
                                style={{ backgroundColor: '#000' }}
                            >
                                <Container>
                                    <img
                                        className="w-100"
                                        src={scrollImg}
                                        alt=""
                                    />
                                </Container>
                            </section>
                            <WhitePaper />
                            <Concept />
                            <Solution />
                            <section style={{ backgroundColor: '#000' }}>
                                <Container>
                                    <div className="py-1">
                                        <Divider className="color-whit bg-whit" />
                                    </div>
                                </Container>
                            </section>
                            <Symbol />
                            <Token />
                            <Ecosystem />
                            <UserBase />
                            <Roadmap />
                            <HealthCheck />
                            <Team />
                        </div>
                    </DarkTheme>
                </TabPanel>
            </Paper>
        </Wrapper>
    );
}

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
};
