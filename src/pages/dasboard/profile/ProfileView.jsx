import { useQuery } from '@apollo/client';
import {
    Container,
    Grid,
    useMediaQuery,
    CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import Screen from '../../../components/Screen';
import { ToastContainer } from 'react-toastify';
import SEO from '../../../components/SEO';
import AboutCard from './AboutCard';
import AdditionalInfoCard from './AdditionalInfoCard';
import EducationCard from './EducationCard';
import HonorCard from './HonorCard';
import InsightCard from './InsightCard';
import ProfileCard from './ProfileCard';
import SkillsCard from './SkillsCard';
import { QUERY_FETCH_PROFILE_BY_ID } from './utilities/profile.queries';
import WorkCard from './WorkCard';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
}));

export default function ProfileView({ match }) {
    const classes = useStyles();
    const mdDown = useMediaQuery('(max-width:1279px)');
    // const state = useSelector(st => st);
    // const profile = state.auth.user;

    const {
        // error,
        loading,
        data,
    } = useQuery(QUERY_FETCH_PROFILE_BY_ID, {
        variables: {
            id: match.params.id,
        },
        context: { clientName: 'users' },
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
    }, []);

    const profile = data?.Users?.getById;

    return (
        <Screen>
            <SEO
                title={`User Profile | Bitnorm`}
                url={`${window.location.origin}/users/${profile?._id}`}
                description={profile?.bio || 'Bitnorm User Profile'}
                image={
                    profile?.profile_pic
                        ? process.env.REACT_APP_BACKEND_URL +
                          profile?.profile_pic
                        : null
                }
            />
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {!mdDown && <Grid item lg={3}></Grid>}
                        {loading && (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={8}
                                lg={6}
                                align="center"
                            >
                                <CircularProgress color="primary" />
                            </Grid>
                        )}
                        {!loading && data && (
                            <Grid item xs={12} sm={12} md={8} lg={6}>
                                <ProfileCard profile={profile} profileView />
                                <InsightCard profile={profile} profileView />
                                <AboutCard profile={profile} profileView />
                                <WorkCard profile={profile} profileView />
                                <EducationCard profile={profile} profileView />
                                <HonorCard profile={profile} profileView />
                                <SkillsCard profile={profile} profileView />
                                <AdditionalInfoCard
                                    profile={profile}
                                    profileView
                                />
                            </Grid>
                        )}
                        <Grid item md={4} lg={3}></Grid>
                    </Grid>
                </Container>
            </div>
        </Screen>
    );
}
