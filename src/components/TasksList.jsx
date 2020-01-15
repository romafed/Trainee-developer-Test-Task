import React from 'react';
import Task from './Task';
import { useSelector, useDispatch } from 'react-redux';
import { setFieldAction, deleteTaskAction, clearFieldAction } from '../Redux/actions';
import { deleteTaskFake } from '../fakeServerApi';

function TasksList() {

    const {tasks=[], email} = useSelector(state => state.user);
    const fieldAction = useSelector(state => state.fieldAction);
    const dispatch = useDispatch();

    const handleDelete = async(id) => {
        try {
            // Fake request to the server )
            await deleteTaskFake(id, email);
            dispatch(deleteTaskAction(id));
            dispatch(clearFieldAction());
        }catch(ex) {
            console.log(ex.message);
        }
    }

    return (
        <div className='tasksList'>
            {tasks.length <= 0 ? 
            <p className='emptyTaskList'>Task list is empty</p> :
             tasks.map(item => (
                <Task 
                    active={fieldAction && fieldAction.taskId}
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
