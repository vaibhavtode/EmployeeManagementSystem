import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import '../../Styles/Performance.css'
import { Link } from 'react-router-dom';
import sweetalert from 'sweetalert';


const AddPerformance = () => {
  const endpoint = `http://localhost:2023/employees`;
  const [performanceData, setPerformanceData] = useState({
    comm: 0,
    pro: 0,
    cre: 0,
    pun: 0,
    learnanddevelop: 0,
    efficiency: 0,
    employeeId: ''
  });
  const [employeeNames, setEmployeeNames] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const getConfig = () => {
    const config = {
      headers: {
        "Authorization": sessionStorage.getItem("token"),
      },
    };
    return config;
  };

  useEffect(() => {
    axios
      .get(endpoint, getConfig())
      .then((response) => {
        setEmployeeNames(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [endpoint]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the employeeId is empty
    if (performanceData.employeeId === '') {
      sweetalert('Please select an Employee.');
      return;
    }

    // Check if the form is valid before submitting
    if (isFormValid) {
      axios
        .post(`http://localhost:2023/performance/add`, performanceData, getConfig())
        .then((response) => {
          console.log(response.data);
          // Reset form fields
          setPerformanceData({
            comm: 0,
            pro: 0,
            cre: 0,
            pun: 0,
            learnanddevelop: 0,
            efficiency: 0,
            employeeId: '',
          });
          // Show success alert
          sweetalert('Performance submitted successfully');
        })
        .catch((error) => {
          console.log(error);
          // Show error alert
          sweetalert('Performance Record Already Exists!');
        });
    } else {
      // Show an error message if the form is invalid
      sweetalert('Please fill in all the fields before submitting.');
    }
  };

  const handleInputChange = (name, value) => {
    setPerformanceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Implement form validation on form inputs
  useEffect(() => {
    // Check if any of the rating values are 0
    const isRatingValid = Object.values(performanceData).every((rating) => rating !== 0);
    // Check if employeeId is selected
    const isEmployeeIdValid = performanceData.employeeId !== '';
    // Set isFormValid based on both conditions
    setIsFormValid(isRatingValid && isEmployeeIdValid);
  }, [performanceData]);

  return (
    <div id='performance-add-star-ratings' className="card my-2 ">
      <div className="card-header">
        <h3>Add Performance</h3>
      </div>
      <div className="card-body" >
        <form className='container' onSubmit={handleSubmit}>
          <div className='mb-3 d-flex flex-column justify-content-center mx-auto'>
            <div className='form-floating mb-3'>
              <select
                className='form-select'
                id='empIdInput'
                name='employeeId'
                value={performanceData.employeeId}
                onChange={(e) => handleInputChange('employeeId', e.target.value)}
                required
              >
                <option value="">Select Employee</option>
                {employeeNames.map((employee) => (
                  <option key={employee.empId} value={employee.empId}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
              </select>
              <label htmlFor='empIdInput'><strong>Employee Name </strong> </label>
            </div>
            <div className='form-floating mb-3 ' id='parameters'>
              <label htmlFor='commInput'> <h4><strong>Communication</strong></h4> </label>
              <div className='stars'>
                <StarRatings
                  name='comm'
                  starDimension='27px'
                  starSpacing='10px'
                  starRatedColor='blue'
                  rating={performanceData.comm}
                  changeRating={(value) => handleInputChange('comm', value)}
                />
              </div>
            </div>
            <div className='form-floating mb-3' id='parameters'>
              <label htmlFor='proInput'><h4> <strong> Productivity </strong></h4> </label>
              <div className='stars'>  
                <StarRatings
                  name='pro'
                  starDimension='27px'
                  starSpacing='10px'
                  starRatedColor='blue'
                  rating={performanceData.pro}
                  changeRating={(value) => handleInputChange('pro', value)}
                />
              </div>
            </div>
            <div className='form-floating mb-3'  id='parameters'>
              <label htmlFor='creInput'><h4> <strong> Organizational Skills </strong></h4> </label>
              <div className='stars'>
                <StarRatings
                  name='cre'
                  starDimension='27px'
                  starSpacing='10px'
                  starRatedColor='blue'
                  rating={performanceData.cre}
                  changeRating={(value) => handleInputChange('cre', value)}
                />
              </div>
            </div>
            <div className='form-floating mb-3' id='parameters'>
              <label htmlFor='punInput'><h4><strong>Attendance </strong></h4> </label>
              <div className='stars'>
                <StarRatings
                  name='pun'
                  starDimension='27px'
                  starSpacing='10px'
                  starRatedColor='blue'
                  rating={performanceData.pun}
                  changeRating={(value) => handleInputChange('pun', value)}
                />
              </div>
            </div>
            <div className='form-floating mb-3' id='parameters'>
              <label htmlFor='punInput'><h4><strong>Efficiency </strong></h4> </label>
              <div className='stars'>
                <StarRatings
                  name='efficiency'
                  starDimension='27px'
                  starSpacing='10px'
                  starRatedColor='blue'
                  rating={performanceData.efficiency}
                  changeRating={(value) => handleInputChange('efficiency', value)}
                />
              </div>
            </div>
            <div className='form-floating mb-3' id='parameters'>
              <label htmlFor='punInput'><h4><strong>Learning and Development </strong></h4> </label>
              <div className='stars'>
                <StarRatings
                  name='learnanddevelop'
                  starDimension='27px'
                  starSpacing='10px'
                  starRatedColor='blue'
                  rating={performanceData.learnanddevelop}
                  changeRating={(value) => handleInputChange('learnanddevelop', value)}
                />
              </div>
            </div>
            <div className='card'>
              <button type='submit' className='btn btn-success' >
                Submit
              </button>
            </div>
            <div className='card'>
              <Link to='/admin/performance' className='btn btn-success'>Back</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPerformance;
