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

import com.capstone.dto.EmployeeDto;
import com.capstone.entity.Employee;
import com.capstone.service.EmployeeService;
@CrossOrigin(origins = "http://localhost:3000",methods = {RequestMethod.PUT,RequestMethod.GET,RequestMethod.DELETE,RequestMethod.POST})
@RestController
@RequestMapping("/employees")
public class EmployeeController {
	@Autowired
	private EmployeeService employeeService;
	
	
	@GetMapping("/byname/{name}")
	public ResponseEntity<List<Employee>> employeeByName(@PathVariable String name){
		List<Employee> employees = employeeService.getEmployeeByName(name);
		return ResponseEntity.ok(employees);
	}
	
	@GetMapping("/bystatus/{status}")
	public ResponseEntity<List<Employee>> employeeByStatus(@PathVariable String status){
		List<Employee> employees = employeeService.getEmployeeByStatus(status);
		return ResponseEntity.ok(employees);
	}
	
	@PostMapping()
	public ResponseEntity<String> saveEmployee(@RequestBody EmployeeDto emp) {
		employeeService.addNewEmployee(emp);
		return ResponseEntity.ok("Employee successfully added");
	}
	
	@PutMapping("/update")
	public ResponseEntity<String> updateEmployee(@RequestBody EmployeeDto emp) {
		employeeService.updateEmployee(emp);
		return ResponseEntity.ok("Employee successfully updated");
	}
	
	@PutMapping("/undermanager/{managerid}/update/{empid}")
	public ResponseEntity<String> updateEmployee(@PathVariable int managerid, @PathVariable int empid, @RequestBody EmployeeDto emp) {
		employeeService.updateEmployee(managerid, empid, emp);
		return ResponseEntity.ok("Employee successfully updated");
	}
	
	@GetMapping("/undermanager/{managerid}")
	public ResponseEntity<List<Employee>> employeeUnderManager(@PathVariable("managerid") int id){
		List<Employee> employees = employeeService.getEmployeeByManagerId(id);
		return ResponseEntity.ok(employees);
	}
	//added extra api
	@GetMapping("/undermanagerName/{managerName}")
	public ResponseEntity<List<Employee>> employeeUnderManager(@PathVariable("managerName") String name){
		List<Employee> employees = employeeService.getEmployeeByManagerName(name);
		return ResponseEntity.ok(employees);
	}
	
	@GetMapping("/inteam/{teamid}")
	public ResponseEntity<List<Employee>> employeeUnderTeam(@PathVariable int teamid){
		List<Employee> employees = employeeService.getEmployeeInTeam(teamid);
		return ResponseEntity.ok(employees);
	}
	
	@GetMapping()
	public ResponseEntity<List<Employee>> findAllEmployee(){
		List<Employee> employees = employeeService.findAllEmployee();
		return ResponseEntity.ok(employees);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Employee> getAllEmployeeById(@PathVariable("id") int id) {
		Employee employee = employeeService.getAllEmployeeById(id);
		if (employee != null) {
			return ResponseEntity.ok(employee);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PutMapping("/updatestatus/{id}")
	public ResponseEntity<String> updateStatus(@PathVariable Integer id) {
		 employeeService.updateStatusById(id);
		 String msg = "status updated successfully";
		return ResponseEntity.ok(msg);
	}
	@PostMapping("/add")
	public ResponseEntity<String> addEmployee(@RequestBody Employee emp) {
		String message = employeeService.addEmployee(emp);
		return ResponseEntity.ok(message);
	}
	
	@PutMapping()
	public ResponseEntity<String> updateEmployee(@RequestBody Employee emp) {
		String message = employeeService.updateEmployee(emp);
		return ResponseEntity.ok(message);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable("id")int id) {
		String message = employeeService.deleteEmployee(id);
		return ResponseEntity.ok(message);
	}
}
