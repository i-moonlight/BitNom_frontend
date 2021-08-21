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
import HonorsCard from './HonorsCard';
import SkillsCard from './SkillsCard';
import AdditionalInfoCard from './AdditionalInfoCard';
import { useQuery } from '@apollo/client';
import { QUERY_FETCH_PROFILE } from './utilities/queries';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export default function Profile() {
  const classes = useStyles();
  const { error, loading, data } = useQuery(QUERY_FETCH_PROFILE);
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
              <ProfileCard />
              <InsightCard />
              <AboutCard />
              <WorkCard />
              <EducationCard />
              <HonorsCard />
              <SkillsCard />
              <AdditionalInfoCard />
            </Grid>
            <Grid item md={4} lg={3}></Grid>
          </Grid>
        </Container>
      </div>
    </Screen>
  );
}
