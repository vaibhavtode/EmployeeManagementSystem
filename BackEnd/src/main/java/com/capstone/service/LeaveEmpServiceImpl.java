package com.capstone.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.entity.LeaveEmp;
import com.capstone.repository.LeaveEmpRepo;
import com.capstone.service.LeaveEmpService;

@Service
public class LeaveEmpServiceImpl implements LeaveEmpService {

	@Autowired
	private LeaveEmpRepo repo;
 
	//Basic crud by leave type id
	@Override
	public List<LeaveEmp> getAllELeaveEmps() {
		
		return repo.findAll();
	}

	@Override
	public LeaveEmp getAllLeaveEmpById(Long id) {
		return repo.findById(id).get();
	}

	@Override
	public String addLeaveEmp(LeaveEmp lm) {
		repo.save(lm);
		return "Adding successfully";
	}

	@Override
	public String updateLeaveEmp(LeaveEmp lm) {
	
		Optional<LeaveEmp>lmOptional= repo.findById(lm.getLeaveId());
		if(lmOptional.isPresent()) {
			LeaveEmp lm1=lmOptional.get();
			lm1.setLeaveType(null);
			
			repo.save(lm1);
		}
		
		return "Updated Successfully";
	}

	@Override
	public String deleteLeaveEmp(Long id) {
	Optional<LeaveEmp>lm=repo.findById(id);
	LeaveEmp lmdelete=lm.orElse(null);
	if(lmdelete==null) {
		return "id is not valid";
	}else {
		repo.delete(lmdelete);
		return "Deleted Successfully";
	}
	
	}

}
