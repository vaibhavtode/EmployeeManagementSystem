package com.capstone.service;

import java.util.List;

import com.capstone.entity.Department;
import com.capstone.entity.Employee;

public interface DepartmentService {
	//get method
		public List<Department> findAllDepartment();
		public Department getAllDepartmentById(int id);
		//post method
		public String addDepartment(Department dep);
		//update method
		public String updateDepartment(Department dep);
		//delete method 
		public String deleteDepartment(int id);

}
