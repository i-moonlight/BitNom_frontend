import { useMutation } from '@apollo/client';
import { SearchRounded } from '@mui/icons-material';
import { Card, CardContent, Typography } from '@mui/material';
import { Button, FormikButton } from '../../../../components/Button';
import Form from '../../../../components/Form';
import TextField from '../../../../components/TextField';
import AditionalInfoFragment from '../fragments/AditionalInfoFragment';
import { courseAndProjectInitialValues } from '../utilities/profile.initialValues';
import {
    MUTATION_ADD_COURSE,
    MUTATION_ADD_PROJECT,
    QUERY_FETCH_PROFILE,
} from '../utilities/profile.queries';
import { useStyles } from '../utilities/profile.styles';
import { courseAndProjectValidation } from '../utilities/profile.validationSchemas';

export default function AditionalInfoForm({
    onClose,
    formType,
    updateData,
    profile,
}) {
    const classes = useStyles();

    const [
        addCourse,
        {
            // addError,
            // data,
            addCourseLoading,
        },
    ] = useMutation(MUTATION_ADD_COURSE, {
        context: { clientName: 'users' },
    });

    const [
        addProject,
        {
            // addError,
            // data,
            addProjectLoading,
        },
    ] = useMutation(MUTATION_ADD_PROJECT, {
        context: { clientName: 'users' },
    });

    const items = formType == 'project' ? profile?.projects : profile?.courses;

    return (
        <div className="mt-2">
            <Form
                initialValues={courseAndProjectInitialValues}
                validationSchema={courseAndProjectValidation}
                onSubmit={({ name, year }, { resetForm }) => {
                    const ICourseProject = {
                        name,
                        year,
                    };

                    if (updateData) {
                        //Updates

                        return;
                    }

                    formType == 'course'
                        ? addCourse({
                              variables: {
                                  data: ICourseProject,
                              },
                              refetchQueries: [
                                  {
                                      query: QUERY_FETCH_PROFILE,
                                      context: { clientName: 'users' },
                                  },
                              ],
                          }).then(() => {
                              resetForm();
                              onClose();
                          })
                        : addProject({
                              variables: {
                                  data: ICourseProject,
                              },
                              refetchQueries: [
                                  {
                                      query: QUERY_FETCH_PROFILE,
                                      context: { clientName: 'users' },
                                  },
                              ],
                          }).then(() => {
                              resetForm();
                              onClose();
                          });
                }}
            >
                <Card className={classes.formCard}>
                    <CardContent>
                        <Typography>Add {formType}</Typography>
                        <TextField
                            required
                            fullWidth
                            name="name"
                            labelTop="Name"
                            placeholder="Type to search"
                            adornmentType="start"
                            adornment={<SearchRounded className="p-" />}
                        />
                        <TextField
                            required
                            fullWidth
                            name="year"
                            labelTop="Year"
                            placeholder=" Enter the year"
                        />

                        <div className="d-flex justify-content-end mt-2">
                            <Button
                                onClick={onClose}
                                color="inherit"
                                size="small"
                                variant="text"
                            >
                                Close
                            </Button>
                            <FormikButton
                                disabled={addProjectLoading || addCourseLoading}
                                size="small"
                                className="ms-2"
                            >
                                {updateData ? 'Update' : 'Add'}
                            </FormikButton>
                        </div>

                        <div className="mt-3">
                            {items?.map(({ _id, name, year }) => (
                                <AditionalInfoFragment
                                    key={_id}
                                    id={_id}
                                    name={name}
                                    year={year}
                                    formType={formType}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </Form>
        </div>
    );
}
