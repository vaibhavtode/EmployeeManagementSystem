package com.capstone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.entity.TeamEmp;
import com.capstone.service.TeamEmpService;
@RestController
@CrossOrigin(origins = "http://localhost:3000",methods = {RequestMethod.PUT,RequestMethod.GET,RequestMethod.DELETE,RequestMethod.POST})
@RequestMapping("/teams")
public class TeamEmpController {
	@Autowired
	private TeamEmpService teamservice;
	
	@GetMapping("/{id}")
	public ResponseEntity<TeamEmp> getTeamById(@PathVariable int id) {
		TeamEmp teamEmp = teamservice.getAllTeamById(id);
		if (teamEmp != null) {
			return ResponseEntity.ok(teamEmp);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping()
	public ResponseEntity<List<TeamEmp>> findAllTeam(){
		List<TeamEmp> teams = teamservice.findAllTeam();
		return ResponseEntity.ok(teams);
	}
	
	@PostMapping()
	public ResponseEntity<String> addTeam(@RequestBody TeamEmp tm) {
		String message = teamservice.addTeam(tm);
		return ResponseEntity.ok(message);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteTeam(@PathVariable("id")int id) {
		String message = teamservice.deleteTeam(id);
		return ResponseEntity.ok(message);
	}
}
