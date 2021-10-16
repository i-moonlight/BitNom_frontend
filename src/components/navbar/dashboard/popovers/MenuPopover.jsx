import { Popover } from '@mui/material';
import React from 'react';
import MenuItems from '../MenuItems';

export default function MenuPopover({
    menuId,
    menuAnchorEl,
    isMenuOpen,
    handleMenuClose,
}) {
    return (
        <Popover
            anchorEl={menuAnchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            id={menuId}
            keepMounted
            open={isMenuOpen}
            onClose={handleMenuClose}
            disableScrollLock
        >
            <MenuItems handleMenuClose={handleMenuClose} />
        </Popover>
    );
}
