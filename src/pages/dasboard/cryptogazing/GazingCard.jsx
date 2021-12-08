import {
    ArrowDownward,
    Close,
    Favorite,
    Forum,
    Replay,
    Star,
} from '@mui/icons-material';
import {
    Avatar,
    Card,
    Divider,
    Fab,
    IconButton,
    LinearProgress,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import * as React from 'react';
import { Fragment } from 'react';
import { Button } from '../../../components/Button';

const GazingCard = ({
    coin = {},
    onLike,
    onDislike,
    coin_index,
    undo,
    show_back,
}) => {
    return (
        <Fragment>
            {coin && (
                <Card
                    className="gazing-card"
                    style={{
                        minHeight: 'calc(51vh - 65px)',
                        marginTop: '5px',
                        zIndex: coin_index,
                    }}
                >
                    <CardContent>
                        <div className="d-flex flex-row justify-content-between mb-3">
                            <Avatar src={coin?.image || coin?.image?.large} />
                            <IconButton>
                                <Star />
                            </IconButton>
                        </div>

                        <div className="d-flex align-items-center">
                            <Button
                                color="#00ff00"
                                size="small"
                                className="me-2"
                                textCase
                            >
                                Rank #{coin?.coin_index}
                            </Button>
                            <Button size="small" className="me-2" textCase>
                                Coin
                            </Button>
                            <Button size="small" className="me-2" textCase>
                                On{' '}
                                {Math.floor(
                                    Math.random() * 100000
                                ).toLocaleString()}{' '}
                                Watchlists
                            </Button>
                        </div>

                        <div className="mt-3">
                            <Typography>
                                {coin?.name} ( {coin?.symbol?.toUpperCase()} )
                            </Typography>
                            <div className="d-flex justify-content-between">
                                <Typography variant="h5">
                                    $ {coin?.current_price?.toLocaleString()}
                                </Typography>
                                <Button
                                    size="small"
                                    startIcon={<ArrowDownward />}
                                >
                                    {coin?.price_change_percentage_24h}%
                                </Button>
                            </div>
                        </div>

                        <div className="mt-3 mb-1">
                            <LinearProgress
                                variant="determinate"
                                value={20}
                                max={60}
                            />
                        </div>

                        <div className="d-flex justify-content-between mb-4">
                            <Typography>Low:</Typography>
                            <Typography>High:</Typography>
                        </div>

                        {/* <Divider /> */}

                        <List>
                            <ListItem divider>
                                <ListItemText primary="Price Change 24hrs" />
                                <ListItemSecondaryAction>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        ${'123456'?.toLocaleString()}
                                    </Typography>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem divider>
                                <ListItemText primary="Market Cap" />
                                <ListItemSecondaryAction>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        ${'123456'?.toLocaleString()}
                                    </Typography>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem divider>
                                <ListItemText primary="Volume" />
                                <ListItemSecondaryAction>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        ${'123456'?.toLocaleString()}
                                    </Typography>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem divider>
                                <ListItemText primary="Fully Diluted Market Cap" />
                                <ListItemSecondaryAction>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        ${'123456'?.toLocaleString()}
                                    </Typography>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem divider>
                                <ListItemText primary="Available Supply" />
                                <ListItemSecondaryAction>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        ${'123456'?.toLocaleString()}
                                    </Typography>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Total Supply" />
                                <ListItemSecondaryAction>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        ${'123456'?.toLocaleString()}
                                    </Typography>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            )}
        </Fragment>
    );
};

export default GazingCard;
