import { useQuery } from "@apollo/client";
import {
  Card,
  CardHeader,
  Container,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import Screen from "../../../components/Screen";
import AboutCard from "./AboutCard";
import AdditionalInfoCard from "./AdditionalInfoCard";
import EducationCard from "./EducationCard";
import HonorCard from "./HonorCard";
import InsightCard from "./InsightCard";
import ProfileCard from "./ProfileCard";
import SkillsCard from "./SkillsCard";
import { QUERY_FETCH_PROFILE } from "./utilities/profile.queries";
import WorkCard from "./WorkCard";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export default function Profile() {
  const classes = useStyles();
  // const state = useSelector(st => st);
  // const profile = state.auth.user;

  const {
    // error,
    //  loading,
    data,
  } = useQuery(QUERY_FETCH_PROFILE, {
    context: { clientName: "users" },
  });

  const profile = data?.Users?.profile;
  console.log("profileAuth: ", profile);

  return (
    <Screen>
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Hidden mdDown>
              <Grid item lg={3}></Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8} lg={6}>
              <Card variant="outlined" style={{ marginBottom: 12 }}>
                <CardHeader
                  avatar={
                    <Link to="/dashboard">
                      <IconButton
                        size="small"
                        className="m-1 p-1"
                        aria-label="back"
                        color="inherit"
                      >
                        <ArrowBack />
                      </IconButton>
                    </Link>
                  }
                  title={
                    <div className="center-horizontal">
                      <Typography variant="body1">Your Profile</Typography>
                    </div>
                  }
                />
              </Card>

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
