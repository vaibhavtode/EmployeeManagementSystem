package com.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.entity.Department;
@Repository
public interface DepartmentRepo extends JpaRepository<Department, Integer> {

}
