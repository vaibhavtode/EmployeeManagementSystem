import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons-dt/css/buttons.dataTables.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil,faTrash} from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';


const Department = () => {

  const [show, setShow] = useState(false);

  const tableRef = useRef(null);
  const[dep,setDepartment] = useState([]);
  const getConfig = () => {
    const config = {
      headers: {
        Authorization: sessionStorage.getItem('token'),
      },
    };
    return config;
  }; 


  useEffect(() => {
    loaddep();
  },[]);
  

  const loaddep = async ()=> {
    const result = await axios.get('http://localhost:2023/department',getConfig());
    setDepartment(result.data);
  };


  const deletedep = async (id) => {
    swal({
      title: 'Are you sure?',
      text: 'You want to delete the Department',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:2023/department/${id}`,getConfig())
          .then(() => {
            loaddep();
          })
          .catch((error) => {
            console.error('Error deleting department:', error);
          });
      }
    });
  };


  useEffect(() => {
    if (dep.length > 0) {
      if (!tableRef.current) {
        tableRef.current = $('#example').DataTable({
          dom: 'Bfrtip',
          buttons: ['copy', 'csv'],
        });
      }
    }
  }, [dep]);

 
  const handleShow = () => setShow(true);

  



  return(

    <div className='container-wrapper'>
        <h1 style={{textAlign:'center',color:'blue'}}>Department Records</h1>
    <div className="card"style={{marginTop:'2%',borderRadius:'10px',borderColor:'black' }}>
  

    <Link to={'/admin/department/addepartment'} className="btn btn-primary" style={{ marginLeft: '85%', display: 'inline' }} onClick={handleShow}>
                  {/* <i className="material-icons" style={{ verticalAlign: 'middle', marginRight: '5px' }}>&#xE147;</i> */}
                  <span style={{ verticalAlign: 'middle' }}>Add Department</span>
                </Link>


      <div className="card-body"> 
        <table id="example" className="strip hover">
          <thead>
            <tr>
            <th>Department Id</th>
            <th>Department Name</th>
             
              <th className='text-center'>Action</th>
              
            </tr>
          </thead>
          <tbody>
          {dep.map((dept,index) => (
              <tr key={index}>
                  <td>DPT0{dept.dept_id}</td>
                <td>{dept.dname}</td>

                <td className="text-center" style={{display:'flex',justifyContent:'center',gap:'5px'}}>
                <Link className="btn text-warning btn-act" data-toggle="modal" to={`/admin/department/edidepartment/${dept.dept_id}`}>
                  <i className="fa fa-pencil"></i>
                  <FontAwesomeIcon icon={faPencil}/>

                </Link>


                <button onClick={()=>deletedep(dept.dept_id)} className="btn text-danger btn-act" data-toggle="modal" >
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

export default Department;