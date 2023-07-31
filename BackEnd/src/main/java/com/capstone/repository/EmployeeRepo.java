package com.capstone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.capstone.entity.Employee;

import jakarta.transaction.Transactional;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Integer>{
	List<Employee>findByManager_EmpId(Integer id);
	Employee findByManager_EmpIdAndEmpId(Integer mId,Integer eid);
	List<Employee>findByFirstNameLike(String name);
	List<Employee>findByStatus(String name);
	List<Employee>findByTeam_TeamId(Integer id);
	List<Employee> findByManager_FirstNameLike(String name);
	Employee findByEmail(String email);
	
	@Transactional
    @Modifying
    @Query("UPDATE Employee e SET e.status = :status WHERE e.id = :id")
    void updateStatusById(Integer id, String status);
	

}