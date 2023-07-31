import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';

function UpdateEmployee() {
  let navigate = useNavigate();
  const { id } = useParams();
  const getConfig = () => {
    const config = {
      headers: {
        Authorization: sessionStorage.getItem('token'),
      },
    };
    return config;
  };
  const nameRegex = /^[a-zA-Z]+$/; // Regular expression to match only alphabetic characters
  const dobRegex = /^\d{4}-\d{2}-\d{2}$/; // Regular expression to match yyyy-mm-dd format

  const [emp, setEmployee] = useState({
    empId: id,
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    contact: '',
    address: '',
    email: '',
    status: 'Active',
    birthday: '',
    managerId: '',
    deptId: '',
  });

  const { firstName, middleName, lastName, gender, contact, address, email, birthday, managerId, deptId } = emp;

  const [errors, setErrors] = useState({
    firstName: null,
    middleName: null,
    lastName: null,
    birthday: null,
    contact: null,
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;

    // Check for FirstName, MiddleName, and LastName validations
    if (name === 'firstName' || name === 'middleName' || name === 'lastName') {
      if (!nameRegex.test(value)) {
        setErrors({ ...errors, [name]: 'Only alphabetic characters are allowed' });
      } else {
        setErrors({ ...errors, [name]: null });
      }
    }

    // Date of Birth validation
    if (name === 'birthday') {
      if (!dobRegex.test(value)) {
        setErrors({ ...errors, birthday: 'Date of Birth should be in yyyy-mm-dd format' });
      } else {
        setErrors({ ...errors, birthday: null });
      }
    }

    // Contact Number validation
    if (name === 'contact') {
      if (!/^\d{10}$/.test(value)) {
        setErrors({ ...errors, contact: 'Contact Number should be a 10-digit number' });
      } else {
        setErrors({ ...errors, contact: null });
      }
    }

    setEmployee({ ...emp, [name]: value });
  };

  const loadEmployee = async () => {
    const result = await axios.get(`http://localhost:2023/employees/${id}`, getConfig());
    setEmployee(result.data);
  };

  useEffect(() => {
    loadEmployee();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Check for validation errors
    if (errors.firstName || errors.middleName || errors.lastName || errors.birthday || errors.contact) {
      // If there are validation errors, do not submit the form
      return;
    }

    await axios.put(`http://localhost:2023/employees`, emp, getConfig());
    setEmployee({
      empId: id,
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      contact: '',
      address: '',
      email: '',
      status: 'Active',
      birthday: '',
      managerId: '',
      deptId: '',
    });

    navigate('/admin/employee');
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="card" style={{ padding: '20px', borderColor: 'white' }}>
        <div className="row" style={{ padding: '20px' }}>
          <div className="border rounded" style={{ padding: '20px', width: '500px', marginLeft: '30%', border: 'blue' }}>
            <h3 className="text-center">Update Employee Details</h3>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  placeholder="Enter First Name"
                  name="firstName"
                  value={firstName}
                  disabled
                  onChange={onInputChange}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="middleName" className="form-label">
                  Middle Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.middleName ? 'is-invalid' : ''}`}
                  placeholder="Enter Middle Name"
                  name="middleName"
                  value={middleName}
                  disabled
                  onChange={onInputChange}
                />
                {errors.middleName && <div className="invalid-feedback">{errors.middleName}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  placeholder="Enter Last Name"
                  name="lastName"
                  value={lastName}
                  disabled
                  onChange={onInputChange}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select className="form-select" name="gender" value={gender} onChange={onInputChange} disabled>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="contact" className="form-label">
                  Contact Number
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
                  placeholder="Enter Contact Number"
                  name="contact"
                  value={contact}
                  required
                  onChange={onInputChange}
                />
                {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <textarea
                  rows={2}
                  type="text"
                  className="form-control"
                  placeholder="Enter Address"
                  name="address"
                  value={address}
                  required
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  name="email"
                  value={email}
                  disabled
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="birthday" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.birthday ? 'is-invalid' : ''}`}
                  placeholder="Enter Date of Birth (yyyy-mm-dd)"
                  name="birthday"
                  value={birthday}
                  disabled
                  onChange={onInputChange}
                />
                {errors.birthday && <div className="invalid-feedback">{errors.birthday}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="managerId" className="form-label">
                  Manager
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Manager"
                  name="managerId"
                  value={managerId}
                  required
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="deptId" className="form-label">
                  Department
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Department"
                  name="deptId"
                  value={deptId}
                  required
                  onChange={onInputChange}
                />
              </div>
              <Button className="btn btn-success mb-3 text-center" type="submit">
                Submit
              </Button>
              <Link to='/admin/employee' style={{marginLeft:'3px'}} className='btn btn-success mb-3 text-center'>Back</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateEmployee;
