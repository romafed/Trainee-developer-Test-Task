import React from 'react';
import { useFormik } from 'formik';
import { loginValidation } from '../formValidations';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoginFake } from '../fakeServerApi';
import { loginUserAction } from '../Redux/actions';
import Button from '@material-ui/core/Button';
import Input from './common/Input';
import Alert from '@material-ui/lab/Alert';

function LoginForm() {

    const history = useHistory();
    const dispatch = useDispatch();

    const { handleSubmit, handleChange, handleBlur, values, touched, errors, isValid } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginValidation,
        onSubmit: async(values, actions) => {
            // Fake request to the server )
            try {
                const user = await userLoginFake(values)
                dispatch(loginUserAction(user));
                localStorage.setItem('currentUser', JSON.stringify(user));
                history.push('/');
            }catch(ex) {
                actions.setFieldError('serverError', ex.message)
            }
        }
    })

    return (
        <form onSubmit={handleSubmit}>
            <h2>Log in</h2>
            <div>
                <Input 
                    name='email' 
                    type='email' 
                    label='Email'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    error={{touched: touched.email, message: errors.email}}
                />
            </div>
            <div>
                <Input 
                    name='password'
                    type='Password'
                    label='Password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    error={{touched: touched.password, message: errors.password}}
                />
            </div>
            {errors.serverError && <Alert severity="error">{errors.serverError}</Alert>}
            <footer>
                <Button type='submit' disabled={!isValid}>
                    Submit
                </Button>
                <Link to='/registration'>Registration</Link>
            </footer>
        </form>
    )
}

export default LoginForm;