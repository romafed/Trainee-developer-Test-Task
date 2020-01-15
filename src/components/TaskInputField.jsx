import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskAction, editTaskAction, clearFieldAction } from '../Redux/actions';
import { addTaskFake, editTaskFake, shareTaskFake } from '../fakeServerApi'

function TaskInputField() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const fieldAction = useSelector(state => state.fieldAction);
    const [action, setAction] = useState(null);
    const [value, setInput] = useState('');
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setError(null);
        setInput(event.target.value);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!value) return;
        try {

            switch(action) {
                case 'Edit':
                    // Fake request to the server )
                    await editTaskFake(fieldAction.taskId, value, user.email);
                    dispatch(editTaskAction(fieldAction.taskId, value));
                    setInput('');
                    dispatch(clearFieldAction())
                    break
                case 'Share':
                    // Fake request to the server )
                    await shareTaskFake(fieldAction.title, user, value);
                    dispatch(clearFieldAction())
                    break
                default:
                    // Fake request to the server )
                    await addTaskFake(value, user.email);
                    dispatch(addTaskAction(value));
                    setInput('');
            }

        } catch(ex) {
            console.error(ex);
            setError(ex.message);
        }
    };


    useEffect(() => {
        if (fieldAction) {
            if (fieldAction.action === 'edit') {
                setInput(fieldAction.title);
                return setAction('Edit')
            } else if (fieldAction.action === 'share') {
                setInput('');
                return setAction('Share')
            } 
        }
        setInput('');
        return setAction(null)
    }, [fieldAction]);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <TextField
                    className='taskField'
                    fullWidth
                    variant="filled"
                    label={action ? `Click to ${action} Task` : 'Add Task'}
                    placeholder={action === 'Share' ? 'Write user email' : ''}
                    name='input'
                    type='text'
                    onChange={handleChange}
                    value={value}
                />
            </div>
                {error ? <Alert severity="error">{error}</Alert> : null}
            <div className='buttonWrapper'>
                <Button 
                    type='submit'
                    variant="contained" 
                    color="primary"
                >
                    {action || 'Add'}
                </Button>
                <Button 
                    onClick={() => dispatch(clearFieldAction())}
                    variant="contained" 
                    color="secondary"
                >
                    {`Cancel ${action || ''}`}
                </Button>
            </div>
        </form>
    )
}

export default TaskInputField;
