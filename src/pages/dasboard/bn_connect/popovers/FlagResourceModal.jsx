import { useMutation } from '@apollo/client';
import { CloseRounded } from '@mui/icons-material';
import {
    Card,
    CardContent,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Modal,
    Typography,
} from '@mui/material';
import { MUTATION_CREATE_FLAG } from '../../utilities/queries';

export default function FlagResourceModal({
    openFlag,
    setOpenFlag,
    flaggedResource,
    setFlaggedResource,
}) {
    const [createFlag] = useMutation(MUTATION_CREATE_FLAG);

    const onCreateFlag = async (ICreateFlag) => {
        await createFlag({
            variables: {
                data: ICreateFlag,
            },
        });

        setFlaggedResource(null);
        setOpenFlag(false);
    };

    const handleCreateFlag = (reason) => {
        onCreateFlag({
            _id: flaggedResource?._id,
            type: flaggedResource?.resourceType,
            reason: reason,
        });
    };

    return (
        <Modal
            style={{
                outline: 'none',
                '&:focusVisible': {
                    outline: 'none',
                },
            }}
            className="center-horizontal center-vertical w-100"
            open={openFlag}
        >
            <Grid container>
                <Grid item lg={3} md={2} sm={1} xs={1}></Grid>
                <Grid item lg={6} md={8} sm={10} xs={10}>
                    <Card>
                        <div className="space-between mx-3 my-2">
                            <Typography variant="body2"></Typography>
                            <Typography variant="body1">
                                Report this {flaggedResource?.resourceType}
                            </Typography>
                            <IconButton
                                onClick={() => {
                                    setOpenFlag(false);
                                    setFlaggedResource(null);
                                }}
                                size="small"
                                className="m-1 p-1"
                            >
                                <CloseRounded />
                            </IconButton>
                        </div>

                        <Divider />
                        <CardContent>
                            <List
                                style={{ padding: 0, paddingBottom: 0 }}
                                component={Card}
                                variant="outlined"
                            >
                                <ListItem
                                    button
                                    divider
                                    onClick={() =>
                                        handleCreateFlag(
                                            'It is suspicious or spam'
                                        )
                                    }
                                >
                                    <ListItemText primary="It is suspicious or spam" />
                                </ListItem>
                                <ListItem
                                    button
                                    divider
                                    onClick={() =>
                                        handleCreateFlag(
                                            'It is abusive or harmful'
                                        )
                                    }
                                >
                                    <ListItemText primary="It is abusive or harmful" />
                                </ListItem>
                                <ListItem
                                    button
                                    divider
                                    onClick={() =>
                                        handleCreateFlag(
                                            'It expresses intention of self-harm or harm to other people'
                                        )
                                    }
                                >
                                    <ListItemText primary="It expresses intention of self-harm or harm to other people" />
                                </ListItem>
                                <ListItem button divider>
                                    <ListItemText
                                        primary={`Unfollow the owner of this ${flaggedResource?.resourceType}`}
                                    />
                                </ListItem>
                                <Divider />
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Modal>
    );
}
