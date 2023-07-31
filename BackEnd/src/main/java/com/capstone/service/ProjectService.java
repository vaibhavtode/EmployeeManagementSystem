package com.capstone.service;

import java.util.List;

import com.capstone.entity.Employee;
import com.capstone.entity.Project;

public interface ProjectService {
	    //get method
		public List<Project> findAllProject();
		public Project getAllProjectById(int id);
		//post method
		public String addProject(Project prj);
		//Update method
		public String updateProject(Project prj);
		//delete
		public String deleteProject(int id);

}
