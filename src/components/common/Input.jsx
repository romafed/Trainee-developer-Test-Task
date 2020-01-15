import React from 'react';
import TextField from '@material-ui/core/TextField';

function Input({onChange, onBlur, placeholder, name, type='Text', label, value, error, ...rest }) {
    return (
        <TextField 
            fullWidth
            {...rest}
            error={!!(error.touched && error.message)}
            placeholder={placeholder} 
            name={name}
            type={type}
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            helperText={error.touched && error.message ? error.message : ''}
        />
    )
}

export default Input;
