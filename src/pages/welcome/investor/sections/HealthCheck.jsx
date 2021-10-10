import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    Container,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { ExpandMore, Help } from '@material-ui/icons';
import React, { useState } from 'react';
import { healthCheck } from '../../utilities/welcome.data';

export default function HealthCheck() {
    const [expanded, setExpanded] = useState(healthCheck[0].title);

    const classes = useStyles();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <section className="py-5" style={{ backgroundColor: '#0C0F19' }}>
            <Container>
                <Typography className="my-2 mx-2 fw-bold text-white">
                    Investor Health Check
                </Typography>
                <Card elevation={0} style={{ backgroundColor: '#0C0F19' }}>
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
                                <Typography
                                    color="primary"
                                    className={classes.heading}
                                >
                                    <Help className="me-2" /> {title}
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
        backgroundColor: '#fff',
        color: '#000',
    },
}));
