package com.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.entity.LeaveEmp;
@Repository
public interface LeaveEmpRepo extends JpaRepository<LeaveEmp, Long> {
	public LeaveEmp findByLeaveType(String lvType);

}
