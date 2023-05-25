import React from 'react';
import { Input } from '@mui/material';

function PlateTextField({value, onChange}) {
    return (
        <div>
            <div style={{position:"absolute", display:"flex"}}>
                <Input  className='PlateNumber' style={{width:"30rem", padding: 10, fontSize: 30}} value={value} onChange={onChange} />
                    {/* <div style={{fontSize:"3rem", marginTop: "-7rem"}}><h1>-</h1></div>
                <TextField type='number' className='PlateNumber' style={{width:"13.5rem"}}></TextField>
                    <div style={{fontSize:"3rem", marginTop: "-7rem"}}><h1>-</h1></div>
                <TextField type='number' className='PlateNumber' style={{width:"13.5rem"}}></TextField> */}

            </div>
        </div>
    );
}

export default PlateTextField;

