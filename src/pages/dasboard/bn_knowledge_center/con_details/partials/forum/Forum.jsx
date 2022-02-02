import { Button, Card, Typography } from '@mui/material';
import { useState } from 'react';
import { useStyles } from '../utils/styles';
import ForumBody from './ForumBody';
import './styles.css';

export default function Forum() {
    const [toggleState, setToggleState] = useState(1);
    const btnColor = useStyles();

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const getActiveClass = (index, className) => {
        return toggleState === index ? className : btnColor.bGNormal;
    };

    return (
        <>
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
        </>
    );
}
