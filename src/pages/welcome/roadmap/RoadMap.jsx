import { Breadcrumbs, Container, Grid, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useState } from 'react';
import { roadMap } from '../utilities/welcome.data';
import Wrapper from '../Wrapper';
import QuaterCard from './QuaterCard';

export default function RoadMap() {
    // const theme = useTheme();
    const classes = useStyles();
    const [year, setYear] = useState('2021');

    return (
        <Wrapper>
            <Container maxWidth="lg">
                <div className="py-4 mb-4">
                    <Typography variant="h4" color="textPrimary">
                        BitNorm Roadmap
                    </Typography>
                    <Typography variant="h6" color="textPrimary">
                        The highway to building a legacy that will foster
                        innovation.
                    </Typography>
                </div>
            </Container>
            <div className={classes.body}>
                <Container maxWidth="lg">
                    <div className="pt-4">
                        <Breadcrumbs aria-label="breadcrumb">
                            {roadMap.map((road) => (
                                <Link
                                    className={
                                        road?.year != year
                                            ? classes.linkInactive
                                            : classes.linkActive
                                    }
                                    key={road?.year}
                                    onClick={() => setYear(road?.year)}
                                >
                                    {road?.year}
                                </Link>
                            ))}
                        </Breadcrumbs>
                    </div>
                </Container>
                <Container maxWidth="lg">
                    <Grid className="py-4" container spacing={2}>
                        {roadMap
                            .filter((road) => road?.year == year)[0]
                            .quaters?.map((quater) => (
                                <QuaterCard
                                    key={quater?.name}
                                    title={quater?.name}
                                    text={quater?.text}
                                    list={quater?.list}
                                />
                            ))}
                    </Grid>
                </Container>
            </div>
        </Wrapper>
    );
}

const useStyles = makeStyles((theme) => ({
    body: {
        backgroundColor:
            theme.palette.type == 'light'
                ? '#F5F5F5'
                : theme.palette.background.paper,
    },
    linkInactive: {
        color: theme.palette.text.disabled,
    },
    linkActive: {
        color: theme.palette.primary.main,
    },
}));
