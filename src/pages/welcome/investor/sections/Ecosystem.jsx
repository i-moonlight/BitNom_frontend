import { useTheme } from '@emotion/react';
import { ExpandMore } from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    Container,
    Grid,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
// import Carousel from 'react-material-ui-carousel';
import { ecosystem } from '../../utilities/welcome.data';
import EcosystemCard from '../cards/EcosystemCard';

export default function Ecosystem() {
    const [expanded2, setExpanded2] = useState(false);
    const [query, setQuery] = useState(1);
    const theme = useTheme();

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

    // const xsDown = useMediaQuery('(max-width:599px)');
    // const xsUp = useMediaQuery('(min-width:10px)');
    // const smDown = useMediaQuery('(max-width:959px)');
    // const smUp = useMediaQuery('(min-width:600px)');
    // const mdUp = useMediaQuery('(min-width:960px)');
    // const mdDown = useMediaQuery('(max-width:1279px)');
    // const lgUp = useMediaQuery('(min-width:1280px)');

    useEffect(() => {
        lg && setQuery(3);
        md && setQuery(3);
        sm && setQuery(2);
        xs && setQuery(1);
    }, [xs, sm, md, lg]);

    return (
        <section
            id="ecosystem"
            style={{ backgroundColor: theme.palette.background.investorShade }}
        >
            <Container maxWidth="lg">
                <div className="py-5">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h5"
                                className="text-center text-white mb-3"
                            >
                                BitNorm&apos;s Ecosystem
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Card variant="outlined" className="mt-4 mb-5">
                            <Accordion
                                expanded={expanded2}
                                onChange={() => setExpanded2(!expanded2)}
                                elevation={0}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMore color="primary" />}
                                    aria-controls={`coming-soon-content`}
                                >
                                    <Typography
                                        color="inherit"
                                        //  className={classes.heading}
                                    >
                                        Coming Soon
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div>
                                        <div className="my-2">
                                            <Typography className="fw-bold">
                                                1. BN Social
                                            </Typography>
                                            <Typography variant="body2">
                                                It is a BitNorm&apos;s social
                                                media tool that allows users
                                                from all over the world to
                                                connect and share ideas about
                                                cryptocurrencies. BN Social
                                                allows users to build and manage
                                                profiles with an emphasis on
                                                their activity and interests in
                                                cryptocurrencies.
                                            </Typography>
                                        </div>
                                        <div className="my-2">
                                            <Typography className="fw-bold">
                                                2. Job Board
                                            </Typography>
                                            <Typography variant="body2">
                                                This will be a feature that will
                                                help our users find
                                                Cryptocurrency &amp; Bitcoin
                                                jobs. Start your new &amp;
                                                exciting career in emerging
                                                blockchain technology companies.
                                            </Typography>
                                        </div>
                                        <div className="my-2">
                                            <Typography className="fw-bold">
                                                3. Investment Portfolio
                                            </Typography>
                                            <Typography variant="body2">
                                                Now you will be able to keep
                                                track, all your investment
                                                accounts in one place. BitNorm
                                                will automatically pulls your
                                                investment accounts from more
                                                than 50 leading brokerages into
                                                a single dashboard to give you a
                                                real-time view of every stock,
                                                mutual fund, ETF, and option you
                                                own
                                            </Typography>
                                        </div>
                                        <div className="my-2">
                                            <Typography className="fw-bold">
                                                4. Services
                                            </Typography>
                                            <Typography variant="body2">
                                                It is also BitNorm&apos;s open
                                                marketplace. Products and
                                                services listed on BNMarket can
                                                be purchased using BN tokens.
                                                BNMarket provided sellers with a
                                                suite of tools that allows them
                                                to effectively manage their
                                                business.
                                            </Typography>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </Card>
                    </Grid>

                    {/* <Carousel
                        autoPlay
                        indicators
                        // navButtonsAlwaysVisible
                        // navButtonsAlwaysInvisible
                        cycleNavigation
                        animation="slide"
                    > */}
                    {splittedEcosystem?.map((item) => (
                        <div className="mb-4" key={item[0]?.title}>
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
                </div>
            </Container>
        </section>
    );
}
