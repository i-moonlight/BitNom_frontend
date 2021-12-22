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

const options = ['Upcoming events', 'Past events', 'Saved events'];

export default function EventsFilter({ setEventsFilter, eventsFilter }) {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleMenuItemClick = (event, index) => {
        setOpen(false);
        setEventsFilter(index);
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
        <Grid
            container
            direction="column"
            alignItems="flex-start"
            style={{
                margin: '15px 0px',
            }}
        >
            <Grid item xs={12}>
                <ButtonGroup
                    variant="text"
                    ref={anchorRef}
                    aria-label="split button"
                    size="small"
                    style={{
                        width: 'fit-content',
                    }}
                    color="inherit"
                >
                    <Button
                        fullWidth
                        style={{
                            textTransform: 'none',
                            width: 'fit-content',
                        }}
                    >
                        {options[eventsFilter]}
                    </Button>
                    <Button
                        size="small"
                        fullWidth
                        style={{
                            textTransform: 'none',
                            width: 'fit-content',
                        }}
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select events filter"
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
                                                    index === eventsFilter
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
