package com.capstone.service;

import java.util.List;

import com.capstone.entity.LeaveEmp;



public interface LeaveEmpService {
	
	public List<LeaveEmp>getAllELeaveEmps();
	public LeaveEmp getAllLeaveEmpById(Long id);
	public String addLeaveEmp(LeaveEmp lm);
	public String updateLeaveEmp(LeaveEmp lm);
	public String deleteLeaveEmp(Long id);

}
