package com.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.entity.TeamEmp;

@Repository
public interface TeamEmpRepo extends JpaRepository<TeamEmp, Integer> {

}
