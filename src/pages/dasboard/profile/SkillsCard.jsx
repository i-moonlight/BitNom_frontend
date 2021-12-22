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
import { useEffect, useState } from 'react';
import { Button } from '../../../components/Button';
import {
    MUTATION_ADD_SKILL,
    MUTATION_REMOVE_SKILL,
    QUERY_FETCH_PROFILE,
} from './utilities/profile.queries';
import { useStyles } from './utilities/profile.styles';

export default function SkillsCard({ profile, profileView }) {
    const [text, setText] = useState('');
    const [skillErr, setSkillErr] = useState(null);
    const theme = useTheme();
    const classes = useStyles();
    const skills = profile?.skills;

    const [
        addSkill,
        {
            //addError,
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

    useEffect(() => {
        text.length > 20
            ? setSkillErr('Skill should be 20 chars max')
            : setSkillErr(null);
    }, [text.length]);

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
                                            //  if (text.length < 5) return;
                                            addSkill({
                                                variables: {
                                                    data: { name: text },
                                                },
                                                errorPolicy: 'all',
                                                refetchQueries: [
                                                    {
                                                        query: QUERY_FETCH_PROFILE,
                                                        context: {
                                                            clientName: 'users',
                                                        },
                                                    },
                                                ],
                                            }).then(({ data, errors }) => {
                                                if (data) {
                                                    setText('');
                                                    setSkillErr(null);
                                                }
                                                if (errors) {
                                                    setSkillErr(
                                                        errors[0]?.state
                                                            ?.skill[0]
                                                    );
                                                }
                                            });
                                        }}
                                        disabled={addLoading}
                                        size="small"
                                        className="my-1"
                                        textCase
                                    >
                                        Add
                                    </Button>
                                }
                            />
                        </Paper>
                        {skillErr && (
                            <Typography
                                variant="body2"
                                className="mt-2 mb-2"
                                color="error"
                            >
                                {skillErr}
                            </Typography>
                        )}
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
                            onDelete={
                                !profileView
                                    ? () =>
                                          removeSkill({
                                              variables: {
                                                  id: _id,
                                              },
                                              refetchQueries: [
                                                  {
                                                      query: QUERY_FETCH_PROFILE,
                                                      context: {
                                                          clientName: 'users',
                                                      },
                                                  },
                                              ],
                                          })
                                    : undefined
                            }
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
