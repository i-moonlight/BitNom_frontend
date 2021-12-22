// Auth Pages Validation Schemas
import * as Yup from 'yup';

export const createUserValidationSchema = Yup.object().shape({
    username: Yup.string()
        .min(3)
        .max(15)
        .required()
        .lowercase()
        .label('Username'),
    email: Yup.string().email().required().label('Email Address'),
    password: Yup.string().min(6).required().label('Password'),
    cpassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords must match'
    ),
});

export const loginUserValidationSchema = Yup.object().shape({
    username: Yup.string().required().label('Email or Username'),
    password: Yup.string().required().label('Password'),
});

export const requestResetValidationSchema = Yup.object().shape({
    email: Yup.string().email().required().label('Email Address'),
});

export const resetPasswordValidationSchema = Yup.object().shape({
    password: Yup.string().min(6).required().label('Password'),
    cpassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords must match'
    ),
});

export const updateInfoValidationSchema = Yup.object().shape({
    displayName: Yup.string().min(2).max(70).required().label('Full Name'),
});
