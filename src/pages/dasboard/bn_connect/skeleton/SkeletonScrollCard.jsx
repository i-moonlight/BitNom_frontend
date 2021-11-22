import {
    Card,
    CardActions,
    CardHeader,
    CardContent,
    Skeleton,
    Typography,
} from '@mui/material';

export default function SkeletonScrollCard() {
    return (
        <Card
            variant="outlined"
            elevation={0}
            style={{ width: '100%', marginBottom: '10px' }}
        >
            <CardHeader
                avatar={
                    <Skeleton
                        animation="wave"
                        variant="circular"
                        width={30}
                        height={30}
                    />
                }
                title={
                    <div
                        className=" d-flex align-items-center"
                        style={{ marginBottom: '5px' }}
                    >
                        <Skeleton
                            variant="rectangular"
                            animation="wave"
                            width="60%"
                        />
                    </div>
                }
                subheader={
                    <Skeleton
                        variant="rectangular"
                        height={10}
                        width="10%"
                        animation="wave"
                    />
                }
            />
            <CardContent>
                <Typography component="p">
                    <Skeleton
                        variant="text"
                        height={40}
                        width="40%"
                        animation="wave"
                    />
                </Typography>
                <Typography display="inline">
                    <Skeleton
                        variant="rectangular"
                        width="20%"
                        animation="wave"
                    />
                    <Skeleton
                        variant="rectangular"
                        width="20%"
                        animation="wave"
                    />
                </Typography>
            </CardContent>
            <CardActions>
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={30}
                    animation="wave"
                />
            </CardActions>
        </Card>
    );
}
