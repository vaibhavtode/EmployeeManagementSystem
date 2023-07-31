package com.capstone.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.entity.TeamEmp;
import com.capstone.repository.TeamEmpRepo;
import com.capstone.service.TeamEmpService;
@Service
public class TeamEmpServiceImpl implements TeamEmpService{
    @Autowired
    private TeamEmpRepo repo;
	
    //Basic crud by teamid
    @Override
	public List<TeamEmp> findAllTeam() {
		return repo.findAll();
	}

	@Override
	public TeamEmp getAllTeamById(int id) {
		return repo.findById(id).get();
	}

	@Override
	public String addTeam(TeamEmp tm) {
		repo.save(tm);
		return "Adding Team Successfully";
	}

	
	@Override
	public String deleteTeam(int id) {
		Optional<TeamEmp>tm=repo.findById(id);
		TeamEmp tmdelete=tm.orElse(null);
		if(tmdelete==null) {
		return"id is not valid";
		}else {
	
			repo.delete(tmdelete);
		return "Deleted Successfully";
		
	}

	}

}
