import React from 'react';

function Task({active, item, onDelete, onEdit, onShare}) {

    return (
        <div className='task' style={{ backgroundColor: active === item.id &&'green' }}>
            <div className='taskContent'>
                <span>{item.title}</span>
                {item.author ? <i>{`From: ${item.author}`}</i>: null}
            </div>
            <div className='taskIcons'>
                <i onClick={() => onDelete(item.id)} className='material-icons'>
                    delete_sweep
                </i>
                <i onClick={() => onEdit(item.id)} className='material-icons'>
                    edit
                </i>
                <i onClick={() => onShare(item.id)} className='material-icons'>
                    share
                </i>
            </div>
        </div>
    )
}

export default Task;
