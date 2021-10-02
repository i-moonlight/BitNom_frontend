import { Avatar, Card, CardContent, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Button from "../../../../components/Button";
import EducationForm from "../forms/EducationForm";
import { useStyles } from "../utilities/profile.styles";

export default function EducationFragment({
  id,
  current,
  institution,
  major,
  dateFrom,
  description,
  dateTo,
  photoURL,
}) {
  const [formOpen, setFormOpen] = useState(false);
  const classes = useStyles();

  const onClose = () => {
    setFormOpen(false);
  };

  return (
    <>
      {formOpen && (
        <EducationForm
          onClose={onClose}
          updateData={{
            id,
            institution,
            major,
            start_date: dateFrom,
            end_date: dateTo || "",
            description,
            current,
          }}
        />
      )}
      <Card className={classes.profileFragment}>
        <CardContent>
          <div className="d-flex flex-row">
            <Avatar src={photoURL} variant="rounded">
              ED
            </Avatar>
            <div className="mx-3 w-100">
              <div className="center-horizontal space-between ">
                <Typography variant="body2" className="flex-1">
                  {institution}
                </Typography>
                <Button
                  onClick={() => {
                    setFormOpen(true);
                  }}
                  textCase
                  variant="text"
                  size="small"
                >
                  Edit
                </Button>
              </div>
              <Typography variant="body2">{major}</Typography>
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
