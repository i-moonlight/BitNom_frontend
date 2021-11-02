import { useQuery } from '@apollo/client';
import {
    CircularProgress,
    Container,
    Grid,
    useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import Screen from '../../../components/Screen';
import { QUERY_LOAD_SCROLLS } from '../utilities/queries';
import ServiceCard from './ServiceCard';
import ServicesMenu from './ServicesMenu';
// import CreateScroll from './CreateScroll';
// import CreatePost from './create_scroll/CreatePost';
// import Scroll from './Scroll';
// import SuggestedPeople from './SuggestedPeople';
// import TrendingPosts from './TrendingPosts';
// import UserCard from './UserCard';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
}));

export default function BnServices() {
    // const [createScrollOpen, setCreateScrollOpen] = useState(false);
    const [latestScrolls, setlatestScrolls] = useState([]);
    const classes = useStyles();
    const mdDown = useMediaQuery('(max-width:1279px)');

    const { error, loading, data } = useQuery(QUERY_LOAD_SCROLLS);

    useEffect(() => {
        if (data?.Posts?.get) setlatestScrolls(data.Posts.get);
    }, [data, error, loading]);

    return (
        <Screen>
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {!mdDown && (
                            <Grid item lg={3}>
                                <ServicesMenu />
                            </Grid>
                        )}
                        <Grid item xs={12} sm={12} md={9} lg={9}>
                            {loading && (
                                <CircularProgress
                                    color="primary"
                                    size={60}
                                    thickness={7}
                                />
                            )}
                            <Grid container spacing={2}>
                                {latestScrolls.length &&
                                    latestScrolls.map((service) => (
                                        <Grid
                                            key={service?._id}
                                            item
                                            sm={12}
                                            md={6}
                                            lg={4}
                                        >
                                            <ServiceCard scroll={service} />
                                        </Grid>
                                    ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </Screen>
    );
}
