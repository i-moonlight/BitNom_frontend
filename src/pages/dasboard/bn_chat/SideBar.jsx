import React from 'react';
import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    Divider,
    Badge,
} from '@mui/material';
import { useStyles } from './styles.component';
export default function SideBar() {
    const classes = useStyles();
    // const theme = useTheme();
    return (
        <div className={classes.sidebar}>
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
                className={classes.list}
            >
                <div className={classes.title}>
                    <h3>Invites</h3>
                </div>
                <ListItem button alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar
                            alt="Remy Sharp"
                            src="https://wallpaperaccess.com/full/2213426.jpg"
                        />
                    </ListItemAvatar>
                    <span className={classes.chatonlinestatus}> </span>
                    <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Ali Connors
                                </Typography>
                                {
                                    " — I'll be in your neighborhood doing errands this…"
                                }
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider
                    variant="inset"
                    className={classes.divider}
                    component="li"
                />
                <ListItem button alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar
                            alt="Travis Howard"
                            src="https://wallpaperaccess.com/full/2213426.jpg"
                        />
                    </ListItemAvatar>
                    <span className={classes.chatofflinestatus}></span>
                    <ListItemText
                        primary="Summer BBQ"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    to Scott, Alex, Jennifer
                                </Typography>
                                {
                                    " — Wish I could come, but I'm out of town this…"
                                }
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider
                    variant="inset"
                    className={classes.divider}
                    component="li"
                />
                <ListItem button alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar
                            alt="Cindy Baker"
                            src="https://wallpaperaccess.com/full/2213426.jpg"
                        />
                    </ListItemAvatar>
                    <span className={classes.chatofflinestatus}></span>
                    <ListItemText
                        primary="Oui Oui"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {
                                    ' — Do you have Paris recommendations? Have you ever…'
                                }
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider
                    variant="inset"
                    className={classes.divider}
                    component="li"
                />
                <ListItem button alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar
                            alt="Cindy Baker"
                            src="https://wallpaperaccess.com/full/2213426.jpg"
                        />
                    </ListItemAvatar>
                    <span className={classes.chatonlinestatus}> </span>
                    <ListItemText
                        primary="Oui Oui"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {
                                    ' — Do you have Paris recommendations? Have you ever…'
                                }
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider
                    variant="inset"
                    className={classes.divider}
                    component="li"
                />
                <ListItem button alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar
                            alt="Cindy Baker"
                            src="https://wallpaperaccess.com/full/2213426.jpg"
                        />
                    </ListItemAvatar>
                    <span className={classes.chatonlinestatus}> </span>
                    <ListItemText
                        primary="Oui Oui"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {
                                    ' — Do you have Paris recommendations? Have you ever…'
                                }
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <div className={classes.title}>
                    <h3>Chats</h3>
                </div>
                <ListItem button alignItems="flex-start">
                    <ListItemAvatar>
                        {' '}
                        <Avatar
                            alt="Cindy Baker"
                            src="https://wallpaperaccess.com/full/2213426.jpg"
                        />
                    </ListItemAvatar>
                    <span className={classes.chatonlinestatus}> </span>
                    <ListItemText
                        primary="Oui Oui"
                        secondary={
                            <React.Fragment>
                                <Badge badgeContent={4} color="primary">
                                    {' '}
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Sandra Adams
                                    </Typography>
                                    {
                                        ' — Do you have Paris recommendations? Have you ever…'
                                    }
                                </Badge>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem button alignItems="flex-start">
                    {' '}
                    <ListItemAvatar>
                        <Avatar
                            alt="Cindy Baker"
                            src="https://wallpaperaccess.com/full/2213426.jpg"
                        />
                    </ListItemAvatar>{' '}
                    <span className={classes.chatofflinestatus}></span>
                    <ListItemText
                        primary="Oui Oui"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {
                                    ' — Do you have Paris recommendations? Have you ever…'
                                }
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem button alignItems="flex-start">
                    {' '}
                    <ListItemAvatar>
                        {' '}
                        <Avatar
                            alt="Cindy Baker"
                            src="https://wallpaperaccess.com/full/2213426.jpg"
                        />
                    </ListItemAvatar>
                    <span className={classes.chatonlinestatus}> </span>
                    <ListItemText
                        primary="victor kiprotich"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Victor kiprotich
                                </Typography>
                                {
                                    ' — Do you have Paris recommendations? Have you ever…'
                                }
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar
                            alt="Cindy Baker"
                            src="https://wallpaperaccess.com/full/2213426.jpg"
                        />
                    </ListItemAvatar>
                    <span className={classes.chatofflinestatus}></span>
                    <ListItemText
                        primary="Oui Oui"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {
                                    ' — Do you have Paris recommendations? Have you ever…'
                                }
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar
                            alt="Cindy Baker"
                            src="https://wallpaperaccess.com/full/2213426.jpg"
                        />
                    </ListItemAvatar>
                    <span className={classes.chatonlinestatus}></span>
                    <ListItemText
                        primary="Oui Oui"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {
                                    ' — Do you have Paris recommendations? Have you ever…'
                                }
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar
                            alt="Cindy Baker"
                            src="https://wallpaperaccess.com/full/2213426.jpg"
                        />
                    </ListItemAvatar>
                    <span className={classes.chatonlinestatus}></span>
                    <ListItemText
                        primary="Oui Oui"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {
                                    ' — Do you have Paris recommendations? Have you ever…'
                                }
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar
                            alt="Cindy Baker"
                            src="https://wallpaperaccess.com/full/2213426.jpg"
                        />
                    </ListItemAvatar>
                    <span className={classes.chatonlinestatus}></span>
                    <ListItemText
                        primary="Oui Oui"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {
                                    ' — Do you have Paris recommendations? Have you ever…'
                                }
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar
                            alt="Cindy Baker"
                            src="https://wallpaperaccess.com/full/2213426.jpg"
                        />
                    </ListItemAvatar>
                    <span className={classes.chatonlinestatus}></span>
                    <ListItemText
                        primary="Oui Oui"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {
                                    ' — Do you have Paris recommendations? Have you ever…'
                                }
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar
                            alt="Cindy Baker"
                            src="https://wallpaperaccess.com/full/2213426.jpg"
                        />
                    </ListItemAvatar>
                    <span className={classes.chatonlinestatus}></span>
                    <ListItemText
                        primary="Oui Oui"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {
                                    ' — Do you have Paris recommendations? Have you ever…'
                                }
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar
                            alt="Cindy Baker"
                            src="https://wallpaperaccess.com/full/2213426.jpg"
                        />
                    </ListItemAvatar>
                    <span className={classes.chatonlinestatus}></span>
                    <ListItemText
                        primary="Oui Oui"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {
                                    ' — Do you have Paris recommendations? Have you ever…'
                                }
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        </div>
    );
}
