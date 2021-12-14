import { Typography } from '@mui/material';
import React from 'react';
import { Button } from '../../../../../../components/Button';

export default function Analysis() {
    return (
        <>
            <Typography color={'textPrimary'} component="div">
                <div className={'my-3'}>
                    <div>
                        <h5>
                            <strong>Token Summary</strong>
                        </h5>
                        <p>
                            Interesting on-chain metrics that provide a rapid
                            understanding of the state Bitcoin
                        </p>
                    </div>
                    <div className={'d-lg-flex d-md-flex d-sm-block'}>
                        <div className={'border rounded m-1'}>
                            <div className={'m-3'}>
                                <p>Holders Making Money at Current Price</p>
                                <div>
                                    <p>
                                        <span className={'text-primary'}>
                                            83% <small>IN</small>
                                        </span>
                                        <span className={'text-danger'}>
                                            8% <small>AT</small>
                                        </span>
                                        <span className={'text-success'}>
                                            9% <small>OUT </small>
                                        </span>
                                    </p>
                                </div>
                                <hr style={{ borderTop: '5px solid red' }} />
                            </div>
                        </div>
                        <div className={'border rounded m-1'}>
                            <div className={'m-3'}>
                                <p>Concentration by Large Holders </p>
                                <div>
                                    <p>
                                        <span className={'text-primary'}>
                                            11%
                                        </span>
                                    </p>
                                </div>
                                <hr style={{ borderTop: '5px solid red' }} />
                            </div>
                        </div>
                        <div className={'border rounded m-1'}>
                            <div className={'m-3'}>
                                <p>Holders Composition by Time Held</p>
                                <div>
                                    <p className={'d-flex'}>
                                        <span className={'text-primary'}>
                                            60% <small>1y+</small>
                                        </span>
                                        <span className={'text-danger'}>
                                            31 <small>1-12M</small>
                                        </span>
                                        <span className={'text-success'}>
                                            9% <small>1m </small>
                                        </span>
                                    </p>
                                </div>
                                <hr style={{ borderTop: '5px solid red' }} />
                            </div>
                        </div>
                        <div className={'border rounded m-1'}>
                            <div className={'m-3'}>
                                <p>Transactions Greater than $100K</p>
                                <div>
                                    <p>
                                        <span className={'text-primary'}>
                                            $316.99b
                                            <small>7DAYS</small>
                                        </span>
                                    </p>
                                </div>
                                <hr style={{ borderTop: '5px solid red' }} />
                            </div>
                        </div>
                        <div className={'border rounded m-1'}>
                            <div className={'m-3'}>
                                <p>Transactions Demographics</p>
                                <div>
                                    <p>
                                        <span className={'text-success'}>
                                            58% <small>WEST</small>
                                        </span>
                                        <span className={'text-primary'}>
                                            42 <small>EAST</small>
                                        </span>
                                    </p>
                                </div>
                                <hr style={{ borderTop: '5px solid red' }} />
                            </div>
                        </div>
                    </div>
                    <Button textCase className="mt-3">
                        Dive Deeper
                    </Button>
                    <div className={'mt-5'}>
                        <div>
                            <h4>
                                <strong>Actionable Signals</strong>
                            </h4>
                            <p>
                                Momentum and value signals that will help you
                                better judge the on-chain sentiment of Bitcoin
                            </p>
                        </div>
                        <div
                            className={
                                'd-lg-flex d-md-flex d-sm-block justify-content-between'
                            }
                        >
                            <div className={'border rounded m-1'}>
                                <div className={'m-3'}>
                                    <h5 className={'text-secondary'}>
                                        <strong>Summary</strong>
                                    </h5>
                                    <div
                                        style={{
                                            minHeight: '250px',
                                            minWidth: '300px',
                                        }}
                                    >
                                        <h1> Coming soon</h1>
                                    </div>
                                </div>
                            </div>
                            <div className={'border rounded m-1'}>
                                <div className={'m-3'}>
                                    <h5 className={'text-danger'}>
                                        <strong>Net Network Growth</strong>
                                    </h5>
                                    <div
                                        style={{
                                            minHeight: '250px',
                                            minWidth: '300px',
                                        }}
                                    >
                                        <h1> Coming soon</h1>
                                    </div>
                                </div>
                            </div>
                            <div className={'border rounded m-1'}>
                                <div className={'m-3'}>
                                    <h5 className={'text-success'}>
                                        <strong>Concentration</strong>
                                    </h5>
                                    <div
                                        style={{
                                            minHeight: '250px',
                                            minWidth: '300px',
                                        }}
                                    >
                                        <h1> Coming soon</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button textCase className="mt-3">
                        See More Signals
                    </Button>
                </div>
            </Typography>
        </>
    );
}
