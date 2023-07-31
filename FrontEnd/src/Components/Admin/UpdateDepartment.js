import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import sweetalert from 'sweetalert'

function UpdateDepartment() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [dep, setDepartment] = useState({
    dname: ""
  });

  const { dname } = dep;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...dep, [name]: value });
  };

  const getConfig = () => {
    const config = {
      headers: {
        Authorization: sessionStorage.getItem('token'),
      },
    };
    return config;
  };

  const loaddep = async () => {
    const result = await axios.get(`http://localhost:2023/department/${id}`, getConfig());
    setDepartment(result.data);
  }

  useEffect(() => {
    loaddep();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validating department name (only alphabets allowed)
    const alphabetsOnlyRegex = /^[A-Za-z]+$/;
    if (!alphabetsOnlyRegex.test(dname)) {
      sweetalert("Department Name must contain only Alphabets.");
      return;
    }

    await axios.put(`http://localhost:2023/department`, dep, getConfig());
    setDepartment({
      dname: ""
    })

    navigate('/admin/department')
    window.location.reload();
  }

  return (
    <div className='container'>
      <div className='card ' style={{ padding: '20px', borderColor: 'white' }}>
        <div className='row' style={{ padding: '20px' }}>
          <div className='border rounded ' style={{ padding: '20px', width: '500px', marginLeft: '30%', border: 'blue' }}>
            <h3 className='text-center'>Update Department</h3>
            <form onSubmit={onSubmit}>
              <div className='mb-3'>
                <label htmlFor='dname' className='form-label'>
                  Department Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter Department Name'
                  name='dname'
                  value={dname}
                  required
                  pattern="^[A-Za-z]+$"
                  title="Department name should contain only alphabets."
                  onChange={onInputChange}
                />
              </div>
              <div className='text-center'>
                <Button to='/admin/department' className='btn btn-success mb-3 text-center' type='submit' style={{ width: '90%' }}>Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateDepartment;
