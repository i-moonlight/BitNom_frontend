import { useTheme } from '@material-ui/core';
import { Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import sponsor1Img from '../../../assets/landing/sponsor (1).png';
import sponsor2Img from '../../../assets/landing/sponsor (2).png';
import sponsor3Img from '../../../assets/landing/sponsor (3).png';
import sponsor4Img from '../../../assets/landing/sponsor (4).png';
import sponsor5Img from '../../../assets/landing/sponsor (5).png';
import sponsor6Img from '../../../assets/landing/sponsor (6).png';

export default function SponsorsSection() {
    const theme = useTheme();

    const useStyles = makeStyles(() => ({
        root: {
            backgroundColor: theme.palette.background.paper,
            overflowY: 'hidden',
        },
        scroll: { overflowX: 'auto' },
    }));

    const classes = useStyles();

    return (
        <Grid className={classes.root}>
            <Container container component={Grid} maxWidth="lg">
                <Grid item lg={12}>
                    <div
                        className={
                            classes.scroll +
                            'center-horizontal  text-center my-5 scroll-hidden'
                        }
                    >
                        <img className="mx-1" src={sponsor1Img} alt="" />
                        <img className="mx-1" src={sponsor2Img} alt="" />
                        <img className="mx-1" src={sponsor3Img} alt="" />
                        <img className="mx-1" src={sponsor4Img} alt="" />
                        <img className="mx-1" src={sponsor5Img} alt="" />
                        <img className="mx-1" src={sponsor6Img} alt="" />
                    </div>
                </Grid>
            </Container>
        </Grid>
    );
}
