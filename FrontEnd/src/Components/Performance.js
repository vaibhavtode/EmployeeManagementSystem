import React, { useState, useEffect } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
import "../Styles/Performance.css";
import sweetalert from "sweetalert";

const Performance = () => {
  const managerId = sessionStorage.getItem("empId"); // manager's ID
  const endpoint = `http://localhost:2023/employees/undermanager/${managerId}`;
  const [performanceData, setPerformanceData] = useState({
    comm: 0,
    pro: 0,
    cre: 0,
    pun: 0,
    efficiency: 0,
    learnanddevelop: 0,
    employeeId: "",
  });
  const [employeeNames, setEmployeeNames] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const getConfig = () => {
    const config = {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    };
    return config;
  };

  useEffect(() => {
    axios
      .get(endpoint, getConfig())
      .then((response) => {
        setEmployeeNames(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [endpoint]);

  const isFormValid = () => {
    // Check if any of the rating values are 0
    const isRatingValid = Object.values(performanceData).every(
      (rating) => rating !== 0
    );
    // Check if employeeId is selected
    const isEmployeeIdValid = performanceData.employeeId !== "";
    return isRatingValid && isEmployeeIdValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the form is valid before submitting
    if (isFormValid()) {
      axios
        .put(
          `http://localhost:2023/performance/manager/${managerId}/update`,
          performanceData,
          getConfig()
        )
        .then((response) => {
          console.log(response.data);
          // Reset form fields
          setPerformanceData({
            comm: 0,
            pro: 0,
            cre: 0,
            pun: 0,
            efficiency: 0,
            learnanddevelop: 0,
            employeeId: "",
          });
          // Show success alert
          sweetalert("Performance submitted successfully");
          // Mark the form as submitted
          setIsFormSubmitted(true);
        })
        .catch((error) => {
          console.log(error);
          // Show error alert
          sweetalert("Failed to submit performance");
        });
    } else {
      // Show an error message if the form is invalid
      sweetalert("Please fill in all the fields before submitting.");
    }
  };

  const handleInputChange = (name, value) => {
    setPerformanceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div
      id="performance-add-star-ratings"
      className="card my-2"
      style={{ borderColor: "black" }}
    >
      <div className="card-header">
        <h3>Performance Form</h3>
      </div>
      <div className="card-body">
        <form className="container" onSubmit={handleSubmit}>
          <div className="mb-3 d-flex flex-column justify-content-center mx-auto">
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="empIdInput"
                name="employeeId"
                value={performanceData.employeeId}
                onChange={(e) =>
                  handleInputChange("employeeId", e.target.value)
                }
                required
              >
                <option>Select Employee</option>
                {employeeNames.map((employee) => (
                  <option key={employee.empId} value={employee.empId}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
              </select>
              <label htmlFor="empIdInput">
                <strong>Employee Name</strong>{" "}
              </label>
            </div>

            <div className="form-floating mb-3" id="parameters">
              <label className="textfield" htmlFor="commInput">
                <h4>
                  <strong>Communication</strong>
                </h4>{" "}
              </label>
              <div className="stars">
                <StarRatings
                  name="comm"
                  starDimension="27px"
                  starSpacing="10px"
                  starRatedColor="blue"
                  rating={performanceData.comm}
                  changeRating={(value) => handleInputChange("comm", value)}
                />
              </div>
            </div>

            <div className="form-floating mb-3" id="parameters">
              <label htmlFor="proInput">
                <h4>
                  <strong> Productivity</strong>
                </h4>{" "}
              </label>
              <div className="stars">
                <StarRatings
                  name="pro"
                  starDimension="27px"
                  starSpacing="10px"
                  starRatedColor="blue"
                  rating={performanceData.pro}
                  changeRating={(value) => handleInputChange("pro", value)}
                />
              </div>
            </div>

            <div className="form-floating mb-3" id="parameters">
              <label htmlFor="creInput">
                <h4>
                  <strong> Creativity</strong>
                </h4>{" "}
              </label>
              <div className="stars">
                <StarRatings
                  name="cre"
                  starDimension="27px"
                  starSpacing="10px"
                  starRatedColor="blue"
                  rating={performanceData.cre}
                  changeRating={(value) => handleInputChange("cre", value)}
                />
              </div>
            </div>

            <div className="form-floating mb-3" id="parameters">
              <label htmlFor="punInput">
                <h4>
                  <strong>Attendance</strong>
                </h4>{" "}
              </label>
              <div className="stars">
                <StarRatings
                  name="pun"
                  starDimension="27px"
                  starSpacing="10px"
                  starRatedColor="blue"
                  rating={performanceData.pun}
                  changeRating={(value) => handleInputChange("pun", value)}
                />
              </div>
            </div>

            <div className="form-floating mb-3" id="parameters">
              <label htmlFor="punInput">
                {" "}
                <h4>
                  <strong>Efficiency</strong>
                </h4>{" "}
              </label>
              <div className="stars">
                <StarRatings
                  name="efficiency"
                  starDimension="27px"
                  starSpacing="10px"
                  starRatedColor="blue"
                  rating={performanceData.efficiency}
                  changeRating={(value) =>
                    handleInputChange("efficiency", value)
                  }
                />
              </div>
            </div>

            <div className="form-floating mb-3" id="parameters">
              <label htmlFor="punInput">
                {" "}
                <h4>
                  <strong>Learning and Development</strong>
                </h4>{" "}
              </label>
              <div className="stars">
                <StarRatings
                  name="learnanddevelop"
                  starDimension="27px"
                  starSpacing="10px"
                  starRatedColor="blue"
                  rating={performanceData.learnanddevelop}
                  changeRating={(value) =>
                    handleInputChange("learnanddevelop", value)
                  }
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success">
              Submit
            </button>
            {/* Show success alert only if the form is submitted successfully */}
            {isFormSubmitted && (
              <div className="alert alert-success mt-3">
                Performance submitted successfully
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Performance;
