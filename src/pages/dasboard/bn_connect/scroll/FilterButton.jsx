import React from 'react';
import {
    Grid,
    Button,
    ButtonGroup,
    Paper,
    Popper,
    Grow,
    ClickAwayListener,
    MenuItem,
    MenuList,
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

const options = ['Top Comments', 'Latest Comments'];

export default function FilterButton({ setCommentFilter }) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
        setCommentFilter(index);
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
                >
                    <Button
                        fullWidth
                        style={{
                            textTransform: 'none',
                        }}
                        onClick={handleClick}
                    >
                        {options[selectedIndex]}
                    </Button>
                    <Button
                        size="small"
                        fullWidth
                        style={{
                            textTransform: 'none',
                        }}
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
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
                                                    index === selectedIndex
                                                }
                                                onClick={(event) => {
                                                    handleMenuItemClick(
                                                        event,
                                                        index
                                                    );
                                                    //setUploadedFile(null);
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
