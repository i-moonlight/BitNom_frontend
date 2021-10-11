import { Button as MuiButton } from '@material-ui/core';
import React from 'react';
import { green, red } from '@material-ui/core/colors';
import { makeStyles, Avatar } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import {
    ThumbDownRounded,
    ThumbUpRounded,
    PanToolRounded,
    FavoriteRounded,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    small: {
        width: theme.spacing(1),
        height: theme.spacing(1),
    },
    red: {
        color: '#fff',
        backgroundColor: red[500],
        border: '2px solid transparent',
        width: theme.spacing(2),
        height: theme.spacing(2),
    },
    green: {
        color: '#fff',
        backgroundColor: green[500],
        border: '2px solid transparent',
        width: theme.spacing(2),
        height: theme.spacing(2),
    },
    primary: {
        backgroundColor: '#006097',
        color: '#fff',
        border: '2px solid transparent',
        width: theme.spacing(2),
        height: theme.spacing(2),
    },
}));

export default function ReactionButton({
    textCase,
    color,
    colorAlt,
    variant,
    variantAlt,
    google,
    setLikeHovered,
    handleRemoveReaction,
    reaction,
    padding,
    ...props
}) {
    const classes = useStyles();
    const buttonVariant = variantAlt ? variantAlt : variant;
    const buttonColor = colorAlt ? colorAlt : color;

    return (
        <MuiButton
            color={buttonColor ? buttonColor : 'primary'}
            variant={buttonVariant ? buttonVariant : 'contained'}
            disableElevation={!google}
            style={{
                backgroundColor: google && '#f2f2f2',
                color: !buttonColor && google && '#818181',
                textTransform: textCase && 'none',
                padding: padding && 0,
            }}
            onClick={() =>
                reaction ? handleRemoveReaction() : setLikeHovered(true)
            }
            {...props}
        >
            {!reaction && (
                <AvatarGroup className={classes.root} max={4}>
                    <Avatar
                        className={classes.primary}
                        color="primary"
                        alt="Like"
                    >
                        <ThumbUpRounded className={classes.small} />
                    </Avatar>
                    <Avatar className={classes.red} alt="Love">
                        <FavoriteRounded className={classes.small} />
                    </Avatar>
                    <Avatar
                        className={classes.primary}
                        color="primary"
                        alt="Dislike"
                    >
                        <ThumbDownRounded className={classes.small} />
                    </Avatar>
                    <Avatar className={classes.green} alt="Celebrate">
                        <PanToolRounded className={classes.small} />
                    </Avatar>
                </AvatarGroup>
            )}
            {reaction === 'like' && 'Like'}
            {reaction === 'dislike' && 'Dislike'}
            {reaction === 'love' && 'Love'}
            {reaction === 'celebrate' && 'Celebrate'}
        </MuiButton>
    );
}
