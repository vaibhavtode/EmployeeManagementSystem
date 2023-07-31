package com.capstone.service;

import java.util.List;

import com.capstone.dto.EmployeeDto;
import com.capstone.entity.Employee;

public interface EmployeeService {
    //get method
	public List<Employee> findAllEmployee();
	public Employee getAllEmployeeById(int id);
	//post method
	public String addEmployee(Employee emp);
	//delete method 
	public String deleteEmployee(int id);
	//put method
//	public Employee updateEmployee(int id, Employee employee);
	
	public String updateEmployee(Employee emp);
	
	
	
	
	public void addNewEmployee(EmployeeDto e);
	public void updateEmployee(EmployeeDto e);
	public void updateEmployee(int mid, int empid, EmployeeDto emp);
	public List<Employee> getEmployeeByManagerId(int id);
	public List<Employee> getEmployeeByName(String name);
    public List<Employee> getEmployeeByStatus(String status);
    public List<Employee> getEmployeeInTeam(Integer teamId);
    public List<Employee> getEmployeeByManagerName(String name);
    public void updateStatusById(Integer id);
	
	

}
