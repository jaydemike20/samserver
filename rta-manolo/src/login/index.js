import './component/css/index.css'
import { useNavigate } from 'react-router-dom';
import SignBtn from './component/SignBtn';
import InputBox from './component/InputBox';
import {useState} from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import KeyIcon from '@mui/icons-material/Key';
import Images from './../Images/people.png'
import { Button, TextField } from '@mui/material';
import ForgotPass from './component/ForgotPass';
import axios from 'axios'
import { useEffect } from 'react';

function Login({ setIsAuthenticated }) {
  const navigation = useNavigate()
  const [activeTab, setActiveTab] = useState('SignIn');
  const [show, setShow] = useState(false)
  const handleButtonClick = (tab, button) => {
    setActiveTab(tab);
  };


  // FOR LOGIN
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const handleLogin = () => {
    axios.post("https://jaydemike21.pythonanywhere.com/api/v1/accounts/token/login", data).then(response => {
      // saving profile info in redux
      // dispatch(setToken(response.data.auth_token))
      // dispatch(setLogin());

      localStorage.setItem('token', response.data.auth_token)
      console.log(data)
      setIsAuthenticated(true)      
      navigation("/home")

    }).catch(error => {
        alert("Something is Wrong. Please Try Again")
    })
  }

  // FOR REGISTRATION
  const [registerData, setRegisterData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: ''
  })

  const handleRegistration = () => {

    axios.post("https://jaydemike21.pythonanywhere.com/api/v1/accounts/users/", registerData, {
      
    }).then(response => {

      alert("Successfully Registered. Please check your email for confirmation")
      console.log(response.registerData);

      // empty the data
      setRegisterData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          password2: ""
        });

  }).catch(error => {
    alert("Something is Wrong. Please Try Again")
    console.log(error)
  })


  }
  // Check if the user is already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');
    if (isAuthenticated) {
      setIsAuthenticated(true);
      navigation("/home");
    }
  }, [setIsAuthenticated, navigation]);

    return (
      <div>
        {show ? (
          <>
          <ForgotPass onClick={() => setShow(!show)}></ForgotPass>
          </>
        ): null}
        
        <body className='container'>
          {/*Black Container*/}
          <div className='blackContainer'>
            <div>
              <div>
                <div >
                    <h1 >WELCOME</h1>
                    <h1 className='SEG'>GEMS Prototype</h1>
                </div>
                <div style={{marginTop: 20, marginBottom: 20}}>
                <SignBtn
                    onClick={() => handleButtonClick('SignIn')}
                    title="Sign In"
                    active={activeTab === 'SignIn'}
                />
                <SignBtn
                    onClick={() => handleButtonClick('SignUp')}
                    title="Sign Up"
                    active={activeTab === 'SignUp'}
                />
                </div>

                <div className="signInForm">
                  {activeTab === "SignIn" && 
                    <div>
                    <div>
                    <div style={{marginTop: 20, marginBottom: 20}}>
                      <InputBox 
                      label="Email"
                      type="email"
                      value={data.email}
                      onChange={(text) => {

                        setData({
                          ...data,
                          "email": text.target.value
                        })


                      }}

                      InputProps={{ 
                        style: { 
                            border: 'none',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                        },
                        startAdornment: (
                            <LocalPostOfficeIcon />
                        ),
                    }}
                      ></InputBox>
                    </div>
                    <div style={{marginTop: 20, marginBottom: 20}}>
                      <InputBox 
                      label="Password"
                      type="password"
                      value={data.password}
                      onChange={(e) => {
                        setData({
                          ...data, "password" : e.target.value
                        })
                      }}                      
                      InputProps={{ 
                        style: { 
                            border: 'none',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                        },
                        startAdornment: (
                            <KeyIcon />
                        ),
                    }}
                      ></InputBox>
                    </div>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                      <Button onClick={handleLogin} className='SignIn' variant='contained'>Sign In</Button>
                      <Button onClick={() => setShow(!show)} style={{marginBottom: 30, marginTop: 30}}>Forgot Password?</Button>
                    </div>
                  </div>
                  }
                </div>
                
                {activeTab === "SignUp" && 
                  <div>
                    <h4>Create New Account</h4>
                  <div>
                    <div style={{marginTop: 20, marginBottom: 20}}>
                      <InputBox 
                      label="First Name"
                      value={registerData.first_name}
                      onChange={(e) => {
                        setRegisterData({
                          ...registerData,
                          "first_name": e.target.value
                        })
                      }}
                      InputProps={{ 
                        style: { 
                            border: 'none',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                        },
                        startAdornment: (
                            <PersonIcon />
                        ),
                    }}
                      ></InputBox>
                    </div>
                    <div style={{marginTop: 20, marginBottom: 20}}>
                      <InputBox label="Last Name"
                      value={registerData.last_name}
                      onChange={(e) => {
                        setRegisterData({
                          ...registerData,
                          "last_name": e.target.value
                        })
                      }}                      
                      InputProps={{ 
                        style: { 
                            border: 'none',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                        },
                        startAdornment: (
                            <PersonIcon />
                        ),
                    }}
                      ></InputBox>
                    </div>
                    <div style={{marginTop: 20, marginBottom: 20}}>
                      <InputBox 
                      label="Email"
                      type="email"
                      value={registerData.email}
                      onChange={(e) => {
                        setRegisterData({
                          ...registerData,
                          "email": e.target.value
                        })
                      }}                      
                      InputProps={{ 
                        style: { 
                            border: 'none',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                        },
                        startAdornment: (
                            <LocalPostOfficeIcon />
                        ),
                    }}
                      ></InputBox>
                    </div>
                    <div style={{marginTop: 20, marginBottom: 20}}>
                      <InputBox 
                      label="Password"
                      type="password"
                      value={registerData.password}
                      onChange={(e) => {
                        setRegisterData({
                          ...registerData,
                          "password": e.target.value
                        })
                      }}                      
                      InputProps={{ 
                        style: { 
                            border: 'none',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                        },
                        startAdornment: (
                            <KeyIcon />
                        ),
                    }}
                      ></InputBox>

                    </div>
                    <div style={{marginTop: 20, marginBottom: 20}}>
                        <InputBox 
                        label="Confirm Password"
                        type="password"
                        value={registerData.password2}
                        onChange={(e) => {
                          setRegisterData({
                            ...registerData,
                            "password2": e.target.value
                          })
                        }}                      
                        InputProps={{ 
                          style: { 
                              border: 'none',
                              backgroundColor: 'white',
                              borderRadius: '5px',
                          },
                          startAdornment: (
                              <KeyIcon />
                          ),
                        }}
                        ></InputBox>

                    </div>
                  </div>
                  <div style={{display:"flex", flexDirection:"column"}}>
                      <Button onClick={handleRegistration} className='SignUp' variant='contained'>Sign Up</Button> </div>
                </div>
                }

              </div>
            </div>            

          </div>
          {/* <img src={Images} style={{zIndex: 2, width: "35rem", height: "25rem", marginLeft: "30rem", marginTop: "19rem", position:"fixed"}}></img> */}

        </body>
      </div>
      );
    }

export default Login;

