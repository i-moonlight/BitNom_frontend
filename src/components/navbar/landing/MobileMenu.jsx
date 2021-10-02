import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import { ChevronRight, CloseRounded } from "@material-ui/icons";
import React, { useState } from "react";
import { menuEcosystem, menuProduct } from "../../utilities/data.components";
import MenuOptions from "./MenuOptions";

export default function MobileMenu({ open, onClose }) {
  const useStyles = makeStyles(() => ({
    root: {
      position: "fixed",
      top: 0,
      left: 0,
      display: open ? "flex" : "none",
      minHeight: "100vh",
      width: "100%",
      backgroundColor: theme.palette.background.default,
      flexDirection: "column",
      //   alignItems: 'start',
      overflow: "hidden",
    },
    close: {
      alignSelf: "baseline",
    },
  }));

  const [showMenuEcosystem, setShowMenuEcosystem] = useState(false);
  const [showMenuProduct, setShowMenuProduct] = useState(false);
  const theme = useTheme();
  const classes = useStyles();
  //   const history = useHistory();

  return (
    <List className={classes.root}>
      <IconButton
        size="small"
        className={"m-1 p-1" + classes.close}
        onClick={onClose}
      >
        <CloseRounded />
      </IconButton>
      <ListItem button>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={() => setShowMenuEcosystem(!showMenuEcosystem)}>
        <ListItemText primary="Ecosystem" />
        <ListItemIcon>
          <ChevronRight
            style={{
              transform: showMenuEcosystem ? "rotate(270deg)" : "rotate(90deg)",
            }}
          />
        </ListItemIcon>
      </ListItem>
      <MenuOptions show={showMenuEcosystem} items={menuEcosystem} mobile />
      <ListItem button onClick={() => setShowMenuProduct(!showMenuProduct)}>
        <ListItemText primary="Product" />
        <ListItemIcon>
          <ChevronRight
            style={{
              transform: showMenuProduct ? "rotate(270deg)" : "rotate(90deg)",
            }}
          />
        </ListItemIcon>
      </ListItem>
      <MenuOptions show={showMenuProduct} items={menuProduct} mobile />
      <ListItem button>
        <ListItemText primary="BN for Business" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Learn" />
      </ListItem>
    </List>
  );
}
