import { useMutation } from '@apollo/client';
import {
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';
import React, { useEffect } from 'react';

import { MUTATION_CREATE_FLAG } from '../../utilities/queries';

export default function FlagResource({
  openFlag,
  setOpenFlag,
  flaggedResource,
  setFlaggedResource,
}) {
  const [createFlag, { data }] = useMutation(MUTATION_CREATE_FLAG);

  const onCreateFlag = async ICreateFlag => {
    await createFlag({
      variables: {
        data: ICreateFlag,
      },
    });
    setFlaggedResource(null);
  };
  useEffect(() => {
    if (data?.Flags?.create) {
      setOpenFlag(false);
    }
  }, [data]);

  const handleCreateFlag = reason => {
    onCreateFlag({
      _id: flaggedResource?._id,
      type: flaggedResource?.resourceType,
      reason: reason,
    });
  };

  return (
    <Modal
      style={{
        outline: 'none',
        '&:focus-visible': {
          outline: 'none',
        },
      }}
      className='center-horizontal center-vertical w-100'
      open={openFlag}
    >
      <Grid container>
        <Grid item lg={3} md={2} sm={1} xs={1}></Grid>
        <Grid item lg={6} md={8} sm={10} xs={10}>
          <Card>
            <div className='space-between mx-3 my-2'>
              <Typography variant='body2'></Typography>
              <Typography variant='body1'>
                Report this {flaggedResource?.resourceType}
              </Typography>
              <IconButton size='small' className='m-1 p-1'>
                <CloseRounded
                  onClick={() => {
                    setOpenFlag(false);
                    setFlaggedResource(null);
                  }}
                />
              </IconButton>
            </div>

            <Divider />
            <CardContent>
              <List
                style={{ padding: 0, paddingBottom: 0 }}
                component={Card}
                variant='outlined'
              >
                <ListItem
                  button
                  divider
                  onClick={() => handleCreateFlag('It is suspicious or spam')}
                >
                  <ListItemText primary='It is suspicious or spam' />
                </ListItem>
                <ListItem
                  button
                  divider
                  onClick={() => handleCreateFlag('It is abusive or harmful')}
                >
                  <ListItemText primary='It is abusive or harmful' />
                </ListItem>
                <ListItem
                  button
                  divider
                  onClick={() =>
                    handleCreateFlag(
                      'It expresses intention of self-harm or harm to other people'
                    )
                  }
                >
                  <ListItemText primary='It expresses intention of self-harm or harm to other people' />
                </ListItem>
                <ListItem button divider>
                  <ListItemText
                    primary={`Unfollow the author of this ${flaggedResource?.resourceType}`}
                  />
                </ListItem>
                <Divider />
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Modal>
  );
}
