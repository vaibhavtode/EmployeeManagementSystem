package com.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.entity.Project;
@Repository
public interface ProjectRepo extends JpaRepository<Project, Integer> {

}
