import { AddCircleRounded } from '@mui/icons-material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import React from 'react';

export default function FaqSection() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className="my-5">
            <Typography className="my-3" color="textSecondary">
                INVESTORS
            </Typography>
            <div className={classes.root}>
                {['panel1', 'panel2', 'panel3'].map((panel) => (
                    <Accordion
                        key={panel}
                        expanded={expanded === panel}
                        onChange={handleChange(panel)}
                        className={classes.accordion}
                        elevation={4}
                    >
                        <AccordionSummary
                            expandIcon={<AddCircleRounded color="primary" />}
                            aria-controls={`${panel}bh-content`}
                            id={`${panel}bh-header`}
                        >
                            <Typography className={classes.heading}>
                                How to give a Tip to Creator?
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Nulla facilisi. Phasellus sollicitudin nulla et
                                quam mattis feugiat. Aliquam eget maximus est,
                                id dignissim quam.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    accordion: {
        backgroundColor: theme.palette.background.default,
    },
}));
