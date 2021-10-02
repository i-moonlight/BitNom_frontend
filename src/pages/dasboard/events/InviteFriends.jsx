import {
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography,
  Checkbox,
  TextField,
  CardActions,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { MUTATION_INVITE_FRIENDS_TO_EVENT } from "../utilities/queries";
import {
  CloseRounded,
  CheckBox,
  CheckBoxOutlineBlank,
} from "@material-ui/icons";
import React, { useState } from "react";
//import { getUserInitials } from '../../../utilities/Helpers';
//import { getReactionsSum } from '../utilities/functions';

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox color="primary" fontSize="small" />;

export default function InviteFriends({
  eventId,
  openInvite,
  setOpenInvite,
  profile,
}) {
  //const classes = useStyles();
  const [selectedFriends, setSelectedFriends] = useState([]);

  const [
    inviteFriends,
    {
      loading,
      data,
      //  error
    },
  ] = useMutation(MUTATION_INVITE_FRIENDS_TO_EVENT);

  const onInviteFriends = async (friends) => {
    await inviteFriends({
      variables: {
        data: { ids: friends, event_id: eventId },
      },
    });
    if (!data) console.log("");
  };

  const handleInviteFriends = () => {
    if (!selectedFriends?.length) return;
    const ids = [];
    selectedFriends.forEach((friend) => ids.push(friend?.userId?._id));
    onInviteFriends(ids);
    setOpenInvite(false);
  };

  return (
    <Modal
      style={{
        outline: "none",
        maxHeight: "75vh",
        "&:focus-visible": {
          outline: "none",
        },
      }}
      className="center-horizontal center-vertical w-100"
      open={openInvite}
    >
      <Grid container>
        <Grid item lg={3} md={2} sm={1} xs={1}></Grid>
        <Grid item lg={6} md={8} sm={10} xs={10}>
          <Card>
            <div className="space-between mx-3 my-2">
              <Typography variant="body2"></Typography>
              <Typography variant="body1">Invite Friends</Typography>
              <IconButton size="small" className="m-1 p-1">
                <CloseRounded
                  onClick={() => {
                    setOpenInvite(false);
                    setSelectedFriends([]);
                    //setResourceReactions(null);
                  }}
                />
              </IconButton>
            </div>
            <Divider />
            <CardContent>
              <Autocomplete
                multiple
                id="invite-friends-to-event"
                options={profile?.followers}
                disableCloseOnSelect
                onChange={(event, value) => {
                  setSelectedFriends(value);
                }}
                getOptionLabel={(option) => option?.userId?.displayName}
                renderOption={(option, { selected }) => (
                  <>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option?.userId?.displayName}
                  </>
                )}
                style={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Invite friends to your event" />
                )}
              />
            </CardContent>
            <CardActions>
              <div className="space-between mt-1">
                <div className="center-horizontal"></div>
                {!loading && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleInviteFriends}
                  >
                    Invite
                  </Button>
                )}
                {loading && (
                  <Button size="small" style={{ margin: "0" }}>
                    <CircularProgress size={24} thickness={4} />
                  </Button>
                )}
              </div>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Modal>
  );
}
