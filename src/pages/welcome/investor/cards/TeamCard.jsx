import { useTheme } from '@emotion/react';
import { CloseRounded, LinkedIn, MailRounded } from '@mui/icons-material';
import {
    Card,
    CardContent,
    Grid,
    IconButton,
    Modal,
    Typography,
} from '@mui/material';
import { useState } from 'react';

export default function TeamCard({ member, desc }) {
    const [descOpen, setDescOpen] = useState(false);
    const theme = useTheme();

    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                <Card
                    elevation={0}
                    style={{
                        backgroundColor: theme.palette.background.investorCards,
                    }}
                >
                    <CardContent>
                        <div className="d-flex">
                            {member?.image && (
                                <div
                                    className="w-25"
                                    style={{
                                        backgroundImage: `url('${member?.image}')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                ></div>
                            )}
                            <div className="d-flex flex-column  mx-3 w-100">
                                <Typography>{member?.name}</Typography>
                                <Typography color="primary">
                                    {member?.role}
                                </Typography>
                                <div className="mt-4 d-flex align-items-center justify-content-between w-100 ">
                                    <div>
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                member.socials.email?.length >
                                                    1 &&
                                                    window.open(
                                                        `mailto:${member.socials.email}`
                                                    );
                                            }}
                                        >
                                            <MailRounded />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                member.socials.linkedIn
                                                    ?.length > 1 &&
                                                    window.open(
                                                        `${member.socials.linkedIn}`,
                                                        '_blank'
                                                    );
                                            }}
                                        >
                                            <LinkedIn />
                                        </IconButton>
                                    </div>
                                    {desc && (
                                        <Typography
                                            color="primary"
                                            className="c-pointer"
                                            onClick={() => {
                                                setDescOpen(true);
                                            }}
                                        >
                                            Read more ...
                                        </Typography>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <DescriptionModal
                open={descOpen}
                content={member.desc}
                onClose={() => {
                    setDescOpen(false);
                }}
            />
        </>
    );
}

function DescriptionModal({ content, open, onClose }) {
    return (
        <Modal
            open={open}
            className="center-horizontal center-vertical w-100 "
            onClose={onClose}
        >
            <Grid container>
                <Grid item lg={3} md={2} sm={1} xs={1}></Grid>
                <Grid item lg={6} md={8} sm={10} xs={10}>
                    <Card>
                        <CardContent>
                            <div className="mx-2">
                                <div className="d-flex justify-content-end mb-2">
                                    <IconButton onClick={onClose}>
                                        <CloseRounded />
                                    </IconButton>
                                </div>
                                <Typography>{content}</Typography>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={3} md={2} sm={1} xs={1}></Grid>
            </Grid>
        </Modal>
    );
}
