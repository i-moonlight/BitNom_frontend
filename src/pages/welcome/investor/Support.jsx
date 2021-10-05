import { Container, Grid, Paper } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import DarkTheme from "../../../utilities/DarkTheme";
import Wrapper from "../Wrapper";
import DonateCard from "./DonateCard";

export default function Support() {
  const history = useHistory();

  const onTabValue = (val) => {
    switch (val) {
      case 1:
        history.push("/investors#ecosystem");
        break;
      case 2:
        history.push("/investors#roadmap");
        break;
      default:
        history.push("/investors#");
    }
  };

  return (
    <Wrapper onTabValue={onTabValue}>
      <Paper>
        <DarkTheme>
          <div>
            <section style={{ backgroundColor: "#000" }}>
              <Container maxWidth="lg">
                <Paper style={{ backgroundColor: "#000" }}>
                  <Grid container spacing={2}>
                    <Grid item md={3} sm={2} xs={0}></Grid>
                    <Grid item md={6} sm={8} xs={12}>
                      <DonateCard />
                    </Grid>
                    <Grid item md={3} sm={2} xs={0}></Grid>
                  </Grid>
                </Paper>
              </Container>
            </section>
          </div>
        </DarkTheme>
      </Paper>
    </Wrapper>
  );
}
