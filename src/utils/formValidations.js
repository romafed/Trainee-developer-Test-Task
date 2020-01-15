import * as Yup from 'yup';

export const loginValidation = Yup.object({
    email: Yup.string().email('Email is not valid').required('Email is required'),
    password: Yup.string().min(4,'Password must be at least 4 characters long')
    .max(8, 'Password cannot be longer than 8 characters')
    .required('Password is required')
});

export const registrationValidation = Yup.object({
    name: Yup.string().required('Name is required'),
    surname: Yup.string().required('Surname is required'),
    email: Yup.string().email('Email is not valid').required('Email required'),
    password: Yup.string().min(4,'Password must be at least 4 characters long')
    .max(8, 'Password cannot be longer than 8 characters')
    .required('Password is required')
});