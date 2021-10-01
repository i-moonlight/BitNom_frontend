import {
  AppBar,
  Avatar,
  Container,
  Divider,
  Hidden,
  IconButton,
  Typography,
  useTheme,
} from "@material-ui/core";
import {
  ArrowRightAltRounded,
  ChevronRight,
  MenuRounded,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import logo_light from "../../../assets/logo_light.svg";
import Button from "../../Button";
import { menuEcosystem, menuProduct } from "../../utilities/data.components";
import StatusBar from "../StatusBar";
import MobileMenu from "./MobileMenu";
import NavBarMenu from "./MenuOptions";

export default function NavBarLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMenuEcosystem, setShowMenuEcosystem] = useState(false);
  const [showMenuProduct, setShowMenuProduct] = useState(false);
  const theme = useTheme();
  const history = useHistory();
  const palette = useSelector((st) => st.theme.palette);

  return (
    <AppBar
      position="fixed"
      style={{
        background: theme.palette.background.default,
      }}
      elevation={4}
    >
      <StatusBar />
      <Divider />
      <Container>
        <div className="space-between my-3">
          <div
            className="center-horizontal c-pointer"
            onClick={() => history.push("/")}
          >
            <Avatar
              src={palette == "light" ? logo : logo_light}
              style={{ marginRight: 8 }}
            >
              B
            </Avatar>
            <Hidden xsDown>
              <Typography
                color={palette == "light" ? "primary" : "textPrimary"}
                variant="h6"
                noWrap
              >
                BITNORM
              </Typography>
            </Hidden>
          </div>
          <Hidden smDown>
            <div className="center-horizontal">
              <Button
                className="mx-2"
                color={theme.palette.text.primary}
                variant="text"
                textCase
                size="large"
              >
                <Typography className="fw-bold">Home</Typography>
              </Button>
              <Button
                className="mx-2"
                color={theme.palette.text.primary}
                variant="text"
                textCase
                endIcon={
                  <ChevronRight style={{ transform: "rotate(90deg)" }} />
                }
                onMouseEnter={() => setShowMenuEcosystem(true)}
                onMouseLeave={() =>
                  setTimeout(() => {
                    setShowMenuEcosystem(false);
                  }, 500)
                }
              >
                <Typography className="fw-bold">Ecosystem</Typography>
                <NavBarMenu show={showMenuEcosystem} items={menuEcosystem} />
              </Button>
              <Button
                className="mx-2"
                color={theme.palette.text.primary}
                variant="text"
                textCase
                endIcon={
                  <ChevronRight style={{ transform: "rotate(90deg)" }} />
                }
                onMouseEnter={() => setShowMenuProduct(true)}
                onMouseLeave={() =>
                  setTimeout(() => {
                    setShowMenuProduct(false);
                  }, 300)
                }
              >
                <Typography className="fw-bold">Product</Typography>
                <NavBarMenu show={showMenuProduct} items={menuProduct} />
              </Button>
              <Button
                className="mx-2"
                color={theme.palette.text.primary}
                variant="text"
                textCase
              >
                <Typography className="fw-bold">BN for Business</Typography>
              </Button>
              <Button
                className="mx-2"
                color={theme.palette.text.primary}
                variant="text"
                textCase
              >
                <Typography className="fw-bold">Learn</Typography>
              </Button>
            </div>
          </Hidden>
          <div className="center-horizontal">
            <Button
              className="mx-2"
              color={theme.palette.text.primary}
              variant="text"
              textCase
              onClick={() => {
                history.push("/auth/login");
              }}
            >
              <Typography className="fw-bold">Sign In</Typography>
            </Button>
            <Button
              textCase
              endIcon={
                <Hidden xsDown>
                  <ArrowRightAltRounded />
                </Hidden>
              }
              onClick={() => {
                history.push("/auth/signup");
              }}
            >
              <Typography className="fw-bold">
                Explore
                <Hidden smDown> BN</Hidden>
              </Typography>
            </Button>
            <Hidden mdUp>
              <IconButton
                size="small"
                className="m-1 p-1"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <MenuRounded />
              </IconButton>
            </Hidden>
            <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
          </div>
        </div>
      </Container>
    </AppBar>
  );
}
