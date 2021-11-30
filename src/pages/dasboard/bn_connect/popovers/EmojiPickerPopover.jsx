import { Popover } from '@mui/material';
//import { useRef, useEffect, createElement } from 'react';
//import 'emoji-picker-element';
import Picker from 'emoji-picker-react';

function EmojiPickerPopover({
    handleSelectEmoji,
    emojiPickerAnchorEl,
    emojiPickerId,
    isEmojiPickerOpen,
    handleEmojiPickerClose,
}) {
    //const theme = useTheme();

    /* 
    const Picker = () => {
        const ref = useRef(null);

        useEffect(() => {
            ref.current.addEventListener('emoji-click', (event) => {
                handleSelectEmoji(event.detail.emoji.unicode);
            });
            ref.current.skinToneEmoji = '👍';
        }, []);

        return createElement('emoji-picker', { ref });
    }; */

    const onEmojiClick = (event, emojiObject) => {
        handleSelectEmoji(emojiObject?.emoji);
    };

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
            <Picker onEmojiClick={onEmojiClick} />
        </Popover>
    );
}

export default EmojiPickerPopover;
