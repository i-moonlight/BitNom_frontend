import { Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { EcosystemCard } from '../pages/welcome/investor/tabs/InvestorTab';

export default function MuiCarousel() {
    const [query, setQuery] = useState(1);
    const splitted = [];
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    const xs = useMediaQuery('(min-width:10px) and (max-width:599px)');
    const sm = useMediaQuery('(min-width:600px) and (max-width:959px)');
    const md = useMediaQuery('(min-width:960px)  and (max-width:1279px)');
    const lg = useMediaQuery('(min-width:1280px)');

    var i,
        j,
        temporary,
        chunk = query;

    for (i = 0, j = items.length; i < j; i += chunk) {
        temporary = items.slice(i, i + chunk);
        splitted.push(temporary);
    }

    useEffect(() => {
        lg && setQuery(3);
        md && setQuery(3);
        sm && setQuery(2);
        xs && setQuery(1);
    }, [xs, sm, md, lg]);

    return (
        <div className="h-100 py-5">
            <Typography color="primary">
                {' '}
                STH: {JSON.stringify(query)}
            </Typography>
            <Container maxWidth="lg">
                <div className="container">
                    <Carousel
                        autoPlay
                        indicators
                        //   navButtonsAlwaysVisible
                        // navButtonsAlwaysInvisible
                        cycleNavigation
                        animation="slide"
                    >
                        {splitted?.map((split, indexUpper) => (
                            <div
                                key={split[0]}
                                className="row text-white bg-theme my-5"
                            >
                                {split?.map((item, index) => (
                                    <div
                                        key={item}
                                        className="col-xs-12 col-sm-6 col-md-4"
                                    >
                                        One of three columns {index + 1} of{' '}
                                        {indexUpper + 1} [
                                        {chunk + indexUpper + index}]
                                    </div>
                                ))}
                            </div>
                        ))}
                    </Carousel>
                </div>

                {/* <Grid container> */}
                <Carousel
                    autoPlay
                    indicators
                    //   navButtonsAlwaysVisible
                    // navButtonsAlwaysInvisible
                    cycleNavigation
                    animation="slide"
                >
                    {splitted?.map((split) => (
                        <Grid key={split[0]?.title} container spacing={3}>
                            {split?.map(({ title, text }, index) => (
                                <EcosystemCard
                                    key={title}
                                    title={title}
                                    text={text}
                                    index={index}
                                />
                            ))}
                        </Grid>
                    ))}
                </Carousel>
                {/* </Grid> */}
            </Container>
        </div>
    );
}
