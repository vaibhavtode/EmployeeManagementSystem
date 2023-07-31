import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function UpdateEmployee() {
  const id = sessionStorage.getItem("empId");
  let navigate = useNavigate();

  const getConfig = () => {
    const config = {
      headers: {
        "Authorization": sessionStorage.getItem("token"),
      },
    };
    return config;
  };

  const [emp, setEmployee] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    contact: '',
    address: '',
    email: '',
    status: 'active',
    birthday: '',
  });

  const { firstName, middleName, lastName, gender, contact, address, email, birthday } = emp;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmp) => ({
      ...prevEmp,
      [name]: value,
    }));
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
    if (!/^\d{10}$/.test(contact)) {
      // If the contact number does not match the 10-digit format, It gives a Sweet alert
      Swal.fire({
        icon: "error",
        title: "Invalid Contact Number",
        text: "Contact Number should be a 10-digit number",
      });
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
      status: 'active',
      birthday: '',
    });

    navigate('/admin/homepage');
  };

  return (
    <div className='card shadow my-3' style={{ borderColor: 'black' }}>
      <div className='card-body '>
        <div className='row'>
          <div className='border rounded'>
            <h3 style={{ textAlign: 'center', marginLeft: '-5%' }}>Update Details</h3>
            <form onSubmit={onSubmit}>
              <div className='mb-2'>
                <label htmlFor='firstName' className='form-label'>
                  <strong>First Name</strong>
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter First Name'
                  name='firstName'
                  value={firstName}
                  required
                  disabled
                  onChange={onInputChange}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='middleName' className='form-label'>
                  <strong>Middle Name</strong>
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter Middle Name'
                  name='middleName'
                  value={middleName}
                  required
                  disabled
                  onChange={onInputChange}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='lastName' className='form-label'>
                  <strong>Last Name</strong>
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter Last Name'
                  name='lastName'
                  value={lastName}
                  required
                  disabled
                  onChange={onInputChange}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='gender' className='form-label'>
                  <strong>Gender</strong>
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter Gender'
                  name='gender'
                  value={gender}
                  disabled
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='contact' className='form-label'>
                  <strong>Contact Number</strong>
                </label>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Enter Contact Number'
                  name='contact'
                  value={contact}
                  required
                  onChange={onInputChange}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='address' className='form-label'>
                  <strong>Address</strong>
                </label>
                <textarea
                  rows={2}
                  type='text'
                  className='form-control'
                  placeholder='Enter Address'
                  name='address'
                  value={address}
                  required
                  onChange={onInputChange}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>
                  <strong>Email</strong>
                </label>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Enter Email'
                  name='email'
                  value={email}
                  required
                  disabled
                  onChange={onInputChange}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='birthday' className='form-label'>
                  <strong>Date of Birth</strong>
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter Date of birth'
                  name='birthday'
                  value={birthday}
                  required
                  disabled
                  onChange={onInputChange}
                />
              </div>
              <div style={{ textAlign: 'center', marginLeft: '-5%' }}>
                <Button className='btn btn-success mb-3 text-center' type='submit'>
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateEmployee;
