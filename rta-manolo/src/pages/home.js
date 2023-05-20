import Navbar from '../Navbar';
import React, { useEffect, useState } from 'react';
import './css/home.css'
import ProfilePic from './../Images/profile.png'
import { Button } from '@mui/material';
import ViolationCompile from './components/ViolationCompile';
import Form from './components/Form';
import axios from 'axios';

const Home = () => {




  // get token
    const token = localStorage.getItem('token')

    // get user info
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/v1/accounts/users/me/", {
            headers:{
                "Authorization": `Token ${token}`
            }
        }).then(response => {
            setUsers(response.data)
        })
    }, [])

  const [show, setShow] = useState(false)

  return (
    <>
       <Navbar />
      <div className='ContainerCss' >

        {show ? (
        <div>
          <div style={{backgroundColor:"white", width: "90%", height:"90%", position:"fixed", display:"flex", zIndex: 2, borderRadius: 30, marginTop: 70, marginLeft:"5rem"}}>
          <Form RecordViolation={() => setShow(!show)} onClick={() => setShow(!show)}></Form>
          </div>
          <div style={{backgroundColor:"black", width: "100%", height:"200%", position:"fixed", display:"flex", zIndex: 1, opacity: "60%"}}></div>
        </div>  
        ) : null}
        
        <div className='InnerContainer'>
          <div>
            <div style={{position:"absolute", display:"flex", marginLeft: "5rem"}}>
              <img src={ProfilePic}></img>
            </div>
            <div style={{marginLeft: "15rem"}}>
              <h1>{users.first_name + " " + users.last_name}</h1>
              <h4 style={{fontWeight:"normal", fontSize: 20, marginTop:-10}}>{users.email}</h4>
            </div>
            <div style={{height: 5, width:"90%", backgroundColor:"black", display:"flex", position:"absolute", marginLeft: "5rem", marginTop: "1rem", flexDirection: "column"}}></div>
          </div>

          <div style={{marginLeft:"-30rem"}}>
            <ViolationCompile></ViolationCompile>
          </div>
        
          <div style={{position:"fixed", display:"absolute"}}>
            <Button variant='contained' onClick={() => setShow(!show)} style={{height: 60, width: "10rem", backgroundColor:'#64DAFF', display:"flex", position:"absolute", marginTop: "45rem", marginLeft:"77rem"}}>PROCEED</Button> 
          </div>
              
        </div>
      </div>
    </>
  );
};

export default Home;