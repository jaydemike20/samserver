import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import './css/home.css'
import Chart from './components/Chart';
import Legend from './components/Legend';
import TotalViolation from './components/TotalViolation';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios';

function History(props) {
  const token = localStorage.getItem('token');
  const [violators, setViolators] = useState([]);

  
useEffect(() => {
    axios.get("https://jaydemike21.pythonanywhere.com/api/v1/tickets/traffictickets/", {
      headers: {
        "Authorization": `Token ${token}`
      }
    })
      .then(response => {
        console.log("Traffic Tickets:", response.data);
        const trafficTickets = response.data;
  
        // Extract the unique driver primary keys
        const driverPKs = [...new Set(trafficTickets.map(violator => violator.driver))];
  
        // Create an array to store the driver information
        const driversData = [];
  
        // Fetch driver information for each primary key
        Promise.all(
          driverPKs.map(pk =>
            axios.get(`https://jaydemike21.pythonanywhere.com/api/v1/tickets/drivers/${pk}/`, {
              headers: {
                "Authorization": `Token ${token}`
              }
            }).then(response => response.data) // Extract driver data from the response
          )
        )
          .then(responses => {
            // Map the driver data with their respective primary keys
            driversData.push(...responses);

  
            // Map the traffic tickets with the corresponding driver information
            const updatedViolators = trafficTickets.map(violator => {
              const driver = driversData.find(driver => driver.license_number === violator.driver);
  
              return {
                ...violator,
                driverFirstName: driver ? driver.first_name : "",
                driverLastName: driver ? driver.last_name : ""
              };
            });
  
            // Update the state with the updated violators array
            setViolators(updatedViolators);

          })
          .catch(error => {
            // Handle errors
            console.error("Error fetching driver information:", error);
          });
      })
      .catch(error => {
        // Handle errors
        console.error("Error fetching traffic tickets:", error);
      });
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  
  
  return (
    <div>
      <Navbar></Navbar>
      <div className='ContainerCss'>
        <div className='InnerContainer'>
          <div style={{ backgroundColor: "#D9F3FF", boxShadow: "1px 1px 34px 1px #75D4FF", display: "flex", position: "absolute", width: "94rem", height: 60, justifyContent: "center", marginTop: "0" }}>
            <h3>TRACK RECORD</h3>
          </div>
          <div style={{ backgroundColor: "white", width: "94rem", height: "48.6rem", display: "flex", position: "absolute", marginTop: "5rem", borderRadius: 20, padding: 30, flexDirection: "column" }}>
          <div style={{backgroundColor:"white", position:"fixed", width:"75%", padding: 10}}>
              <TextField
                        label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{width: "20rem"}}
                      />
            </div>
          <TableContainer style={{marginTop: 90}}>
            <Table sx={{ minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell style={{width: "15rem", textAlign:"center"}}>Driver's Name</TableCell>
                  <TableCell style={{width: "10rem"}}>License Number</TableCell>
                  <TableCell style={{textAlign:"center"}}>Violation Type</TableCell>
                  <TableCell style={{textAlign:"center"}}>Remarks</TableCell>
                  <TableCell style={{width: "15rem", textAlign:"center"}}>Issued Date & Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
  {violators
    .filter((violator) => {
      const fullName = `${violator.driverFirstName} ${violator.driverLastName}`;
      return (
        fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        violator.driver.includes(searchQuery)
      );
    })
    .slice()
    .reverse()
    .map((violator, index) => {
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
          <TableCell component="th" scope="row">{index + 1}</TableCell>
          <TableCell>{`${violator.driverFirstName} ${violator.driverLastName}`}</TableCell>
          <TableCell  style={{width: 20}}>{violator.driver}</TableCell>
          <TableCell style={{width: "30rem"}}>
            {violationList}
          </TableCell>
          <TableCell>{violator.remarks}</TableCell>
          <TableCell>{violator.issued}</TableCell>
        </TableRow>
      );
    })}
</TableBody>






            </Table>
          </TableContainer>
          </div>
        </div>
      </div>

            
        </div>
    );
}

export default History;