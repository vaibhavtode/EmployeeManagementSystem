package com.capstone.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.entity.Project;
import com.capstone.repository.ProjectRepo;
import com.capstone.service.ProjectService;

@Service
public class ProjectServiceImpl implements ProjectService{
	@Autowired
	private ProjectRepo repo;
//Basic crud by project id
	@Override
	public List<Project> findAllProject() {
		return repo.findAll();
	}

	@Override
	public Project getAllProjectById(int id) {
		return repo.findById(id).get();
	}

	@Override
	public String addProject(Project prj) {
		repo.save(prj);
		return "Adding project Successfully";
	}

	@Override
	public String updateProject(Project prj) {
		Optional<Project>prjOptional=repo.findById(prj.getProjectId());
		 if(prjOptional.isPresent()) {
			 Project prj1=prjOptional.get();
			 prj1.setProjectName(prj.getProjectName());
			 prj1.setProjectDetails(prj.getProjectDetails());
			 
			 repo.save(prj1);
		 }
		
		return "Updated Successfully";
	}

	@Override
	public String deleteProject(int id) {
		Optional<Project>prj=repo.findById(id);
		Project prjdelete=prj.orElse(null);
		if(prjdelete==null) {
			return "id is not valid";
		}else {
			repo.delete(prjdelete);
		
		return "Deleted Successfully";
	  }
	}
	
}
