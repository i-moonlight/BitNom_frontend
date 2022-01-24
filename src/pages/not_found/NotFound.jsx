import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Wrapper from '../welcome/Wrapper';

export default function NotFound() {
    const classes = useStyles();
    return (
        <Wrapper noFooter>
            <Container className={classes.root} maxWidth="lg">
                <div className="my-5 py-5 text-center">
                    <Typography
                        className="mt-5 mb-2"
                        color="textSecondary"
                        variant="h2"
                    >
                        404: Not Found
                    </Typography>
                    <Typography
                        className="mb-5"
                        color="textSecondary"
                        variant="h4"
                    >
                        Sorry ... We cannot find what youre looking for
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
