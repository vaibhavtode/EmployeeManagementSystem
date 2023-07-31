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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import "../../Styles/Employees.css";

const Employees = () => {
  const [show, setShow] = useState(false);

  const tableRef = useRef(null);
  const [emp, setEmployes] = useState([]);

  const getConfig = () => {
    const config = {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    };
    return config;
  };

  useEffect(() => {
    loademp();
  }, []);

  const loademp = async () => {
    try {
      const result = await axios.get(
        "http://localhost:2023/employees",
        getConfig()
      );
      setEmployes(result.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const deleteEmp = async (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete the employee",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:2023/employees/${id}`, getConfig())
          .then(() => {
            loademp();
          })
          .catch((error) => {
            console.error("Error deleting employee:", error);
          });
      }
    });
  };

  const handleStatusUpdate = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Do you want to inactivate this employee?",
      icon: "warning",
      buttons: ["Cancel", "Yes"],
      dangerMode: true,
    }).then(async (willInactivate) => {
      if (willInactivate) {
        try {
          await axios.put(`http://localhost:2023/employees/updatestatus/${id}`, '', getConfig());
          swal("Status updated successfully!", {
            icon: "success",
          });
          loademp();
        } catch (error) {
          console.error("Error updating status:", error);
          swal("Error updating status!", {
            icon: "error",
          });
        }
      }
    });
  };
  useEffect(() => {
    if (emp.length > 0) {
      if (!tableRef.current) {
        tableRef.current = $("#example").DataTable({
          dom: "Bfrtip",
          buttons: ["copy", "csv"],
        });
      }
    }
  }, [emp]);

  const handleShow = () => setShow(true);

  return (
    <div className="container-wrapper">
      <div
        id="emp-record"
        className="card shadow"
        style={{ marginTop: "1%", borderRadius: "15px", borderColor: "black" }}
      >
        <Link
          to={"addemployee"}
          className="btn btn-primary"
          style={{ marginLeft: "85%", display: "inline" }}
          onClick={handleShow}
        >
          <span style={{ verticalAlign: "middle" }}>
            <strong>Register Employee</strong>{" "}
          </span>
        </Link>

        <h1 style={{ textAlign: "center", color: "blue" }}>Employee Records</h1>

        <div id="emp-records-card-body" className="card-body">
          <table id="example" className="strip hover">
            <thead>
              <tr>
                <th>Emp Id</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Date of Joining</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Email</th>
                <th className="text-center">Date ofBirth</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {emp.map((ems, index) => (
                <tr key={index}>
                  <td>EMS0{ems.empId}</td>
                  <td>{ems.firstName}</td>
                  <td>{ems.middleName}</td>
                  <td>{ems.lastName}</td>
                  <td>{ems.joining_date}</td>
                  <td>{ems.gender}</td>
                  <td>{ems.contact}</td>
                  <td>{ems.address}</td>
                  <td>{ems.email}</td>
                  <td>{ems.birthday}</td>
                  <td>
                    {/* Displaying the status and a button to update it */}
                    <span style={{ color: ems.status === "Active" ? "green" : "red" }}>
                      {ems.status}
                    </span>{" "}
                    {ems.status === "Active" && (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleStatusUpdate(ems.empId)}
                      >
                        InActive
                      </button>
                    )}
                  </td>
                  <td
                    className="text-center"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    <Link
                      className="btn text-warning btn-act"
                      data-toggle="modal"
                      to={`ediemployee/${ems.empId}`}
                    >
                      <i className="fa fa-pencil"></i>
                      <FontAwesomeIcon icon={faPencil} />
                    </Link>

                    <button
                      onClick={() => deleteEmp(ems.empId)}
                      className="btn text-danger btn-act"
                      data-toggle="modal"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;
