import React from 'react';
import { Button } from '@mui/material';
import InputBox from './InputBox';
import bg from './../../Images/bg.png'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function ForgotPass({onClick}) {
    const navigation = useNavigate()

    const [data, setData] = useState({
        email: ''
    })




    const handleSendEmail = () => {
        
        axios.post("https://jaydemike21.pythonanywhere.com/api/v1/accounts/users/reset_password/", data).then(response => {
            alert("Successfully Sent: Please check your email");
            setData({
                email: "",
              });
            window.location.reload();
        }).catch(error => {
            alert("Error eek")
        })

    }

    return (
        <div>
            <div>
            <div style={{position:"fixed", display:"flex", height:"60%", padding: 20, width:"40%", backgroundColor:"white", zIndex: 6, borderRadius:40, marginLeft:"35rem", marginTop:"12rem"}}>
                <div><Button onClick={onClick}>Close</Button></div>
                <div style={{marginTop: "2rem", marginLeft: 10}}>
                <div  style={{textAlign:"center"}}>
                    <h1>Reset your password</h1>
                </div>
                <div style={{display:"flex", flexDirection:"row"}}>
                    <InputBox label="Email" value={data.email} onChange={(e) => {
                        setData({
                            ...data,
                            'email' : e.target.value
                        })
                    }} ></InputBox> <Button style={{marginLeft: 10}} variant='contained' onClick={handleSendEmail}   >SEND</Button>
                </div>
                <div style={{textAlign:"center", marginTop: "3rem"}}>
                    <p >We will send you and email that enables you to change your password.</p>
                </div>
                </div>
                <div>
                    <img  style={{width: "20rem", height:"20rem", position:"fixed", display:"flex", marginLeft: "-12rem", marginTop:"17rem"}} src={bg}></img>
                </div>
            </div>
            <div style={{position:"fixed", display:"flex", height:"100%", width:"100%", backgroundColor:"black", zIndex: 5, opacity: "40%"}}></div>
            </div>
        </div>
    );
}

export default ForgotPass;