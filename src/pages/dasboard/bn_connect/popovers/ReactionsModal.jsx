import {
    Card,
    CardContent,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Modal,
    Typography,
    Tabs,
    Tab,
    makeStyles,
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import {
    CloseRounded,
    ThumbDownRounded,
    ThumbUpRounded,
    FavoriteRounded,
    PanToolRounded,
} from '@material-ui/icons';
import React, { useState } from 'react';
import { getUserInitials } from '../../../../utilities/Helpers';
import { getReactionsSum } from '../../utilities/functions';

const useStyles = makeStyles(() => ({
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

export default function ReactionsModal({
    openReactions,
    setOpenReactions,
    resourceReactions,
    setResourceReactions,
}) {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const handleChange = (event, val) => {
        setValue(val);
    };

    function a11yProps(index) {
        return {
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        };
    }

    const dislikes = resourceReactions?.reacted_to_by?.filter(
        (reaction) => reaction?.reaction_type === 'dislike'
    );

    const likes = resourceReactions?.reacted_to_by?.filter(
        (reaction) => reaction?.reaction_type === 'like'
    );

    const loves = resourceReactions?.reacted_to_by?.filter(
        (reaction) => reaction?.reaction_type === 'love'
    );

    const celebrations = resourceReactions?.reacted_to_by?.filter(
        (reaction) => reaction?.reaction_type === 'celebrate'
    );

    return (
        <Modal
            style={{
                outline: 'none',
                maxHeight: '75vh',
                '&:focus-visible': {
                    outline: 'none',
                },
            }}
            className="center-horizontal center-vertical w-100"
            open={openReactions}
        >
            <Grid container>
                <Grid item lg={3} md={2} sm={1} xs={1}></Grid>
                <Grid item lg={6} md={8} sm={10} xs={10}>
                    <Card>
                        <div className="space-between mx-3 my-2">
                            <Typography variant="body2"></Typography>
                            <Typography variant="body1">Reactions</Typography>
                            <IconButton size="small" className="m-1 p-1">
                                <CloseRounded
                                    onClick={() => {
                                        setOpenReactions(false);
                                        setResourceReactions(null);
                                    }}
                                />
                            </IconButton>
                        </div>
                        <Divider />
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="prmary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="reaction tabs"
                        >
                            <Tab
                                label={
                                    <Typography
                                        style={{ textTransform: 'none' }}
                                        display="inline"
                                    >
                                        All {getReactionsSum(resourceReactions)}
                                    </Typography>
                                }
                                {...a11yProps(0)}
                            />
                            <Tab
                                label={
                                    <Typography display="inline">
                                        <ThumbUpRounded
                                            className={classes.primary}
                                        />{' '}
                                        {resourceReactions?.reactions?.likes}
                                    </Typography>
                                }
                                {...a11yProps(1)}
                            />
                            <Tab
                                label={
                                    <Typography display="inline">
                                        <FavoriteRounded
                                            className={classes.red}
                                        />{' '}
                                        {resourceReactions?.reactions?.loves}
                                    </Typography>
                                }
                                {...a11yProps(2)}
                            />
                            <Tab
                                label={
                                    <Typography display="inline">
                                        <ThumbDownRounded
                                            className={classes.primary}
                                        />{' '}
                                        {resourceReactions?.reactions?.dislikes}
                                    </Typography>
                                }
                                {...a11yProps(3)}
                            />
                            <Tab
                                label={
                                    <Typography display="inline">
                                        <PanToolRounded
                                            className={classes.green}
                                        />{' '}
                                        {
                                            resourceReactions?.reactions
                                                ?.celebrations
                                        }
                                    </Typography>
                                }
                                {...a11yProps(4)}
                            />
                        </Tabs>
                        <Divider />
                        <CardContent>
                            {value === 0 &&
                                resourceReactions?.reacted_to_by?.length >
                                    0 && (
                                    <ReactionList
                                        reactions={
                                            resourceReactions?.reacted_to_by
                                        }
                                    />
                                )}
                            {value === 1 &&
                                resourceReactions?.reactions?.likes > 0 && (
                                    <ReactionList reactions={likes} />
                                )}
                            {value === 2 &&
                                resourceReactions?.reactions?.loves > 0 && (
                                    <ReactionList reactions={loves} />
                                )}
                            {value === 3 &&
                                resourceReactions?.reactions?.dislikes > 0 && (
                                    <ReactionList reactions={dislikes} />
                                )}
                            {value === 4 &&
                                resourceReactions?.reactions?.celebrations >
                                    0 && (
                                    <ReactionList reactions={celebrations} />
                                )}
                            {(value == 0 &&
                                resourceReactions?.reacted_to_by?.length < 1) ||
                            (value == 1 &&
                                resourceReactions?.reactions?.likes < 1) ||
                            (value == 2 &&
                                resourceReactions?.reactions?.loves < 1) ||
                            (value == 3 &&
                                resourceReactions?.reactions?.dislikes < 1) ||
                            (value == 4 &&
                                resourceReactions?.reactions?.celebrations <
                                    1) ? (
                                <Grid align="center">
                                    <Typography variant="body1" color="primary">
                                        Nothing here yet.
                                    </Typography>
                                </Grid>
                            ) : (
                                ''
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Modal>
    );
}

const ReactionList = ({ reactions }) => {
    return (
        <List>
            {reactions?.map((reaction) => (
                <ListItem key={reaction?.user_id?._id} button>
                    <ListItemAvatar>
                        <Avatar
                            style={{
                                backgroundColor: '#fed132',
                            }}
                            src={
                                process.env.REACT_APP_BACKEND_URL +
                                reaction?.user_id?.profile_pic
                            }
                            aria-label="recipe"
                        >
                            {reaction?.user_id?.profile_pic
                                ? ''
                                : getUserInitials(
                                      reaction?.user_id?.displayName
                                  )}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={reaction?.user_id?.displayName}
                        secondary={`@${reaction?.user_id?._id}`}
                    />
                </ListItem>
            ))}
        </List>
    );
};
