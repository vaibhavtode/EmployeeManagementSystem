package com.capstone.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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

import com.capstone.entity.Attendance;
import com.capstone.service.AttendanceService;

@CrossOrigin(origins = "http://localhost:3000",methods = {RequestMethod.PUT,RequestMethod.GET,RequestMethod.DELETE,RequestMethod.POST})
@RestController
@RequestMapping("/attendance")
public class AttendanceController {
	@Autowired
	private AttendanceService attendanceService;
	
	@GetMapping("/bydateandid/{id}")
	public ResponseEntity<String> findByDateAndEmpId(@PathVariable int id) {
		attendanceService.findByDateAndEmpId(LocalDate.now(), id);
		return ResponseEntity.ok("Checked in details fetched succesfully");
	}
	
	@PostMapping("/checkin/{id}")
	public ResponseEntity<String> addCheckin(@PathVariable int id) {
		attendanceService.checkIn(id);
		return ResponseEntity.ok("Check-in Successful");
	}
	    
	@PostMapping("/checkout/{id}")
	public ResponseEntity<String> addCheckout(@PathVariable int id) {
		attendanceService.checkout(id);
		return ResponseEntity.ok("Check-out Successful");
	}
	    
	@GetMapping("/byid/{id}")
	public ResponseEntity<List<Attendance>> attendanceById(@PathVariable int id) {
		List<Attendance> attendanceList = attendanceService.attendanceById(id);
		return ResponseEntity.ok(attendanceList);
	}
	    
	@GetMapping("/bydate")
	public ResponseEntity<List<Attendance>> attendanceByCurrentDate() {
		LocalDate date = LocalDate.now();
		List<Attendance> attendanceList = attendanceService.attendanceByDate(date);
		return ResponseEntity.ok(attendanceList);
	}
	    
	@GetMapping("/bydate/{date}")
	public ResponseEntity<List<Attendance>> attendanceByDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
		List<Attendance> attendanceList = attendanceService.attendanceByDate(date);
		return ResponseEntity.ok(attendanceList);
	}
	
	
	
//Basic Crud based on Attendance id	

	@GetMapping("/{id}")
	public ResponseEntity<Attendance> getAttendanceById(@PathVariable int id) {
		Attendance attendance = attendanceService.getAllAttendanceById(id);
		if (attendance != null) {
			return ResponseEntity.ok(attendance);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping()
	public ResponseEntity<List<Attendance>> findAllAttendance(){
		List<Attendance> attendanceList = attendanceService.findAllAttendance();
		return ResponseEntity.ok(attendanceList);
	}
	
	@PostMapping()
	public ResponseEntity<String> addAttendance(@RequestBody Attendance att) {
		String message = attendanceService.addAttendance(att);
		return ResponseEntity.ok(message);
	}
	
    @PutMapping()
    public ResponseEntity<String> updateAttendance(@RequestBody Attendance att) {
    	String message = attendanceService.updateAttendance(att);
    	return ResponseEntity.ok(message);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAttendance(@PathVariable("id") int id) {
    	String message = attendanceService.deleteAttendance(id);
    	return ResponseEntity.ok(message);
    }
}
