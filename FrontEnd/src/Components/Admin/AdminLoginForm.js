import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import UserService from '../../Service/UserService';
import '../../Styles/LoginForm.css'

const AdminLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false); // State variable for login error
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const authenticationRequest = {
      email: email,
      password: password,
    };

    UserService.authenticate(authenticationRequest)
      .then((response) => {
        console.log('Login successful:', response);
        // Handle successful login
        navigate('/admin/homepage'); // Navigate to "/dashboard"
        sessionStorage.setItem('token');
        sessionStorage.setItem('role');
      })
      .catch((error) => {
        console.error('Login failed:', error);
        // Handle login error
        setLoginError(true);
      });
  };

  return (
    <div id="wallpaper">
    <div  className="container">
      <div  className="row justify-content-center">
        <div  className="col-md-6">
          <div  id='loginform' className="card shadow">
            <h3 className="card-header text-center"> EMS-Login</h3>
            <div className="card-body">
              {loginError && (
                <div className="alert alert-danger" role="alert">
                  Invalid Email or Password. Please try again.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email"><strong>Email</strong></label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div id='' className="form-group">
                  <label htmlFor="password"><strong>Password</strong></label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div id='login-btn-div'>
                  <button id='btn-login' type="submit" className="btn btn-lg btn-primary btn-block">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminLoginForm;
