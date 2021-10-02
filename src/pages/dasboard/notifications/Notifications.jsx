import { useQuery } from "@apollo/client";
import {
  Container,
  Card,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

import React from "react";
import Screen from "../../../components/Screen";
import { GET_USER_NOTIFICATIONS } from "../utilities/queries";
import NotificationsListCard from "./NotificationsListCard";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  sidebar: {
    width: "100%",
    maxWidth: 360,
    background: "transparent",
    //color: theme.typography.textPrimary,
  },
}));

export default function Notifications() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const classes = useStyles();
  const { loading, data } = useQuery(GET_USER_NOTIFICATIONS, {
    variables: { limit: 20 },
    context: { clientName: "notifications" },
  });

  return (
    <Screen>
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Hidden mdDown>
              <Grid item lg={3}>
                <SideBarMenu
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                />
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8} lg={6}>
              <NotificationsListCard
                selectedIndex={selectedIndex}
                notifications={data?.Notification?.get}
                loading={loading}
              />
            </Grid>
            <Grid item md={4} lg={3}></Grid>
          </Grid>
        </Container>
      </div>
    </Screen>
  );
}

function SideBarMenu({ selectedIndex, setSelectedIndex }) {
  const classes = useStyles();
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Card elevation={0} color="text.primary" className={classes.sidebar}>
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem
          button
          dense
          disableRipple
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemText primary="All Notifications" />
        </ListItem>
        <ListItem
          button
          dense
          disableRipple
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemText primary="Comments and Mentions" />
        </ListItem>
        <ListItem
          button
          dense
          disableRipple
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Reactions" />
        </ListItem>
        <ListItem
          button
          dense
          disableRipple
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary="Your Content" />
        </ListItem>
        <ListItem
          button
          dense
          disableRipple
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <ListItemText primary="Your Profile" />
        </ListItem>
        <ListItem
          button
          dense
          disableRipple
          selected={selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5)}
        >
          <ListItemText primary="Job Board" />
        </ListItem>
        <ListItem
          button
          dense
          disableRipple
          selected={selectedIndex === 6}
          onClick={(event) => handleListItemClick(event, 6)}
        >
          <ListItemText primary="Forum" />
        </ListItem>
        <ListItem
          button
          dense
          disableRipple
          selected={selectedIndex === 7}
          onClick={(event) => handleListItemClick(event, 7)}
        >
          <ListItemText primary="Announcements" />
        </ListItem>
      </List>
    </Card>
  );
}
