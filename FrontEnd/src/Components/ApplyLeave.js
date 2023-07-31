import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/ApplyLeave.css'
import sweetalert from 'sweetalert';

const ApplyLeave = () => {
  const empId = sessionStorage.getItem("empId");
  const leavetypeEndpoint = `http://localhost:2023/leavetype`;
  const applyleaveEndpoint = `http://localhost:2023/leave`;
  const initialState = {
    startDate: '',
    endDate: '',
    noOfDays: '',
    leaveType: '',
  };

  const [leaveData, setLeaveData] = useState(initialState);
  const [leaveTypes, setLeaveTypes] = useState([]);
  
  const getConfig = () => {
    const config = {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    };
    return config;
  };
  
  useEffect(() => {
    axios
      .get(leavetypeEndpoint, getConfig())
      .then((response) => {
        setLeaveTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const today = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format
  
    // if (leaveData.startDate <= today) {
    //   //AlertBox
    //   sweetalert("Start date should be after today");
    //   return;
    // }
  
    if (leaveData.endDate < leaveData.startDate) {
      sweetalert("End date Cannot be Before the start date");
      return;
    }
    
    const requestData = {
      empId,
      ...leaveData,
    };
  

    if(leaveData.leaveType !== "SICK" && leaveData.startDate < today)
        {
           sweetalert("Cant Apply Leave For Past Dates ");
        }
   
    axios
      .post(`${applyleaveEndpoint}/applyleave`, requestData, getConfig())
      .then((response) => {
        console.log(response.data);
        // Reset form fields
        setLeaveData(initialState);
        sweetalert("Leave application successful"); // Success alert
        
      })
      .catch((error) => {
        console.log(error);
        sweetalert("Leave application failed"); // Failure alert
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the selected date is a weekend
    if (name === 'startDate' || name === 'endDate') {
      const selectedDate = new Date(value);
      const day = selectedDate.getUTCDay();
      if ([6, 0].includes(day)) {
        sweetalert("Weekends not allowed");
        return;
      }
    }

    setLeaveData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div id='applyleave-card' className="card my-2" style={{borderColor:'black'}}>
      <div className="card-header">
        <h3>Apply for leave</h3>
      </div>
      <div  className="card-body">
        <form className="container" onSubmit={handleSubmit}>
          <div className="mb-3 d-flex flex-column justify-content-center  mx-auto">
            <div className="form-floating mb-3">
              <input
                type="date"
                className="form-control"
                id="startDateInput"
                name="startDate"
                value={leaveData.startDate}
                onChange={handleChange}
                required
              />
              <label htmlFor="startDateInput">From:</label>
            </div>
            <div id='endDate' className="form-floating mb-3">
              <input
                type="date"
                className="form-control"
                id="endDateInput"
                name="endDate"
                value={leaveData.endDate}
                onChange={handleChange}
                required
              />
              <label htmlFor="endDateInput">To:</label>
            </div>
            {/* <div className="form-floating">
              <h5 className="text-center">OR</h5>
            </div>
            <div id='noofDays' className="form-floating mb-3 ">
              <input
                type="number"
                className="form-control"
                id="noOfDays"
                name="noOfDays"
                value={leaveData.noOfDays}
                onChange={handleChange}
                placeholder="Number of Days"
              />
              <label htmlFor="noOfDays">Number of Days</label>
            </div> */}
            <div className="form-floating mb-3 my-5">
              <select
                className="form-select"
                id="leaveType"
                name="leaveType"
                value={leaveData.leaveType}
                onChange={handleChange}
                required
              >
                <option value="">Select Leave Type</option>
                {leaveTypes.map((type) => (
                  <option key={type.leaveId} value={type.leaveType}>
                    {type.leaveType}
                  </option>
                ))}
              </select>
              <label htmlFor="leaveType">Leave Type</label>
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeave;