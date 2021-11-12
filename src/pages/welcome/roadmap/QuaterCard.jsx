import { Card, CardContent, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default function QuaterCard({ title, text, list }) {
    const classes = useStyles();

    return (
        <Grid item lg={3} md={4} sm={6} xs={12}>
            <Card className={classes.card} elevation={4}>
                <CardContent>
                    <Typography gutterBottom>{title}</Typography>
                    <Typography variant="body2">
                        {text}
                        {list?.map((ls) => (
                            <li className="mx-0" key={list}>
                                {ls}
                            </li>
                        ))}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.background.default,
    },
}));
