import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons-dt/css/buttons.dataTables.css';
import '../../Styles/LeaveRecords.css';

const LeaveRecords = () => {
    const tableRef = useRef(null);
    const[lrs,setLeaverecords] = useState([]);
    const getConfig=()=>{
      const config={
        headers:{
          "Authorization":sessionStorage.getItem("token"),}
      }
      return config;
    }
    

    useEffect(()=>{
        loadlrs();       
    },[]);

    const loadlrs = async () => {
        const result = await axios.get('http://localhost:2023/leave',getConfig());
        setLeaverecords(result.data);
    };
   
    
    useEffect(() => {
        if (lrs.length > 0) {
          if (!tableRef.current) {
            tableRef.current = $('#example').DataTable({
              dom: 'Bfrtip',
              buttons: ['copy', 'csv'],
            });
          }
        }
      }, [lrs]);
      return(
      <div id='leave-record-box'  className='container-wrapper'>
      <div  className="card shadow" style={{borderRadius:'10px',borderColor:'black'}}>
        <div className="card-body"> 
  
        <h1 style={{textAlign:'center',color:'blue'}}>Leave Records</h1>
          <table id="example" className="strip hover">
            <thead>
              <tr>
                <th>Emp Id</th>
                <th>Employee Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Department</th>
                <th>From</th>
                <th>To</th>
                <th>No of Days</th>
                <th>LeaveType</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {lrs.map((lrd, index) => (
                <tr key={index}>
                  <td>EMS0{lrd.employee.empId}</td>
                  <td>{lrd.employee.firstName} {lrd.employee.lastName}</td>
                  <td>{lrd.employee.gender}</td>
                  <td>{lrd.employee.email}</td>
                  <td>{lrd.employee.department.dname}</td>
                  <td className='text-center'>{lrd.startDate}</td>
                  <td className='text-center'>{lrd.endDate}</td>
                  <td className='text-center'>{lrd.nodays}</td>
                  <td>{lrd.leave.leaveType}</td>
                  <td className='text-center'>{lrd.status}</td>
                  
                </tr>
              ))}
            </tbody>
            
          </table>
        </div>
      </div>
      </div>
      )
              }
export default LeaveRecords;