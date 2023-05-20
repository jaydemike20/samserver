import { Close, LocationOnOutlined } from '@material-ui/icons';
import { Button } from '@mui/material';
import { useState } from 'react';
import React from 'react';
import InputBox from '../../login/component/InputBox';
import SelectProps from './SelectProps';
import Gender from './options/Gender.json'
import Status from './options/Status.json'
import SelectDate from './SelectDate';
import Nationality from './options/Nationality.json'
import ID from './options/ID.json'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import {TextField} from '@material-ui/core';
import Fine from './options/Fine.json'

function Form({props, onClick, RecordViolation}) {

    const [driver, setDriver] = useState(true);
    const [violation, setViolation] = useState(false);
    const [citation, setCitation] = useState(false);




    return (
        <div>

            <div style={{margin: 20}}>
                <Button onClick={onClick}><Close></Close></Button>
            </div>
            
            {driver ? (
                    <>
                        <div style={{width:"107rem", display:"flex", justifyContent:"center"}}>
                            <h1>Driver's Information</h1>
                        </div>
                    
                        <div style={{display:"flex", position:"absolute", marginLeft: "7rem", flexDirection:"row"}}>
                            <div style={{marginRight: 20}}>
                                <InputBox label="First Name"></InputBox>
                            </div>
                            <div style={{marginRight: 20}}>
                                <InputBox label="Last Name"></InputBox>
                            </div>
                            <div style={{marginRight: 20}}>
                                <InputBox label="Address"></InputBox>
                            </div>
                        </div>
                        <div style={{display:"flex", position:"absolute", marginLeft: "7rem", flexDirection:"row", marginTop: "7rem"}}>
                            <div style={{marginRight: 20}}>
                                <InputBox label="Email"></InputBox>
                            </div>
                            <div style={{marginRight: 20}}>
                                <InputBox label="Mobile Number" type="number"></InputBox>
                            </div>
                            <div style={{marginRight: 20}}>
                                <SelectProps options={Gender} placeholder="Gender"></SelectProps>
                            </div>
                        </div>
                        <div style={{display:"flex", position:"absolute", marginLeft: "7rem", flexDirection:"row", marginTop: "14rem"}}>
                            <div style={{marginRight: 20}}>
                                <SelectProps options={Status} placeholder="Status"></SelectProps>
                            </div>
                            <div style={{marginRight: 20}}>
                                <SelectDate></SelectDate>
                            </div>
                            <div style={{marginRight: 20}}>
                                <SelectProps options={Nationality} placeholder="Nationality"></SelectProps>
                            </div>
                        </div>
                        <div style={{display:"flex", position:"absolute", marginLeft: "7rem", flexDirection:"row", marginTop: "21rem"}}>
                            <div style={{marginRight: 20}}>
                                <SelectProps options={ID} placeholder="ID Type"></SelectProps>
                            </div>
                            <div style={{marginRight: 20}}>
                                <InputBox label="ID Number" type="number"></InputBox>
                            </div>
                        </div>

                        <div style={{display:"flex", position:"absolute", marginLeft: "38rem", flexDirection:"row", marginTop: "29.7rem",}}>
                            <div style={{marginRight: 20}}>
                                <Button variant='contained' style={{ height: '55px', width: "15rem", backgroundColor: "red" }}>CLEAR</Button>                    
                            </div>
                            <div style={{marginRight: 20}}>
                                <Button variant='contained' onClick={() => setDriver(!driver) & setViolation(!violation)} style={{ height: '55px', width: "15rem", backgroundColor: "#64DAFF" }}>PROCEED</Button>                    
                            </div>
                        </div>
                    </>
                ): null}

            <div style={{position:"absolute", display:"flex"}}>
                

                {violation ? (
                    <>
                        <div style={{width:"107rem", display:"flex", justifyContent:"center"}}>
                            <h1>Details of apprehension</h1>
                        </div>
                        <div style={{display:"flex", position:"absolute", marginLeft: "23rem", flexDirection:"row", marginTop: "12rem"}}>
                            <div style={{marginRight: 20}}>
                                <TextField style={{width: "61rem", justifyContent:"center"}} variant='outlined' label="Location" className='InputLocation'
                                />
                                    <div style={{zIndex:3, marginTop: -54,  marginLeft: "63rem"}}>
                                        <Button startIcon={<AddLocationAltIcon style={{ marginLeft: 10, padding: 5, fontSize: 40, color:"white", backgroundColor:"#64DAFF", borderRadius: 20}} ></AddLocationAltIcon>}></Button>
                                    </div>
                            </div>
                                <div style={{display:"flex", position:"absolute", flexDirection:"row", marginTop: "7rem"}}>
                                <div style={{marginRight: 20}}>
                                    <SelectProps options={Fine} placeholder="Fine Amount"></SelectProps>
                                </div>
                                <div style={{marginRight: 20}}>
                                <TextField style={{width: "29.6rem"}} disabled variant='outlined' label="Remarks" defaultValue="Please be reminded to abide by traffic rules and regulations to ensure road safety. Have a safe journey ahead."
                                />
                                </div>
                            </div>
                        </div>
                        <div style={{display:"flex", position:"absolute", marginLeft: "38rem", flexDirection:"row", marginTop: "35rem",}}>
                            <div style={{marginRight: 20}}>
                                <Button variant='contained' style={{ height: '55px', width: "15rem", backgroundColor: "rgb(50, 168, 137)"}} onClick={() => setViolation(!violation) & setDriver(!driver)}>BACK</Button>                    
                            </div>
                            <div style={{marginRight: 20}}>
                                <Button variant='contained' onClick={onClick} style={{ height: '55px', width: "15rem", backgroundColor: "#64DAFF" }}>PROCEED</Button>                    
                            </div>
                        </div>
                    </>
                ): null}
            </div>
            <div style={{position:"absolute", display:"flex"}}>
                
            </div>
        </div>
    );
}

export default Form;