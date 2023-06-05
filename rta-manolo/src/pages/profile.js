    import Navbar from '../Navbar';
    import React, { useState, useEffect } from 'react';
    import './css/home.css'
    import Profile from './../Images/profile.png'
    import InputBox from './../login/component/InputBox'
    import { Button } from '@mui/material';
    import { Edit } from '@mui/icons-material';
    import People from './../Images/people.png'
    import axios from 'axios';
    import ReactDatePicker from 'react-datepicker';
    import 'react-datepicker/dist/react-datepicker.css';

    const Profiles = () => {
      // get token
      const token = localStorage.getItem('token')

      const [save, setSave] = useState(false)
      const [edit, setEdit] = useState(true)
      const [pass, setPass] = useState(false)
      const [passbtn, setPassBtn] = useState(true)
      const [savePass, setSavePass] = useState(false)

      // get info
      const [users, setUsers] = useState({})
      const [fetchProfile, setFetchProfile] = useState({})
      const [profile, setProfile] = useState({})

      const [birthday, setBirthday] = useState(null); // Initialize with null instead of an empty string
      
      const handleDateChange = (date) => {
        setBirthday(date);
      
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
      
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
      axios.get("http://localhost:8000/api/v1/accounts/users/me/", {
          headers:{
              "Authorization": `Token ${token}`
          }
      }).then(response => {
          setUsers(response.data)
      })
    }, [])

      useEffect(() => {
          axios.get("http://localhost:8000/api/v1/accounts/profile/", {
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
          return <img src={fetchProfile.profilepic} style={{width: 250, borderRadius: 50}} alt="Profile"></img>;
        } else {
          return <img src={Profile} alt="Default Profile"></img>;
        }
      };

      const renderProfileInfo = () => {
        if (fetchProfile) {
          return (
            <div>
              <p>Gender: {fetchProfile.gender}</p>
              <p>Birthdate: {fetchProfile.birthdate}</p>
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
          axios.post('http://localhost:8000/api/v1/accounts/profile/', profile, {
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
          axios.patch(`http://localhost:8000/api/v1/accounts/profile/${fetchProfile.id}/`, profile, {
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
        axios.post("http://localhost:8000/api/v1/accounts/users/set_password/", changePassword, {
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
          <div style={{position:"absolute", display:"flex", marginLeft: "43.5rem", flexDirection:"column"}}>
                <div>
                  {renderProfileImage()}
                </div>
            <div style={{marginLeft: "-5rem"}}>
              <h1>{users.first_name + ' ' + users.last_name}</h1>
              <p>{users.email}</p>
              <div style={{ marginTop: "1rem" }}>
                {renderProfileInfo()}
              </div>          
            </div>

          </div>

            
            {save ?(
            <>
            <div style={{position:"absolute", display:"flex", marginLeft: "17rem", marginTop:"15rem"}}>
              <div>
                <div>
                    <ReactDatePicker
                      selected={birthday}
                      onChange={handleDateChange}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select a date"
                    />
                  </div>
                <div>
                  <InputBox  type="text" placeholder="Gender" onChange={(event) => {
                    setProfile({
                      ...profile, "gender": event.target.value
                    })
                  }}></InputBox>
                  </div>
                  <input type="file" onChange={handleImageChange} />
                  <div>
                    <button onClick={handleEditProfile}>Save</button>
                  </div>
              </div>
              <div>

              </div>
            </div>
            </>):null}

            {pass ?(
            <>
            <div style={{position:"absolute", display:"flex", marginTop:"15rem", flexDirection:"column", width:"96%", alignItems:"center"}}>
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
                    <button onClick={handleChangePassword}>Change Password</button>
                  </div>
            </div>
            </>):null}


            <div>
              {edit ? (
                <>
                  <div style={{marginTop:"12rem", marginLeft: "17rem"}}><Button onClick={() => setEdit(!edit) & setSave(!save) & setPassBtn(!passbtn) } variant='contained'>EDIT PROFILE</Button></div>
                </>
              ):null}

              {save ? (
                <>
                  <div style={{marginTop:"12rem", marginLeft: "17rem"}}><Button  style={{backgroundColor:"#00B050"}} onClick={() => setEdit(!edit) & setSave(!save) & setPassBtn(!passbtn)} variant='contained'>CLOSE</Button></div>
                </>
              ):null}

              {savePass ? (
                <>
                  <div style={{marginTop:"12rem", marginLeft: "17rem"}}><Button  style={{backgroundColor:"#00B050"}} onClick={() => setSavePass(!savePass) & setPass(!pass) & setEdit(!edit) & setPassBtn(!passbtn) } variant='contained'>CLOSE</Button></div>
                </>
              ):null}

              {passbtn ? (
                <>
                  <div style={{marginTop:"12rem", marginLeft: "17rem"}}><Button  style={{backgroundColor:"#00B050"}} onClick={() => setEdit(!edit) & setPass(!pass) & setSavePass(!savePass) & setPassBtn(!passbtn)} variant='contained'>UPDATE PASSWORD</Button></div>
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