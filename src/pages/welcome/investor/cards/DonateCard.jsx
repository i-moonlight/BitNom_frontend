import { DoneAll, FileCopy } from '@mui/icons-material';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import qrImg from '../../../../assets/investor/qr2.png';
import Button from '../../../../components/Button';

export default function DonateCard() {
    const [justCopied, setJustCopied] = useState(false);

    return (
        <div className=" h-100 w-100 p-5 pt-5 text-center">
            <Card>
                <CardContent>
                    <Typography variant="h6" className="mb-2">
                        Donate Crypto
                    </Typography>
                    <Divider />
                    <Typography className="mt-2">
                        Do you love and would like to support us?
                    </Typography>
                    <img
                        style={{ width: '60%' }}
                        className="p-4"
                        src={qrImg}
                        alt=""
                    />
                    <Typography className="mb-2">
                        1JWxkcmz3SxiGXQS8KAhC38oy6Q7xXdhQ1
                    </Typography>
                    <Button
                        onClick={() => {
                            navigator.clipboard
                                .writeText('1JWxkcmz3SxiGXQS8KAhC38oy6Q7xXdhQ1')
                                .then(() => {
                                    setJustCopied(true);

                                    setTimeout(() => {
                                        setJustCopied(false);
                                    }, 4000);
                                });
                        }}
                        textCase
                        endIcon={justCopied ? <DoneAll /> : <FileCopy />}
                    >
                        {justCopied
                            ? 'Wallet address copied'
                            : 'Copy wallet address'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
