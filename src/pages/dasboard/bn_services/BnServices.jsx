import { Container, Grid, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Screen from '../../../components/Screen';
import ServiceCard from './ServiceCard';
import ServicesMenu from './ServicesMenu';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
}));

export default function BnServices() {
    const classes = useStyles();
    const mdDown = useMediaQuery('(max-width:1279px)');

    return (
        <Screen>
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {!mdDown && (
                            <Grid item lg={3}>
                                <ServicesMenu />
                            </Grid>
                        )}
                        <Grid item xs={12} sm={12} md={9} lg={9}>
                            {/* {loading && (
                                <CircularProgress
                                    color="primary"
                                    size={60}
                                    thickness={7}
                                />
                            )} */}
                            <Grid container spacing={2}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(
                                    (service) => (
                                        <Grid
                                            key={service}
                                            item
                                            sm={12}
                                            md={6}
                                            lg={4}
                                        >
                                            <ServiceCard service={service} />
                                        </Grid>
                                    )
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </Screen>
    );
}
