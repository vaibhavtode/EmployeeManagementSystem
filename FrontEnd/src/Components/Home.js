import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import '../Styles/Home.css'

function Home() {
  const empId = sessionStorage.getItem('empId');
  const endpoint = `http://localhost:2023/employees/${empId}`;
  const [employeeData, setEmployeeData] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const role = sessionStorage.getItem("role");

  const getConfig = () => {
    const config = {
      headers: {
        Authorization: sessionStorage.getItem('token'),
      },
    };
    return config;
  };

  const getEmployeeData = () => {
    axios
      .get(endpoint, getConfig())
      .then((response) => {
        setEmployeeData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setEmployeeData(null);
      });
  };

  const getPerformanceData = () => {
    axios
      .get(`http://localhost:2023/performance/${empId}`, getConfig())
      .then((response) => {
        setPerformanceData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setPerformanceData(null);
      });
  };

  useEffect(() => {
    getEmployeeData();
    getPerformanceData();
  }, []);

  return (
    <div id='emp-details' className="card my-2">
      <div className="card-header">
        <h3 className="mb-2 my-3">Employee Details</h3>
      </div>
      <div id='emp-details-internal-card' className="card-body container">
        {employeeData ? (
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <img
                  src={require('../Images/admin.png')}
                  alt="Default User"
                  className="mr-3 shadow"
                  style={{ width: '125px', height: '125px', borderRadius: '50%' }}
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Employee ID:</strong> {employeeData.empId}
                  </p>
                  <p>
                    <strong>First Name:</strong> {employeeData.firstName}
                  </p>
                  <p>
                    <strong>Middle Name:</strong> {employeeData.middleName}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {employeeData.lastName}
                  </p>
                 {(role === "USER" || role === "ADMIN") &&
                  <p>
                    <strong>Date of Joining:</strong> {employeeData.joining_date}
                  </p>
                  }
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Date of Birth:</strong> {employeeData.birthday}
                  </p>
                  <p>
                    <strong>Gender:</strong> {employeeData.gender}
                  </p>
                  { (role === "USER" || role === "ADMIN") &&
                  <p>
                    <strong>Sick Leaves Remaining:</strong> {employeeData.sick_leaves}
                  </p>
                  }
                  {(role === "USER" || role === "ADMIN") &&
                  <p>
                    <strong>Paid Leaves Remaining:</strong> {employeeData.paid_leaves}
                  </p>
                  }
                  {(role === "USER" || role === "ADMIN") &&
                  <p>
                    <strong>Personal Leaves Remaining</strong>  {employeeData.personal_leaves}
                  </p>
                  }

                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <p>
                    <strong>Email:</strong> {employeeData.email}
                  </p>
                  <p>
                    <strong>Contact Number:</strong> {employeeData.contact}
                  </p>
                  <p>
                    <strong>Address:</strong> {employeeData.address}
                  </p>
                 { (role === "USER" || role === "ADMIN") &&
                  <p>
                    <strong>Status:</strong> {employeeData.status}
                  </p>
}
                  {role === 'USER' &&
                  <p>
                    <strong>Manager:</strong>{' '}
                    {employeeData.manager
                      ? `${employeeData.manager.firstName} ${employeeData.manager.lastName}`
                      : ''}
                  </p>
                    }
                  <p>
                    <strong>Department:</strong>{' '}
                    {employeeData.department ? employeeData.department.dname : ''}
                  </p>
                  {role === 'USER' &&  performanceData && (
                    <div>
                      <p>
                        <strong>Total Rating:</strong>
                        <StarRatings
                          rating={performanceData.totalRating}
                          starRatedColor="gold"
                          numberOfStars={5}
                          starDimension="20px"
                          starSpacing="5px"
                        />
                      </p>
                    </div>
                  
                  )}
                </div>
                
              </div>
            </div>
          </div>
        ) : (
          <p>No employee data available</p>
        )}
      </div>
    </div>
  );
}

export default Home;