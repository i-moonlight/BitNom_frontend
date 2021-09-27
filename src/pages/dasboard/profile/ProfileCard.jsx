import { useMutation } from '@apollo/client';
import { Card, CardContent, Snackbar, Typography } from '@material-ui/core';
import {
  AssignmentIndOutlined,
  CalendarTodayOutlined,
  CameraAltRounded,
  Language,
  PeopleRounded,
  StarRounded,
  StorageRounded,
  TimelineRounded,
} from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';
import moment from 'moment';
import React, { useState } from 'react';
import Button from '../../../components/Button';
import { QUERY_FETCH_PROFILE } from '../utilities/queries';
import ProfileForm from './forms/ProfileForm';
import { MUTATION_UPDATE_PROFILE } from './utilities/profile.queries';

export default function ProfileCard({ profile, profileView }) {
  const [showForm, setShowForm] = useState(false);
  const [coverImage, setCoverImage] = useState();
  const [profileImage, setProfileImage] = useState();

  const onClose = () => {
    setShowForm(false);
  };

  const [
    updateUser,
    {
      // updateError,
      //  data,
      updateLoading,
    },
  ] = useMutation(MUTATION_UPDATE_PROFILE, {
    context: { clientName: 'users' },
  });

  console.log(updateLoading);

  return (
    <div>
      <Card className='mb-3' variant={'outlined'}>
        <div
          className='d-flex align-items-center justify-content-center '
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
              coverImage && `url('${URL.createObjectURL(coverImage)}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#aaa',
          }}
        >
          <DropzoneArea
            dropzoneClass='cover-upload-dropzone'
            clearOnUnmount
            Icon={CameraAltRounded}
            dropzoneText={' '}
            acceptedFiles={['image/*']}
            maxFileSize={5000000}
            filesLimit={1}
            showAlerts={['error']}
            showPreviews={false}
            showPreviewsInDropzone={false}
            previewGridProps={{
              container: { spacing: 1, direction: 'row' },
            }}
            onChange={files => {
              setCoverImage(files[0]);

              const IUpdateUser = {
                cover_pic: files[0],
              };

              updateUser({
                variables: {
                  data: IUpdateUser,
                },
                refetchQueries: [
                  {
                    query: QUERY_FETCH_PROFILE,
                    context: { clientName: 'users' },
                  },
                ],
              }).then(() => {
                // resetForm();
                onClose();
              });
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
          <div className='d-flex'>
            <div>
              <div
                className='c-pointer'
                variant='rounded'
                style={{
                  backgroundImage:
                    profileImage &&
                    `url('${URL.createObjectURL(profileImage)}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: 'transparent',
                  marginRight: 12,
                  width: 80,
                  height: 80,
                }}
              >
                <DropzoneArea
                  dropzoneClass='profile-upload-dropzone'
                  clearOnUnmount
                  onChange={files => {
                    setProfileImage(files[0]);
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
                    container: { spacing: 1, direction: 'row' },
                  }}
                />
              </div>
              <Typography className='pt-1' variant='body2'>
                {profile?.displayName}
              </Typography>
              <Typography gutterBottom color='textSecondary' variant='body2'>
                {`@${profile?._id}`}
              </Typography>
            </div>

            <div
              style={{
                flex: 1,
                position: 'relative',
                top: 60,
              }}
              className='space-between'
            >
              <Typography className='text-success' variant='body2'>
                Online
              </Typography>
              {!profileView && !showForm && (
                <div>
                  <Button
                    variant='text'
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
          <div className='my-4 center-horizontal'>
            <Button
              className='me-2'
              startIcon={<CalendarTodayOutlined />}
              textCase
              variant='text'
              color='inherit'
            >
              Joined {moment(profile?.date).format('LL')}
            </Button>
            <Button
              className='me-2'
              startIcon={<Language />}
              textCase
              variant='text'
              color='inherit'
            >
              {profile?.website || 'Website'}
            </Button>
            <Button
              className='me-2'
              startIcon={<AssignmentIndOutlined />}
              textCase
              variant='text'
              color='inherit'
            >
              {profile?.portfolio || 'Portfolio'}
            </Button>
          </div>
          <div className='my-4 space-between'>
            <IconInfo
              icon={<StarRounded />}
              value={profile?.reputation}
              text='Reputation'
            />
            <IconInfo
              icon={<StorageRounded />}
              value={profile?.bnTokens?.earned}
              text='BN Token'
            />
            <IconInfo
              icon={<TimelineRounded />}
              value={'$' + (profile?.earnings || '0')}
              text='Earnings'
            />
            <IconInfo
              icon={<PeopleRounded />}
              value={profile?.connections}
              text='Connections'
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
      variant='body2'
      style={{
        marginRight: 16,
      }}
    >
      <span className='center-horizontal'>
        <span className='mx-1'>{value}</span>
        {icon}
      </span>
    </Typography>
    <Typography variant='body2'>{text}</Typography>
  </div>
);
