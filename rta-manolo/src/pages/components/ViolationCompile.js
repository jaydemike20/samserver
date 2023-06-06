import React, { useState, useEffect } from 'react';
import V1 from './V1';
import V2 from './V2';
import V3 from './V3';
import V4 from './V4';
import C1 from './../../Images/V1.png'
import C2 from './../../Images/V2.png'
import C3 from './../../Images/V3.png'
import C4 from './../../Images/V4.png'
import CheckBoxes from './CheckBoxes';
import { Icon } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';


function ViolationCompile(props) {
  const [selectedViolations, setSelectedViolations] = useState([]);

  useEffect(() => {
    const storedViolations = localStorage.getItem('selectedViolations');
    if (storedViolations) {
      setSelectedViolations(JSON.parse(storedViolations));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedViolations', JSON.stringify(selectedViolations));
  }, [selectedViolations]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedViolations((prevSelectedViolations) => [...prevSelectedViolations, value]);
    } else {
      setSelectedViolations((prevSelectedViolations) =>
        prevSelectedViolations.filter((violation) => violation !== value)
      );
    }
  };

  const containerHeight = `${15 + selectedViolations.length * 4}%`;

    return (
        <div>
            <div style={{display:"flex", position:"absolute", flexDirection:"column", marginLeft: 75, marginTop:"10rem"}}>
                <div style={{padding: 20, backgroundColor:"white", borderRadius: 10, boxShadow: "1px 1px 10px 1px  rgba(97, 167, 191, 0.5)", width: "25%", height: containerHeight, position:"fixed", marginLeft:"37%"}}>
                  <div><h3 style={{textAlign:"center"}}>Selected Violations:</h3></div>
                        {selectedViolations.map((violation, index) => (
                          <div style={{marginBottom: 15, fontSize: 17}} key={index}>{<FontAwesomeIcon style={{marginRight: 10, color: "red"}} icon={faCar}></FontAwesomeIcon>}{violation}</div>
                        ))}
                </div>
                <div>
                  <img src={C1}></img>
                </div>
                <div style={{marginLeft: 5}}>
                  <label>
                    <CheckBoxes type="checkbox" value="Driving without a license in the Philippines " title="Driving without a license in the Philippines" onChange={handleCheckboxChange} />
                  </label>
                  <br />
                  <label>
                    <CheckBoxes type="checkbox" value="LTO penalty for not wearing seatbelt in the Philippines" title="LTO penalty for not wearing seatbelt in the Philippines" onChange={handleCheckboxChange} />
                  </label>
                  <br />
                  <label>
                    <CheckBoxes type="checkbox" value="Driving under the impact of alcohol/dangerous drugs" title="Driving under the impact of alcohol/dangerous drugs" onChange={handleCheckboxChange} />
                  </label>
                  <br />                  
                  <label>
                    <CheckBoxes type="checkbox" value="Careless driving " title="Careless driving" onChange={handleCheckboxChange} />
                  </label>
                  <br />
                  <label>
                    <CheckBoxes type="checkbox" value="Illegal parking fine" title="Illegal parking fine" onChange={handleCheckboxChange} />

                  </label>
                  <br />
                  <label>
                    <CheckBoxes type="checkbox" value="Disobeying traffic llights like beating the red light penalty" title="Disobeying traffic llights like beating the red light penalty" onChange={handleCheckboxChange} />
                  </label> 
                  <br />                  
                  <label>
                    <CheckBoxes type="checkbox" value="Driving in the prohibilited roads" title="Driving in the prohibilited roads" onChange={handleCheckboxChange} />
                  </label>
                  <br />
                  <label>
                    <CheckBoxes type="checkbox" value="Failure to darken the headlamps" title="Failure to darken the headlamps" onChange={handleCheckboxChange} />
                  </label>
                  <br />                  
                  <label>
                    <CheckBoxes type="checkbox" value="Illegal turn or overtaking" title="Illegal turn or overtaking" onChange={handleCheckboxChange} />
                  </label> 
                </div>
              </div>
              <div style={{display:"flex", position:"absolute", flexDirection:"column", marginLeft: 75, marginTop:"55rem"}}>
                <div>
                  <img src={C2}></img>
                </div>
                <div style={{marginLeft: 5}}>
                  <label>
                    <CheckBoxes type="checkbox" value="Illegal parking fine" title="Illegal parking fine" onChange={handleCheckboxChange} />
                  </label>
                  <br />
                  <label>
                    <CheckBoxes type="checkbox" value="Disobeying traffic lights like beating the red light penalty" title="Disobeying traffic lights like beating the red light penalty" onChange={handleCheckboxChange} />
                  </label>
                  <br />
                  <label>
                    <CheckBoxes type="checkbox" value="Driving in the prohibited roads" title="Driving in the prohibited roads" onChange={handleCheckboxChange} />
                  </label>
                  <br />
                  <label>
                    <CheckBoxes type="checkbox" value="Failure to darken the headlamps" title="Failure to darken the headlamps" onChange={handleCheckboxChange} />
                  </label>
                  <br />
                  <label>
                    <CheckBoxes type="checkbox" value="Illegal turn or overtaking" title="Illegal turn or overtaking" onChange={handleCheckboxChange} />
                  </label>
                </div>
              </div>

              <div style={{display:"flex", position:"absolute", flexDirection:"column", marginLeft: 75, marginTop:"85rem"}}>
                <div>
                  <img src={C3}></img>
                </div>
                <div style={{marginLeft: 5}}>
                  <label>
                    <CheckBoxes type="checkbox" value="Driving without valid vehicle registration" title="Driving without valid vehicle registration" onChange={handleCheckboxChange} />
                  </label>
                  <br />
                  <label>
                    <CheckBoxes type="checkbox" value="Driving an illegally modified car" title="Driving an illegally modified car" onChange={handleCheckboxChange} />
                  </label>
                  <br />
                  <label>
                    <CheckBoxes type="checkbox" value="Running a right-hand car" title="Running a right-hand car" onChange={handleCheckboxChange} />
                  </label>
                </div>
              </div>

              <div style={{display:"flex", position:"absolute", flexDirection:"column", marginLeft: 75, marginTop:"110rem"}}>
                <div>
                  <img src={C4}></img>
                </div>
                <div style={{marginLeft: 5}}>
                <label>
                  <CheckBoxes type="checkbox" value="Driving a car without proper/authorized devices, equipment, accessories or car part" title="Driving a car without proper/authorized devices, equipment, accessories or car part" onChange={handleCheckboxChange} />
                </label>
                <br />
                <label>
                  <CheckBoxes type="checkbox" value="Operating a car with an improper attachment/unauthorized of motor vehicle license plate" title="Operating a car with an improper attachment/unauthorized of motor vehicle license plate" onChange={handleCheckboxChange} />
                </label>
                <br />
                <label>
                  <CheckBoxes type="checkbox" value="Smoke Belching" title="Smoke Belching" onChange={handleCheckboxChange} />
                </label>
                
                
                </div>
              </div>
        </div>
    );
}

export default ViolationCompile;