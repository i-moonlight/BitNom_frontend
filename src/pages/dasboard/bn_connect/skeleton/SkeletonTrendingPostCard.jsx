import {
    Avatar,
    Card,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Skeleton,
} from '@mui/material';

export default function SkeletonTrendingPostsCard() {
    return (
        <Paper
            style={{
                marginBottom: 16,
            }}
        >
            <List
                style={{ padding: 8, paddingBottom: 0 }}
                component={Card}
                variant="outlined"
            >
                <Skeleton animation="wave" variant="text" width={120} />
                {[1, 2, 3].map((post) => (
                    <ListItem
                        key={post}
                        divider
                        style={{ zIndex: 1, cursor: 'pointer' }}
                    >
                        <ListItemAvatar>
                            <Skeleton animation="wave">
                                <Avatar
                                    variant="square"
                                    style={{ height: 50 }}
                                />
                            </Skeleton>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Skeleton variant="text" animation="wave" />
                            }
                            secondary={
                                <Skeleton variant="text" animation="wave" />
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}
