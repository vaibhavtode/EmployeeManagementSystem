import React, { useState, useEffect } from "react";
import axios from "axios";
import admin from "../Images/admin.png";
import "../Styles/DynamicList.css";

function DynamicList() {
  const managerId = sessionStorage.getItem("empId");

  const endpoint = `http://localhost:2023/employees/undermanager/${managerId}`;
  const [userData, setUserData] = useState([]);
  const getConfig = () => {
    const config = {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    };
    return config;
  };

  const getUserData = () => {
    axios
      .get(endpoint, getConfig())
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div
      id="emp-list-card"
      className="card shadow my-2"
      style={{ borderColor: "black" }}
    >
      <div className="card-header">
        <h3 className="mb-2 my-3">Employee List</h3>
      </div>
      <div
        className="card-body"
        style={{
          height: "300px",
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {userData.length > 0 ? (
          userData.map((item) => (
            <li className="card mb-2 shadow" key={item.empId}>
              <div className="card-body p-2 d-flex align-items-center">
                <img
                  src={admin}
                  alt="Profile"
                  className="mr-2"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
                <div>
                  <p className="card-text m-0">
                    <strong>Employee ID:</strong> {item.empId}
                  </p>
                  <p className="card-text m-0">
                    <strong>Name:</strong> {item.firstName} {item.lastName}
                  </p>
                  <p className="card-text m-0">
                    <strong>Email:</strong> {item.email}
                  </p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>No Employee working under you</p>
        )}
      </div>
    </div>
  );
}

export default DynamicList;
