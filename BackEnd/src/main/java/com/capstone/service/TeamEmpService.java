package com.capstone.service;

import java.util.List;

import com.capstone.entity.TeamEmp;

public interface TeamEmpService {
	        //get method
			public List<TeamEmp> findAllTeam();
			public TeamEmp getAllTeamById(int id);
			//post method
			public String addTeam(TeamEmp tm);
			//delete method 
			public String deleteTeam(int id);
}
