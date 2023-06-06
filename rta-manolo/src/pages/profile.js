import Navbar from '../Navbar';
import React, { useState, useEffect, useRef } from 'react';
import './css/home.css'
import Profile from './../Images/profile.png'
import InputBox from './../login/component/InputBox'
import { Button, FormHelperText, Icon } from '@mui/material';
import People from './../Images/people.png'
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import EditIcon from '@material-ui/icons/Edit';
import LockIcon from '@material-ui/icons/Lock';
import { FormControl, Input, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Save } from '@material-ui/icons';

    const Profiles = () => {
      // get token
      const token = localStorage.getItem('token')
      const fileInputRef = useRef(null);
      const handleButtonClick = () => {
        fileInputRef.current.click();
      };


      const [save, setSave] = useState(false)
      const [edit, setEdit] = useState(true)
      const [pass, setPass] = useState(false)
      const [passbtn, setPassBtn] = useState(true)
      const [savePass, setSavePass] = useState(false)

      // get info
      const [users, setUsers] = useState({})
      const [fetchProfile, setFetchProfile] = useState({})
      const [profile, setProfile] = React.useState({
        birthdate: ''
      });
      
      const [birthday, setBirthday] = React.useState(null);
      // Initialize with null instead of an empty string
      
      const handleDateChange = (event) => {
        const date = event.target.value;
        setBirthday(date);
    
        // Format the date to the desired format
        const formattedDate = date; // Customize the date format as needed
    
        setProfile({
          ...profile,
          birthdate: formattedDate
        });
      };

      const [changePassword, setChangePassword] = useState({
        new_password: '',
        re_new_password: '',
        current_password: ''
      })
      
      const [isEmpty, setIsEmpty] = useState(true);

      


    // get user info



    useEffect(() => {
      axios.get("https://jaydemike21.pythonanywhere.com/api/v1/accounts/users/me/", {
          headers:{
              "Authorization": `Token ${token}`
          }
      }).then(response => {
          setUsers(response.data)
      })
    }, [])

      useEffect(() => {
          axios.get("https://jaydemike21.pythonanywhere.com/api/v1/accounts/profile/", {
              headers:{
                  "Authorization": `Token ${token}`
              }
          }).then(response => {

              if (response.data.profile === null) {
                setIsEmpty(true);
                setProfile({
                  gender: '',
                  birthdate: '', 
                  profilepic: '', // Set profilepic to an empty string
                });
                console.log('empty')
              } else {
                setFetchProfile(response.data[0])
                setProfile({
                  id: response.data[0].id,
                  gender: '',
                  birthdate: '', 
                  profilepic: '', // Set profilepic to an empty string
                });
                setIsEmpty(false);
                console.log('not empty')
              }


          })
      }, [])


      const renderProfileImage = () => {
        if (fetchProfile) {
          return <img src={fetchProfile.profilepic} style={{width: 200, height: 200, borderRadius: "100%"}} alt="Profile"></img>;
        } else {
          return <img src={Profile} alt="Default Profile"></img>;
        }
      };

      const renderProfileInfo = () => {
        if (fetchProfile) {
          return (
            <div>
              <p>Birthdate: {fetchProfile.birthdate}</p>
              <p>Gender: {fetchProfile.gender}</p>
            </div>
          );
        } else {
          return (
            <div>
              <p>Gender: undefined</p>
              <p>Birthdate: undefined</p>
            </div>
          );
        }
      };

      const handleImageChange = (event) => {
        const file = event.target.files[0];
        setProfile({
          ...profile,
          profilepic: file
        });
      };



      // edit profile

      const handleEditProfile = () => {

        console.log("profile", {profile})

        if (isEmpty) {
          // If the profile is null, perform a POST request to create a new profile
          axios.post('https://jaydemike21.pythonanywhere.com/api/v1/accounts/profile/', profile, {
            headers: {
              "Authorization": `Token ${token}`,
              'Content-Type': 'multipart/form-data',
            }
          }).then((response) => {
            alert("Profile Created Successfully");
            setProfile({
              gender: '',
              birthdate: '',
              profilepic: null
            });
            setIsEmpty(false)
        
          }).catch((error) => {
            alert("There's something wrong!");
            console.log(error.data)
            // console.log(profile);
          });
          console.log("empty")
        } else {
          // If the profile exists, perform a PUT request to update the existing profile
          axios.patch(`https://jaydemike21.pythonanywhere.com/api/v1/accounts/profile/${fetchProfile.id}/`, profile, {
            headers: {
              "Authorization": `Token ${token}`,
              'Content-Type': 'multipart/form-data',
            }
          }).then((response) => {
            alert("Profile Updated Successfully");
            setProfile({
              gender: '',
              birthdate: '',
              profilepic: null
            });
            setIsEmpty(false)
      
      
          }).catch((error) => {
            alert("Please Do Change All fields");
            console.log(profile);
            console.log(error)
          });
      
        }

      }

      const handleChangePassword = () => {
        axios.post("https://jaydemike21.pythonanywhere.com/api/v1/accounts/users/set_password/", changePassword, {
          headers: {
            "Authorization": `Token ${token}`
          }
        }).then((response) => {
          alert("Your Password Successfully Changed");

        }).catch((error) => {
          alert("There is something wrong");

        })

      }

      return (
        <>
        <Navbar></Navbar>
        <div className='ContainerCss'>
          <div className='InnerContainer'>
          {edit ? (
            <>
            <div style={{ position: "absolute", display: "flex", marginLeft: "43.5rem", flexDirection: "column", marginTop: 30}}>
              <div style={{alignSelf:"center"}}>
                {renderProfileImage()}
              </div>
              <div style={{}}>
                <h1 style={{ textTransform: "capitalize", textAlign:"center" }}>{users.first_name} {users.last_name}</h1>
                <p style={{textAlign:"center"}}>{users.email}</p>
                <div style={{ marginTop: "1rem", textAlign:"center" }}>
                  {renderProfileInfo()}
                </div>          
              </div>
            </div>
            </>
          ) : null}
          



            
            {save ?(
            <>
            <div style={{position:"absolute", display:"flex", marginTop:"15rem", marginLeft: "25rem"}}>
              
              <div style={{padding: 20, display:"flex", flexDirection:"row"}}>
                <div>
                <TextField
                style={{width: "20rem", variant:"Desktop"}}
                  label="Select a date"
                  type="date"
                  value={birthday}
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                   
                  </div>
                <div style={{marginLeft: 20}}>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">Gender</InputLabel>
                      <Input
                        id="standard-adornment-amount"
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                        onChange={(event) => {
                          setProfile({
                            ...profile, "gender": event.target.value
                          })
                        }}
                      />
                  </FormControl>
                </div>
                <div style={{marginLeft: 20}}>
                  <input
                    type="file"
                    accept=".jpg,.png"
                    onChange={handleImageChange}
                    multiple
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                  />
                  <Button style={{height: 50, borderRadius: 50}} variant="contained" color="primary" startIcon={<CloudUploadIcon></CloudUploadIcon>} onClick={handleButtonClick}>
                    Upload Image
                  </Button>
                </div>      
              </div>
              <div>
                <Button startIcon={<Save style={{fontSize: 30, marginLeft: 12, color: "#00B050"}}></Save>}  onClick={handleEditProfile}></Button>
              </div>
            </div>
            </>):null}

            {pass ?(
            <>
            <div style={{position:"absolute", display:"flex", marginTop:"7rem", flexDirection:"column", width:"96%", alignItems:"center"}}>
              <div>
                <div style={{marginRight: 10, marginBottom: 20}}><InputBox type="password" label="Old Password" value={changePassword.current_password} onChange={(text) => {
                  setChangePassword({
                    ...changePassword, current_password: text.target.value
                  })
                }}></InputBox></div>
              </div>
              <div>
                <div style={{marginRight: 10, marginBottom: 20}}><InputBox type="password" label="New Password" value={changePassword.new_password} onChange={(text) => {
                  setChangePassword({
                    ...changePassword, new_password: text.target.value
                  })
                }} ></InputBox></div>
              </div>
              <div>
                <div style={{marginRight: 10, marginBottom: 20}}><InputBox type="password" label="Confirm New Password" value={changePassword.re_new_password} onChange={(text) => {
                  setChangePassword({
                    ...changePassword, re_new_password: text.target.value
                  })
                }}></InputBox></div>
              </div>
              <div>
                <Button variant='contained' style={{backgroundColor:"#00B050"}} startIcon={<Save style={{fontSize: 30, marginLeft: 12, color: "white"}}></Save>}  onClick={handleChangePassword}>SAVE</Button>
              </div>
            </div>
            </>):null}


            <div>
              {edit ? (
                <>
                  <div style={{marginTop:"12rem", marginLeft: "3rem"}}><Button style={{borderRadius:40, height: 60, width: "12.5rem"}} startIcon={<EditIcon />} onClick={() => setEdit(!edit) & setSave(!save) & setPassBtn(!passbtn) } variant='contained'>EDIT PROFILE</Button></div>
                </>
              ):null}

              {save ? (
                <>
                  <div style={{marginTop:"12rem", marginLeft: "3rem"}}><Button  style={{backgroundColor:"red", width: "12.5rem", borderRadius:40, height: 60}} onClick={() => setEdit(!edit) & setSave(!save) & setPassBtn(!passbtn)} variant='contained'>CLOSE</Button></div>
                </>
              ):null}

              {savePass ? (
                <>
                  <div style={{marginTop:"12rem", marginLeft: "3rem"}}><Button  style={{backgroundColor:"red", width: "12.5rem", borderRadius:40, height: 60}} onClick={() => setSavePass(!savePass) & setPass(!pass) & setEdit(!edit) & setPassBtn(!passbtn) } variant='contained'>CLOSE</Button></div>
                </>
              ):null}

              {passbtn ? (
                <>
                  <div style={{marginTop: 10, marginLeft: "3rem"}}><Button  style={{backgroundColor:"#00B050", borderRadius:40, height: 60}} startIcon={<LockIcon/>} onClick={() => setEdit(!edit) & setPass(!pass) & setSavePass(!savePass) & setPassBtn(!passbtn)} variant='contained'>UPDATE PASSWORD</Button></div>
                </>
              ): null}
              
              
            </div>
            
            
            <div style={{marginTop: "30rem", marginLeft: "27rem", position:"absolute", display:"flex"}}>
              <img src={People}></img>
            </div>
            
          </div>
        </div>
        </>
      );
    };
      
    export default Profiles;