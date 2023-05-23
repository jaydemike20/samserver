import React, { useState, useEffect } from 'react';
import V1 from './V1';
import V2 from './V2';
import V3 from './V3';
import V4 from './V4';
import C1 from './../../Images/V1.png'
import C2 from './../../Images/V2.png'
import C3 from './../../Images/V3.png'
import C4 from './../../Images/V4.png'


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

    return (
        <div>
            <div style={{display:"flex", position:"absolute", flexDirection:"column", marginLeft: 75, marginTop:"10rem"}}>
                <div>
                  <img src={C1}></img>
                </div>
                <div style={{marginLeft: 5}}>
                  <label>
                    <input type="checkbox" value="Driving without a license in the Philippines " onChange={handleCheckboxChange} />
                    Driving without a license in the Philippines
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" value="LTO penalty for not wearing seatbelt in the Philippines" onChange={handleCheckboxChange} />
                    LTO penalty for not wearing seatbelt in the Philippines
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" value="Driving under the impact of alcohol/dangerous drugs" onChange={handleCheckboxChange} />
                    Driving under the impact of alcohol/dangerous drugs
                  </label>
                  <br />                  
                  <label>
                    <input type="checkbox" value="Careless driving " onChange={handleCheckboxChange} />
                    Careless driving
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" value="Illegal parking fine" onChange={handleCheckboxChange} />
                    Illegal parking fine
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" value="Disobeying traffic llights like beating the red light penalty" onChange={handleCheckboxChange} />
                    Disobeying traffic llights like beating the red light penalty
                  </label> 
                  <br />                  
                  <label>
                    <input type="checkbox" value="Driving in the prohibilited roads" onChange={handleCheckboxChange} />
                    Driving in the prohibilited roads
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" value="Failure to darken the headlamps" onChange={handleCheckboxChange} />
                    Failure to darken the headlamps
                  </label>
                  <br />                  
                  <label>
                    <input type="checkbox" value="Illegal turn or overtaking" onChange={handleCheckboxChange} />
                    Illegal turn or overtaking
                  </label> 
                </div>
              </div>
              <div style={{display:"flex", position:"absolute", flexDirection:"column", marginLeft: 75, marginTop:"55rem"}}>
                <div>
                  <img src={C2}></img>
                </div>
                <div style={{marginLeft: 5}}>
                  <label>
                    <input type="checkbox" value="Violation 1" onChange={handleCheckboxChange} />
                    Violation 1
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" value="Violation 2" onChange={handleCheckboxChange} />
                    Violation 2
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" value="Violation 3" onChange={handleCheckboxChange} />
                    Violation 3
                  </label>
                </div>
              </div>

              <div style={{display:"flex", position:"absolute", flexDirection:"column", marginLeft: 75, marginTop:"80rem"}}>
                <div>
                  <img src={C3}></img>
                </div>
                <div style={{marginLeft: 5}}>
                  <label>
                    <input type="checkbox" value="Violation 1" onChange={handleCheckboxChange} />
                    Violation 1
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" value="Violation 2" onChange={handleCheckboxChange} />
                    Violation 2
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" value="Violation 3" onChange={handleCheckboxChange} />
                    Violation 3
                  </label>
                </div>
              </div>

              <div style={{display:"flex", position:"absolute", flexDirection:"column", marginLeft: 75, marginTop:"105rem"}}>
                <div>
                  <img src={C4}></img>
                </div>
                <div style={{marginLeft: 5}}>
                <label>
                  <input type="checkbox" value="Violation 1" onChange={handleCheckboxChange} />
                  Violation 1
                </label>
                <br />
                <label>
                  <input type="checkbox" value="Violation 2" onChange={handleCheckboxChange} />
                  Violation 2
                </label>
                <br />
                <label>
                  <input type="checkbox" value="Violation 3" onChange={handleCheckboxChange} />
                  Violation 3
                </label>
                <h3>Selected Violations:</h3>
                {selectedViolations.map((violation, index) => (
                  <div key={index}>{violation}</div>
                ))}
                </div>
              </div>
        </div>
    );
}

export default ViolationCompile;