import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/LeaveRequest.css'

function LeaveRequest() {
   const managerId =sessionStorage.getItem("empId");
  const status = 'pending';
  const endpoint = `http://localhost:2023/leave/leavetomanager/${managerId}/status/${status}`;
  const [userData, setUserData] = useState([]);

  const getConfig = () => {
    const config = {
      headers: {
        "Authorization": sessionStorage.getItem("token"),
      },
    };
    return config;
  };

  const getUserData = () => {
    axios
      .get(endpoint,getConfig())
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleApprove = (empLeaveId, getConfig) => {
    axios
      .put(`http://localhost:2023/leave/leavetomanager/${managerId}/change`, {
        empLeaveId,
        status: 'APPROVED',
      }, getConfig()) // Call getConfig to get the headers configuration
      .then((response) => {
        console.log(response.data);
        // Show an alert for leave approval
        alert('Leave approved successfully');
        // Remove the approved leave request from the list
        setUserData(userData.filter((item) => item.empLeaveId !== empLeaveId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleReject = (empLeaveId, getConfig) => {
    axios
      .put(`http://localhost:2023/leave/leavetomanager/${managerId}/change`, {
        empLeaveId,
        status: 'REJECTED',
      }, getConfig()) // Call getConfig to get the headers configuration
      .then((response) => {
        console.log(response.data);
        // Show an alert for leave rejection
        alert('Leave rejected successfully');
        // Remove the rejected leave request from the list
        setUserData(userData.filter((item) => item.empLeaveId !== empLeaveId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    getUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id='leaverequest-card' className="card mb-2 shadow my-2" style={{borderColor:'black'}}>
      <div className="card-header" >
        <h3>Leave Requests</h3>
      </div>
      <div
        className="card-body"
        style={{ overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {userData.length > 0 ? (
          userData.map((item) => (
            <li className="card mb-2 shadow" key={item.empLeaveId}>
              <div className="card-body p-2">
                <span className="card-text m-0">
                  <strong>Requested by: </strong>
                  {item.employee.firstName} {item.employee.lastName}
                </span>
                <p className="card-text m-0">
                  <strong>Starting Date: </strong>
                  {item.startDate}
                </p>
                <p className="card-text m-0">
                  <strong>Ending Date: </strong>
                  {item.endDate}
                </p>
                <p className="card-text m-0">
                  <strong>No. of Days: </strong>
                  {item.nodays}
                </p>
                <p className="card-text m-0">
                  <strong>Type of Leave: </strong>
                  {item.leave.leaveType}
                </p>
                <div className="mt-2">
                  <button className="btn btn-outline-success mx-2 px-3" onClick={() => handleApprove(item.empLeaveId,getConfig)}>
                    Approve
                  </button>
                  <button className="btn btn-outline-danger mx-2 px-3" onClick={() => handleReject(item.empLeaveId,getConfig)}>
                    Reject
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>No leave requests</p>
        )}
      </div>
    </div>
  );
}

export default LeaveRequest;
