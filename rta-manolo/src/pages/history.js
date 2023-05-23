import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import './css/home.css'
import Chart from './components/Chart';
import Legend from './components/Legend';
import TotalViolation from './components/TotalViolation';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

function History(props) {
  const token = localStorage.getItem('token');
  const [violators, setViolators] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8000/api/v1/tickets/traffictickets/", {
//       headers: {
//         "Authorization": `Token ${token}`
//       }
//     }).then(response => {
//         setViolators(response.data)
//         console.log(response.data)
//     });
//   }, []);
  
useEffect(() => {
    axios.get("http://localhost:8000/api/v1/tickets/traffictickets/", {
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
            axios.get(`http://localhost:8000/api/v1/tickets/drivers/${pk}/`, {
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
  
  
  return (
    <div>
      <Navbar></Navbar>
      <div className='ContainerCss'>
        <div className='InnerContainer'>
          <div style={{ backgroundColor: "#D9F3FF", boxShadow: "1px 1px 34px 1px #75D4FF", display: "flex", position: "absolute", width: "94rem", height: 60, justifyContent: "center", marginTop: "0" }}>
            <h3>TRACK RECORD</h3>
          </div>
          <div style={{ backgroundColor: "white", width: "94rem", height: "30rem", display: "flex", position: "absolute", marginTop: "5rem", borderRadius: 20, padding: 30, flexDirection: "column" }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell >Driver's Name</TableCell>
                    <TableCell align="center">License Number</TableCell>
                    <TableCell align="center">Violation Type</TableCell>
                    <TableCell align="center">Remarks</TableCell>
                    <TableCell align="center">Issued Date & Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {violators.map((violator, index) => (
                    <TableRow key={index}>
                    <TableCell component="th" scope="row">
                    {`${violator.driverFirstName} ${violator.driverLastName}`}
                    </TableCell>
                      <TableCell align="center">{violator.driver}</TableCell>
                      <TableCell align="center">{violator.violation_type}</TableCell>
                      <TableCell align="center">{violator.remarks}</TableCell>
                      <TableCell align="center">{violator.issued}</TableCell>
                    </TableRow>
                  ))}
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