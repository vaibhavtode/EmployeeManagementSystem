package com.capstone.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.dto.PerformanceDto;
import com.capstone.entity.Employee;
import com.capstone.entity.Performance;
import com.capstone.repository.EmployeeRepo;
import com.capstone.repository.PerformanceRepo;


@Service
public class PerformanceServiceImpl {
	@Autowired
	private EmployeeRepo erepo;
	@Autowired
	private PerformanceRepo prepo;
	
	//retrieves alllist of performances
	public List<Performance> getAllPerforamances() 
	{
		
		return prepo.findAll();
	}
	
//	public List<Performance> getAverageRatingList(){
//		return prepo.getAverageRatingList();
//	}
//	
	
	public void addPerformance(PerformanceDto performance) {
	    Integer employeeId = performance.getEmployeeId();
	    
	    // Check if employee already has a performance record
	    boolean hasPerformanceRecord = prepo.existsByEmployee_EmpId(employeeId);
	   
	    if (hasPerformanceRecord) {
	    // Throw an exception or handle the validation error as needed
	        throw new RuntimeException("Employee already has a performance record.");
	    }
	    
	    // Fetch the employee and manager from the repository
	    Employee employee = erepo.findById(employeeId)
	        .orElseThrow(() -> new RuntimeException("Employee not found."));
	    Employee manager = employee.getManager();
	    
	    // Create the performance object
	    Performance newPerformance = new Performance();
	    newPerformance.setCommunication(performance.getComm());
	    newPerformance.setProductivity(performance.getPro());
	    newPerformance.setCreativity(performance.getCre());
	    newPerformance.setPunctuality(performance.getPun());
	    newPerformance.setEfficiency(performance.getEfficiency());
	    newPerformance.setLearnanddevelop(performance.getLearnanddevelop());
	    float avg = (performance.getComm() + performance.getPro() + performance.getCre() + performance.getPun() + performance.getEfficiency()
	    + performance.getLearnanddevelop())/ 6;
	    newPerformance.setTotalRating(avg);
	    newPerformance.setEmployee(employee);
	    newPerformance.setManager(manager);
	    newPerformance.setDate(LocalDateTime.now());
	    
	    // Save the performance record
	    prepo.save(newPerformance);
	}
	
	public void updatePerformance(PerformanceDto performanceDto) {
	    try {
	        Employee employee = erepo.findById(performanceDto.getEmployeeId())
	                .orElseThrow(() -> new RuntimeException("Employee not found."));

	        Performance performance = prepo.findByEmployee_EmpId(employee.getEmpId());

	        if (performance == null) {
	            throw new RuntimeException("Performance record not found for employee.");
	        }

	        performance.setPerformanceId(performance.getPerformanceId());
	        performance.setCommunication(performanceDto.getComm());
	        performance.setProductivity(performanceDto.getPro());
	        //org skills
	        performance.setCreativity(performanceDto.getCre());
	        //attendance
	        performance.setPunctuality(performanceDto.getPun());
	        performance.setEfficiency(performanceDto.getEfficiency());
	        performance.setLearnanddevelop(performanceDto.getLearnanddevelop());
	        performance.setDate(LocalDateTime.now());

	        // Calculate the total rating based on the given performance metrics
	        float totalRating = (performance.getCommunication() + performance.getProductivity()
	                + performance.getCreativity() + performance.getPunctuality() + performance.getEfficiency() 
	                + performance.getLearnanddevelop()) / 6;
	        System.out.println(totalRating);
	        performance.setTotalRating(totalRating);

	        prepo.save(performance);
	    } catch (RuntimeException ex) {
	        throw new RuntimeException("Error while updating performance: " + ex.getMessage());
	    }
	}
	
	public Performance getPerformanceById(Integer id) {
		return prepo.findByEmployee_EmpId(id);
	}
	
	public List<Performance> getPerformanceListByManagerId(int id) {
		// TODO Auto-generated method stub
		return prepo.findByEmployee_Manager_EmpIdOrderByTotalRatingDesc(id);
	}

	public void updateEmpPerformance(Integer mid,PerformanceDto performance) {
		// TODO Auto-generated method stub
		Performance update=prepo.findByEmployee_Manager_EmpIdAndEmployee_EmpId( mid,performance.getEmployeeId());
		
		if(update!=null) {
			  update.setCommunication(performance.getComm());
		        update.setProductivity(performance.getPro());
		        //org skills
		        update.setCreativity(performance.getCre());
		        //attendance
		        update.setPunctuality(performance.getPun());
		        update.setEfficiency(performance.getEfficiency());
		        update.setLearnanddevelop(performance.getLearnanddevelop());
		        float totalRating = (performance.getComm() + performance.getPro()
                + performance.getCre() + performance.getPun()+performance.getEfficiency() + performance.getLearnanddevelop()) / 6;
                update.setTotalRating(totalRating);
                update.setDate(LocalDateTime.now());

        
		        prepo.save(update);
		}
		
	}

}
