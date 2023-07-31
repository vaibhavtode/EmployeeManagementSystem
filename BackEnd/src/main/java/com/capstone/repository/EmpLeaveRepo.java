package com.capstone.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.entity.EmpLeave;

@Repository
public interface EmpLeaveRepo extends JpaRepository<EmpLeave,Long> {
  List<EmpLeave> findByEmployee_Manager_EmpId(Integer id);
  EmpLeave findByEmployee_Manager_EmpIdAndEmpLeaveId(Integer managerId,Long leaveId);
  List<EmpLeave> findByEmployee_Manager_EmpIdAndEmployee_EmpId(Integer managerId,Integer empId);
  List<EmpLeave> findByEmployee_Manager_EmpIdAndStatus(Integer mid,String status);
  List<EmpLeave> findByEmployee_EmpIdAndStatus(Integer empid,String status);
  List<EmpLeave> findByEmployee_FirstNameAndEmployee_Manager_EmpId(String employeeFirstname,Integer managerId);
  List<EmpLeave> findByEmployee_EmpIdAndStatusAndEndDateAfter(Integer id,String status,LocalDate date);
  
//  EmpLeave findByEmployee_Manager_EmpIdAndEmployee_EmpName(Integer managerId, String employeeName);

}
