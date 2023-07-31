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

import com.capstone.entity.LeaveEmp;
import com.capstone.service.LeaveEmpService;
@CrossOrigin(origins = "http://localhost:3000",methods = {RequestMethod.PUT,RequestMethod.GET,RequestMethod.DELETE,RequestMethod.POST})
@RestController 
@RequestMapping("/leavetype")
public class LeaveEmpController {
	@Autowired
	private LeaveEmpService lservice;
	
	@GetMapping()
	public ResponseEntity<List<LeaveEmp>> getAllLeaveEmps() {
		List<LeaveEmp> leaveEmps = lservice.getAllELeaveEmps();
		return ResponseEntity.ok(leaveEmps);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<LeaveEmp> getAllLeaveEmpById(@PathVariable("id") Long id) {
		LeaveEmp leaveEmp = lservice.getAllLeaveEmpById(id);
		if (leaveEmp != null) {
			return ResponseEntity.ok(leaveEmp);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PostMapping()
	public ResponseEntity<String> addLeaveEmp(@RequestBody LeaveEmp lm) {
		String message = lservice.addLeaveEmp(lm);
		return ResponseEntity.ok(message);
	}
	
	@PutMapping()
	public ResponseEntity<String> updateLeaveEmp(@RequestBody LeaveEmp lm) {
		String message = lservice.updateLeaveEmp(lm);
		return ResponseEntity.ok(message);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteLeaveEmp(@PathVariable("id") Long id) {
		String message = lservice.deleteLeaveEmp(id);
		return ResponseEntity.ok(message);
	}
}
