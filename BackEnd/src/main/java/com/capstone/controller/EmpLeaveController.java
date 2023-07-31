package com.capstone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.capstone.dto.EmpLeaveDto;
import com.capstone.dto.LeaveApproveReject;
import com.capstone.entity.EmpLeave;
import com.capstone.service.EmpLeaveService;

@CrossOrigin(origins = "http://localhost:3000",methods = {RequestMethod.PUT,RequestMethod.GET,RequestMethod.DELETE,RequestMethod.POST})
@RestController
@RequestMapping("/leave")
public class EmpLeaveController {
	@Autowired
	private EmpLeaveService leaveService;
	
	
	@PostMapping("/applyleave")
	public ResponseEntity<String> applyLeave(@RequestBody EmpLeaveDto leave) {
		String message = leaveService.applyLeave(leave);
		if(message == "Give a proper leave request") {
			return ResponseEntity.badRequest().build();
		}else {
		return ResponseEntity.ok(message);
	}
	}
	
	
	@GetMapping("/leavetomanager/{managerid}/{empid}")
	public ResponseEntity<List<EmpLeave>> leavesToManagerAndEmpId(@PathVariable("managerid") int mId, @PathVariable("empid") int empId) {
		List<EmpLeave> leaves = leaveService.getAllLeaveAppliedToManagerByEmp(mId, empId);
		return ResponseEntity.ok(leaves);
	}
	
	@GetMapping("/leavetomanager/{managerid}")
	public ResponseEntity<List<EmpLeave>> leavesToManager(@PathVariable("managerid") int mId) {
		List<EmpLeave> leaves = leaveService.getAllLeaveAppliedToManager(mId);
		return ResponseEntity.ok(leaves);
	}
	
	@PutMapping("/leavetomanager/{managerid}/change")
	public ResponseEntity<String> updateByManager(@PathVariable Integer managerid, @RequestBody LeaveApproveReject leave) {
	    try {
	        leaveService.approveLeave(managerid, leave);
	        return ResponseEntity.ok("Employee leave status updated successfully");
	    } catch (IllegalArgumentException ex) {
	        return ResponseEntity.notFound().build();
	    } catch (RuntimeException ex) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	}

	
	@GetMapping("/leavetomanager/{managerid}/status/{status}")
	public ResponseEntity<List<EmpLeave>> leavesToManagerAndStatus(@PathVariable("managerid") int mId, @PathVariable("status") String status) {
		List<EmpLeave> leaves = leaveService.getAllLeaveAppliedToManagerByStatus(mId, status);
		return ResponseEntity.ok(leaves);
	}
	
	@GetMapping("/leaveapplied/{empid}/status/{status}")
	public ResponseEntity<List<EmpLeave>> leavesAppliedAndStatus(@PathVariable("empid") int eId, @PathVariable("status") String status) {
		List<EmpLeave> leaves = leaveService.getAllLeaveAppliedByStatus(eId, status);
		return ResponseEntity.ok(leaves);
	}
	
	
	
	
	@GetMapping("/{id}")
	public ResponseEntity<EmpLeave> getLeaveById(@PathVariable int id) {
		EmpLeave leave = leaveService.getAllEmpLeaveById(id);
		if (leave != null) {
			return ResponseEntity.ok(leave);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping()
	public ResponseEntity<List<EmpLeave>> findAllLeave() {
		List<EmpLeave> leaves = leaveService.findAllEmpLeave();
		return ResponseEntity.ok(leaves);
	}

	@PostMapping()
	public ResponseEntity<String> addEmpLeave(@RequestBody EmpLeave eml) {
		String message = leaveService.addEmpleave(eml);
		return ResponseEntity.ok(message);
	}
	
	@PutMapping()
	public ResponseEntity<String> updateEmpLeave(@RequestBody EmpLeave eml) {
		String message = leaveService.updateEmpleave(eml);
		return ResponseEntity.ok(message);
	}
	
	@DeleteMapping("/leaves/{id}")
	public ResponseEntity<String> deleteEmpLeave(@PathVariable("id") long id) {
		String message = leaveService.deleteEmpleave(id);
		return ResponseEntity.ok(message);
	}
}

	
	
	
	
	
	

