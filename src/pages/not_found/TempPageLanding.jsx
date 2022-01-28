import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import tempImg from '../../assets/temp.png';
import LazyImage from '../../components/LazyImage';
import Wrapper from '../welcome/Wrapper';

export default function TempPageLanding() {
    const classes = useStyles();
    return (
        <Wrapper noFooter>
            <Container className={classes.root} maxWidth="lg">
                <div className="my-5 py-5 text-center">
                    <LazyImage
                        image={{
                            src: tempImg,
                            width: 300,
                        }}
                    />
                    <Typography className="mt-5 mb-2" variant="h4">
                        Sorry, we are doing some work here
                    </Typography>
                    <Typography
                        className="mb-5"
                        color="textSecondary"
                        variant="h5"
                    >
                        Thank you for being patient. We will be back shortly.
                    </Typography>
                </div>
            </Container>
        </Wrapper>
    );
}

const useStyles = makeStyles(() => ({
    root: {
        minHeight: window.innerHeight * 0.6,
    },
}));
