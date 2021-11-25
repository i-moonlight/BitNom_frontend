import { AddRounded } from '@mui/icons-material';
import { Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import { Button } from '../../../components/Button';
import WorkForm from './forms/WorkForm';
import WorkFragment from './fragments/WorkFragment';

export default function WorkCard({ profile, profileView }) {
    const [showForm, setShowForm] = useState(false);
    const work = profile?.work;

    const onClose = () => {
        setShowForm(false);
    };

    return (
        <Card className="mb-3">
            <CardContent>
                <div className="space-between center-horizontal">
                    <Typography>Work Experience</Typography>
                    {!showForm && !profileView && (
                        <Button
                            onClick={() => setShowForm(true)}
                            textCase
                            variant="text"
                            startIcon={<AddRounded />}
                        >
                            Add Work Experience
                        </Button>
                    )}
                </div>
                <div>
                    {showForm && <WorkForm onClose={onClose} />}
                    {work?.map(
                        ({
                            _id,
                            company,
                            title,
                            start_date,
                            end_date,
                            current,
                            description,
                        }) => (
                            <WorkFragment
                                key={_id}
                                id={_id}
                                title={title}
                                company={company}
                                dateFrom={start_date}
                                dateTo={end_date}
                                description={description}
                                photoURL=""
                                current={current}
                                profileView={profileView}
                            />
                        )
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
