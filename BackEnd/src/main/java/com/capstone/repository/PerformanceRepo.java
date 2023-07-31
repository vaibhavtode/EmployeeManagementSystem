package com.capstone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.entity.EmpLeave;
import com.capstone.entity.Performance;

public interface PerformanceRepo extends JpaRepository<Performance, Integer> {
	Performance findByEmployee_EmpId(Integer id);
	List<Performance> findByEmployee_Manager_EmpIdOrderByTotalRatingDesc(Integer id);
	Performance findByEmployee_Manager_EmpIdAndEmployee_EmpId(Integer mid,Integer id);
	Boolean existsByEmployee_EmpId(Integer id);
//	List<Performance> getAverageRatingList();

}
