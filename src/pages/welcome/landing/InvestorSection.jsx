import { useTheme } from "@material-ui/core";
import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import investorGraphicImg from "../../../assets/landing/articles.png";
import investorImg from "../../../assets/landing/investor.svg";
import { INVESTOR_CARD_DISPLACEMENT, useStyles } from "./Landing";

export default function InvestorSection() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid
      style={{
        backgroundColor: theme.palette.background.landing,
        marginBottom: -(INVESTOR_CARD_DISPLACEMENT + 150),
      }}
    >
      <Container maxWidth="lg">
        <Card
          style={{
            position: "relative",
            bottom: INVESTOR_CARD_DISPLACEMENT,
            borderWidth: 2,
          }}
          // variant='outlined'
          elevation={4}
        >
          <CardContent>
            <Grid
              // className='m-1'
              style={{
                backgroundImage: `url("${investorGraphicImg}")`,
              }}
              spacing={5}
              container
            >
              <Grid item md={5}></Grid>
              <Grid item md={7}>
                <img
                  style={{ width: "70%", zIndex: 2 }}
                  src={investorImg}
                  alt=""
                />
              </Grid>
            </Grid>

            <Grid className="mx-1 mt-2" spacing={5} container>
              <Grid item lg={12}>
                <Typography
                  className={classes.sectionText}
                  variant="h6"
                  color="textPrimary"
                >
                  Our Investor Page
                </Typography>
                <Grid container>
                  <Grid item md={8} sm={10} xs={11}>
                    <Typography
                      className={classes.sectionText}
                      color="textPrimary"
                      noWrap={false}
                    >
                      The investors utilize diverse accounts on diverse project
                      environments to be well informed of unique and potential
                      projects all through news, blogs, and other important
                      information pols to help navigate their decision. The
                      Ultimate Crypto-Intelligence Suite Your gateway to the
                      cryptocurrency ecosystem.
                    </Typography>
                  </Grid>
                </Grid>
                <Typography className={classes.sectionText} color="textPrimary">
                  <Link to="/investors">Visit investor page &gt;</Link>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Grid>
  );
}
