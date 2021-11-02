import { Card, CardContent, Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

export default function BitnormPaper({ title, children }) {
    const classes = useStyles();

    return (
        <>
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
                            {title}
                        </Typography>
                        <Typography variant="h6" color="textPrimary">
                            Effective Date: July 6, 2021
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
                            paddingTop: 36,
                            paddingBottom: 36,
                        }}
                    >
                        <Card className={classes.card} elevation={4}>
                            <CardContent className="text-justify">
                                {children}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={2}></Grid>
                </Container>
            </div>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    body: {
        backgroundColor:
            theme.palette.mode == 'light'
                ? '#F5F5F5'
                : theme.palette.background.paper,
    },
    card: {
        borderRadius: 0,
        backgroundColor: theme.palette.background.default,
    },
}));
