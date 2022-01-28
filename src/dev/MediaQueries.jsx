import { ArrowDropDown, DeveloperBoard } from '@mui/icons-material';
import {
    Card,
    CardContent,
    Chip,
    Fab,
    Typography,
    useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';

export default function MediaQueries() {
    const [expanded, setExpanded] = useState(false);

    const xsUp = useMediaQuery('(min-width:10px)');
    const xsDown = useMediaQuery('(max-width:599px)');
    const smUp = useMediaQuery('(min-width:600px)');
    const smDown = useMediaQuery('(max-width:959px)');
    const mdUp = useMediaQuery('(min-width:960px)');
    const mdDown = useMediaQuery('(max-width:1279px)');
    const lgUp = useMediaQuery('(min-width:1280px)');
    const lgDown = useMediaQuery('(max-width:1400px)');

    const xs = useMediaQuery('(min-width:10px) and (max-width:599px)');
    const sm = useMediaQuery('(min-width:600px) and (max-width:959px)');
    const md = useMediaQuery('(min-width:960px)  and (max-width:1279px)');
    const lg = useMediaQuery('(min-width:1280px)');

    return (
        <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
            {!expanded ? (
                <Fab
                    size="small"
                    color="primary"
                    variant="extended"
                    className="text-capitalize"
                    onClick={() => setExpanded(true)}
                >
                    <DeveloperBoard sx={{ mr: 1 }} />
                    Dev
                </Fab>
            ) : (
                <Card>
                    <CardContent>
                        <div className="d-flex justify-content-end mb-2">
                            <Chip
                                label="Minimize"
                                onClick={() => setExpanded(false)}
                                onDelete={() => null}
                                deleteIcon={<ArrowDropDown />}
                            />
                        </div>

                        <div className="mb-2">
                            <Typography variant="body2">
                                Screen Width: {window.innerWidth}
                            </Typography>
                            <Typography variant="body2">
                                Screen Height: {window.innerHeight}
                            </Typography>
                        </div>

                        <div className="my-1">
                            <Chip
                                size="small"
                                className="me-2 mb-2"
                                label="xs"
                                variant={xs ? 'filled' : 'outlined'}
                                color="primary"
                            />
                            <Chip
                                size="small"
                                className="me-2 mb-2"
                                label="sm"
                                variant={sm ? 'filled' : 'outlined'}
                                color="primary"
                            />
                            <Chip
                                size="small"
                                className="me-2 mb-2"
                                label="md"
                                variant={md ? 'filled' : 'outlined'}
                                color="primary"
                            />
                            <Chip
                                size="small"
                                className="me-2 mb-2"
                                label="lg"
                                variant={lg ? 'filled' : 'outlined'}
                                color="primary"
                            />
                        </div>

                        <div className="my-1">
                            <Chip
                                size="small"
                                className="me-2 mb-2"
                                label="xsDown"
                                variant={xsDown ? 'filled' : 'outlined'}
                                color="primary"
                            />
                            <Chip
                                size="small"
                                className="me-2 mb-2"
                                label="xsUp"
                                variant={xsUp ? 'filled' : 'outlined'}
                                color="primary"
                            />
                        </div>

                        <div className="my-1">
                            <Chip
                                size="small"
                                className="me-2 mb-2"
                                label="smDown"
                                variant={smDown ? 'filled' : 'outlined'}
                                color="primary"
                            />
                            <Chip
                                size="small"
                                className="me-2 mb-2"
                                label="smUp"
                                variant={smUp ? 'filled' : 'outlined'}
                                color="primary"
                            />
                        </div>

                        <div className="my-1">
                            <Chip
                                size="small"
                                className="me-2 mb-2"
                                label="mdDown"
                                variant={mdDown ? 'filled' : 'outlined'}
                                color="primary"
                            />
                            <Chip
                                size="small"
                                className="me-2 mb-2"
                                label="mdUp"
                                variant={mdUp ? 'filled' : 'outlined'}
                                color="primary"
                            />
                        </div>

                        <div className="my-1">
                            <Chip
                                size="small"
                                className="me-2 mb-2"
                                label="lgDown"
                                variant={lgDown ? 'filled' : 'outlined'}
                                color="primary"
                            />
                            <Chip
                                size="small"
                                className="me-2 mb-2"
                                label="lgUp"
                                variant={lgUp ? 'filled' : 'outlined'}
                                color="primary"
                            />
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
