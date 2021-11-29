import { Card, CardContent, Skeleton } from '@mui/material';

export default function SkeletonCreateScrollCard() {
    return (
        <Card variant="outlined" style={{ marginBottom: 12 }}>
            <CardContent>
                <Skeleton
                    className="br-2"
                    animation="wave"
                    variant="rectangular"
                    width={'100%'}
                    height={30}
                />

                <div className="space-between mt-2 mx-1">
                    {[1, 2, 3, 4].map((item) => (
                        <Skeleton
                            key={item}
                            className="br-2"
                            variant="rectangular"
                            animation="wave"
                            height={30}
                            width={60}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
