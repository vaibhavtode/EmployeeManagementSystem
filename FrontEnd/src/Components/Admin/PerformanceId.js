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
import Chart from 'chart.js/auto';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import '../../Styles/PerformanceId.css';

const PerformanceId = () => {
  const [show, setShow] = useState(false);
  const tableRef = useRef(null);
  const [prfs, setPerformances] = useState([]);

  const getConfig = () => {
    const config = {
      headers: {
        "Authorization": sessionStorage.getItem("token"),
      },
    };
    return config;
  };

  useEffect(() => {
    loadPrfs();
  }, []);

  const loadPrfs = async () => {
    const result = await axios.get('http://localhost:2023/performance/alldata', getConfig());
    setPerformances(result.data);
  };

  useEffect(() => {
    if (prfs.length > 0) {
      if (!tableRef.current) {
        tableRef.current = $('#example').DataTable({
          dom: 'Bfrtip',
          buttons: [
            'copy',
            'csv',
            {
              extend: 'collection',
              text: 'Generate Bar Graph',
              buttons: ['print', 'pdfHtml5'],
              action: function () {
                const data = this.rows({ search: 'applied' }).data().toArray();
                const labels = data.map((row) => row[1]); // Assuming the first column is the First Name
                const ratings = data.map((row) => row[12]); // Assuming the 13th column is the Overall Rating

                const ctx = document.getElementById('barGraph').getContext('2d');
                if (window.barGraphChart) {
                  window.barGraphChart.destroy();
                }
                window.barGraphChart = new Chart(ctx, {
                  type: 'bar',
                  data: {
                    labels: labels,
                    datasets: [
                      {
                        label: 'Overall Rating',
                        data: ratings,
                        backgroundColor: 'rgba(17, 48, 60, 0.2)',
                        borderColor: 'rgba(46,47,48, 1)',
                        borderWidth: 2,
                      },
                    ],
                  },
                  options: {
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 5,
                        stepSize: 1,
                        ticks: {
                          precision: 0,
                        },
                      },
                    },
                  },
                });
              },
            },
          ],
        });
      }
    }
  }, [prfs]);

  const handleShow = () => setShow(true);

  return (
    <div id='perf-box' className='container-wrapper'>
      <div className="card" style={{ marginTop: '2%', borderRadius: '10px', borderColor:'black' }}>
        <Link to={'addperformance'} className="btn btn-primary" style={{ marginLeft: '85%', display: 'inline' }} onClick={handleShow}>
          {/* <i className="material-icons" style={{ verticalAlign: 'middle', marginRight: '5px' }}>&#xE147;</i> */}
          <span style={{ verticalAlign: 'middle' }}><strong>Add Performance</strong></span>
        </Link>
        <div id='performance-card-body' className="card-body">
          <h1 style={{ textAlign: 'center', color: 'blue' }}>Performance Records</h1>
          <table id="example" className="strip hover">
            <thead>
              <tr>
                <th>Emp Id</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Manager Name</th>
                <th>Date of Review</th>
                <th>Communication</th>
                <th>Productivity</th>
                <th>Organizational Skills</th>
                <th>Attendance</th>
                <th>Efficiency</th>
                <th>Learn and Develop</th>
                <th>Overall Rating</th>
              </tr>
            </thead>
            {/* <tfoot>
              <tr>
                <th>Emp Id</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Manager Name</th>
                <th>Date of Review</th>
                <th>Communication</th>
                <th>Productivity</th>
                <th>Organizational Skills</th>
                <th>Attendance</th>
                <th>Efficiency</th>
                <th>Learn and Develop</th>
                <th>Overall Rating</th>
              </tr>
            </tfoot> */}
            <tbody>
              {prfs.map((prp, index) => (
                <tr key={index}>
                  <td>EMS0{prp.employee.empId}</td>
                  <td>{prp.employee.firstName}</td>
                  <td>{prp.employee.middleName}</td>
                  <td>{prp.employee.lastName}</td>
                  <td>{prp.manager ? `${prp.manager.firstName} ${prp.manager.lastName}` : ''}</td>
                  <td>{prp.date}</td>
                  <td className='text-center'>{prp.communication}</td>
                  <td className='text-center'>{prp.productivity}</td>
                  <td className='text-center'>{prp.creativity}</td>
                  <td className='text-center'>{prp.punctuality}</td>
                  <td className='text-center'>{prp.efficiency}</td>
                  <td className='text-center'>{prp.learnanddevelop}</td>
                  <td className='text-center'>{prp.totalRating}</td>
                </tr>
              ))}
            </tbody>
            <thead>
              <tr>
                <th colSpan="13">
                  <canvas id="barGraph"></canvas>
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformanceId;

