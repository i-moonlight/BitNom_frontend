import { CloseRounded } from '@mui/icons-material';
import {
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import MenuItems from '../MenuItems';

export default function MobileMenuModal({ isMenuOpen, handleMenuClose }) {
    const useStyles = makeStyles((theme) => ({
        root: {
            position: 'fixed',
            top: 0,
            left: 0,
            display: isMenuOpen ? 'flex' : 'none',
            minHeight: '100vh',
            width: '100%',
            backgroundColor: theme.palette.background.default,
            flexDirection: 'column',
            overflow: 'hidden',
        },
        close: {
            alignSelf: 'flex-end',
        },
    }));

    const classes = useStyles();

    return (
        <Paper>
            <List className={classes.root}>
                <ListItem>
                    <ListItemText primary="" />
                    <ListItemIcon>
                        <IconButton
                            size="small"
                            className={classes.close}
                            onClick={handleMenuClose}
                        >
                            <CloseRounded />
                        </IconButton>
                    </ListItemIcon>
                </ListItem>
                <MenuItems handleMenuClose={handleMenuClose} />
            </List>
        </Paper>
    );
}
