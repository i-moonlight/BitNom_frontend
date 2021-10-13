import { Container, Divider } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import scrollImg from '../../../assets/investor/scroll.svg';
import NavBarInvestor from '../../../components/navbar/investor/NavBarInvestor';
import Concept from './sections/Concept';
import Ecosystem from './sections/Ecosystem';
import Header from './sections/Header';
import HealthCheck from './sections/HealthCheck';
import Roadmap from './sections/RoadMap';
import Solution from './sections/Solution';
import Symbol from './sections/Symbol';
import Team from './sections/Team';
import Token from './sections/Token';
import UserBase from './sections/UserBase';
import WhitePaper from './sections/WhitePaper';

export default function Investors() {
    const toTop = useRef(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div
            ref={toTop}
            style={{
                width: '100%',
                minHeight: '100vh',
                overflowY: 'hidden',
            }}
        >
            <NavBarInvestor />
            {/* <DarkTheme> */}
            <Header />
            <section
                className="h-100 w-100 py-4"
                style={{ backgroundColor: '#000' }}
            >
                <Container>
                    <img className="w-100" src={scrollImg} alt="" />
                </Container>
            </section>
            <WhitePaper />
            <Concept />
            <Solution />
            <section style={{ backgroundColor: '#000' }}>
                <Container>
                    <div className="py-1">
                        <Divider />
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
            {/* </DarkTheme> */}
        </div>
    );
}
