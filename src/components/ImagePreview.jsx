import Modal from '@mui/material/Modal';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        ':focus-visibvle:': {
            outline: 'none !important',
        },
    };
}

const useStyles = makeStyles(() => ({
    paper: {
        position: 'absolute',
        margin: 'auto',
        overflow: 'scroll',
        maxWidth: window.innerWidth * 0.8,
        maxHeight: window.innerHeight * 0.8,
    },
}));

export default function ImagePreview({
    open,
    onClose,
    imgURL = 'http://placehold.it/500',
}) {
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <img
                style={{ ...modalStyle }}
                className={classes.paper}
                src={imgURL}
            />
        </Modal>
    );
}
