import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUserAction } from '../Redux/actions';
import Button from '@material-ui/core/Button';

function LogOutButton({...rest}) {

    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        dispatch(loginUserAction());
        history.push('/login');
    };

    return (
        <div {...rest}>
            <Button onClick={handleLogout} type='submit' color="secondary">
                Log Out
            </Button>
        </div>
    )
}

export default LogOutButton;
