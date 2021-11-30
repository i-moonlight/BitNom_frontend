import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import { Button } from '../../../../components/Button';
import { getUserInitials } from '../../../../utilities/Helpers';
import HonorForm from '../forms/HonorForm';
import { useStyles } from '../utilities/profile.styles';
import { format } from 'date-fns';

export default function HonorFragment({
    id,
    name,
    organization,
    dateFrom,
    dateTo,
    photoURL,
    expires,
    profileView,
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
                        end_date: dateTo || '',
                        expires,
                    }}
                />
            )}
            <Card className={classes.profileFragment}>
                <CardContent>
                    <div className="d-flex flex-row">
                        <Avatar src={photoURL} variant="rounded">
                            {getUserInitials(name)}
                        </Avatar>
                        <div className="mx-3 w-100">
                            <div className="center-horizontal space-between ">
                                <Typography
                                    style={{
                                        overflowWrap: 'break-word',
                                        wordWrap: 'break-word',
                                    }}
                                    variant="body2"
                                    className="flex-1"
                                >
                                    {name}
                                </Typography>
                                {!profileView && (
                                    <Button
                                        textCase
                                        variant="text"
                                        size="small"
                                    >
                                        Edit
                                    </Button>
                                )}
                            </div>
                            <Typography
                                style={{
                                    overflowWrap: 'break-word',
                                    wordWrap: 'break-word',
                                }}
                                color="primary"
                                variant="body2"
                            >
                                {organization}
                            </Typography>
                            <Typography variant="body2">
                                {format(new Date(dateFrom), 'MMMM do, y')}
                                {dateTo &&
                                    ` to ${format(
                                        new Date(dateTo),
                                        'MMMM do, y'
                                    )}`}
                            </Typography>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
