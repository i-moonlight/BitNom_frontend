import {
    Card,
    CardActions,
    CardContent,
    Divider,
    Skeleton,
    Typography,
} from '@mui/material';
import { useRef } from 'react';

export default function UserCard() {
    const card = useRef();

    const sticky =
        window.innerHeight < card?.current?.clientHeight + 176
            ? window.innerHeight - (card?.current?.clientHeight + 24)
            : 160;

    return (
        <div
            ref={card}
            style={{
                position: 'sticky',
                top: sticky,
                //176
            }}
        >
            <Card style={{ marginBottom: 16 }} variant={'outlined'}>
                <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={'100%'}
                    height={100}
                />
                <CardContent>
                    <div className="space-between">
                        <div>
                            <Skeleton
                                animation="wave"
                                variant="text"
                                width={80}
                            />
                            <Skeleton animation="wave" variant="text" />
                        </div>
                    </div>

                    <div className="center-horizontal space-between mt-4">
                        <div>
                            <Skeleton
                                animation="wave"
                                variant="rectangular"
                                width={50}
                                height={30}
                            />
                        </div>
                        <div>
                            <Skeleton
                                animation="wave"
                                variant="rectangular"
                                width={50}
                                height={30}
                            />
                        </div>
                        <Typography>
                            <Skeleton
                                animation="wave"
                                variant="rectangular"
                                width={50}
                                height={30}
                            />
                        </Typography>
                    </div>
                </CardContent>
                <Divider />
                <CardActions className="py-0">
                    <Skeleton
                        animation="wave"
                        className="my-2"
                        variant="rectangular"
                        width={80}
                        height={26}
                    />
                </CardActions>
                <Divider />
                <CardActions className="py-0">
                    <Skeleton
                        animation="wave"
                        className="my-2"
                        variant="rectangular"
                        width={80}
                        height={26}
                    />
                </CardActions>
            </Card>
        </div>
    );
}
