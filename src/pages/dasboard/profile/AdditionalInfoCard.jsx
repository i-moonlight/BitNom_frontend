import { AddRounded } from '@mui/icons-material';
import {
    Card,
    CardContent,
    Divider,
    MenuItem,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { Button } from '../../../components/Button';
import AditionalInfoForm from './forms/AditionalInfoForm';
import GenderForm from './forms/GenderForm';
import LanguagesForm from './forms/LanguagesForm';

export default function AdditionalInfoCard({ profile, profileView }) {
    const [showForm, setShowForm] = useState(false);
    const [showFormMenu, setShowFormMenu] = useState(false);
    const [formType, setFormType] = useState('course');
    const courses = profile?.courses;
    const projects = profile?.projects;
    const languages = profile?.languages;
    const gender = profile?.gender;

    const onClose = () => {
        setShowForm(false);
    };

    return (
        <Card className="mb-3">
            <CardContent>
                <div className="space-between center-horizontal mb-2">
                    <Typography>Additional Information (Optional)</Typography>
                    {!showForm && !profileView && (
                        <Button
                            onClick={() => {
                                setShowFormMenu(!showFormMenu);
                            }}
                            startIcon={<AddRounded />}
                            variant="text"
                            color="primary"
                            size="small"
                            className="m-1 p-1"
                            textCase
                        >
                            Edit
                            <Card
                                style={{
                                    position: 'absolute',
                                    top: 36,
                                    right: 0,
                                    visibility: showFormMenu
                                        ? 'visible'
                                        : 'hidden',
                                    zIndex: 12,
                                }}
                                variant="outlined"
                            >
                                <MenuItem
                                    //button
                                    onClick={() => {
                                        setFormType('course');
                                        setShowForm(true);
                                    }}
                                >
                                    Courses
                                </MenuItem>
                                <MenuItem
                                    //button
                                    onClick={() => {
                                        setFormType('project');
                                        setShowForm(true);
                                    }}
                                >
                                    Projects
                                </MenuItem>
                                <MenuItem
                                    //button
                                    onClick={() => {
                                        setFormType('language');
                                        setShowForm(true);
                                    }}
                                >
                                    Languages
                                </MenuItem>
                                <MenuItem
                                    //button
                                    onClick={() => {
                                        setFormType('gender');
                                        setShowForm(true);
                                    }}
                                >
                                    Gender
                                </MenuItem>
                            </Card>
                        </Button>
                    )}
                </div>
                {showForm && formType == 'gender' && (
                    <GenderForm onClose={onClose} profile={profile} />
                )}
                {showForm && formType == 'language' && (
                    <LanguagesForm onClose={onClose} profile={profile} />
                )}
                {showForm &&
                    formType !== 'gender' &&
                    formType !== 'language' && (
                        <AditionalInfoForm
                            onClose={onClose}
                            formType={formType}
                            profile={profile}
                        />
                    )}
                {!showForm && <Divider />}
                <div className="mt-3">
                    <SectionCard title="Courses" values={courses} />
                    <SectionCard title="Projects" values={projects} />
                    <SectionCard title="Languages" values={languages} />
                    <SectionCard
                        noNum
                        title="Gender"
                        values={gender || 'Unset'}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

const SectionCard = ({ values, title, noNum }) => {
    return (
        <div className="d-flex flex-row mb-3">
            <Typography
                style={{
                    visibility: noNum && 'hidden',
                }}
                variant="body2"
                color="primary"
                className="me-2"
            >
                {values?.length}
            </Typography>
            <div>
                <Typography gutterBottom variant="body2" color="primary">
                    {title}
                </Typography>
                <Typography variant="body2">
                    {noNum
                        ? values
                        : values?.map(({ name }, index) =>
                              index == values.length - 1
                                  ? name + ''
                                  : name + '  .  '
                          )}
                </Typography>
            </div>
        </div>
    );
};
