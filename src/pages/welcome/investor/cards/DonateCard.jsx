import { useTheme } from '@emotion/react';
import { DoneAll, FileCopy } from '@mui/icons-material';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import qrImg from '../../../../assets/investor/qr2.png';
import { Button } from '../../../../components/Button';
import LazyImage from '../../../../components/LazyImage';

export default function DonateCard() {
    const [justCopied, setJustCopied] = useState(false);
    const theme = useTheme();

    return (
        <div className=" h-100 w-100 p-5 pt-5 text-center">
            <Card
                elevation={0}
                style={{
                    background:
                        theme.palette.mode == 'light' &&
                        theme.palette.background.investorCards,
                }}
            >
                <CardContent>
                    <Typography variant="h6" className="mb-2">
                        Donate Crypto
                    </Typography>
                    <Divider />
                    <Typography className="mt-2">
                        Do you love and would like to support us?
                    </Typography>
                    <LazyImage
                        style={{ width: '60%', padding: 16 }}
                        image={{
                            src: qrImg,
                            alt: 'Donate Image',
                        }}
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
