import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { makeStyles } from '@mui/styles';
import React from 'react';
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LineIcon,
    LineShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    RedditIcon,
    RedditShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from 'react-share';

const useStyles = makeStyles(() => ({
    sharePost: {
        display: 'grid',
        textAlign: 'left',
    },
    SocialLinks: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'left',
        alignContent: 'center',
        alignItems: 'center',
        margin: '2px 0',
    },
    link: {
        margin: '0 3px',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ExternalShareModal({
    openShareModal,
    setOpenShareModal,
    sharedResource,
    setSharedResource,
}) {
    const classes = useStyles();

    /*   const handleClickOpen = () => {
        setOpenShareModal(true);
    }; */

    const handleClose = () => {
        setOpenShareModal(false);
        setSharedResource(null);
    };

    let link;
    if (sharedResource?.__typename === 'OPost') {
        link = `${location.origin}/post/${sharedResource?._id}`;
    } else if (sharedResource?.__typename === 'OEvent') {
        link = `${location.origin}/events/${sharedResource?._id}`;
    }

    return (
        <div>
            <Dialog
                open={openShareModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{'Share on:'}</DialogTitle>
                <DialogContent>
                    <div className={classes.sharePost}>
                        <div className={classes.SocialLinks}>
                            <WhatsappShareButton
                                url={link}
                                title={
                                    sharedResource?.content ||
                                    sharedResource?.title
                                }
                                className={classes.link}
                            >
                                <WhatsappIcon round={true} size={36} />
                            </WhatsappShareButton>
                            <EmailShareButton
                                url={link}
                                subject={
                                    sharedResource?.content?.substring(0, 15) ||
                                    sharedResource?.title
                                }
                                body={
                                    sharedResource?.content ||
                                    sharedResource?.description
                                }
                                className={classes.link}
                            >
                                <EmailIcon round={true} size={36} />
                            </EmailShareButton>
                            <TwitterShareButton
                                url={link}
                                title={
                                    sharedResource?.content ||
                                    sharedResource?.title
                                }
                                className={classes.link}
                                onShareWindowClose={handleClose}
                            >
                                <TwitterIcon round={true} size={36} />
                            </TwitterShareButton>
                            <FacebookShareButton
                                url={link}
                                quote={
                                    sharedResource?.content ||
                                    sharedResource?.description
                                }
                                hashtag={'#Bitnorm'}
                                className={classes.link}
                            >
                                <FacebookIcon round={true} size={36} />
                            </FacebookShareButton>
                            <TelegramShareButton
                                url={link}
                                title={
                                    sharedResource?.content?.substring(0, 15) ||
                                    sharedResource?.title
                                }
                                className={classes.link}
                            >
                                <TelegramIcon round={true} size={36} />
                            </TelegramShareButton>
                            <RedditShareButton
                                url={link}
                                title={
                                    sharedResource?.content?.substring(0, 15) ||
                                    sharedResource?.title
                                }
                                className={classes.link}
                            >
                                <RedditIcon round={true} size={36} />
                            </RedditShareButton>
                            <LineShareButton
                                url={link}
                                title={
                                    sharedResource?.content?.substring(0, 15) ||
                                    sharedResource?.title
                                }
                                className={classes.link}
                            >
                                <LineIcon round={true} size={36} />
                            </LineShareButton>
                            <LinkedinShareButton
                                url={link}
                                summary={
                                    sharedResource?.content ||
                                    sharedResource?.description
                                }
                                title={
                                    sharedResource?.content?.substring(0, 15) ||
                                    sharedResource?.title
                                }
                                source={location?.origin}
                                className={classes.link}
                            >
                                <LinkedinIcon round={true} size={36} />
                            </LinkedinShareButton>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ textTransform: 'none' }}
                        onClick={handleClose}
                        variant="contained"
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
