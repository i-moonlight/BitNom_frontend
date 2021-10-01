import { Avatar, Card, CardContent, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Button from "../../../../components/Button";
import HonorForm from "../forms/HonorForm";
import { useStyles } from "../utilities/profile.styles";

export default function HonorFragment({
  id,
  name,
  organization,
  dateFrom,
  dateTo,
  photoURL,
  expires,
}) {
  const [formOpen, setFormOpen] = useState(false);
  const classes = useStyles();

  const onClose = () => {
    setFormOpen(false);
  };

  return (
    <>
      {formOpen && (
        <HonorForm
          onClose={onClose}
          updateData={{
            id,
            organization,
            name,
            start_date: dateFrom,
            end_date: dateTo || "",
            expires,
          }}
        />
      )}
      <Card className={classes.profileFragment}>
        <CardContent>
          <div className="d-flex flex-row">
            <Avatar src={photoURL} variant="rounded">
              HO
            </Avatar>
            <div className="mx-3 w-100">
              <div className="center-horizontal space-between ">
                <Typography variant="body2" className="flex-1">
                  {name}
                </Typography>
                <Button textCase variant="text" size="small">
                  Edit
                </Button>
              </div>
              <Typography color="primary" variant="body2">
                {organization}
              </Typography>
              <Typography variant="body2">
                {dateFrom} to {dateTo}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
