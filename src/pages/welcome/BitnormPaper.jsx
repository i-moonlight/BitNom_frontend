import { makeStyles } from "@material-ui/core";
import { Card, CardContent, Container, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";

export default function BitnormPaper({ title, children }) {
  const classes = useStyles();

  return (
    <>
      <Container container component={Grid} maxWidth="lg">
        <Grid item md={2}></Grid>
        <Grid
          item
          md={8}
          style={{
            borderRadius: 30,
          }}
        >
          <div className="py-4 mb-4">
            <Typography variant="h4" color="textPrimary">
              {title}
            </Typography>
            <Typography variant="h6" color="textPrimary">
              Effective Date: July 6, 2021
            </Typography>
          </div>
        </Grid>
        <Grid item md={2}></Grid>
      </Container>
      <div className={classes.body}>
        <Container container component={Grid} maxWidth="lg">
          <Grid item md={2}></Grid>
          <Grid
            item
            md={8}
            style={{
              borderRadius: 30,
            }}
          >
            <Card className={classes.card} elevation={4}>
              <CardContent className="text-justify">{children}</CardContent>
            </Card>
          </Grid>
          <Grid item md={2}></Grid>
        </Container>
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor:
      theme.palette.type == "light"
        ? "#F5F5F5"
        : theme.palette.background.paper,
  },
  card: {
    borderRadius: 0,
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));
