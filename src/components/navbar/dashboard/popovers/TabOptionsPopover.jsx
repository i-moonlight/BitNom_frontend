import { MenuItem, Popover } from '@material-ui/core';
import React from 'react';

export default function TabOptionsPopover({
    value,
    tabOptions,
    tabOptionsId,
    isTabOptionOpen,
    tabOptionAnchorEl,
    handleTabOptionsClose,
}) {
    return (
        <Popover
            anchorEl={tabOptionAnchorEl || document.body}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            id={`${tabOptionsId}-${value}`}
            keepMounted
            open={isTabOptionOpen}
            onClose={handleTabOptionsClose}
        >
            {tabOptions &&
                tabOptions.map(({ label, link }) => (
                    <MenuItem
                        key={`${Math.random() * 1000}`}
                        className="py-3 space-between"
                        style={{
                            width:
                                tabOptionAnchorEl &&
                                tabOptionAnchorEl.offsetWidth,
                        }}
                        onClick={() => handleTabOptionsClose(link)}
                    >
                        {label}
                    </MenuItem>
                ))}
        </Popover>
    );
}
