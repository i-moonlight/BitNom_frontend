import { useMutation } from '@apollo/client';
import {
    AssignmentIndOutlined,
    CalendarTodayOutlined,
    CameraAltRounded,
    Language,
    PeopleRounded,
    StarRounded,
    StorageRounded,
    TimelineRounded,
} from '@mui/icons-material';
import { Card, CardContent, Snackbar, Typography } from '@mui/material';
import { DropzoneArea } from 'react-mui-dropzone';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/Button';
import { useDispatch } from 'react-redux';
import { QUERY_FETCH_PROFILE } from '../utilities/queries';
import ProfileForm from './forms/ProfileForm';
import { setUpdateUser } from '../../../store/actions/userUpdateActions';
import { MUTATION_UPDATE_PROFILE } from './utilities/profile.queries';

export default function ProfileCard({ profile, profileView }) {
    const [showForm, setShowForm] = useState(false);
    const [profilePreviewURL, setProfilePreviewURL] = useState(null);
    const [coverPreviewURL, setCoverPreviewURL] = useState(null);
    const dispatch = useDispatch();
    const onClose = () => {
        setShowForm(false);
    };

    const [updateUser] = useMutation(MUTATION_UPDATE_PROFILE, {
        context: { clientName: 'users' },
    });

    useEffect(() => {
        if (profile?.profile_pic) {
            setProfilePreviewURL(
                process.env.REACT_APP_BACKEND_URL + profile?.profile_pic
            );
        }
        if (profile?.cover_pic) {
            setCoverPreviewURL(
                process.env.REACT_APP_BACKEND_URL + profile?.cover_pic
            );
        }
    }, [profile?.profile_pic, profile?.cover_pic]);

    const handleUpdateProfilePic = (pic) => {
        if (!pic) return;
        updateUser({
            variables: {
                data: {
                    profile_pic: pic,
                },
            },
            refetchQueries: [
                {
                    query: QUERY_FETCH_PROFILE,
                    context: {
                        clientName: 'users',
                    },
                },
            ],
        }).then(({ data }) => {
            const userData = data?.Users?.update;
            data?.Users?.update && dispatch(setUpdateUser(userData));
        });
    };

    const handleUpdateCoverPic = (cover) => {
        if (!cover) return;
        updateUser({
            variables: {
                data: {
                    cover_pic: cover,
                },
            },
            refetchQueries: [
                {
                    query: QUERY_FETCH_PROFILE,
                    context: {
                        clientName: 'users',
                    },
                },
            ],
        }).then(({ data }) => {
            const userData = data?.Users?.update;
            data?.Users?.update && dispatch(setUpdateUser(userData));
        });
    };

    return (
        <div>
            <Card className="mb-3" variant={'outlined'}>
                <div
                    className="d-flex align-items-center justify-content-center "
                    style={{
                        height: 120,
                        backgroundColor: 'transparent',
                        width: '100%',
                        cursor: 'pointer',
                        position: 'absolute',
                    }}
                ></div>
                <div
                    style={{
                        backgroundImage:
                            coverPreviewURL && `url('${coverPreviewURL}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: '#aaa',
                    }}
                >
                    <DropzoneArea
                        dropzoneClass="cover-upload-dropzone"
                        clearOnUnmount
                        Icon={CameraAltRounded}
                        dropzoneText={' '}
                        acceptedFiles={['image/jpeg', 'image/png']}
                        maxFileSize={2500000}
                        filesLimit={1}
                        showAlerts={['error']}
                        showPreviews={false}
                        showPreviewsInDropzone={false}
                        previewGridProps={{
                            container: { spacing: 1, direction: 'row' },
                        }}
                        onChange={(files) => {
                            if (files.length < 1) return;
                            setCoverPreviewURL(URL.createObjectURL(files[0]));
                            handleUpdateCoverPic(files[0]);
                        }}
                    />
                </div>

                <CardContent
                    style={{
                        position: 'relative',
                        top: -60,
                        marginBottom: -60,
                    }}
                >
                    <div className="d-flex">
                        <div>
                            <div
                                className="c-pointer"
                                variant="rounded"
                                style={{
                                    backgroundImage:
                                        profilePreviewURL &&
                                        `url('${profilePreviewURL}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundColor: 'transparent',
                                    marginRight: 12,
                                    width: 80,
                                    height: 80,
                                }}
                            >
                                <DropzoneArea
                                    dropzoneClass="profile-upload-dropzone"
                                    clearOnUnmount
                                    onChange={(files) => {
                                        if (files.length < 1) return;
                                        setProfilePreviewURL(
                                            URL.createObjectURL(files[0])
                                        );
                                        handleUpdateProfilePic(files[0]);
                                    }}
                                    Icon={CameraAltRounded}
                                    dropzoneText={false}
                                    acceptedFiles={['image/*']}
                                    maxFileSize={5000000}
                                    filesLimit={1}
                                    showAlerts={['error']}
                                    showPreviews={false}
                                    showPreviewsInDropzone={false}
                                    previewGridProps={{
                                        container: {
                                            spacing: 1,
                                            direction: 'row',
                                        },
                                    }}
                                />
                            </div>
                            <Typography className="pt-1" variant="body2">
                                {profile?.displayName}
                            </Typography>
                            <Typography
                                gutterBottom
                                color="textSecondary"
                                variant="body2"
                            >
                                {`@${profile?._id}`}
                            </Typography>
                        </div>

                        <div
                            style={{
                                flex: 1,
                                position: 'relative',
                                top: 60,
                            }}
                            className="space-between"
                        >
                            <Typography
                                className="text-success"
                                variant="body2"
                            >
                                Online
                            </Typography>
                            {!profileView && !showForm && (
                                <div>
                                    <Button
                                        variant="text"
                                        textCase
                                        onClick={() => setShowForm(true)}
                                    >
                                        Edit Profile
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        {showForm && (
                            <ProfileForm
                                onClose={onClose}
                                updateData={{
                                    displayName: profile?.displayName,
                                    website: profile?.website,
                                    portfolio: profile?.portfolio,
                                }}
                            />
                        )}
                    </div>
                    <div className="my-4 center-horizontal">
                        <Button
                            className="me-2"
                            startIcon={<CalendarTodayOutlined />}
                            textCase
                            variant="text"
                            color="inherit"
                        >
                            Joined {moment(profile?.date).format('LL')}
                        </Button>
                        <Button
                            className="me-2"
                            startIcon={<Language />}
                            textCase
                            variant="text"
                            color="inherit"
                        >
                            {profile?.website || 'Website'}
                        </Button>
                        <Button
                            className="me-2"
                            startIcon={<AssignmentIndOutlined />}
                            textCase
                            variant="text"
                            color="inherit"
                        >
                            {profile?.portfolio || 'Portfolio'}
                        </Button>
                    </div>
                    <div className="my-4 space-between">
                        <IconInfo
                            icon={<StarRounded />}
                            value={profile?.reputation}
                            text="Reputation"
                        />
                        <IconInfo
                            icon={<StorageRounded />}
                            value={profile?.bnTokens?.earned}
                            text="BN Token"
                        />
                        <IconInfo
                            icon={<TimelineRounded />}
                            value={'$' + (profile?.earnings || '0')}
                            text="Earnings"
                        />
                        <IconInfo
                            icon={<PeopleRounded />}
                            value={profile?.connections}
                            text="Connections"
                        />
                    </div>
                </CardContent>
            </Card>
            <Snackbar>Uploaded</Snackbar>
        </div>
    );
}

const IconInfo = ({ icon, text, value }) => (
    <div>
        <Typography
            variant="body2"
            style={{
                marginRight: 16,
            }}
        >
            <span className="center-horizontal">
                <span className="mx-1">{value}</span>
                {icon}
            </span>
        </Typography>
        <Typography variant="body2">{text}</Typography>
    </div>
);
