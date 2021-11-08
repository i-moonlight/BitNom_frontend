import {
    Avatar,
    Card,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Paper,
    Skeleton,
} from '@mui/material';
import React from 'react';

export default function SuggestedPeopleCard() {
    return (
        <Paper>
            <List
                style={{ padding: 8, paddingBottom: 0 }}
                component={Card}
                variant="outlined"
            >
                <Skeleton animation="wave" variant="text" width={120} />
                {[1, 2, 3]?.map((user) => (
                    <ListItemComponent key={user} user={user} />
                ))}
                <Divider />
                <Skeleton
                    className="my-2"
                    animation="wave"
                    variant="text"
                    width={120}
                />
            </List>
        </Paper>
    );
}

function ListItemComponent() {
    return (
        <ListItem divider>
            <ListItemAvatar>
                <Skeleton animation="wave">
                    <Avatar variant="square" style={{ height: 50 }} />
                </Skeleton>
            </ListItemAvatar>
            <ListItemText
                primary={<Skeleton variant="text" animation="wave" />}
                secondary={<Skeleton variant="text" animation="wave" />}
            />
            <ListItemIcon>
                <Skeleton
                    className="ms-2"
                    variant="rectangular"
                    animation="wave"
                    width={50}
                    height={24}
                />
            </ListItemIcon>
        </ListItem>
    );
}
