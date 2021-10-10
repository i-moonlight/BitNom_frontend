import { Button as MuiButton } from '@material-ui/core';
import { useFormikContext } from 'formik';
import React from 'react';
import logo_google from '../assets/components/google.svg';

export default function Button({
    textCase,
    color,
    submit,
    onClick,
    variant,
    variantAlt,
    google,
    children,
    ...props
}) {
    const formikContext = useFormikContext();
    const buttonVariant = variantAlt ? variantAlt : variant;

    let btnColor = color;

    if (variant == 'text' && color != 'inherit') {
        btnColor = '#0ea0f3';
    }

    if (google) {
        btnColor = '#818181';
    }

    return (
        <MuiButton
            color={color}
            variant={buttonVariant ? buttonVariant : 'contained'}
            disableElevation={!google}
            style={{
                backgroundColor: google && '#f2f2f2',
                color: btnColor,
                textTransform: textCase && 'none',
            }}
            onClick={submit ? formikContext.handleSubmit : onClick}
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
