import { Popover, List, ListItemText, ListItem } from '@mui/material';

export default function MessagePopover({
    messageSettingsAnchorEl,
    messageSettingsId,
    isMessageSettingsOpen,
    handleMessageClose,
    incoming,
}) {
    const handlePinMessage = () => {
        console.log('PIN');
    };
    const handleDeleteMessage = () => {
        console.log('DELETE');
    };
    const handleUpdateMessage = () => {
        console.log('UPDATE');
    };
    const handleReportMessage = () => {
        console.log('REPORT');
    };
    return (
        <Popover
            anchorEl={messageSettingsAnchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: incoming ? 'right' : 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: incoming ? 'left' : 'right',
            }}
            id={messageSettingsId}
            keepMounted
            open={isMessageSettingsOpen}
            onClose={handleMessageClose}
            style={{ marginLeft: 16, width: '100%' }}
        >
            <List>
                <ListItem button divider onClick={handlePinMessage}>
                    <ListItemText primary="Pin Message" />
                </ListItem>
                <ListItem button divider onClick={handleDeleteMessage}>
                    <ListItemText primary="Delete Message" />
                </ListItem>
                <ListItem button divider onClick={handleUpdateMessage}>
                    <ListItemText primary="Edit text" />
                </ListItem>
                <ListItem button onClick={handleReportMessage}>
                    <ListItemText primary="Report Message" />
                </ListItem>
            </List>
        </Popover>
    );
}
