import Navbar from '../Navbar';
import React, { useEffect, useState } from 'react';
import './css/home.css';
import ProfilePic from './../Images/profile.png';
import { Button } from '@mui/material';
import ViolationCompile from './components/ViolationCompile';
import Form from './components/Form';
import axios from 'axios';

const Home = () => {
  // get token
  const token = localStorage.getItem('token');

  // get user info
  const [users, setUsers] = useState([]);
  const [fetchProfile, setFetchProfile] = useState(null);

  useEffect(() => {
    axios
      .get("https://jaydemike21.pythonanywhere.com/api/v1/accounts/users/me/", {
        headers: {
          "Authorization": `Token ${token}`
        }
      })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("https://jaydemike21.pythonanywhere.com/api/v1/accounts/profile/", {
        headers: {
          "Authorization": `Token ${token}`
        }
      })
      .then(response => {
        if (response.data.length > 0) {
          setFetchProfile(response.data[0]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [token]);

  const [show, setShow] = useState(false);

  const renderProfileImage = () => {
    if (fetchProfile) {
      return <img src={fetchProfile.profilepic} style={{ width: 140, height: 140, borderRadius: "100%" }} alt="Profile" />;
    } else {
      return <img src={ProfilePic} alt="Default Profile" />;
    }
  };

  return (
    <>
      <Navbar />
      <div className='ContainerCss'>
        {show && (
          <>
            <div style={{ backgroundColor: "white", width: "90%", height: "90%", position: "fixed", display: "flex", zIndex: 2, borderRadius: 30, marginTop: 70, marginLeft: "5rem" }}>
              <Form RecordViolation={() => setShow(!show)} onClick={() => setShow(!show)} />
            </div>
            <div style={{ backgroundColor: "black", width: "100%", height: "200%", position: "fixed", display: "flex", zIndex: 1, opacity: "60%" }}></div>
          </>
        )}
        <div className='InnerContainer'>
          <div>
            <div style={{ position: "absolute", display: "flex", marginLeft: "5rem" }}>
              {renderProfileImage()}
            </div>
            <div style={{ marginLeft: "15rem" }}>
              <h1>{users.first_name + " " + users.last_name}</h1>
              <h4 style={{ fontWeight: "normal", fontSize: 20, marginTop: -10 }}>{users.email}</h4>
            </div>
            <div style={{ height: 5, width: "90%", backgroundColor: "black", display: "flex", position: "absolute", marginLeft: "5rem", marginTop: "1rem", flexDirection: "column" }}></div>
          </div>
          <div style={{ marginLeft: "-30rem" }}>
            <ViolationCompile />
          </div>
          <div style={{ position: "fixed", display: "absolute", marginLeft: 10 }}>
            <Button variant='contained' onClick={() => setShow(!show)} style={{height: 60, width: "10rem", backgroundColor:'#64DAFF', display:"flex", position:"absolute", marginTop: "10rem", marginLeft:"85rem"}}>PROCEED</Button> 
          </div>
              
        </div>
      </div>
    </>
  );
};

export default Home;