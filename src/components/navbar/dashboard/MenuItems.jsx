import {
    AccountBalanceWalletOutlined,
    Brightness4Rounded,
    Brightness7Rounded,
    ChevronRight,
    ExitToAppRounded,
    PeopleRounded,
} from '@mui/icons-material';
import {
    Avatar,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signout } from '../../../store/actions/authActions';
import { changeTheme } from '../../../store/actions/themeActions';

export default function ListItems({ handleMenuClose }) {
    const palette = useSelector((st) => st.theme.palette);
    const dispatch = useDispatch();
    const theme = useTheme();
    const history = useHistory();
    const smUp = useMediaQuery('(min-width:600px)');

    return (
        <>
            <ListItem
                divider
                button
                onClick={() => {
                    history.push('/profile');
                }}
            >
                <ListItemText primary="My Profile" />
            </ListItem>
            <ListItem divider button onClick={handleMenuClose}>
                <ListItemText primary="Watchlist" />
            </ListItem>
            <ListItem divider button onClick={handleMenuClose}>
                <ListItemText primary="Account and Billing" />
            </ListItem>
            <ListItem divider button onClick={handleMenuClose}>
                <ListItemText primary="Settings" />
            </ListItem>
            {!smUp && (
                <>
                    <ListItem divider button onClick={() => null}>
                        <ListItemText primary="English" />
                        <ListItemIcon>
                            <ChevronRight
                                style={{
                                    transform: 'rotateZ(90deg)',
                                }}
                            />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem divider button onClick={() => null}>
                        <ListItemText
                            primary={
                                <div className="center-horizontal">
                                    <Avatar
                                        style={{
                                            height: 24,
                                            width: 24,
                                            background: '#0F986E',
                                            marginRight: 8,
                                            color: theme.palette.text.primary,
                                        }}
                                        variant="rounded"
                                    >
                                        $
                                    </Avatar>
                                    <Typography
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        USD
                                    </Typography>
                                </div>
                            }
                        />
                        <ListItemIcon>
                            <ChevronRight
                                style={{
                                    transform: 'rotateZ(90deg)',
                                }}
                            />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem
                        divider
                        button
                        onClick={() => {
                            palette == 'light'
                                ? dispatch(changeTheme('dark'))
                                : dispatch(changeTheme('light'));
                        }}
                    >
                        <ListItemText primary="Switch Theme" />
                        <ListItemIcon>
                            {palette == 'light' ? (
                                <Brightness4Rounded />
                            ) : (
                                <Brightness7Rounded />
                            )}
                        </ListItemIcon>
                    </ListItem>
                </>
            )}

            <ListItem button divider onClick={handleMenuClose}>
                <ListItemText
                    primary={
                        <Typography color="textPrimary" variant="body2">
                            Referred Friends
                        </Typography>
                    }
                    secondary="0"
                />
                <ListItemIcon className="ms-2">
                    <PeopleRounded />
                </ListItemIcon>
            </ListItem>

            <ListItem divider button onClick={handleMenuClose}>
                <ListItemText
                    primary={
                        <Typography color="textPrimary" variant="body2">
                            BN Token
                        </Typography>
                    }
                    secondary="0"
                />
                <ListItemIcon>
                    <AccountBalanceWalletOutlined />
                </ListItemIcon>
            </ListItem>

            <ListItem divider button onClick={() => dispatch(signout())}>
                <ListItemText primary="Sign Out" />
                <ListItemIcon>
                    <ExitToAppRounded color="secondary" />
                </ListItemIcon>
            </ListItem>
        </>
    );
}
