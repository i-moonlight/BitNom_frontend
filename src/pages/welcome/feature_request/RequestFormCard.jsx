import { Card, CardContent, Typography, useTheme } from '@mui/material';
import { FormikButton } from '../../../components/Button';
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
            elevation={4}
        >
            <CardContent>
                <Typography color="textSecondary">Request Feature</Typography>
                <Form>
                    <TextField placeholder="Descriptive Title" fullWidth />
                    <TextField
                        placeholder="Additional Details"
                        fullWidth
                        multiline
                        rows={5}
                    />
                    <FormikButton fullWidth>Submit</FormikButton>
                </Form>
            </CardContent>
        </Card>
    );
}
