package com.capstone.service;

import java.util.List;

import com.capstone.dto.EmpLeaveDto;
import com.capstone.dto.LeaveApproveReject;
import com.capstone.entity.EmpLeave;

public interface EmpLeaveService {
	public List<EmpLeave> findAllEmpLeave();
	public EmpLeave getAllEmpLeaveById(long id);
	public String addEmpleave(EmpLeave eml);
	public String updateEmpleave(EmpLeave eml);
	public String deleteEmpleave(long id);
	
	
	
	public String applyLeave(EmpLeaveDto leave);
	public void approveLeave(Integer managerId, LeaveApproveReject leavestatus);
	public List<EmpLeave> getAllLeaveAppliedToManagerByEmp(Integer managerId, Integer empId);
	public List<EmpLeave> getAllLeaveAppliedToManager(Integer managerId);
	public List<EmpLeave> getAllLeaveAppliedToManagerByStatus(Integer managerId, String status);
	public List<EmpLeave> getAllLeaveAppliedByStatus(Integer empId, String status);
}
