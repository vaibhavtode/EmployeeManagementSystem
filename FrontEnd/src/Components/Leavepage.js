import React from 'react'
import { Col, Row } from 'reactstrap';
import ApplyLeave from './ApplyLeave';
import LeaveRequest from './LeaveRequest';


function Leavepage() {
  const role = sessionStorage.getItem("role");
  return (
    <div className='row-cols-2'>
        <Row>
       {(role === 'USER' || role === 'ADMIN') && 
            <Col md={6}>
                <ApplyLeave/>
            </Col>
        }
        {(role === 'USER' || role === 'SUPERADMIN') &&
            <Col md={6}>
                <LeaveRequest/>
            </Col>
        }
        </Row>
    </div>
  )
}

export default Leavepage