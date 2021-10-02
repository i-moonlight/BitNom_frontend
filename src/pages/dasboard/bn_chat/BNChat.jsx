import {
  Card,
  CardContent,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect } from "react";
import Screen from "../../../components/Screen";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export default function BnChat() {
  const classes = useStyles();

  useEffect(() => {
    //
  }, []);

  return (
    <Screen>
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item lg={4}>
              <Card>
                <CardContent>Left</CardContent>
              </Card>
            </Grid>
            <Grid item lg={8}>
              <Card>
                <CardContent>right</CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Screen>
  );
}
