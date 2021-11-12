import {
    Card,
    CardActionArea,
    CardContent,
    Skeleton,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { Button } from '../../../../components/Button';

export default function SkeletonCreateScrollCard() {
    const xsDown = useMediaQuery('(max-width:599px)');

    return (
        <Card variant="outlined" style={{ marginBottom: 12 }}>
            <CardContent>
                <Skeleton animation="wave" variant="rectangular" width={'100%'}>
                    <CardActionArea>
                        <Card>
                            <Typography variant="body2" color="textSecondary">
                                Create a post
                            </Typography>
                        </Card>
                    </CardActionArea>
                </Skeleton>
                <div className="space-between mt-2 mx-1">
                    {[1, 2, 3, 4].map((item) => (
                        <Skeleton key={item} animation="wave">
                            <Button textCase variant="text" color="inherit">
                                <div className="center-horizontal">
                                    <img
                                        style={{ marginRight: 10, width: 20 }}
                                        alt="img"
                                    />
                                    {!xsDown && (
                                        <Typography variant="body2">
                                            Video
                                        </Typography>
                                    )}
                                </div>
                            </Button>
                        </Skeleton>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
