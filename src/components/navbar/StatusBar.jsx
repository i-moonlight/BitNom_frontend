import {
    Brightness4Rounded,
    Brightness7Rounded,
    ChevronRight,
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Container,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../store/actions/themeActions';
import { Button } from '../Button';
import { status } from '../utilities/data.components';
import { useStyles } from '../utilities/styles.components';

export default function StatusBar() {
    const palette = useSelector((st) => st.theme.palette);
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const smDown = useMediaQuery('(max-width:959px)');

    return (
        <Box className={classes.root}>
            <Container maxWidth="lg">
                <div className={classes.statusBar}>
                    <div
                        className="scroll-hidden"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            overflowX: 'auto',
                            // minHeight: 36,
                        }}
                    >
                        {status.map(({ title, value }) => (
                            <div key={`${Math.random() * 1000}`}>
                                <Typography
                                    className="fw-bold"
                                    variant="body2"
                                    color="textSecondary"
                                    key={title}
                                    style={{ marginRight: 16 }}
                                    noWrap
                                >
                                    {title}:{' '}
                                    <span className="text-link">{value}</span>
                                </Typography>
                            </div>
                        ))}
                    </div>
                    {!smDown && (
                        <>
                            <div className="center-horizontal">
                                <Button
                                    className="py-0 mx-1 my-1 fw-bold"
                                    textCase
                                    variant="text"
                                    endIcon={
                                        <ChevronRight
                                            style={{
                                                transform: 'rotateZ(90deg)',
                                            }}
                                        />
                                    }
                                >
                                    English
                                </Button>
                                <Button
                                    className="py-0 mx-1 my-1 fw-bold"
                                    textCase
                                    variant="text"
                                    endIcon={
                                        <ChevronRight
                                            style={{
                                                transform: 'rotateZ(90deg)',
                                            }}
                                        />
                                    }
                                >
                                    <Avatar
                                        style={{
                                            height: 20,
                                            width: 20,
                                            background: '#0F986E',
                                            marginRight: 8,
                                            color: theme.palette.text.primary,
                                        }}
                                        variant="rounded"
                                    >
                                        <Typography variant="body2">
                                            $
                                        </Typography>
                                    </Avatar>{' '}
                                    USD
                                </Button>

                                <IconButton
                                    size="small"
                                    className="m-1 p-1"
                                    onClick={() => {
                                        palette === 'light'
                                            ? dispatch(changeTheme('dark'))
                                            : dispatch(changeTheme('light'));
                                    }}
                                >
                                    {palette === 'light' ? (
                                        <Brightness4Rounded
                                            style={{
                                                width: 20,
                                                height: 20,
                                            }}
                                        />
                                    ) : (
                                        <Brightness7Rounded
                                            style={{
                                                width: 20,
                                                height: 20,
                                            }}
                                        />
                                    )}
                                </IconButton>
                            </div>
                        </>
                    )}
                </div>
            </Container>
        </Box>
    );
}
