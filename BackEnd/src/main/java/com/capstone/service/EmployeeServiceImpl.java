package com.capstone.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.auth.AuthenticationService;
import com.capstone.auth.RegisterRequest;
import com.capstone.dto.EmployeeDto;
import com.capstone.entity.Department;
import com.capstone.entity.Employee;
import com.capstone.entity.TeamEmp;
import com.capstone.repository.DepartmentRepo;
import com.capstone.repository.EmployeeRepo;
import com.capstone.repository.TeamEmpRepo;
import com.capstone.service.EmployeeService;
import com.capstone.user.Role;

@Service
public class EmployeeServiceImpl implements EmployeeService{
	 @Autowired
	    private DepartmentRepo drepo;
	    
	    @Autowired
	    private EmployeeRepo erepo;
	    
	    @Autowired
	    private TeamEmpRepo trepo;
	    
	    @Autowired
	    private AuthenticationService authService;

	    public void addNewEmployee(EmployeeDto e) {
	        try {
	            Department dept = drepo.findById(e.getDeptId()).orElseThrow(() -> new RuntimeException("Department not found."));
	    //        TeamEmp team = trepo.findById(e.getTeamId()).orElseThrow(() -> new RuntimeException("Team not found."));
	            Employee manager = erepo.findById(e.getManagerId()).orElseThrow(() -> new RuntimeException("Manager not found."));

	            Employee emp = new Employee();
	            emp.setEmpId(e.getEmpId());
	            emp.setFirstName(e.getFirstName());
	            emp.setMiddleName(e.getMiddleName());
	            emp.setLastName(e.getLastName());
	            emp.setBirthday(e.getBirthday());
	            emp.setGender(e.getGender());
	            emp.setJoining_date(LocalDate.now());
	            emp.setContact(e.getContact());
	            emp.setAddress(e.getAddress());
	            emp.setEmail(e.getEmail());
	            emp.setStatus(e.getStatus());
	            emp.setDepartment(dept);
	           //Assign leaves to each new employee by default
	            emp.setPaid_leaves(15);
	            emp.setPersonal_leaves(15);
	            emp.setSick_leaves(15);
	            //   emp.setTeam(team);
	            emp.setManager(manager);
	            erepo.save(emp);
	            
	            // Register the employee as a user with default password
	            RegisterRequest registerRequest = new RegisterRequest();
	            registerRequest.setEmail(e.getEmail());
	            registerRequest.setPassword(e.getFirstName().toLowerCase() + "@123"); // Generate default password
	            registerRequest.setRole(Role.USER); // Assuming all added employees have the role "EMPLOYEE"
	            authService.register(registerRequest);
	            System.out.println("Employee Record Saved");
	        } catch (RuntimeException ex) {
	        	System.out.println("Employee Record Saved");
	            
	            throw new RuntimeException("Error while adding new employee: " + ex.getMessage());
	            
	        }
	    }

	    public void updateEmployee(EmployeeDto e) {
	        try {
	            Department dept = drepo.findById(e.getDeptId()).orElseThrow(() -> new RuntimeException("Department not found."));
	        //    TeamEmp team = trepo.findById(e.getTeamId()).orElseThrow(() -> new RuntimeException("Team not found."));
	            Employee manager = erepo.findById(e.getManagerId()).orElseThrow(() -> new RuntimeException("Manager not found."));

	            Employee existing = erepo.findById(e.getEmpId()).orElseThrow(() -> new RuntimeException("Employee not found."));

	            if (existing != null) {
	                existing.setEmpId(e.getEmpId());
	                existing.setFirstName(e.getFirstName());
	                existing.setMiddleName(e.getMiddleName());
	                existing.setLastName(e.getLastName());
	                existing.setBirthday(e.getBirthday());
	                existing.setGender(e.getGender());
	                existing.setContact(e.getContact());
	                existing.setAddress(e.getAddress());
	                existing.setEmail(e.getEmail());
	                existing.setStatus(e.getStatus());

	                existing.setDepartment(dept);
	      //          existing.setTeam(team);
	                existing.setManager(manager);
	                erepo.save(existing);
	            }
	        } catch (RuntimeException ex) {
	            
	            throw new RuntimeException("Error while updating employee: " + ex.getMessage());
	        }
	    }
	    
	    public void updateEmployee(int mid, int empid, EmployeeDto emp) {
	        Employee existing = erepo.findByManager_EmpIdAndEmpId(mid, empid);

	        if (existing != null) {
	            // Update team if provided
	            if (emp.getTeamId() != null) {
	                TeamEmp team = trepo.findById(emp.getTeamId()).orElseThrow(() -> new RuntimeException("Team not found."));
	                existing.setTeam(team);
	            }

	            // Update department if provided
	            if (emp.getDeptId() != null) {
	                Department dept = drepo.findById(emp.getDeptId()).orElseThrow(() -> new RuntimeException("Department not found."));
	                existing.setDepartment(dept);
	            }

	            // Update manager if provided
	            
	             erepo.save(existing);
	        }
	    }


	    public List<Employee> getEmployeeByManagerId(int id) {
	        try {
	            return erepo.findByManager_EmpId(id);
	        } catch (RuntimeException ex) {
	            
	            throw new RuntimeException("Error while fetching employees by manager ID: " + ex.getMessage());
	        }
	    }
	    
	    public List<Employee> getEmployeeByManagerName(String name) {
	        try {
	        	String managerName = "%"+name+"%"; 
	            return erepo.findByManager_FirstNameLike(managerName);
	        } catch (RuntimeException ex) {
	            
	            throw new RuntimeException("Error while fetching employees by manager Name: " + ex.getMessage());
	        }
	    }

	    public List<Employee> getEmployeeByName(String name) {
	        try {
	        	String like="%"+name+"%";
	            return erepo.findByFirstNameLike(like);
	        } catch (RuntimeException ex) {
	           
	            throw new RuntimeException("Error while fetching employees by name: " + ex.getMessage());
	        }
	    }

	    public List<Employee> getEmployeeByStatus(String status) {
	        try {
	            return erepo.findByStatus(status);
	        } catch (RuntimeException ex) {
	           
	            throw new RuntimeException("Error while fetching employees by status: " + ex.getMessage());
	        }
	    }

	    public List<Employee> getEmployeeInTeam(Integer teamId) {
	        try {
	            return erepo.findByTeam_TeamId(teamId);
	        } catch (RuntimeException ex) {
	            
	            throw new RuntimeException("Error while fetching employees in team: " + ex.getMessage());
	        }
	    }
	
	
		/*
		 * 
		 * 
		 * //Basic crud by employee id
		 */	
	    
	@Override
	public List<Employee> findAllEmployee() {
		return erepo.findAll();
	}

    @Override
	public Employee getAllEmployeeById(int id) {
		return erepo.findById(id).get();
	}

	


	@Override
	public String updateEmployee(Employee emp) {
		Optional<Employee>empOptional=erepo.findById(emp.getEmpId());
		  if(empOptional.isPresent()) {
			  Employee emp1=empOptional.get();
			  emp1.setFirstName(emp.getFirstName());
			  emp1.setMiddleName(emp.getMiddleName());
			  emp1.setLastName(emp.getLastName());
			  emp1.setContact(emp.getContact());
			  emp1.setBirthday(emp.getBirthday());
			  emp1.setEmail(emp.getEmail());
			  emp1.setGender(emp.getGender());
			  emp1.setStatus(emp.getStatus());
			  
			  erepo.save(emp);
		  }

				return "Updated Successfully";
	}


	@Override
	public String deleteEmployee(int id) {
		Optional<Employee>emp=erepo.findById(id);
		Employee empdelete=emp.orElse(null);
		if(empdelete==null) {
			return"is provided is not valid!!";
		}else {
			erepo.delete(empdelete);
			return "Deleted Successfully";
			
		}
	}

	@Override
	public String addEmployee(Employee emp) {
		erepo.save(emp);
		return "Adding Employee Successfully";
	}

	public void updateStatusById(Integer id) 
	{
		String status = "InActive";
		erepo.updateStatusById(id, status);
		Employee employee = erepo.findById(id).get();
		authService.deleteUser(employee.getEmail());	
	}
	
}
