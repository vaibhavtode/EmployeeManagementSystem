import React from 'react';
import { Link } from 'react-router-dom';
import { faAdd, faEnvelopeCircleCheck, faLaptopFile, faLineChart, faList, faPeopleGroup, faRecordVinyl, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../Styles/MIndex.css'

function MIndex() {
    const role = sessionStorage.getItem("role");
    return (
        <div>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto bg-dark">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white ">
                            {/* <img src={require('../Images/frcp.jpg')} width="50" height="50" className="rounded-circle" /> */}
                            
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                           
                                
                                <li className="nav-item">
                                    <Link to="/" className="nav-link align-middle align-center px-0 text-white">
                                        <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline"></span>
                                    </Link>
                                </li>
                                                

                                <li id='profile-btn'>
                                <Link  to="/admin/homepage" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline"><FontAwesomeIcon icon={faUserCircle} style={{ blockSize:'30px', paddingLeft:'4px', paddingRight: '10px' }} /><strong> My Profile</strong></span>
                                </Link>
                                </li>                   
                            {(role === "ADMIN" || role === "SUPERADMIN") &&
                                <li id='profile-btn'>
                                    <Link to="/admin/employee" className="nav-link px-0 align-middle text-white">
                                        <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline"><FontAwesomeIcon icon={faPeopleGroup} style={{ blockSize:'30px',paddingRight: '7px' }} /><strong> Employees</strong></span>
                                    </Link>
                                </li>
                            }
                            {(role === "ADMIN" || role === "SUPERADMIN") &&
                                <li id='profile-btn'>
                                    <Link to="/admin/attendance" className="nav-link px-0 align-middle text-white">
                                        <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline"><FontAwesomeIcon icon={faList} style={{ blockSize:'30px',paddingRight: '10px' }} /><strong> Attendance</strong></span>
                                    </Link>
                                </li>
                            }
                            {(role === "ADMIN" || role === "SUPERADMIN") &&
                                <li id='profile-btn'>
                                    <Link to="/admin/performance" className="nav-link px-0 align-middle text-white">
                                        <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline"><FontAwesomeIcon icon={faLineChart} style={{ blockSize:'30px',paddingRight: '10px' }} /><strong> Performance</strong></span>
                                    </Link>
                                </li>
                            }
                            {(role === "ADMIN" || role ==="SUPERADMIN") &&
                                <li id='profile-btn'>
                                    <Link to="/admin/leaverecords" className="nav-link px-0 align-middle text-white">
                                        <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline"><FontAwesomeIcon icon={faLaptopFile} style={{ blockSize:'30px',paddingRight: '3px' }} /><strong> LeaveRecords</strong></span>
                                    </Link>
                                </li>
                            }
                             {(role === "ADMIN" || role ==="SUPERADMIN") &&
                                <li id='profile-btn'>
                                    <Link to="/admin/department" className="nav-link px-0 align-middle text-white">
                                        <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline"><FontAwesomeIcon icon={faLaptopFile} style={{ blockSize:'30px',paddingRight: '3px' }} /><strong> Departments</strong></span>
                                    </Link>
                                </li>
                            }
                            
                          {/* /USER ROUTES */}
                             {(role === "USER" || role === "ADMIN" || role === "SUPERADMIN") &&
                                <li id='profile-btn'>
                                    <Link to="/admin/leavepage" className="nav-link px-0 align-middle text-white">
                                        <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline"><FontAwesomeIcon icon={faLineChart} style={{blockSize:'30px', paddingRight: '8px' }} /><strong> Leave Section</strong></span>
                                    </Link>
                                </li>
                                }
                                {role === 'USER' &&
                                <li id='profile-btn'>
                                    <Link to="/admin/updatedetails" className="nav-link px-0 align-middle text-white">
                                        <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline"><FontAwesomeIcon icon={faLaptopFile} style={{ blockSize:'35px',paddingRight: '3px' }} /><strong> Update Details</strong></span>
                                    </Link>
                                </li>
                                    }
                                {role === 'USER' &&
                                <li id='profile-btn'>
                                    <Link to="/admin/updateperformance" className="nav-link px-0 align-middle text-white">
                                        <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline"><FontAwesomeIcon icon={faAdd} style={{ blockSize:'35px',paddingRight: '3px' }} /><strong> Evaluate Employee</strong></span>
                                    </Link>
                                </li>
                                }
                                
                                
                                
                            </ul>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MIndex;
