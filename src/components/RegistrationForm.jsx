import React from 'react';
import { useFormik } from 'formik';
import Input from './common/Input';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { registrationValidation } from '../formValidations';
import { userRegistrationFake } from '../fakeServerApi';
import { useHistory } from 'react-router-dom';

function RegistrationForm() {

    const history = useHistory();
    const { handleSubmit, handleChange, handleBlur, values, touched, errors, isValid } = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            password: ''
        },
        validationSchema: registrationValidation,
        onSubmit: async(values, action) => {
            // Fake request to the server )
            try {
                values.tasks = [];
                await userRegistrationFake(values);
                history.push('/login');
            } catch(ex) {
                action.setFieldError('serverError', ex.message)
            }
        }
    });

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registration</h2>
            <main>
                <Input
                    name='name'
                    label='Name'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    error={{touched: touched.name, message: errors.name}}
                />
                <Input
                    name='surname'
                    label='Surname'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.surname}
                    error={{touched: touched.surname, message: errors.surname}}
                />
                <Input
                    name='email'
                    type='Email'
                    label='Email'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    error={{touched: touched.email, message: errors.email}}
                />
                <Input
                    name='password'
                    type='Password'
                    label='Password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    error={{touched: touched.password, message: errors.password}}
                />
                {errors.serverError && <Alert severity="error">{errors.serverError}</Alert>}
            </main>
            <footer>
                <Button type='submit' disabled={!isValid}>
                    Submit
                </Button>
                <i onClick={() => history.goBack()} className="material-icons">
                    arrow_back
                </i>
            </footer>
        </form>
    )
}

export default RegistrationForm;
