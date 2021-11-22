import { Popover } from '@mui/material';
// import { Picker } from 'emoji-mart/dist-modern/index.js';
import 'emoji-mart/css/emoji-mart.css';

function EmojiPickerPopover({
    // handleSelectEmoji,
    emojiPickerAnchorEl,
    emojiPickerId,
    isEmojiPickerOpen,
    handleEmojiPickerClose,
}) {
    // const theme = useTheme();
    return (
        <Popover
            anchorEl={emojiPickerAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            id={emojiPickerId}
            placement="top"
            keepMounted
            open={isEmojiPickerOpen}
            onClose={handleEmojiPickerClose}
            style={{ marginLeft: 16, width: '100%' }}
            disableScrollLock
        >
            {/* <Picker
                onSelect={handleSelectEmoji}
                showSkinTones={false}
                emojiTooltip={false}
                showPreview={false}
                sheetSize={32}
                theme={theme.palette.mode === 'dark' ? 'dark' : 'light'}
                set="apple"
            /> */}
        </Popover>
    );
}

export default EmojiPickerPopover;
