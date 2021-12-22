import { useMutation } from '@apollo/client';
import { Delete, Edit } from '@mui/icons-material';
import { Card, IconButton, Typography } from '@mui/material';
import {
    MUTATION_REMOVE_COURSE,
    MUTATION_REMOVE_PROJECT,
    QUERY_FETCH_PROFILE,
} from '../utilities/profile.queries';

export default function AditionalInfoFragment({ id, name, year, formType }) {
    const [
        deleteCourse,
        {
            // addError,
            // data,
            deleteCourseLoading,
        },
    ] = useMutation(MUTATION_REMOVE_COURSE, {
        context: { clientName: 'users' },
    });

    const [
        deleteProject,
        {
            // addError,
            // data,
            deleteProjectLoading,
        },
    ] = useMutation(MUTATION_REMOVE_PROJECT, {
        context: { clientName: 'users' },
    });

    const onDelete = () => {
        formType == 'course'
            ? deleteCourse({
                  variables: {
                      id: id,
                  },
                  refetchQueries: [
                      {
                          query: QUERY_FETCH_PROFILE,
                          context: { clientName: 'users' },
                      },
                  ],
              })
            : deleteProject({
                  variables: {
                      id: id,
                  },
                  refetchQueries: [
                      {
                          query: QUERY_FETCH_PROFILE,
                          context: { clientName: 'users' },
                      },
                  ],
              });
    };

    return (
        <Card className="my-2 p-1 ps-2 center-horizontal space-between">
            <Typography variant="body2">
                {name} . {year}
            </Typography>
            <div>
                <IconButton
                    disabled={deleteCourseLoading || deleteProjectLoading}
                    color="primary"
                    size="small"
                    className="p-1 ms-1"
                >
                    <Edit />
                </IconButton>
                <IconButton
                    disabled={deleteCourseLoading || deleteProjectLoading}
                    onClick={onDelete}
                    color="primary"
                    size="small"
                    className="p-1 ms-1"
                >
                    <Delete />
                </IconButton>
            </div>
        </Card>
    );
}
