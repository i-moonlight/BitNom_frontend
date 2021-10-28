import { Popover } from '@mui/material';
import { NimblePicker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import data from 'emoji-mart/data/google.json';
import React from 'react';

function EmojiPickerPopover({
    handleSelectEmoji,
    emojiPickerAnchorEl,
    emojiPickerId,
    isEmojiPickerOpen,
    handleEmojiPickerClose,
}) {
    return (
        <Popover
            anchorEl={emojiPickerAnchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={emojiPickerId}
            keepMounted
            open={isEmojiPickerOpen}
            onClose={handleEmojiPickerClose}
            style={{ marginLeft: 16, width: '100%' }}
            disableScrollLock
        >
            <NimblePicker
                onSelect={handleSelectEmoji}
                showSkinTones={false}
                emojiTooltip={false}
                showPreview={false}
                sheetSize={32}
                data={data}
            />
        </Popover>
    );
}

export default EmojiPickerPopover;
