import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-buttons/js/buttons.colVis";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";

const Attendance = () => {
  const tableRef = useRef(null);
  const [att, setAttendances] = useState([]);
  const getConfig = () => {
    const config = {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    };
    return config;
  };

  useEffect(() => {
    loadatt();
  }, []);

  const loadatt = async () => {
    const result = await axios.get(
      "http://localhost:2023/attendance",
      getConfig()
    );
    setAttendances(result.data);
  };

  //console.log(att);

  useEffect(() => {
    if (att.length > 0) {
      if (!tableRef.current) {
        tableRef.current = $("#example").DataTable({
          dom: "Bfrtip",
          buttons: ["copy", "csv"],
        });
      }
    }
  }, [att]); 

  return (
    <div className="container">
      <div
        className="card"
        style={{
          marginTop: "2%",
          marginLeft: "-40px",
          borderRadius: "10px",
          color: "black",
          borderColor: "black",
          width: "115%",
        }}
      >
        <div className="card-body">
          <h1 style={{ textAlign: "center", color: "blue" }}>
            Attendance Records
          </h1>
          <table id="example" className="strip hover">
            <thead>
              <tr>
                <th>Emp Id</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Department Name</th>
                <th>Date</th>
                <th>Check In Time</th>
                <th>Check Out Time</th>
                <th>Working Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {att.map((attd, index) => (
                <tr key={index}>
                  <td>EMS0{attd.employee.empId}</td>
                  <td>{attd.employee.firstName}</td>
                  <td>{attd.employee.middleName}</td>
                  <td>{attd.employee.lastName}</td>
                  <td>{attd.employee.email} </td>
                  <td>{attd.employee.department.dname}</td>
                  <td>{attd.date}</td>
                  <td className="text-center">{attd.checkIn}</td>
                  <td className="text-center">{attd.checkOut}</td>
                  <td className="text-center">{attd.hours}</td>
                  <td className="text-center">{attd.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Attendance;
