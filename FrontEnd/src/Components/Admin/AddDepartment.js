import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

function AddDepartment() {
  const navigate = useNavigate();
  const [dep, setDepartment] = useState({
    dname: ""
  });

  const { dname } = dep;

  const nameRegex = /^[a-zA-Z]+$/; // Regular expression to match only alphabetic characters
  const [errors, setErrors] = useState({});

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...dep, [name]: value });

    if (name === "dname") {
      if (!nameRegex.test(value)) {
        setErrors({
          ...errors,
          [name]: "Only alphabetic characters are allowed",
        });
      } else {
        setErrors({ ...errors, [name]: null });
      }
    }
  };

  const getConfig = () => {
    return {
      headers: {
        Authorization: sessionStorage.getItem('token'),
      },
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        await axios.post(`http://localhost:2023/department`, dep, getConfig());
        setDepartment({
          dname: ""
        });
        navigate('/admin/department');
      }
    } catch (error) {
      console.error("Error occurred while submitting:", error);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!nameRegex.test(dname)) {
      newErrors.dname = "Only alphabetic characters are allowed";
      isValid = false;
      
    }

    setErrors(newErrors);
    return isValid;
  };
  return (
    <div className='container'>
      <div className='card shadow' style={{ padding: '20px', borderColor: 'black' }}>
        <div className='row' style={{ padding: '20px' }}>
          <div className='border rounded ' style={{ padding: '20px', width: '500px', marginLeft: '30%', border: 'blue' }}>
            <strong> <h3 className='text-center'>Add Department</h3></strong>
            <form onSubmit={onSubmit}>
              <div className='mb-3'>
                <label htmlFor='dname' className='form-label'>
                  Department Name
                </label>
                <input
                  type='text'
                  className={`form-control ${errors.dname ? 'is-invalid' : ''}`}
                  placeholder='Enter Department Name'
                  name='dname'
                  value={dname}
                  required
                  onChange={onInputChange}
                />
                {errors.dname && <div className="invalid-feedback">{errors.dname}</div>}
              </div>
              <div className='text-center'>
                <Button className='btn btn-success mb-3 text-center' type='submit' style={{ width: '90%' }}>Submit</Button>
              </div>
              <div className='text-center'>
                <Link to='/admin/department' style={{ width: '90%' }} className='btn btn-success'>Back</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDepartment;
