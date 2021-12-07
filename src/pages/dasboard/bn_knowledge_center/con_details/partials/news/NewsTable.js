import { LinkSharp } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Skeleton,
    Typography,
} from '@mui/material';
import * as React from 'react';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsTable } from '../../../../../../store/actions/cryptoActions';

export default function NewsTable() {
    const dispatch = useDispatch();
    const state = useSelector((st) => st);
    const trendings = state.crypto?.newsTable;

    useEffect(() => {
        dispatch(fetchNewsTable());
    }, [dispatch]);

    return (
        <Fragment>
            {trendings?.length > 0 ? (
                <Box sx={{ flexGrow: 1 }}>
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                        {trendings.map((row, idx) => {
                            return (
                                <Grid item xs={2} sm={4} md={4} key={idx}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={row?.item.large}
                                            alt="green iguana"
                                        />

                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                            >
                                                {row.item.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipisicing elit.
                                                Aliquam autem corporis eius,
                                                facilis illo recusandae sapiente
                                                soluta sunt tempora. Cum
                                                dignissimos error fugiat ipsa
                                                itaque maxime officiis quaerat
                                                quibusdam vel?
                                            </Typography>
                                        </CardContent>
                                        <CardActions
                                            sx={{
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Button size="small">
                                                12 minutes ago
                                            </Button>
                                            <Button size="small">
                                                {row.item.name}
                                                <LinkSharp />
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            ) : (
                <Box sx={{ flexGrow: 1 }}>
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                        {Array.from(Array(6)).map((_, index) => (
                            <Grid item xs={2} sm={4} md={4} key={index}>
                                <Skeleton
                                    animation="wave"
                                    className="m-3 br-1"
                                    width={'100%'}
                                    variant="text"
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Fragment>
    );
}

// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

{
    /*<div className={'row'}>*/
}
{
    /*    <Card className={'col-sm-12 col-md-2 col-lg-3'}>*/
}
{
    /*        <div>*/
}
{
    /*            <img src={'https://miro.medium.com/max/1024/1*2lw5D9tul5b2f4bTe8YeAw.jpeg'}*/
}
{
    /*                alt={'markets'} className={'img-thumbnail'} height={'200'}*/
}
{
    /*            />*/
}
{
    /*        </div>*/
}
{
    /*        <div>*/
}
{
    /*            <p>Bitcoin EFT Approval{' '}{'Hangs in the balance'}*/
}
{
    /*                , Hopes Up on Nes SEC Chairman*/
}
{
    /*            </p>*/
}
{
    /*        </div>*/
}

{
    /*        <div className={'d-flex justify-content-between text-secondary'}>*/
}
{
    /*            <p>4Min ago</p>*/
}
{
    /*            <p>*/
}
{
    /*                Bitcoin Warrior <LinkSharp />*/
}
{
    /*            </p>*/
}
{
    /*        </div>*/
}
{
    /*    </Card>*/
}
{
    /*</div>*/
}
