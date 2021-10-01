import { useMutation } from "@apollo/client";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Button from "../../components/Button";
import Form from "../../components/Form";
import NavBarAuth from "../../components/navbar/auth/NavBarAuth";
import TextField from "../../components/TextField";
import { resetPasswordInitialValues } from "./utilities/initial_values";
import { MUTATION_RESET_PASSWORD } from "./utilities/queries";
import { resetPasswordValidationSchema } from "./utilities/validation_schemas";

export default function CreatePassword({ match }) {
  const [resetErr, setResetErr] = useState(null);
  const [requestSent, setRequestSent] = useState(false);
  const state = useSelector((st) => st);
  const history = useHistory();
  const user = state.auth.user;

  const [resetPassword] = useMutation(MUTATION_RESET_PASSWORD, {
    context: { clientName: "users" },
  });

  useEffect(() => {
    JSON.stringify(user) !== "{}" && history.push("/");
  });

  return (
    <>
      <NavBarAuth />
      <div className="center-horizontal center-vertical py-5">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={11} sm={7} md={6} lg={4}>
            <div className="text-center my-3 px-sm-5">
              <Typography color="textPrimary" variant="h5">
                CREATE NEW PASSWORD
              </Typography>
              <Typography color="textPrimary" variant="body1">
                Create a new memorable password.
              </Typography>
            </div>
            <Card elevation={4}>
              <CardContent>
                <Form
                  initialValues={resetPasswordInitialValues}
                  validationSchema={resetPasswordValidationSchema}
                  onSubmit={({ password }) => {
                    resetPassword({
                      variables: {
                        resetCode: match.params.key,
                        newPassword: password,
                      },
                      errorPolicy: "all",
                    }).then(({ data, errors }) => {
                      setResetErr(null);

                      data?.Users?.resetPassword && setRequestSent(true);

                      errors &&
                        errors.map((err) => {
                          err?.state?.resetCode &&
                            setResetErr(err?.state?.resetCode);
                        });
                    });
                  }}
                >
                  <div className="text-center my-3 mx-2">
                    <TextField
                      name="password"
                      label="New Password"
                      variant="outlined"
                      type="password"
                      fullWidth
                    />
                    <TextField
                      name="cpassword"
                      label="Confirm New Password"
                      variant="outlined"
                      type="password"
                      fullWidth
                    />

                    {requestSent && (
                      <Alert className="mb-2" severity="success">
                        Reset successful Login with your new password.
                      </Alert>
                    )}

                    {resetErr && (
                      <Alert className="mb-2" severity="error">
                        {resetErr[0]}
                      </Alert>
                    )}

                    <Button disabled={requestSent} submit fullWidth>
                      Create Password
                    </Button>
                    <div>
                      <Typography className="center-vertical mt-4">
                        <Link color="primary" to="/auth/login">
                          Back to login
                        </Link>
                      </Typography>
                    </div>
                  </div>
                </Form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
