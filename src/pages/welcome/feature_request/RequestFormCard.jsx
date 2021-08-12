import { useTheme } from '@material-ui/core';
import { Card, CardContent } from '@material-ui/core';
import React from 'react';
import Button from '../../../components/Button';
import Form from '../../../components/Form';
import TextField from '../../../components/TextField';

export default function RequestFormCard() {
  const theme = useTheme();
  return (
    <Card
      style={{
        backgroundColor: theme.palette.background.default,
        marginTop: 16,
        position: 'sticky',
        top: 132,
      }}
    >
      <CardContent>
        <Form>
          <TextField placeholder='Descriptive Title' fullWidth />
          <TextField
            placeholder='Additional Details'
            fullWidth
            multiline
            rows={5}
          />
          <Button submit fullWidth>
            Submit
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
