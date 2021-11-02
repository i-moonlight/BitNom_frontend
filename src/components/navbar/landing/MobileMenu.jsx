import { ChevronRight, CloseRounded } from '@mui/icons-material';
import {
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { menuEcosystem, menuProduct } from '../../utilities/data.components';
import MenuOptions from './MenuOptions';

export default function MobileMenu({ open, onClose }) {
    const useStyles = makeStyles(() => ({
        root: {
            position: 'fixed',
            top: 0,
            left: 0,
            display: open ? 'flex' : 'none',
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

    const [showMenuEcosystem, setShowMenuEcosystem] = useState(false);
    const [showMenuProduct, setShowMenuProduct] = useState(false);
    const theme = useTheme();
    const classes = useStyles();
    //   const history = useHistory();

    return (
        <List className={classes.root}>
            <ListItem>
                <ListItemText primary="" />
                <ListItemIcon>
                    <IconButton
                        size="small"
                        className={classes.close}
                        onClick={onClose}
                    >
                        <CloseRounded />
                    </IconButton>
                </ListItemIcon>
            </ListItem>

            <ListItem button>
                <ListItemText
                    primary={<Typography color="textPrimary">Home</Typography>}
                />
            </ListItem>
            <ListItem
                button
                onClick={() => setShowMenuEcosystem(!showMenuEcosystem)}
            >
                <ListItemText
                    primary={
                        <Typography color="textPrimary">Ecosystem</Typography>
                    }
                />
                <ListItemIcon>
                    <ChevronRight
                        style={{
                            transform: showMenuEcosystem
                                ? 'rotate(270deg)'
                                : 'rotate(90deg)',
                        }}
                    />
                </ListItemIcon>
            </ListItem>
            <MenuOptions
                show={showMenuEcosystem}
                items={menuEcosystem}
                mobile
            />
            <ListItem
                button
                onClick={() => setShowMenuProduct(!showMenuProduct)}
            >
                <ListItemText
                    primary={
                        <Typography color="textPrimary">Product</Typography>
                    }
                />
                <ListItemIcon>
                    <ChevronRight
                        style={{
                            transform: showMenuProduct
                                ? 'rotate(270deg)'
                                : 'rotate(90deg)',
                        }}
                    />
                </ListItemIcon>
            </ListItem>
            <MenuOptions show={showMenuProduct} items={menuProduct} mobile />
            <ListItem button>
                <ListItemText
                    primary={
                        <Typography color="textPrimary">
                            BN for Business
                        </Typography>
                    }
                />
            </ListItem>
            <ListItem button>
                <ListItemText
                    primary={<Typography color="textPrimary">Learn</Typography>}
                />
            </ListItem>
        </List>
    );
}
