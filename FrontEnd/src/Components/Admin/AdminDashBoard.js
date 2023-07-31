import {  Col, Container, Row } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route, Outlet} from 'react-router-dom';
import AdminNavbar from "./AdminNavbar";
import '../../Styles/CustomNavbar.css'
import MIndex from "../MIndex";
// import ApplyLeave from "../Components/ApplyLeave";
// import LeftSideMenuBar from "../Components/LeftSideMenuBar";
// import CustomNavbar from "../Components/CustomNavbar";
// import UpdateDetails from "../Components/UpdateDetails";
// import Performance from "../Components/Performance";
// import Home from "../Components/Home";
// import DynamicList from "../Components/DynamicList";
// import LeaveRequest from "../Components/LeaveRequest";
// import { Link } from "react-router-dom";

function AdminDashBoard() {
  return (
  
  <div className="bodyname">
    <AdminNavbar />
    <Row>
      <Col md={2}>
        <MIndex/>
      </Col>  
      <Col md={9}>
        {/* the route component of  */}
        <Outlet/>
      </Col>
      
    </Row>
  </div>

  );
}

export default AdminDashBoard;
