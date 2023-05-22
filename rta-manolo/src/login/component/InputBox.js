import { TextField, colors } from '@mui/material';
import React from 'react';
import './css/index.css';

function InputBox({value, onChange, label, InputProps, type, defaultValue, placeholder, helperText, disabled, title}) {
    
    return (
        <div>
            <TextField
                variant='outlined'
                label={label}
                InputProps={InputProps}
                className='InputLogin'
                type={type}
                defaultValue={defaultValue}
                placeholder={placeholder}
                helperText={helperText}
                disabled={disabled}
                value={value}
                onChange={onChange}
                title={title}
            />
        </div>
    );
}

export default InputBox;
