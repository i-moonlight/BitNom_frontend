import { MenuItem, Popover } from '@material-ui/core';
import React from 'react';

export default function TabOptionsPopover({
    tabOptionAnchorEl,
    tabOptionsId,
    isTabOptionOpen,
    handleTabOptionsClose,
    tabOptions,
}) {
    return (
        <Popover
            anchorEl={tabOptionAnchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            id={tabOptionsId}
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
