import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

function AddEmployee() {
  let navigate = useNavigate();
  const [managers, setManagers] = useState([]);
  const [departments, setDepartments] = useState([]);

  const getConfig = () => {
    const config = {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    };
    return config;
  };

  const nameRegex = /^[a-zA-Z]+$/; // Regular expression to match only alphabetic characters
  const dobRegex = /^\d{4}-\d{2}-\d{2}$/; // Regular expression to match yyyy-mm-dd format

  const [emp, setEmployee] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    contact: "", // Add the contact state here
    address: "",
    email: "",
    status: "Active",
    birthday: "",
    managerId: "",
    deptId: "",
  });

  const {
    firstName,
    middleName,
    lastName,
    gender,
    birthday,
    address,
    email,
    managerId,
    deptId,
  } = emp;

  const [errors, setErrors] = useState({});

  const onInputChange = (e) => {
    const { name, value } = e.target;

    // Check for FirstName, MiddleName, and LastName validations
    if (name === "firstName" || name === "middleName" || name === "lastName") {
      if (!nameRegex.test(value)) {
        setErrors({
          ...errors,
          [name]: "Only alphabetic characters are allowed",
        });
      } else {
        setErrors({ ...errors, [name]: null });
      }
    }

    // Date of Birth validation
    if (name === "birthday") {
      if (!dobRegex.test(value)) {
        setErrors({
          ...errors,
          birthday: "Date of Birth should be in yyyy-mm-dd format",
        });
      } else {
        setErrors({ ...errors, birthday: null });

        // Calculate the date 18 years ago from the current date
        const currentDate = new Date();
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(currentDate.getFullYear() - 18);

        // Convert the input date to a Date object for comparison
        const inputDate = new Date(value);

        // Check if the input date is less than 18 years ago or greater than the current date
        if (inputDate > currentDate || inputDate >= eighteenYearsAgo) {
          Swal.fire({
            icon: "error",
            title: "Invalid Date of Birth",
            text: "Date of Birth must be at least 18 years less than the Current Date and not Greater than the Current date.",
          });
          setErrors({ ...errors, birthday: "Invalid Date of Birth" });
        } else {
          setErrors({ ...errors, birthday: null });
        }
      }
    }

    if (name === "managerId" || name === "deptId") {
      setEmployee({ ...emp, [name]: parseInt(value) });
    } else {
      setEmployee({ ...emp, [name]: value });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:2023/employees", getConfig())
      .then((response) => {
        setManagers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:2023/department", getConfig())
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Check for validation errors
    if (
      errors.firstName ||
      errors.middleName ||
      errors.lastName ||
      errors.birthday ||
      errors.contact
    ) {
      // If there are validation errors, do not submit the form
      return;
    }

    try {
      await axios.post(`http://localhost:2023/employees`, emp, getConfig());
      setEmployee({
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        contact: "",
        address: "",
        email: "",
        status: "Active",
        birthday: "",
        managerId: "",
        deptId: "",
      });
      navigate("/admin/employee");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div
        className="card"
        style={{
          padding: "20px",
          borderColor: "black",
          backgroundColor: "beige",
        }}
      >
        <div className="row" style={{ padding: "20px" }}>
          <div
            className="border rounded"
            style={{
              padding: "20px",
              width: "500px",
              backgroundColor: "whitesmoke",
              marginLeft: "30%",
              border: "blue",
            }}
          >
            <h3 className="text-center">Register An Employee</h3>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  placeholder="Enter First Name"
                  name="firstName"
                  value={firstName}
                  required
                  onChange={onInputChange}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="middleName" className="form-label">
                  Middle Name
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.middleName ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Middle Name"
                  name="middleName"
                  value={middleName}
                  required
                  onChange={onInputChange}
                />
                {errors.middleName && (
                  <div className="invalid-feedback">{errors.middleName}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Last Name"
                  name="lastName"
                  value={lastName}
                  required
                  onChange={onInputChange}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  className="form-select"
                  name="gender"
                  value={gender}
                  onChange={onInputChange}
                  required
                >
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
                  type="text" // Change the type to "text"
                  className={`form-control ${
                    errors.contact ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Contact Number"
                  name="contact"
                  value={emp.contact} // Use emp.contact instead of the removed contact state
                  required
                  pattern="[0-9]{10}" // Add pattern attribute to enforce 10-digit number validation
                  onChange={onInputChange}
                />
                {errors.contact && (
                  <div className="invalid-feedback">{errors.contact}</div>
                )}
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
                  required
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="birthday" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className={`form-control ${
                    errors.birthday ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Date of Birth"
                  name="birthday"
                  value={birthday}
                  required
                  onChange={onInputChange}
                />
                {errors.birthday && (
                  <div className="invalid-feedback">{errors.birthday}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="managerId" className="form-label">
                  Manager
                </label>
                <select
                  className="form-select"
                  name="managerId"
                  value={managerId}
                  onChange={onInputChange}
                  required
                >
                  <option value="">Select Manager</option>
                  {managers.map((manager) => (
                    <option key={manager.empId} value={manager.empId}>
                      {manager.firstName} {manager.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="deptId" className="form-label">
                  Department
                </label>
                <select
                  className="form-select"
                  name="deptId"
                  value={deptId}
                  onChange={onInputChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department.dept_id} value={department.dept_id}>
                      {department.dname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-center">
                <Button
                  className="btn btn-success mb-3 text-center"
                  type="submit"
                >
                  Submit
                </Button>
                <Link
                  className="btn btn-success mb-3 text-center"
                  style={{ marginLeft: "3px" }}
                  to="/admin/employee"
                >
                  Back
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
