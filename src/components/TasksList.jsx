import React from 'react';
import Task from './Task';
import { useSelector, useDispatch } from 'react-redux';
import { setFieldAction, deleteTaskAction, clearFieldAction } from '../Redux/actions';
import { deleteTaskFake } from '../fakeServerApi';

function TasksList() {

    const {tasks, email} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleDelete = async(id) => {
        try {
            await deleteTaskFake(id, email);
            dispatch(clearFieldAction());
            dispatch(deleteTaskAction(id));
        }catch(ex) {
            console.log(ex.message);
        }
    }

    return (
        <div className='tasksList'>
            {tasks && tasks.map(item => (
                <Task 
                    key={item.id}
                    item={item}
                    onDelete={handleDelete}
                    onEdit={(id) => dispatch(setFieldAction(id, 'edit'))}
                    onShare={(id) => dispatch(setFieldAction(id, 'share'))}
                />
            ))}
        </div>
    )
}

export default TasksList;
