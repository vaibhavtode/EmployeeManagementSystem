import React from 'react'
import { Col, Row } from 'reactstrap';
import Home from './Home'
import DynamicList from './DynamicList'

function Homepage() {

  const role = sessionStorage.getItem("role");
  return (
    <div className='row-cols-2'>
        <Row>
            <Col md={6}>
                <Home/>
            </Col>
            {(role === "USER" || role === "SUPERADMIN" ) &&
            <Col md={6}>
                <DynamicList/>
            </Col>
            }
        </Row>
    </div>
  )
}

export default Homepage