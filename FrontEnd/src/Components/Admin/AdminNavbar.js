import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/CustomNavbar.css';
import axios from 'axios';
import sweetalert from 'sweetalert';

const AdminNavbar = () => {
  const navigate = useNavigate();
  var checkIn = sessionStorage.getItem("checkIn")
  const role = sessionStorage.getItem("role");
  const handleLogout = () => {
    // Handle logout logic
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("checkIn");
    navigate("/")
    return <div>
        Logged out
    </div>
  };

  const getConfig = () => {
    const config = {
      headers: {
        "Authorization": sessionStorage.getItem("token"),
      },
    };
    return config;
  };
  const handleCheckin = async () => {
    try{
    await axios.post(
      `http://localhost:2023/attendance/checkin/${sessionStorage.getItem("empId")}`,"",getConfig());
       sessionStorage.setItem("checkIn",true);
       sweetalert("Check In Successful!!");
  }catch(err){
    console.log(err)
    sessionStorage.setItem("checkIn",true);
    sweetalert("Already Checked In Earlier!!")
    
  }
}
  const handleCheckout = async () => {
    try {
      await axios.post(`http://localhost:2023/attendance/checkout/${sessionStorage.getItem("empId")}`,'',getConfig());
      sessionStorage.setItem("checkIn",false);
      sweetalert("Check Out Successful!!");
    } catch (error) {
      console.log(error);
      sweetalert("You Need to CheckIn First!!")
    
    }
  };
 


  return (
    <nav id='navbar-top' className="navbar navbar-expand-lg bg-dark">
      <div id='navbar-name' className="container d-flex  ">
        <Link id='navbar-brand-name' className="navbar-brand justify-content-start" to="/admin/homepage">Employee Management System</Link>
        </div>
        {(role === "USER" || role === "ADMIN") &&
        <div id='checkin-btn'> 
          <button className="btn btn-success" onClick={handleCheckin}   >Check In</button>
        
        </div>
        }
        {/* } */}
       {(role === "USER" || role === "ADMIN") &&
        <div id='checkout-btn'>  
          <button className="btn btn-danger" onClick={handleCheckout} >CheckOut</button>
        
          </div>
        }
       {/* } */}
        <div id="logout-btn">
          <button className="btn btn-outline-danger " onClick={handleLogout}>Logout</button>
        </div>
    </nav>
  );

}
export default AdminNavbar;
