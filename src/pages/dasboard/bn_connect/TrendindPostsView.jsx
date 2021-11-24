import { useQuery } from '@apollo/client';
import { ArrowBack } from '@mui/icons-material';
import {
    Card,
    Typography,
    Container,
    Grid,
    CardHeader,
    IconButton,
    useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getFeed } from '../utilities/functions';
import Screen from '../../../components/Screen';
import SEO from '../../../components/SEO';
import { QUERY_LOAD_SCROLLS } from '../utilities/queries';

import SkeletonScrollCard from './skeleton/SkeletonScrollCard';
import SkeletonUserCard from './skeleton/SkeletonUserCard';
import { Suspense, useEffect, useState } from 'react';
import ScrollPreview from './scroll/ScrollPreview';
import UserCard from './UserCard';
//import { Button } from '../../../components/Button';

export default function TrendingPostsView() {
    const history = useHistory();
    const state = useSelector((st) => st);
    const classes = useStyles();
    const mdDown = useMediaQuery('(max-width:1279px)');

    //const [skip, setSkip] = useState(0);
    const [trends, setTrends] = useState([]);
    //const [loadingMore, setLoadingMore] = useState(false);

    const user = state.auth.user;

    const { data } = useQuery(QUERY_LOAD_SCROLLS, {
        variables: {
            data: {
                ids: getFeed(user),
                sortByField: 'trending',
                limit: 10,
                //skip: skip,
            },
        },
    });

    useEffect(() => {
        data && setTrends(data?.Posts?.get);
    }, [data, setTrends]);

    //const trending = data?.Posts.get;
    /* const loadMore = () => {
        setLoadingMore(true);
        setSkip((prev) => prev + 5);

        fetchMore({
            variables: {
                data: {
                    ids: getFeed(user),
                    sortByField: 'trending',
                    limit: 5,
                    skip: skip,
                },
            },
        }).then(({ data: moreData }) => {
            if (moreData) {
                //setTrends([...trends, ...moreData.Posts.get]);
                console.log(
                    skip,
                    //trends,
                    moreData?.Posts?.get,
                    // [...trends, ...moreData?.Posts?.get],
                    'added trends'
                );
                setLoadingMore(false);
            }

            //setTrends([new Set([...trends, ...moreData?.Posts?.get])]);
        });
    }; */
    //console.log(skip, trends, 'initial trends');
    return (
        <Screen>
            <SEO
                title="Connect | Bitnorm"
                url={`${window.location.origin}/connect/trending`}
                description={`Trending posts from your feed`}
            />
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {!mdDown && (
                            <Grid item lg={3}>
                                <Suspense fallback={<SkeletonUserCard />}>
                                    <UserCard
                                        following={user?.following?.length}
                                        followers={user?.followers?.length}
                                    />
                                </Suspense>
                            </Grid>
                        )}
                        <Grid item xs={12} sm={12} md={8} lg={6}>
                            <Card className={classes.mainCard}>
                                <CardHeader
                                    avatar={
                                        !mdDown && (
                                            <IconButton
                                                size="small"
                                                className="m-1 p-1"
                                                aria-label="back"
                                                color="inherit"
                                                onClick={() => history.goBack()}
                                            >
                                                <ArrowBack />
                                            </IconButton>
                                        )
                                    }
                                    title={
                                        <div className="center-horizontal">
                                            <Typography>
                                                Trending posts
                                            </Typography>
                                        </div>
                                    }
                                />
                            </Card>
                            {trends?.map((post) => (
                                <Suspense
                                    key={post?._id}
                                    fallback={<SkeletonScrollCard />}
                                >
                                    <ScrollPreview scroll={post} />
                                </Suspense>
                            ))}
                            {/* {loadingMore ? (
                                ''
                            ) : (
                                <Button
                                    onClick={loadMore}
                                    variant="text"
                                    textCase
                                    style={{ marginBottom: 12 }}
                                >
                                    Load more
                                </Button>
                            )} */}
                        </Grid>
                        {!mdDown && <Grid item md={4} lg={3}></Grid>}
                    </Grid>
                </Container>
            </div>
        </Screen>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
    mainCard: {
        [theme.breakpoints.down('md')]: {
            marginBottom: 16,
            marginTop: 16,
        },
    },
}));
