import { EventRounded, KeyboardArrowRight } from '@mui/icons-material';
import {
    Card,
    CardContent,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Button } from '../../../components/Button';

function CreateEventCard({ setOpen, setSelectedIndex, selectedIndex }) {
    const location = useLocation();

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    return (
        <div
            style={{
                position: 'sticky',
                top: 176,
            }}
        >
            <Card variant={'outlined'}>
                <CardContent
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                    }}
                >
                    <EventRounded
                        style={{
                            marginRight: 16,
                            width: 30,
                            height: 30,
                        }}
                    />
                    <div>
                        <Typography variant="body2" className="mb-3">
                            Host an event on BitNorm and invite your network
                        </Typography>
                        <Button textCase onClick={() => setOpen(true)}>
                            Create Event
                        </Button>
                    </div>
                </CardContent>
                <List
                    style={{
                        display:
                            location.pathname.includes('events/') && 'none',
                        paddingBottom: 0,
                    }}
                    component="nav"
                    aria-label="secondary mailbox folder"
                >
                    <ListItem
                        button
                        disableRipple
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemText primary="Upcoming events" />
                        <ListItemSecondaryAction>
                            <KeyboardArrowRight />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem
                        button
                        disableRipple
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <ListItemText primary="Past events" />
                        <ListItemSecondaryAction>
                            <KeyboardArrowRight />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem
                        button
                        disableRipple
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                    >
                        <ListItemText primary="Saved events" />
                        <ListItemSecondaryAction>
                            <KeyboardArrowRight />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Card>
        </div>
    );
}

export default CreateEventCard;
