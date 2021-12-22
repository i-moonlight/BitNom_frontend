import { AddRounded } from '@mui/icons-material';
import { Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import { Button } from '../../../components/Button';
import HonorForm from './forms/HonorForm';
import HonorFragment from './fragments/HonorFragment';

export default function HonorCard({ profile, profileView }) {
    const [showForm, setShowForm] = useState(false);
    // TODO: Rename Honors
    const honors = profile?.honors || [];
    //const honors = [];

    const onClose = () => {
        setShowForm(false);
    };

    return (
        <Card className="mb-3">
            <CardContent>
                <div className="space-between center-horizontal">
                    <Typography>Honors and Awards</Typography>
                    {!showForm && !profileView && (
                        <Button
                            onClick={() => setShowForm(true)}
                            textCase
                            variant="text"
                            startIcon={<AddRounded />}
                        >
                            Add Honors and Awards
                        </Button>
                    )}
                </div>
                <div>
                    {showForm && <HonorForm onClose={onClose} />}
                    {honors?.map(
                        ({
                            _id,
                            organization,
                            name,
                            start_date,
                            end_date,
                            expires,
                            url,
                        }) => (
                            <HonorFragment
                                key={_id}
                                id={_id}
                                name={name}
                                organization={organization}
                                dateFrom={start_date}
                                dateTo={end_date}
                                expires={expires}
                                url={url}
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
