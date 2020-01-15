import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUserAction } from '../Redux/actions';
import { useDispatch } from 'react-redux';
import LogOutButton from '../components/LogOutButton';
import TaskInputField from '../components/TaskInputField';
import TasksList from '../components/TasksList';
import './TaskListPage.css';

const TaskListPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) return history.push('/login');

        dispatch(loginUserAction(user));
    }, [history, dispatch]); 

    return (
        <>
            <LogOutButton className='logoutButton'/>
            <section className='taskWrapper'>
                <TaskInputField/>
                <TasksList/>
            </section>
        </>
    )
}

export default TaskListPage;
