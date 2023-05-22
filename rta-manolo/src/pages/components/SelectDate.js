import React, { useState } from 'react';
import { Box, TextField } from '@material-ui/core';



function SelectDate({label,InputProps, id, type, onChange, value}) {
  return (
    <div>
      <div>
            <TextField
                variant='outlined'
                label={label}
                InputProps={InputProps}
                className='InputLogin'
                type="date"
                onChange={onChange}
                value={value}
            />
        </div>
    </div>
  );
}

export default SelectDate;
