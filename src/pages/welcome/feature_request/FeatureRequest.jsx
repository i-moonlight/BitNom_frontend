import { Container, Grid, useMediaQuery, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '../../../components/TextField';
import Wrapper from '../Wrapper';
import RequestDisplayCard from './RequestDisplayCard';
import RequestFormCard from './RequestFormCard';

export default function FeatureRequest() {
    const theme = useTheme();
    const mdUp = useMediaQuery('(min-width:960px)');
    const mdDown = useMediaQuery('(max-width:1279px)');
    const smDown = useMediaQuery('(max-width:959px)');

    return (
        <Wrapper>
            <Grid>
                <Container container component={Grid} maxWidth="lg">
                    <div className="py-4 mb-4">
                        <Typography variant="h4" color="textPrimary">
                            Feature request
                        </Typography>
                        <Typography variant="h6" color="textPrimary">
                            BitNorm sounds great, but I have a suggestion!
                        </Typography>
                    </div>
                </Container>
            </Grid>

            <Grid
                style={{
                    backgroundColor:
                        theme.palette.mode == 'light'
                            ? '#F5F5F5'
                            : theme.palette.background.paper,
                    paddingBottom: 32,
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {!smDown && (
                            <Grid item md={4} lg={3}>
                                <RequestFormCard />
                            </Grid>
                        )}

                        <Grid
                            item
                            sm={12}
                            md={8}
                            lg={6}
                            style={{
                                borderRadius: 30,
                                paddingTop: 16,
                            }}
                        >
                            {!mdUp && <RequestFormCard />}
                            <div className="space-between center-horizontal">
                                <Typography variant="h6" color="textSecondary">
                                    Showing Trending Feature requests
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Search"
                                />
                            </div>
                            <RequestDisplayCard />
                            <RequestDisplayCard />
                            <RequestDisplayCard />
                            <RequestDisplayCard />
                            <RequestDisplayCard />
                        </Grid>
                        {!mdDown && <Grid item lg={3}></Grid>}
                    </Grid>
                </Container>
            </Grid>
        </Wrapper>
    );
}
