import { useMutation } from '@apollo/client';
import {
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Grid,
    Modal,
    Typography,
} from '@mui/material';
import React from 'react';
import { Button } from '../../../../components/Button';
import { REPORT_USER } from '../graphql/queries';

export default function ReportUserModal({
    openReportUserModal,
    setReportUserModalOpen,
    otherUser,
}) {
    const [reportUser] = useMutation(REPORT_USER, {
        variables: '',
    });
    const handleReport = () => {
        reportUser();
        setReportUserModalOpen(false);
    };
    return (
        <Modal
            data={otherUser}
            style={{
                outline: 'none',

                '&:focusVisible': {
                    outline: 'none',
                },
            }}
            className="center-horizontal center-vertical w-100"
            open={openReportUserModal}
        >
            {' '}
            <Grid container>
                {' '}
                <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    {' '}
                    <div>
                        {' '}
                        <Card>
                            <CardHeader>
                                <Typography>
                                    Report {otherUser?.info?._id?.displayName} ?
                                </Typography>
                            </CardHeader>
                            <CardContent>reporting this user</CardContent>
                            <CardActionArea>
                                <Button
                                    onClick={() =>
                                        setReportUserModalOpen(false)
                                    }
                                >
                                    Cancel
                                </Button>
                                <Button onClick={handleReport}>Report</Button>
                            </CardActionArea>
                        </Card>
                    </div>
                </Grid>
                <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
            </Grid>
        </Modal>
    );
}
