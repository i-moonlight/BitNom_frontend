import {
    FavoriteRounded,
    PanToolRounded,
    ThumbDownRounded,
    ThumbUpRounded,
} from '@mui/icons-material';
import { green, red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import { Button } from './Button';

function ReactionHover({ setLikeHovered, handleCreateReaction, reaction }) {
    const classes = useStyles();
    return (
        <>
            <Button
                onClick={() => {
                    handleCreateReaction('like');
                    setLikeHovered(false);
                }}
                variant="text"
                style={{
                    display: reaction === 'like' && 'none',
                    textTransform: 'none',
                }}
                startIcon={<ThumbUpRounded className={classes.primary} />}
            >
                Like
            </Button>
            <Button
                style={{
                    display: reaction === 'love' && 'none',
                    textTransform: 'none',
                }}
                onClick={() => {
                    handleCreateReaction('love');

                    setLikeHovered(false);
                }}
                variant="text"
                startIcon={<FavoriteRounded className={classes.red} />}
            >
                Love
            </Button>
            <Button
                style={{
                    display: reaction === 'dislike' && 'none',
                    textTransform: 'none',
                }}
                onClick={() => {
                    handleCreateReaction('dislike');

                    setLikeHovered(false);
                }}
                variant="text"
                startIcon={<ThumbDownRounded className={classes.primary} />}
            >
                Dislike
            </Button>
            <Button
                style={{
                    display: reaction === 'celebrate' && 'none',
                    textTransform: 'none',
                }}
                onClick={() => {
                    handleCreateReaction('celebrate');

                    setLikeHovered(false);
                }}
                variant="text"
                startIcon={<PanToolRounded className={classes.green} />}
            >
                Celebrate
            </Button>
        </>
    );
}

export default ReactionHover;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    small: {
        width: theme.spacing(1),
        height: theme.spacing(1),
    },
    red: {
        color: red[500],
    },
    green: {
        color: green[500],
    },
    primary: {
        color: '#006097',
    },
}));
