import { ArrowDropDown } from '@mui/icons-material';
import {
    Button,
    ButtonGroup,
    ClickAwayListener,
    Grid,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
} from '@mui/material';
import { useRef, useState } from 'react';

const options = [
    'All notifications',
    'Comments & mentions',
    'Reactions',
    'Your content',
    'Your profile',
    'Job board',
    'Forum',
    'Announcements',
];

export default function NotificationFilter({
    setNotificationFilter,
    notificationFilter,
}) {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleClick = () => {
        console.info(`You clicked ${options[notificationFilter]}`);
    };

    const handleMenuItemClick = (event, index) => {
        setOpen(false);
        setNotificationFilter(index);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <Grid container direction="column" alignItems="flex-start">
            <Grid item xs={12}>
                <ButtonGroup
                    variant="text"
                    ref={anchorRef}
                    aria-label="split button"
                    size="small"
                >
                    <Button
                        fullWidth
                        style={{
                            textTransform: 'none',
                        }}
                        onClick={handleClick}
                    >
                        {options[notificationFilter]}
                    </Button>
                    <Button
                        size="small"
                        fullWidth
                        style={{
                            textTransform: 'none',
                        }}
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select notifications filter"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    >
                        <ArrowDropDown />
                    </Button>
                </ButtonGroup>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom'
                                        ? 'center top'
                                        : 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        id="split-button-menu"
                                        component="div"
                                    >
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                selected={
                                                    index === notificationFilter
                                                }
                                                onClick={(event) => {
                                                    handleMenuItemClick(
                                                        event,
                                                        index
                                                    );
                                                }}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Grid>
        </Grid>
    );
}
