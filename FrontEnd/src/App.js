import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLoginForm from './Components/Admin/AdminLoginForm'
import UpdateDetails from "./Components/UpdateDetails";
import Performance from "./Components/Performance";
import AdminDashBoard from './Components/Admin/AdminDashBoard'
import Employees from './Components/Admin/Employees'
import Attendance from './Components/Admin/Attendance'
import PerformanceId from './Components/Admin/PerformanceId'
import LeaveRecords from './Components/Admin/LeaveRecords'
import AddEmployee from './Components/Admin/AddEmployee'
import UpdateEmployee from './Components/Admin/UpdateEmployee'
import Leavepage from "./Components/Leavepage";
import Homepage from "./Components/Homepage";
import AddPerformance from './Components/Admin/AddPerformance'
import AddDepartment from "./Components/Admin/AddDepartment";
import Department from "./Components/Admin/Department";
import UpdateDepartment from "./Components/Admin/UpdateDepartment";

function App() {
  return (
    <Router>
    
          
          <Routes>
          {/* <Route path="/" element={<MainPage/>}/>
          <Route path="/user" element={<EmployeeLoginForm/>}/> */}
          <Route path="/" element={<AdminLoginForm/>}/>
          
          {/* <Route path="/user" element={<Base/>} exact>          */}
                 {/* <Route path="applyleave" element={<ApplyLeave/>} exact/>
                 <Route path="updatedetails" element={<UpdateDetails/>} exact/>
                 <Route path="updateperformance" element={<Performance/>} exact/>
                 <Route path="home" element={<Home/>} exact/> */}
              
          {/* </Route> */}
          <Route path="/admin" element={<AdminDashBoard/>} exact>         
                 {/* <Route path="home" element={<Home/>} exact/> */}
                 <Route path="employee" element={<Employees/>} exact/>
                 <Route path="attendance" element={<Attendance/>} exact/>
                 <Route path="performance" element={<PerformanceId/>} exact/>
                 <Route path="leaverecords" element={<LeaveRecords/>} exact/>
                 <Route path="employee/addemployee" element={<AddEmployee/>} exact/>
                 <Route path="employee/ediemployee/:id" element={<UpdateEmployee/>} exact/>
                 <Route path="updatedetails" element={<UpdateDetails/>} exact/>
                 <Route path="updateperformance" element={<Performance/>} exact/>
                 <Route path="leavepage" element={<Leavepage/>}/>
                 <Route path="homepage" element={<Homepage/>}/>
                 <Route path="performance/addperformance" element={<AddPerformance/>}/>
                 <Route path="department"  element={<Department/>}/>
                 <Route path="department/addepartment" element={<AddDepartment/>}/>
                 <Route path="department/edidepartment/:id" element={<UpdateDepartment/>}/>


                 {/* <Route path="employeesearch" element={<EmployeeSearch/>} exact/>
                 <Route path="employeesearchbyid" element={<EmployeeSearchById/>} exact/>
                 <Route path="employeeundermanager" element={<EmployeeUnderManager/>} exact/>
                 <Route path="listattendance" element={<ListAttendance/>} exact/>
                 <Route path="listofemployees" element={<ListEmployees/>}/> */}
                 
          </Route>
          </Routes>
        
        
        
    
  </Router>
  );
}

export default App;
