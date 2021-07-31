import React from 'react';
import { Button as MuiButton } from '@material-ui/core';
import logo_google from '../../../assets/components/google.svg';
import { useFormikContext } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import {
  MUTATION_CREATE_REACTION,
  QUERY_GET_COMMENTS,
} from '../utilities/queries';

export default function LikeButton({
  textCase,
  color,
  //submit,
  //onClick,
  variant,
  google,
  children,
  resource,
  resourceType,
  ...props
}) {
  const formikContext = useFormikContext();
  const [createReaction] = useMutation(MUTATION_CREATE_REACTION);

  const handleCreateReaction = () => {
    createReaction({
      variables: {
        data: {
          _id: resource?._id,
          type: resourceType,
          reaction: 'like',
        },
      },
      refetchQueries: [
        {
          query: QUERY_GET_COMMENTS,
          variables: { data: { scroll_id: resource?.scroll } },
        },
      ],
    });
  };

  return (
    <MuiButton
      color={color ? color : 'primary'}
      variant={variant ? variant : 'contained'}
      disableElevation
      style={{
        backgroundColor: google && '#f2f2f2',
        color: !color && google && '#818181',
        textTransform: textCase && 'none',
      }}
      onClick={handleCreateReaction}
      {...props}
    >
      {google && (
        <img src={logo_google} alt='' style={{ width: 20, marginRight: 16 }} />
      )}
      {children}
    </MuiButton>
  );
}
