package com.capstone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.entity.Department;
import com.capstone.service.DepartmentService;
@CrossOrigin(origins = "http://localhost:3000",methods = {RequestMethod.PUT,RequestMethod.GET,RequestMethod.DELETE,RequestMethod.POST})
@RestController
@RequestMapping("/department")
public class DepartmentController {
	@Autowired
	private DepartmentService departmentService;
	
	@GetMapping("/{id}")
	public ResponseEntity<Department> getDepartmentById(@PathVariable int id) {
		Department department = departmentService.getAllDepartmentById(id);
		if (department != null) {
			return ResponseEntity.ok(department);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping()
	public ResponseEntity<List<Department>> findAllDepartment() {
		List<Department> departmentList = departmentService.findAllDepartment();
		return ResponseEntity.ok(departmentList);
	}
	
	@PostMapping()
	public ResponseEntity<String> addDepartment(@RequestBody Department dep) {
		String message = departmentService.addDepartment(dep);
		return ResponseEntity.ok(message);
	}

	@PutMapping()
	public ResponseEntity<String> updateDepartment(@RequestBody Department dep) {
		String message = departmentService.updateDepartment(dep);
		return ResponseEntity.ok(message);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteDepartment(@PathVariable("id") int id) {
		String message = departmentService.deleteDepartment(id);
		return ResponseEntity.ok(message);
	}
}

