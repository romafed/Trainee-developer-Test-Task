import {
    LOGIN_USER,
    ADD_TASK,
    EDIT_TASK,
    DELETE_TASK,
    SHARE_TASK,
    FIELD_ACTION,
    CLEAR_FIELD_ACTION
} from './types';

export const loginUserAction = (user={}) => {
    return {
        type: LOGIN_USER,
        payload: user
    };
};

export const setFieldAction = (taskId=null, action=null) => {
    return {
        type: FIELD_ACTION,
        payload: { taskId, action }
    }
}

export const clearFieldAction = () => {
    return {
        type: CLEAR_FIELD_ACTION
    }
}

export const addTaskAction = task => {
    return {
        type: ADD_TASK,
        payload: task
    };
};

export const editTaskAction = (taskId, title='') => {
    return {
        type: EDIT_TASK,
        payload: {taskId, title}
    };
};

export const deleteTaskAction = taskId => {
    return {
        type: DELETE_TASK,
        payload: taskId
    };
};

export const shareTaskAction = () => {
    return {
        type: SHARE_TASK
    };
};

