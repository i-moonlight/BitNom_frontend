import { Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Wrapper from '../Wrapper';
import FaqSection from './FaqSection';

export default function Faqs() {
    const classes = useStyles();

    return (
        <Wrapper>
            <Grid>
                <Container container component={Grid} maxWidth="lg">
                    <Grid item md={2}></Grid>
                    <Grid
                        item
                        md={8}
                        style={{
                            borderRadius: 30,
                        }}
                    >
                        <div className="py-4 mb-4">
                            <Typography variant="h4" color="textPrimary">
                                Frequently asked questions
                            </Typography>
                            <Typography variant="h6" color="textPrimary">
                                BitNorm sounds great, but I have questions!
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item md={2}></Grid>
                </Container>
                <div className={classes.body}>
                    <Container container component={Grid} maxWidth="lg">
                        <Grid item md={2}></Grid>
                        <Grid
                            item
                            md={8}
                            style={{
                                borderRadius: 30,
                            }}
                        >
                            <FaqSection />
                            <FaqSection />
                            <FaqSection />
                        </Grid>
                        <Grid item md={2}></Grid>
                    </Container>
                </div>
            </Grid>
        </Wrapper>
    );
}

const useStyles = makeStyles((theme) => ({
    body: {
        backgroundColor:
            theme.palette.mode == 'light'
                ? '#F5F5F5'
                : theme.palette.background.paper,
    },
}));
