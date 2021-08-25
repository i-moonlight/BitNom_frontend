import { MenuItem, Popover, Badge } from "@material-ui/core";
import { ChevronRightRounded } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { gql, useSubscription } from "@apollo/client";
import React from "react";

export default function TabOptionsPopover({
  tabOptionAnchorEl,
  tabOptionsId,
  isTabOptionOpen,
  handleTabOptionsClose,
  tabOptions,
}) {
  const state = useSelector((state) => state);
  const user = state.auth.user;

  const { data, loading } = useSubscription(NEW_NOTIFICATION_COUNT, {
    variables: { _id: "Joe" },
  });

  const new_notification = data && data.liveUpdates ? data.liveUpdates : null;
  const userCount = new_notification?.filter(({ id }) => id === user._id);
  console.log("new notification ", userCount);
  if (loading) <p>Loading new notifications</p>;
  return (
    <Popover
      anchorEl={tabOptionAnchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      id={tabOptionsId}
      keepMounted
      open={isTabOptionOpen}
      onClose={handleTabOptionsClose}
    >
      {tabOptions &&
        tabOptions.map(({ label }) => (
          <MenuItem
            key={`${Math.random() * 1000}`}
            className="py-3 space-between"
            style={{
              width: tabOptionAnchorEl && tabOptionAnchorEl.offsetWidth,
            }}
            onClick={handleTabOptionsClose}
          >
            <Badge badgeContent={4} color="primary">
              {label}
              <ChevronRightRounded />
            </Badge>
          </MenuItem>
        ))}
    </Popover>
  );
}

const NEW_NOTIFICATION_COUNT = gql`
  subscription liveUpdates($_id: String!) {
    liveUpdates(_id: $_id) {
      count
      id
    }
  }
`;
