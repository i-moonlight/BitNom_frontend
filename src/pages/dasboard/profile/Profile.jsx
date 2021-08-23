import {
  //CircularProgress,
  Container,
  Grid,
  Hidden,
  makeStyles,
} from '@material-ui/core';
import React from 'react';
import Screen from '../../../components/Screen';
import AboutCard from './AboutCard';
import InsightCard from './InsightCard';
import ProfileCard from './ProfileCard';
import WorkCard from './WorkCard';
import EducationCard from './EducationCard';
import HonorCard from './HonorCard';
import SkillsCard from './SkillsCard';
import AdditionalInfoCard from './AdditionalInfoCard';
import { useQuery } from '@apollo/client';
import { QUERY_FETCH_PROFILE } from './utilities/queries';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export default function Profile() {
  const classes = useStyles();
  const state = useSelector(st => st);
  const profile = state.auth.user;

  const {
    error,
    //  loading,
    data,
  } = useQuery(QUERY_FETCH_PROFILE, {
    context: { clientName: 'users' },
  });
  console.log('profileData:  ', data);
  console.log('profileErr:  ', error);

  return (
    <Screen>
      <div className={classes.root}>
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            <Hidden mdDown>
              <Grid item lg={3}></Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8} lg={6}>
              <ProfileCard profile={profile} />
              <InsightCard profile={profile} />
              <AboutCard profile={profile} />
              <WorkCard profile={profile} />
              <EducationCard profile={profile} />
              <HonorCard profile={profile} />
              <SkillsCard profile={profile} />
              <AdditionalInfoCard profile={profile} />
            </Grid>
            <Grid item md={4} lg={3}></Grid>
          </Grid>
        </Container>
      </div>
    </Screen>
  );
}
