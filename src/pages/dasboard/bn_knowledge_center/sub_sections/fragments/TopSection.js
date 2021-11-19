import { Card, CardContent, Switch, Typography } from '@mui/material';
import { useState } from 'react';

export default function TopSection() {
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const borders = {
        market: { borderLeft: '5px solid red', minWidth: '200px' },
        volume: { borderLeft: '5px solid green', minWidth: '200px' },
        carp: { borderLeft: '5px solid blue', minWidth: '200px' },
        nft: { borderLeft: '5px solid yellow', minWidth: '200px' },
        coins: { borderLeft: '5px solid purple', minWidth: '200px' },
    };

    return (
        <>
            <section>
                <div className="my-2">
                    <div className="m-3">
                        <Typography
                            variant="h5"
                            color="textPrimary"
                            className="fw-bold"
                            component="div"
                        >
                            Cryptocurrency Prices by Market Cap
                            <small style={{ fontSize: '12px' }}>
                                <Switch
                                    checked={checked}
                                    onChange={handleChange}
                                    inputProps={{
                                        'aria-label': 'controlled',
                                    }}
                                />
                                Show Status
                            </small>
                        </Typography>
                        <Typography color="textPrimary">
                            The global cryptocurrency market cap today is $2.08
                            Trillion, a
                            <span className="text-danger"> -1.1% </span> change
                            in the last 24 hours <a href={'#'}>Read More</a>
                        </Typography>
                    </div>
                </div>
            </section>
            {/*Cards Being Checked*/}
            {checked && (
                <section className="d-lg-flex d-md-flex d-sm-block flex-row justify-content-between">
                    <div className="m-3">
                        <Card style={borders.market}>
                            <CardContent>
                                <Typography component="div" variant="caption">
                                    <div className="float-md-right">
                                        <span className="text-danger float-end">
                                            -4.9 %
                                        </span>
                                        <br />
                                        <br />
                                        <h6>
                                            <strong>$1,964,164,087,420</strong>
                                        </h6>
                                        <span>Market Capitalization</span>
                                    </div>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="m-3">
                        <Card
                            variant="contained"
                            color="primary"
                            style={borders.volume}
                        >
                            <CardContent>
                                <Typography component="div" variant="caption">
                                    <div className="float-md-right">
                                        <span className="text-danger float-end">
                                            {' '}
                                            -4.9 %
                                        </span>
                                        <br />
                                        <br />
                                        <h6>
                                            <strong>$1,964,164,087,420</strong>
                                        </h6>
                                        <span>24h Trading Volume</span>
                                    </div>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="m-3">
                        <Card
                            variant="contained"
                            color="primary"
                            style={borders.carp}
                        >
                            <CardContent>
                                <Typography component="div" variant="caption">
                                    <div className="float-md-right">
                                        <span className="text-info float-end">
                                            Bitcoin
                                        </span>
                                        <br />
                                        <br />
                                        <h6>
                                            <strong>42.84%</strong>
                                        </h6>
                                        <span>Market Carp Dominance</span>
                                    </div>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="m-3">
                        <Card
                            variant="contained"
                            color="primary"
                            style={borders.nft}
                        >
                            <CardContent>
                                <Typography component="div" variant="caption">
                                    <div>
                                        <br />
                                        <br />
                                        <h6>
                                            <strong>456</strong>
                                        </h6>
                                        <span>NFT available</span>
                                    </div>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="m-3">
                        <Card
                            variant="contained"
                            color="primary"
                            style={borders.coins}
                        >
                            <CardContent>
                                <Typography component="div" variant="caption">
                                    <div>
                                        <br />
                                        <br />
                                        <h6>
                                            <strong>9,076</strong>
                                        </h6>
                                        <span>Available Coins</span>
                                    </div>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            )}
            ;
        </>
    );
}
