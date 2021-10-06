import { Card, CardContent, Divider, Typography } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import React from 'react';
import qrImg from '../../../assets/investor/qr.png';
import Button from '../../../components/Button';

export default function DonateCard() {
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
                    <img className="w-50 p-4" src={qrImg} alt="" />
                    <Typography className="mb-2">
                        1JWxkcmz3SxiGXQS8KAhC38oy6Q7xXdhQ1
                    </Typography>
                    <Button textCase endIcon={<FileCopy />}>
                        Click here to copy wallet address
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
