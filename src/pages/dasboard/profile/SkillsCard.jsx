import { useMutation } from '@apollo/client';
import { Search } from '@mui/icons-material';
import {
    Card,
    CardContent,
    Chip,
    InputBase,
    Paper,
    Typography,
    useTheme,
} from '@mui/material';
import { useState } from 'react';
import { Button } from '../../../components/Button';
import {
    MUTATION_ADD_SKILL,
    MUTATION_REMOVE_SKILL,
    QUERY_FETCH_PROFILE,
} from './utilities/profile.queries';
import { useStyles } from './utilities/profile.styles';

export default function SkillsCard({ profile, profileView }) {
    const [text, setText] = useState('');
    const theme = useTheme();
    const classes = useStyles();
    const skills = profile?.skills;

    const [
        addSkill,
        {
            // addError,
            // data,
            addLoading,
        },
    ] = useMutation(MUTATION_ADD_SKILL, {
        context: { clientName: 'users' },
    });

    const [
        removeSkill,
        {
            // removeError,
            // data,
            removeLoading,
        },
    ] = useMutation(MUTATION_REMOVE_SKILL, {
        context: { clientName: 'users' },
    });

    return (
        <Card className="mb-3">
            <CardContent>
                <div>
                    <Typography>{!profileView && 'Your'} Skills</Typography>
                </div>

                {!profileView && (
                    <>
                        <Paper
                            variant={
                                theme.palette.mode == 'light'
                                    ? 'outlined'
                                    : 'elevation'
                            }
                            elevation={0}
                            component="form"
                            className={classes.paperSearch}
                        >
                            <Search color="inherit" />
                            <InputBase
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className={classes.input}
                                placeholder='Search Skill eg "Data Analyst"'
                                inputProps={{ 'aria-label': 'search bitnorm' }}
                                endAdornment={
                                    <Button
                                        onClick={() => {
                                            addSkill({
                                                variables: {
                                                    data: { name: text },
                                                },
                                                refetchQueries: [
                                                    {
                                                        query: QUERY_FETCH_PROFILE,
                                                        context: {
                                                            clientName: 'users',
                                                        },
                                                    },
                                                ],
                                            }).then(() => {
                                                setText('');
                                            });
                                        }}
                                        color="primary"
                                        size="small"
                                        className="my-1"
                                        textCase
                                        disabled={addLoading}
                                    >
                                        Add
                                    </Button>
                                }
                            />
                        </Paper>

                        <Typography
                            variant="body2"
                            className="mt-2 mb-2"
                            color="textSecondary"
                        >
                            You can add up to 30 skills
                        </Typography>
                    </>
                )}

                <div>
                    {skills?.map(({ _id, name }) => (
                        <Chip
                            color="primary"
                            key={_id}
                            label={name}
                            className="me-2 mb-2"
                            disabled={removeLoading}
                            onDelete={() =>
                                removeSkill({
                                    variables: {
                                        id: _id,
                                    },
                                    refetchQueries: [
                                        {
                                            query: QUERY_FETCH_PROFILE,
                                            context: { clientName: 'users' },
                                        },
                                    ],
                                })
                            }
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
