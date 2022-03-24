import { Button, Card, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useStyles } from '../bn_knowledge_center/con_details/partials/utils/styles.js';
import '../bn_knowledge_center/con_details/partials/forum/styles.css';
import { makeStyles } from '@mui/styles';
import Screen from '../../../components/Screen';
import SEO from '../../../components/SEO';
import ForumBody from '../bn_knowledge_center/con_details/partials/forum/ForumBody';

const useStylesClasses = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
}));

export default function Forum() {
    const [toggleState, setToggleState] = useState(1);
    const btnColor = useStyles();
    const classes = useStylesClasses();

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const getActiveClass = (index, className) => {
        return toggleState === index ? className : btnColor.bGNormal;
    };

    return (
        <Screen>
            <SEO
                title="Forum | Bitnorm"
                url={`${window.location.origin}/forum`}
                description={`All forum topics`}
            />
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <div className={'d-flex align-items-center'}>
                        <Typography
                            className="me-3"
                            color="textPrimary"
                        >{`${' '} Threads`}</Typography>
                        <Card>
                            <div className="m-1">
                                <Button
                                    color={'inherit'}
                                    className={getActiveClass(1, btnColor.bGActive)}
                                    onClick={() => toggleTab(1)}
                                    size={'small'}
                                >
                                    Recent
                                </Button>
                                <Button
                                    color={'inherit'}
                                    className={getActiveClass(2, btnColor.bGActive)}
                                    onClick={() => toggleTab(2)}
                                    size={'small'}
                                >
                                    Hot
                                </Button>
                                <Button
                                    color={'inherit'}
                                    className={getActiveClass(3, btnColor.bGActive)}
                                    onClick={() => toggleTab(3)}
                                    size={'small'}
                                >
                                    Last Month
                                </Button>
                            </div>
                        </Card>
                    </div>

                    <ForumBody />
                </Container>
            </div>
        </Screen>
    );
}