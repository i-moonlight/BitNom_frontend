import { Card, CardContent, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default function EcosystemCard({ index, title, text }) {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4} style={{}}>
            <Card elevation={0} className={classes.ecosystemCard}>
                <CardContent className="h-100 br-3 p-2 m-0">
                    <div
                        // className='h-100 br-3 p-3'
                        className={classes.ecosystemCardContent}
                    >
                        <Typography variant="h6" className="py-4 fw-bold">
                            0{index + 1}.
                        </Typography>
                        <Typography className="lead my-4 fw-bold">
                            {title}
                        </Typography>
                        <Typography className="lead mb-3">{text}</Typography>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
}

const useStyles = makeStyles((theme) => ({
    ecosystemCard: {
        height: '100%',
        borderRadius: '0.75em',
        backgroundImage:
            // 'linear-gradient(#707070,#191c22)'
            theme.palette.background.investorDark,

        cursor: 'pointer',
        '&:hover': {
            backgroundImage: 'linear-gradient(#F36E6C,#006097)',
        },
    },
    ecosystemCardContent: {
        height: '100%',
        borderRadius: '0.75em',
        padding: '1rem',
        margin: 0,
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: theme.palette.background.investorShade,
        },
    },
}));
