import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";

import {
  MUTATION_FOLLOW_USER,
  MUTATION_UNFOLLOW_USER,
  QUERY_FETCH_PROFILE,
} from "../utilities/queries";
import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";

import Button from "../../../components/Button";
import { getUserInitials } from "../../../utilities/Helpers";
import { generateRandomColor } from "../utilities/functions";

function AttendeeComponent({ item, getFollowStatus, profile }) {
  const [status, setStatus] = React.useState();

  useEffect(() => {
    if (getFollowStatus(item)) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [getFollowStatus, item]);

  const [
    followUser,
    {
      data: followData,
      //  loading,
      //   error
    },
  ] = useMutation(MUTATION_FOLLOW_USER);

  const [
    unFollowUser,
    {
      data: unFollowData,
      //  loading,
      //   error
    },
  ] = useMutation(MUTATION_UNFOLLOW_USER);

  const handleFollowUser = (user_id) => {
    followUser({
      variables: {
        data: {
          user_id: user_id,
        },
      },
      context: { clientName: "users" },
      refetchQueries: [
        {
          query: QUERY_FETCH_PROFILE,
          context: { clientName: "users" },
        },
      ],
    });
    if (followData?.Users?.follow == true)
      console.log(followData?.Users?.follow);
    setStatus(true);
    //setFollowing(following + 1);
  };

  const handleUnFollowUser = (user_id) => {
    unFollowUser({
      variables: {
        data: {
          user_id: user_id,
        },
      },
      context: { clientName: "users" },
      refetchQueries: [
        {
          query: QUERY_FETCH_PROFILE,
          context: { clientName: "users" },
        },
      ],
    });
    if (unFollowData?.Users?.unFollow == true)
      console.log(unFollowData?.Users?.unFollow);
    setStatus(false);
    //setFollowing(following - 1);
  };
  console.log(item, "ITEMMMMM");
  return (
    <ListItem className="space-between" divider>
      <ListItemAvatar>
        <Avatar
          src={
            item?.attendee?.profile_pic
              ? process.env.REACT_APP_BACKEND_URL + item?.attendee?.profile_pic
              : ""
          }
          style={{
            backgroundColor: generateRandomColor(),
          }}
        >
          {item?.attendee?.profile_pic
            ? ""
            : getUserInitials(item?.attendee?.displayName)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <div className="center-horizontal">
            <Typography variant="body2" className="mx-1">
              {item?.attendee?.displayName}{" "}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {"@" + item?.attendee?._id}
            </Typography>
          </div>
        }
        secondary={item?.attendee?.bio}
      />
      <ListItemIcon
        aria-label="show more"
        //   aria-controls={notificationOptionId}
        aria-haspopup="true"
        //   onClick={handleNotificationOptionOpen}
        color="inherit"
        style={{
          marginRight: 0,
          paddingRight: 0,
          minWidth: 30,
          "&.MuiListItemIconRoot": {
            minWidth: 30,
          },
        }}
      >
        {status !== undefined && item?.attendee?._id !== profile?._id && (
          <Button
            onClick={() =>
              status
                ? handleUnFollowUser(item?.attendee?._id)
                : handleFollowUser(item?.attendee?._id)
            }
            className="mx-2"
            size="small"
            variant="outlined"
            color="primary"
          >
            {status === true && "Unfollow"}
            {status === false && "Follow"}
          </Button>
        )}
      </ListItemIcon>
    </ListItem>
  );
}

export default AttendeeComponent;
