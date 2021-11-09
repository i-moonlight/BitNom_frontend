import { Button as MuiButton } from '@mui/material';
import { useFormikContext } from 'formik';
import React from 'react';
import logo_google from '../assets/components/google.svg';
import LazyImage from './LazyImage';

export function Button({
    // eslint-disable-next-line no-unused-vars
    color,
    textCase,
    variant,
    variantAlt,
    google,
    children,
    ...props
}) {
    const buttonVariant = variantAlt || variant;

    return (
        <MuiButton
            variant={buttonVariant ? buttonVariant : 'contained'}
            disableElevation={!google}
            style={{
                backgroundColor: google && '#f2f2f2',
                color: google ? '#818181' : variant === 'text' && '#0ea0f3',
                textTransform: textCase && 'none',
            }}
            {...props}
        >
            {google && (
                <LazyImage
                    style={{ marginRight: 16 }}
                    image={{
                        src: logo_google,
                        alt: 'Google Logo',
                        width: 20,
                    }}
                />
            )}
            {children}
        </MuiButton>
    );
}

export function FormikButton({
    // eslint-disable-next-line no-unused-vars
    color,
    textCase,
    variant,
    variantAlt,
    google,
    children,
    ...props
}) {
    const formikContext = useFormikContext();
    const buttonVariant = variantAlt || variant;

    return (
        <MuiButton
            variant={buttonVariant ? buttonVariant : 'contained'}
            disableElevation={!google}
            style={{
                backgroundColor: google && '#f2f2f2',
                color: google ? '#818181' : variant === 'text' && '#0ea0f3',
                textTransform: textCase && 'none',
            }}
            onClick={formikContext.handleSubmit}
            {...props}
        >
            {google && (
                <img
                    src={logo_google}
                    alt=""
                    style={{ width: 20, marginRight: 16 }}
                />
            )}
            {children}
        </MuiButton>
    );
}
