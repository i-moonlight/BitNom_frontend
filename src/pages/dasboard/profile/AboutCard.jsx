import { Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import { Button } from '../../../components/Button';
import AboutForm from './forms/AboutForm';

export default function AboutCard({ profile, profileView }) {
    const [showForm, setShowForm] = useState(false);

    const onClose = () => {
        setShowForm(false);
    };

    return (
        <Card className="mb-3">
            <CardContent>
                <div className="space-between center-horizontal">
                    <Typography>About</Typography>
                    {!profileView && !showForm && (
                        <Button
                            textCase
                            variant="text"
                            // startIcon={profile?.bio ? <EditRounded /> : <AddRounded />}
                            onClick={() => setShowForm(true)}
                        >
                            Edit Bio
                        </Button>
                    )}
                </div>
                {showForm && (
                    <AboutForm
                        onClose={onClose}
                        updateData={{ bio: profile?.bio }}
                    />
                )}
                {!showForm && (
                    <Typography
                        style={{
                            overflowWrap: 'break-word',
                            wordWrap: 'break-word',
                        }}
                        variant="body2"
                        className="mt-2"
                    >
                        {profile?.bio}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}
