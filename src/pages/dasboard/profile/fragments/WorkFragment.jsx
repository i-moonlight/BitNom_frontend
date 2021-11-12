import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import { Button } from '../../../../components/Button';
import WorkForm from '../forms/WorkForm';
import { useStyles } from '../utilities/profile.styles';

export default function WorkFragment({
    id,
    title,
    company,
    dateFrom,
    dateTo,
    description,
    photoURL,
    current,
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
                <WorkForm
                    onClose={onClose}
                    updateData={{
                        id,
                        company,
                        title,
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
                            WK
                        </Avatar>
                        <div className="mx-3  w-100">
                            <div className="center-horizontal space-between">
                                <Typography variant="body2">{title}</Typography>
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
                            <Typography color="primary" variant="body2">
                                {company}
                            </Typography>
                            <Typography gutterBottom variant="body2">
                                {dateFrom} to {current ? 'Now' : dateTo}
                            </Typography>
                            <Typography variant="body2">
                                {description}
                            </Typography>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
