import { Close, LocationOnOutlined } from '@material-ui/icons';
import { Button, selectClasses } from '@mui/material';
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
import {Input, TextField} from '@material-ui/core';
import Fine from './options/Fine.json'
import axios from 'axios';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';




function Form({props, onClick, RecordViolation}) {


    const [driver, setDriver] = useState(true);
    const [violation, setViolation] = useState(false);
    const [citation, setCitation] = useState(false);
    const [selectedFineAmount, setSelectedFineAmount] = useState('');


    const [driverInfo, setDriverInfo] = useState({
        "license_number": "",
        "birthday": "",
        "first_name": "",
        "last_name": "",
        "address": "",
        "email": "",
        "mobile_number": "",
        "gender": "",
        "status": "",
        "nationality": ""
    })



    const selectTicket = localStorage.getItem('selectedViolations');
    const violationList = selectTicket ? JSON.parse(selectTicket) : [];
    
    useEffect(() => {
      setTicket((prevTicket) => ({
        ...prevTicket,
        driver: driverInfo.license_number,
      }));
    }, [driverInfo.license_number]);
    
    const [ticket, setTicket] = useState({
      location: '',
      violation_type: selectTicket,
      fine_amount: 0,
      remarks:
        'Please be reminded to abide by traffic rules and regulations to ensure road safety. Have a safe journey ahead.',
      driver: driverInfo.license_number,
    });
    
    const violationString = violationList.join(', '); // Convert the violations to a string separated by commas

    const handleGenderChange = (selectedOption) => {
        setDriverInfo({
            ...driverInfo,
            gender: selectedOption.value
        });

    }

    const handleStatusChange = (selectedOption) => {
        setDriverInfo({
            ...driverInfo,
            status: selectedOption.value
        });

    }    
    const handleDateChange = (selectedDate) => {
        console.log(selectedDate);
        setDriverInfo({
          ...driverInfo,
          birthday: selectedDate.target.value
        });
      };

    const handleNationalityChange = (selectedOption) => {
        setDriverInfo({
          ...driverInfo,
          nationality: selectedOption.value
        });
    };        


    return (
        <div>

            <div style={{margin: 20}}>
                <Button onClick={onClick}><Close></Close></Button>
            </div>
            {/* driver ni nga model */}
            {driver ? (
                    <>
                        <div style={{width:"107rem", display:"flex", justifyContent:"center"}}>
                            <h1>Driver's Information</h1>
                        </div>
                    
                        <div style={{display:"flex", position:"absolute", marginLeft: "7rem", flexDirection:"row"}}>
                            <div style={{marginRight: 20}}>
                                <InputBox label="First Name" value={driverInfo.first_name} onChange={(event) => {
                                    setDriverInfo({
                                        ...driverInfo, first_name: event.target.value
                                    })
                                }}></InputBox>
                            </div>
                            <div style={{marginRight: 20}}>
                                <InputBox label="Last Name" value={driverInfo.last_name} onChange={(event) => {
                                    setDriverInfo({
                                        ...driverInfo, last_name: event.target.value
                                    })
                                }}></InputBox>
                            </div>
                            <div style={{marginRight: 20}}>
                            <InputBox label="Address" value={driverInfo.address} onChange={(event) => {
                                    setDriverInfo({
                                        ...driverInfo, address: event.target.value
                                    })
                                }}></InputBox>
                            </div>
                        </div>
                        <div style={{display:"flex", position:"absolute", marginLeft: "7rem", flexDirection:"row", marginTop: "7rem"}}>
                            <div style={{marginRight: 20}}>
                            <InputBox label="Email" type="email" value={driverInfo.email} onChange={(event) => {
                                    setDriverInfo({
                                        ...driverInfo, email: event.target.value
                                    })
                                }}></InputBox>
                            </div>
                            <div style={{marginRight: 20}}>
                            <InputBox label="Mobile Number"                            
                            type="number" 
                            value={driverInfo.mobile_number} 
                            onChange={(event) => {
                                    setDriverInfo({
                                        ...driverInfo, mobile_number: event.target.value
                                    })
                                }}></InputBox>
                            </div>
                            <div style={{marginRight: 20}}>
                                <SelectProps options={Gender} placeholder="Gender" onchange={handleGenderChange}></SelectProps>
                            </div>
                        </div>
                        <div style={{display:"flex", position:"absolute", marginLeft: "7rem", flexDirection:"row", marginTop: "14rem"}}>
                            <div style={{marginRight: 20, zIndex: 2}}>
                                <SelectProps options={Status} placeholder="Status" onchange={handleStatusChange}></SelectProps>
                            </div>
                            <div style={{marginRight: 20}}>
                                <SelectDate onChange={handleDateChange}></SelectDate>
                            </div>
                            <div style={{marginRight: 20}}>
                                <SelectProps options={Nationality} onchange={handleNationalityChange} placeholder="Nationality"></SelectProps>
                            </div>
                        </div>
                        <div style={{display:"flex", position:"absolute", marginLeft: "7rem", flexDirection:"row", marginTop: "21rem"}}>
                            {/* <div style={{marginRight: 20}}>
                                <SelectProps options={ID}  placeholder="ID Type"></SelectProps>
                            </div> */}
                            <div style={{marginRight: 20}}>
                            <InputBox label="License Number" value={driverInfo.license_number} onChange={(event) => {
                                    setDriverInfo({
                                        ...driverInfo, license_number: event.target.value
                                    })
                                }}></InputBox>
                            </div>
                        </div>

                        <div style={{display:"flex", position:"absolute", marginLeft: "38rem", flexDirection:"row", marginTop: "29.7rem",}}>
                            <div style={{marginRight: 20}}>
                                <Button variant='contained' style={{ height: '55px', width: "15rem", backgroundColor: "red" }}>CLEAR</Button>                    
                            </div>
                            <div style={{marginRight: 20}}>
                                <Button variant='contained' onClick={() => {

                                    //get token 
                                    const token = localStorage.getItem('token')
                                    axios.post('https://jaydemike21.pythonanywhere.com/api/v1/tickets/drivers/', driverInfo, {
                                        headers:{
                                            "Authorization": `Token ${token}`
                                        },
                                    }).then((response) => {
                                        alert("Successfully added")
                                        setDriver(!driver);
                                        setViolation(!violation);
                                    }).catch((error) => {
                                        console.log(error.response.data)  
                                        alert("Please Try Again")                                    
                                    })

                                }} style={{ height: '55px', width: "15rem", backgroundColor: "#64DAFF" }}>Next</Button>                    
                            </div>
                            <div style={{marginRight: 20}}>
                                <Button variant='contained' style={{ height: '55px', width: "15rem", backgroundColor: "green" }} onClick={() => {
                                        setDriver(!driver);
                                        setViolation(!violation);                                    
                                }}>Existing Violator</Button>                    
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
                        <div style={{display:"flex", position:"absolute", marginLeft: "23rem", flexDirection:"row", marginTop: "5rem"}}>
                            <div style={{marginRight: 20}}>
                                <InputBox label="License Number" value={driverInfo.license_number} onChange={(event) => {
                                                             setDriverInfo({
                                                                ...driverInfo, license_number: event.target.value
                                                            })
                                }}></InputBox>
                                </div>                            
                            <div style={{marginRight: 20}}>
                                <TextField style={{width: "29.6rem", justifyContent:"center"}} variant='outlined' label="Location" className='InputLocation'
                                value={ticket.location} onChange={(event) => {

                                    setTicket({
                                        ...ticket, location: event.target.value
                                    })

                                }}
                                />
                                    <div style={{zIndex:3, marginTop: -54,  marginLeft: "26rem"}}>
                                        <Button startIcon={<AddLocationAltIcon style={{ marginLeft: 10, padding: 5, fontSize: 40, color:"white", backgroundColor:"#64DAFF", borderRadius: 20}} ></AddLocationAltIcon>}></Button>
                                    </div>
                            </div>
                            <div style={{display:"flex", position:"absolute", flexDirection:"row", marginTop: "7rem"}}>
                                <div style={{marginRight: 20}}>
                                <InputBox label="Fines" type="number" value={ticket.fine_amount} onChange={(event) => {

                                    setTicket({
                                        ...ticket, fine_amount: event.target.value
                                    })

                                }}></InputBox>
                                </div>   
                                <div style={{marginRight: 20}}>
                                <InputBox style={{width: "29.6rem"}} disabled variant='outlined' label="Remarks" value={ticket.remarks}></InputBox>
                                </div>
                            </div> 
                            <div
                                style={{
                                marginRight: 20,
                                position: 'absolute',
                                display: 'flex',
                                marginTop: '14rem',
                                flexDirection: 'column', // Set flex direction to column
                                alignItems: 'flex-start', // Align items to the start of the column
                                columnCount: 2, // Set the number of columns
                                columnGap: '1rem', // Set the gap between columns
                                fontSize: '17px',
                                
                                }}
                            >
                                <div style={{height:"auto", width:"61.5rem", borderRadius: 10, padding: 20, backgroundColor: "white",  boxShadow: "1px 1px 10px rgba(0, 0, 0, 1)"}}>
                                {violationList.length > 0 ? (
                                    <div style={{ height: 'auto', borderRadius: 10, padding: 20}}>
                                    {violationList.map((violation, index) => (
                                        <div key={index} style={{ marginBottom: '0.5rem', fontSize: 20 }}>
                                        <FontAwesomeIcon icon={faCar} style={{ marginRight: 10, color: 'red' }} />{violation}
                                        </div>
                                    ))}
                                    </div>
                                ) : (
                                    <div>No Violation Selected</div>
                                )}
                                </div>
                            </div>


                        </div>
                        <div style={{display:"flex", position:"absolute", marginLeft: "38rem", flexDirection:"row", marginTop: "35rem",}}>
                            <div style={{marginRight: 20}}>
                                <Button variant='contained' style={{ height: '55px', width: "15rem", backgroundColor: "rgb(50, 168, 137)"}} onClick={() => setViolation(!violation) & setDriver(!driver)}>BACK</Button>                    
                            </div>
                            <div style={{marginRight: 20}}>
                                <Button variant='contained' onClick={()=> {
                                    const token = localStorage.getItem('token')

                                    axios.post('https://jaydemike21.pythonanywhere.com/api/v1/tickets/traffictickets/', ticket, {
                                        headers: {
                                            Authorization: `Token ${token}`
                                        },
                                    }).then((response) => {
                                        alert('Successfully Issued Ticket')
                                        console.log(response.data)
                                        setDriverInfo({
                                            "license_number": "",
                                            "birthday": "",
                                            "first_name": "",
                                            "last_name": "",
                                            "address": "",
                                            "email": "",
                                            "mobile_number": "",
                                            "gender": "",
                                            "status": "",
                                            "nationality": ""
                                        })
                                        setTicket({
                                            "location": "",
                                            "violation_type": {selectTicket},
                                            "fine_amount": '',
                                            "remarks": "Please be reminded to abide by traffic rules and regulations to ensure road safety. Have a safe journey ahead.",
                                            "driver": driverInfo.license_number                                            
                                        }) 
                                        window.location.reload()                                     
                                    }).catch((error) => {
                                        console.log(error.response.data)
                                    })
                                    console.log(ticket)

                                }} style={{ height: '55px', width: "15rem", backgroundColor: "#64DAFF" }}>PROCEED</Button>                    
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