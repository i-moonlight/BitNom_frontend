import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import { Button } from '../../../../components/Button';
import { getUserInitials } from '../../../../utilities/Helpers';
import EducationForm from '../forms/EducationForm';
import { useStyles } from '../utilities/profile.styles';

export default function EducationFragment({
    id,
    current,
    institution,
    major,
    dateFrom,
    description,
    dateTo,
    photoURL,
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
                <EducationForm
                    onClose={onClose}
                    updateData={{
                        id,
                        institution,
                        major,
                        start_date: dateFrom,
                        end_date: dateTo || '',
                        description,
                        current,
                    }}
                />
            )}
            <Card className={classes.profileFragment}>
                <CardContent>
                    <div className="d-flex flex-row">
                        <Avatar src={photoURL} variant="rounded">
                            {getUserInitials(institution)}
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
                                    {institution}
                                </Typography>
                                {!profileView && (
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
                                )}
                            </div>
                            <Typography
                                style={{
                                    overflowWrap: 'break-word',
                                    wordWrap: 'break-word',
                                }}
                                variant="body2"
                            >
                                {major}
                            </Typography>
                            <Typography variant="body2">
                                {format(new Date(dateFrom), 'MMMM do, y')}{' '}
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
