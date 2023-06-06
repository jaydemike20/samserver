import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import './css/home.css'
import { Button, TextField } from '@mui/material';
import { SearchOutlined } from '@material-ui/icons';
import PlateTextField from './components/PlateTextField';
import SearchViolation from './components/SearchViolation';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Search = () => {
  const [show, setShow] = useState(false)
  const [licenseNumber, setLicenseNumber] = useState('')
  const [driver, setDriver] = useState([])
  const [driverViolations, setDriverViolations] = useState([])

  const token = localStorage.getItem('token')


const handleSearch = () => {
  axios.get(`https://jaydemike21.pythonanywhere.com/api/v1/tickets/drivers/${licenseNumber}/`, {
    headers: {
      "Authorization": `Token ${token}`
    }
  }).then((response) => {
    console.log(response.data);
    setDriver(response.data)

      axios.get(`https://jaydemike21.pythonanywhere.com/api/v1/tickets/traffictickets/`, {
        headers: {
          "Authorization": `Token ${token}`
        }
      }).then((response) => {
        const data = response.data;

        const filteredData = data.filter(ticket => ticket.driver === licenseNumber);
        // Save the filteredData in localStorage
        console.log(filteredData)
        setDriverViolations(filteredData)
        setShow(!show); // Move the setShow statement inside the .then block

      }).catch(error => {
        console.log('Error', error);
      })
  }).catch((error)=> {
    alert("Please Try Again")

  });
};

const handleClear = () => {
  setLicenseNumber(''); // Clear the license number field
  setDriver([]); // Clear the driver data
  setDriverViolations([]); // Clear the driver violations data
  setShow(false); // Hide the search results  
}

  return (
    <>
    <Navbar></Navbar>
    <div className='ContainerCss'>
      <div className='SearchContainer'>

        <div style={{display:"flex", position:"absolute"}}>
          <h1>ENTER LICENSE NUMBER</h1>
        </div>
        <div style={{position:"absolute", display:"flex", marginTop: "5rem", marginLeft:"-30rem"}}>
        <PlateTextField value={licenseNumber} onChange={(event) => {
          setLicenseNumber(event.target.value)
        }}></PlateTextField>
      </div>

        <div style={{position:"absolute", display:"flex", marginTop:"15rem", flexDirection:"column", alignItems: "center"}}>
          
          {show ? (
            <>
            <div>
              <h1>{driver.first_name} {driver.last_name}</h1>
            </div>
            <div>
              <h3 style={{color:"red"}}>EXISTING VIOLATION</h3>
            </div>
            <div>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Violation Type</TableCell>
                    <TableCell align="center">Location</TableCell>
                    <TableCell align="center">Issued Date & Time</TableCell>
                    <TableCell align="center">Fines</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {driverViolations.slice().reverse().map((violator, index) => {
                    const violationTypes = violator.violation_type
                      .replace('[', '')
                      .replace(']', '')
                      .split(',')
                      .map((type) => type.trim());
                      
                    const violationList = violationTypes.map((type, typeIndex) => (
                      <div key={`${violator.driver}-${typeIndex}`} style={{ marginBottom: '4px' }}>
                        <span style={{ paddingRight: '8px' }}>{typeIndex + 1}.</span>
                        <span>{type}</span>
                      </div>
                    ));

                    return (
                      <TableRow key={index}>
                        <TableCell >{violationList}</TableCell>
                        <TableCell align="center">{violator.location}</TableCell>
                        <TableCell align="center">{violator.issued}</TableCell>
                        <TableCell align="center">{violator.fine_amount}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>

              </Table>
            </TableContainer>




            </div>
            </>
          ):null}
          
        </div>
        

        <div style={{display:"flex", position:"absolute", marginLeft:"10px", marginTop: "10rem"}}>
          <Button onClick={handleSearch} variant='contained'style={{marginRight:35, width: "14rem", height: "3rem", backgroundColor:"#83F0FB"}}>SEARCH</Button>
          <Button onClick={handleClear} variant='contained'style={{marginRight:10, width: "14rem", height: "3rem", backgroundColor:"red"}}>CLEAR</Button>
        </div>

      </div>
    </div>
    </>
  );
};
  
export default Search;