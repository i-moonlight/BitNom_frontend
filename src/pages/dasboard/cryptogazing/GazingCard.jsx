import {
    ArrowDropDown,
    ArrowDropUp,
    ChatBubble,
    Close,
    Favorite,
    Star,
} from '@mui/icons-material';
import {
    Avatar,
    Card,
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

const GazingCard = ({ coin, onNext }) => {
    return (
        <Fragment>
            {coin && (
                <div className="gazing-card">
                    <Card
                        style={{
                            minHeight: 'calc(51vh - 65px)',
                            marginTop: '5px',
                        }}
                    >
                        <CardContent>
                            <div className="d-flex flex-row justify-content-between mb-3">
                                <Avatar
                                    src={coin?.image || coin?.image?.large}
                                />
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
                                    {coin?.name} ( {coin?.symbol?.toUpperCase()}{' '}
                                    )
                                </Typography>
                                <div className="d-flex justify-content-between">
                                    <Typography variant="h5">
                                        ${' '}
                                        {coin?.current_price?.toLocaleString()}
                                    </Typography>
                                    <Button
                                        size="small"
                                        startIcon={
                                            coin?.price_change_percentage_24h >
                                            0 ? (
                                                <ArrowDropUp />
                                            ) : (
                                                <ArrowDropDown />
                                            )
                                        }
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
                                <Typography variant="body2">
                                    Low: $
                                    {coin?.high_24h?.toLocaleString() || ' --'}
                                </Typography>
                                <Typography variant="body2">
                                    High: $
                                    {coin?.low_24h?.toLocaleString() || ' --'}
                                </Typography>
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
                                            $
                                            {coin?.price_change_24h?.toLocaleString() ||
                                                ' --'}
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
                                            $
                                            {coin?.market_cap?.toLocaleString() ||
                                                ' --'}
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
                                            $
                                            {coin?.total_volume?.toLocaleString() ||
                                                ' --'}
                                        </Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem divider>
                                    <ListItemText primary="Fully Diluted Mkt Cap" />
                                    <ListItemSecondaryAction>
                                        <Typography
                                            color="textSecondary"
                                            variant="body2"
                                        >
                                            $
                                            {coin?.fully_diluted_valuation?.toLocaleString() ||
                                                ' --'}
                                        </Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem divider>
                                    <ListItemText primary="Max Supply" />
                                    <ListItemSecondaryAction>
                                        <Typography
                                            color="textSecondary"
                                            variant="body2"
                                        >
                                            $
                                            {coin?.max_supply?.toLocaleString() ||
                                                ' --'}
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
                                            $
                                            {coin?.total_supply?.toLocaleString() ||
                                                ' --'}
                                        </Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                    <Card className="my-2">
                        <div className="w-100 px-4 py-3">
                            <div className="d-flex justify-content-between w-100">
                                <IconButton
                                    className="morph-outer"
                                    onClick={onNext}
                                >
                                    <Close />
                                </IconButton>

                                <IconButton className="morph-outer">
                                    <Favorite />
                                </IconButton>

                                <IconButton className="morph-outer">
                                    <ChatBubble />
                                </IconButton>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </Fragment>
    );
};

export default GazingCard;
