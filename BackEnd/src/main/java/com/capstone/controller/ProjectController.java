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

import com.capstone.entity.Project;
import com.capstone.service.ProjectService;
@RestController
@CrossOrigin(origins = "http://localhost:3000",methods = {RequestMethod.PUT,RequestMethod.GET,RequestMethod.DELETE,RequestMethod.POST})
@RequestMapping("/projects")
public class ProjectController {
	@Autowired
	private ProjectService projectService;
	
	@GetMapping()
	public ResponseEntity<List<Project>> findAllProject(){
		List<Project> projects = projectService.findAllProject();
		return ResponseEntity.ok(projects);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Project> getAllEmployeeById(@PathVariable("id") int id) {
		Project project = projectService.getAllProjectById(id);
		if (project != null) {
			return ResponseEntity.ok(project);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PostMapping()
	public ResponseEntity<String> addProject(@RequestBody Project prj) {
		String message = projectService.addProject(prj);
		return ResponseEntity.ok(message);
	}
	
	@PutMapping()
	public ResponseEntity<String> updateProject(@RequestBody Project prj) {
		String message = projectService.updateProject(prj);
		return ResponseEntity.ok(message);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteProject(@PathVariable("id")int id) {
		String message = projectService.deleteProject(id);
		return ResponseEntity.ok(message);
	}
}
