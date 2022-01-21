import {
    BookmarkBorderRounded,
    FileCopyOutlined,
    FlagOutlined,
    HomeRounded,
    PersonAddDisabledOutlined,
    PlaylistAddCheckRounded,
    TapAndPlayRounded,
} from '@mui/icons-material';
import {
    Card,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { Button } from '../../../components/Button';

export default function ServicesMenu() {
    return (
        <List
            style={{
                padding: 0,
                position: 'sticky',
                top: 176,
                paddingBottom: 0,
            }}
            component={Card}
            variant="outlined"
        >
            <div className="m-2">
                <Button startIcon={<HomeRounded />} fullWidth textCase>
                    Home
                </Button>
            </div>
            <div className="m-2">
                <Button
                    variant="text"
                    startIcon={<TapAndPlayRounded />}
                    fullWidth
                    textCase
                >
                    My Service
                </Button>
            </div>
            <div className="m-2">
                <Button
                    variant="text"
                    startIcon={<PlaylistAddCheckRounded />}
                    fullWidth
                    textCase
                >
                    Subscribed
                </Button>
            </div>
            <Divider />
            <div className="m-2">
                <Button endIcon={<HomeRounded />} fullWidth textCase>
                    Category
                </Button>
            </div>
            <ListItem button divider onClick={null}>
                <ListItemIcon>
                    <BookmarkBorderRounded />
                </ListItemIcon>
                <ListItemText primary="Internet Services" />
            </ListItem>
            <ListItem button divider>
                <ListItemIcon>
                    <FlagOutlined />
                </ListItemIcon>
                <ListItemText primary="Crypto Services" />
            </ListItem>
            <ListItem button divider>
                <ListItemIcon>
                    <FileCopyOutlined />
                </ListItemIcon>
                <ListItemText primary="B2B services" />
            </ListItem>
            <ListItem button divider>
                <ListItemIcon>
                    <PersonAddDisabledOutlined />
                </ListItemIcon>
                <ListItemText primary="Gambling" />
            </ListItem>
        </List>
    );
}
