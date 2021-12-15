import { useTheme } from '@emotion/react';
import { ExpandMore, Help } from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    Container,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { healthCheck } from '../../utilities/welcome.data';

export default function HealthCheck() {
    const [expanded, setExpanded] = useState(healthCheck[0].title);

    const classes = useStyles();
    const theme = useTheme();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <section
            className="py-5"
            style={{ backgroundColor: theme.palette.background.investorShade }}
        >
            <Container maxWidth="lg">
                <Typography color="textPrimary" className="my-2 mx-2 fw-bold ">
                    Investor Health Check
                </Typography>
                <Card
                    elevation={0}
                    style={{
                        backgroundColor: '#efefef',
                    }}
                >
                    {healthCheck.map(({ title, text }) => (
                        <Accordion
                            key={title}
                            expanded={expanded === title}
                            onChange={handleChange(title)}
                            className={classes.accordion}
                            elevation={0}
                            variant="outlined"
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMore color="primary" />}
                                aria-controls={`${title}bh-content`}
                                id={`${title}bh-header`}
                            >
                                <Help className="me-2" color="primary" />{' '}
                                <Typography
                                    color="primary"
                                    className={classes.heading}
                                >
                                    {title}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{text}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Card>
            </Container>
        </section>
    );
}

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
    },
    accordion: {
        backgroundColor: '#efefef',
        color: '#000',
    },
}));
