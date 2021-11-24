import {
    CheckBox,
    FileCopyOutlined,
    FlagOutlined,
    Notifications,
} from '@mui/icons-material';
import {
    Card,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Popover,
} from '@mui/material';
import { toast } from 'react-toastify';

export default function EventOptionsPopover({
    eventOptionsAnchorEl,
    eventOptionsId,
    isEventOptionsOpen,
    handleEventOptionsClose,
    setFlaggedResource,
    setOpenFlag,
    setOpenInvite,
    profile,
    event,
    handleCreateBookmark,
    setOpenShareModal,
    setSharedResource,
}) {
    //const state = useSelector((st) => st);
    //const user = state.auth.user;

    const handleReportEvent = () => {
        const resource = Object.assign({ resourceType: 'event' }, event);
        setFlaggedResource(resource);
        handleEventOptionsClose();
        setOpenFlag(true);
    };

    return (
        <Popover
            anchorEl={eventOptionsAnchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={eventOptionsId}
            keepMounted
            open={isEventOptionsOpen}
            onClose={handleEventOptionsClose}
            style={{ marginLeft: 16, width: '100%' }}
            disableScrollLock
        >
            <List
                style={{ padding: 0, paddingBottom: 0 }}
                component={Card}
                variant="outlined"
            >
                <ListItem button divider>
                    <ListItemIcon>
                        <Notifications />
                    </ListItemIcon>
                    <ListItemText
                        primary="Turn on Notifications"
                        secondary="Get all notifications on this event"
                    />
                </ListItem>
                <ListItem
                    onClick={() => {
                        setOpenInvite(true);
                        handleEventOptionsClose();
                    }}
                    button
                    style={{
                        display:
                            (event?.host?._id !== profile?._id ||
                                new Date(event?.endDate).getTime() <
                                    new Date().getTime()) &&
                            'none',
                    }}
                    divider
                >
                    <ListItemIcon>
                        <CheckBox />
                    </ListItemIcon>
                    <ListItemText
                        primary="Invite Friends"
                        secondary="Invite friends to your event"
                    />
                </ListItem>
                <ListItem
                    onClick={() => {
                        handleCreateBookmark();
                        toast.success('Added to saved items', {
                            position: 'bottom-left',
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                        handleEventOptionsClose();
                    }}
                    button
                    style={{
                        display: event?.host?._id === profile?._id && 'none',
                    }}
                    divider
                >
                    <ListItemIcon>
                        <CheckBox />
                    </ListItemIcon>
                    <ListItemText
                        primary="Save this event"
                        secondary="Add this to your saved items"
                    />
                </ListItem>
                <ListItem
                    button
                    divider
                    onClick={() => {
                        handleEventOptionsClose();
                        setSharedResource(event);
                        setOpenShareModal(true);
                    }}
                >
                    <ListItemIcon>
                        <FileCopyOutlined />
                    </ListItemIcon>
                    <ListItemText
                        primary="Share link"
                        secondary="Share this event on other platforms"
                    />
                </ListItem>
                <ListItem button divider onClick={handleReportEvent}>
                    <ListItemIcon>
                        <FlagOutlined />
                    </ListItemIcon>
                    <ListItemText
                        primary="Report Event"
                        secondary="I am concerned about this event"
                    />
                </ListItem>
            </List>
        </Popover>
    );
}

//
