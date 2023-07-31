package com.capstone.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.entity.Department;
import com.capstone.repository.DepartmentRepo;
import com.capstone.service.DepartmentService;

@Service
public class DepartmentServiceImpl implements DepartmentService {
	@Autowired
	private DepartmentRepo repo;

	@Override
	public List<Department> findAllDepartment() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public Department getAllDepartmentById(int id) {
		// TODO Auto-generated method stub
		Optional<Department> dept=repo.findById(id);
		return dept.get();
				
	}

	@Override
	public String addDepartment(Department dep) {
		repo.save(dep);
		return "Adding Department Successfully";
	}

	@Override
	public String updateDepartment(Department dep) {
		Optional<Department>depOptional=repo.findById(dep.getDept_id());
		if(depOptional.isPresent()) {
			Department dep1=depOptional.get();
			dep1.setDname(dep.getDname());
			
			repo.save(dep1);
		}
		return "Updating Department Successfully";
	}

	@Override
	public String deleteDepartment(int id) {
		Optional<Department>dep=repo.findById(id);
		Department depdelete=dep.orElse(null);
		if(depdelete==null) {
			return "id is not valid";
		}else {
			
			repo.delete(depdelete);
			return "Deleted Successfully";
		}
		
	}

	

	
}
