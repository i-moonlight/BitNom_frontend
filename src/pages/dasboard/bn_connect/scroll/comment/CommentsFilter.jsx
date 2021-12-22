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

const options = ['Top Comments', 'Latest Comments'];

export default function CommentsFilter({ setCommentFilter, commentFilter }) {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    //const [selectedIndex, setSelectedIndex] = useState(0);

    const handleClick = () => {
        // eslint-disable-next-line no-console
        console.info(`You clicked ${options[commentFilter]}`);
    };

    const handleMenuItemClick = (event, index) => {
        //setSelectedIndex(index);
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
            alignItems="flex-end"
            style={{
                margin: '5px 0px',
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
                        onClick={handleClick}
                    >
                        {options[commentFilter]}
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
                        aria-label="selectcomments filter"
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
                                                    index === commentFilter
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
