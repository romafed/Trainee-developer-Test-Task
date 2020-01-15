import {
    LOGIN_USER,
    ADD_TASK,
    EDIT_TASK,
    DELETE_TASK,
    SHARE_TASK,
    FIELD_ACTION,
    CLEAR_FIELD_ACTION
} from './types';

const initialValue = {
    user: {},
    fieldAction: null
} 

const reducer = function(store=initialValue, action) {
    switch(action.type) {
        case LOGIN_USER: 
            return { ...store, user: action.payload, fieldAction: null };
        case ADD_TASK:
            return { 
                ...store, user:{ 
                    ...store.user, tasks: [{ id: Date.now(), title: action.payload }, ...store.user.tasks]
                } 
            }  ;
        case DELETE_TASK:
            return {
                ...store, user: {
                    ...store.user, tasks: store.user.tasks.filter(task => {
                        return task.id !== action.payload
                    })
                }
            }
        case EDIT_TASK:
            const { tasks } = store.user;
            let task = tasks.find(task => task.id === action.payload.taskId);
            const index = tasks.indexOf(task);
            task.title = action.payload.title;
            tasks[index] = {...task};
            return {
                ...store, user: {
                    ...store.user,
                    tasks
            }}

        case SHARE_TASK:
            return {};
        case FIELD_ACTION:
            const { title } = store.user.tasks.find(task => task.id === action.payload.taskId);
            return { 
                ...store, 
                fieldAction: { taskId: action.payload.taskId, title: title, action: action.payload.action  } 
            };
        case CLEAR_FIELD_ACTION:
            return { 
                ...store, 
                fieldAction: null
            };
        default: 
            return store
    }
}   

export default reducer;