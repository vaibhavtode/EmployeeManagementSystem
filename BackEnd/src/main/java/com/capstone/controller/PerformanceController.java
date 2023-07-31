package com.capstone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.dto.PerformanceDto;
import com.capstone.entity.Performance;
import com.capstone.service.PerformanceServiceImpl;

@CrossOrigin(origins = "http://localhost:3000",methods = {RequestMethod.PUT,RequestMethod.GET,RequestMethod.DELETE,RequestMethod.POST})
@RestController
@RequestMapping("/performance")
public class PerformanceController {
	@Autowired
	private PerformanceServiceImpl service;
	
	@GetMapping("/alldata")
	public List<Performance> getAllPerformances(){
		return this.service.getAllPerforamances();
	}
	//Controller for getting average performance of employee for charting
//	@GetMapping("/averageScore")
//	public List<Performance> getAverageRatingList(){
//		return this.service.getAverageRatingList();
//	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Performance> performanceById(@PathVariable int id) {
		Performance performance = service.getPerformanceById(id);
		if (performance != null) {
			return ResponseEntity.ok(performance);
		} else {
			return ResponseEntity.notFound().build();
		 }
	}
	@GetMapping("/manager/{managerid}")
	public ResponseEntity<List<Performance>> performanceListByOrder(@PathVariable int managerid) {
		List<Performance> performance = service.getPerformanceListByManagerId(managerid);
		if (performance != null) {
			return ResponseEntity.ok(performance);
		} else {
			return ResponseEntity.notFound().build();
		 }
	}
	@PutMapping("/manager/{managerid}/update")
	public ResponseEntity<String> updatePerformanceOfEmployee(@PathVariable int managerid,@RequestBody PerformanceDto performance) {
		service.updateEmpPerformance(managerid,performance);
		
		return ResponseEntity.ok("Updated performance successfully");
		
		 
	}
	
	
	
	@PostMapping("/add")
	public ResponseEntity<String> performance(@RequestBody PerformanceDto performance) {
		service.addPerformance(performance);
		return ResponseEntity.ok("Added performance successfully");
	}
	
	@PutMapping("/update")
	public ResponseEntity<String> performanceUpdate(@RequestBody PerformanceDto performance) {
		service.updatePerformance(performance);
		return ResponseEntity.ok("Updated performance successfully");
	}
}
