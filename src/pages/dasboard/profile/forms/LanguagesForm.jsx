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
import { Button } from '../../../../components/Button';
import {
    MUTATION_ADD_LANGUAGE,
    MUTATION_REMOVE_LANGUAGE,
    QUERY_FETCH_PROFILE,
} from '../utilities/profile.queries';
import { useStyles } from '../utilities/profile.styles';

export default function LanguagesForm({ onClose, profile }) {
    const [text, setText] = useState('');
    false;
    const [langErr, setLangErr] = useState(null);
    const classes = useStyles();
    const theme = useTheme();
    const languages = profile?.languages;

    const [
        addLanguage,
        {
            // addError,
            // data,
            addLoading,
        },
    ] = useMutation(MUTATION_ADD_LANGUAGE, {
        context: { clientName: 'users' },
    });

    const [
        removeLanguage,
        {
            // removeError,
            // data,
            removeLoading,
        },
    ] = useMutation(MUTATION_REMOVE_LANGUAGE, {
        context: { clientName: 'users' },
    });

    useEffect(() => {
        text.length > 15
            ? setLangErr('Language should be 15 chars max')
            : setLangErr(null);
    }, [text.length]);

    return (
        <div className="mt-2">
            <Card className={classes.formCard}>
                <CardContent>
                    <Typography>Add Languages</Typography>

                    <Paper
                        variant={
                            theme.palette.mode == 'light'
                                ? 'outlined'
                                : 'elevation'
                        }
                        elevation={0}
                        component="form"
                        className={classes.paperSearchAlt}
                    >
                        <Search color="inherit" />
                        <InputBase
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className={classes.input}
                            placeholder='Search Language eg "English"'
                            inputProps={{ 'aria-label': 'search bitnorm' }}
                            endAdornment={
                                <Button
                                    onClick={() => {
                                        addLanguage({
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
                                                setLangErr(null);
                                            }
                                            if (errors) {
                                                setLangErr(
                                                    errors[0]?.state
                                                        ?.language[0]
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

                    <div className="mt-2">
                        {languages?.map(({ _id, name }) => (
                            <Chip
                                color="primary"
                                key={_id}
                                label={name}
                                className="me-2 mb-2"
                                disabled={removeLoading}
                                onDelete={() =>
                                    removeLanguage({
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
                                }
                            />
                        ))}
                    </div>

                    {langErr && (
                        <Typography
                            variant="body2"
                            className="mt-2 mb-2"
                            color="error"
                        >
                            {langErr}
                        </Typography>
                    )}

                    <div className="d-flex justify-content-end mt-2">
                        <Button
                            onClick={onClose}
                            color="inherit"
                            size="small"
                            variant="text"
                        >
                            Close
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
