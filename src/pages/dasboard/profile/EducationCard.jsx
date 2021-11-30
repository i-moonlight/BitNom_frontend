import { AddRounded } from '@mui/icons-material';
import { Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import { Button } from '../../../components/Button';
import EducationForm from './forms/EducationForm';
import EducationFragment from './fragments/EducationFragment';

export default function EducationCard({ profile, profileView }) {
    const [showForm, setShowForm] = useState(false);
    const education = profile?.education;

    const onClose = () => {
        setShowForm(false);
    };

    return (
        <Card className="mb-3">
            <CardContent>
                <div className="space-between center-horizontal">
                    <Typography>Education</Typography>
                    {!showForm && !profileView && (
                        <Button
                            onClick={() => setShowForm(true)}
                            textCase
                            variant="text"
                            startIcon={<AddRounded />}
                        >
                            Add Education
                        </Button>
                    )}
                </div>
                <div>
                    {showForm && <EducationForm onClose={onClose} />}
                    {education?.map(
                        ({
                            _id,
                            institution,
                            major,
                            start_date,
                            end_date,
                            current,
                            description,
                        }) => (
                            <EducationFragment
                                key={_id}
                                id={_id}
                                current={current}
                                institution={institution}
                                major={major}
                                dateFrom={start_date}
                                dateTo={end_date}
                                description={description}
                                photoURL=""
                                profileView={profileView}
                            />
                        )
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
