import { Card, CardContent, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const ROADMAP_DISPLACEMENT = 100;

export default function QuaterCard({
    index,
    name,
    text,
    list,
    year,
    query,
    state,
}) {
    const classes = useStyles();

    let completeStatusColor = '#02F1AF';
    if (state == 'ongoing') {
        completeStatusColor = '#FFC000';
    }
    if (state == 'upcoming') {
        completeStatusColor = '#019FF9';
    }

    return (
        <Grid
            item
            xs={12}
            sm={6}
            md={3}
            style={{
                position: query > 1 && index % 2 != 0 && 'relative',
                top: ROADMAP_DISPLACEMENT,
            }}
        >
            <Card elevation={0} className={classes.quaterCard}>
                <CardContent className="h-100 br-3 p-2 m-0">
                    <div className={classes.quaterCardContent}>
                        <Typography className="fw-bold" variant="h6">
                            {name} {year}{' '}
                            <span className={`fw-normal `}>
                                <small style={{ color: completeStatusColor }}>
                                    {state}
                                </small>
                            </span>
                        </Typography>
                        <Typography className="lead my-2">{text}</Typography>
                        <Typography className="lead">
                            <ul>
                                {list.map((ls) => (
                                    <li key={ls} className="">
                                        {ls}
                                    </li>
                                ))}
                            </ul>
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
}

const useStyles = makeStyles(() => ({
    quaterCard: {
        height: '100%',
        borderRadius: '0.75em',
        backgroundColor: '#1E2126',
        cursor: 'pointer',
        '&:hover': {
            backgroundImage: 'linear-gradient(#F36E6C,#006097)',
        },
    },
    quaterCardContent: {
        height: '100%',
        borderRadius: '0.75em',
        padding: '1rem',
        margin: 0,
        cursor: 'pointer',
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: '#0C0F19',
        },
    },
}));
