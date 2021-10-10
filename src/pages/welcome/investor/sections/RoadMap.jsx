import {
    Card,
    Container,
    Grid,
    Paper,
    Typography,
    useMediaQuery,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Button from '../../../../components/Button';
import { roadMap } from '../../utilities/welcome.data';
import QuaterCard from '../cards/QuaterCard';

const ROADMAP_DISPLACEMENT = 100;

export default function RoadMap() {
    const [year, setYear] = useState('2021');
    const [query, setQuery] = useState(1);

    const xs = useMediaQuery('(min-width:10px) and (max-width:599px)');
    const sm = useMediaQuery('(min-width:600px) and (max-width:959px)');
    const md = useMediaQuery('(min-width:960px)  and (max-width:1279px)');
    const lg = useMediaQuery('(min-width:1280px)');

    useEffect(() => {
        lg && setQuery(3);
        md && setQuery(3);
        sm && setQuery(2);
        xs && setQuery(1);
        console.log({ xs, sm, md, lg });
    }, [xs, sm, md, lg]);

    return (
        <section
            id="roadmap"
            style={{
                backgroundColor: '#000',
                paddingBottom: query > 1 && ROADMAP_DISPLACEMENT,
            }}
        >
            <Container>
                <div className="py-4">
                    <Paper style={{ backgroundColor: '#000' }}>
                        <div className="my-5 mx-3">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h5">
                                        BitNorm Roadmap
                                    </Typography>
                                    <Typography variant="body2">
                                        The highwayto building a legacy that
                                        will foster innovation.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Card>
                                        {roadMap.map((road) => (
                                            <Button
                                                style={{
                                                    backgroundColor:
                                                        road?.year == year &&
                                                        road?.bg,
                                                }}
                                                color={
                                                    `${road?.year}` !=
                                                        `${year}` && 'inherit'
                                                }
                                                className="me-2"
                                                variant={
                                                    road?.year != year && 'text'
                                                }
                                                key={road?.year}
                                                onClick={() => {
                                                    setYear(road?.year);
                                                }}
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
                                className="mt-4"
                                // style={{
                                //     backgroundImage: `url('${roadmapImg}')`,
                                //     backgroundSize: 'cover',
                                //     backgroundPosition: 'center',
                                //     backgroundOrigin: '20px 0px',
                                // }}
                            >
                                {roadMap
                                    .filter((road) => road?.year == year)[0]
                                    .quaters.map(
                                        (
                                            { name, text, list, state },
                                            index
                                        ) => (
                                            <QuaterCard
                                                key={name}
                                                state={state}
                                                index={index}
                                                name={name}
                                                text={text}
                                                list={list}
                                                year={year}
                                                query={query}
                                            />
                                        )
                                    )}
                            </Grid>
                        </div>
                    </Paper>
                </div>
            </Container>
        </section>
    );
}
