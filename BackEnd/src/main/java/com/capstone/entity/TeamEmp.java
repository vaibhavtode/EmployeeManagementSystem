package com.capstone.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="team")

public class TeamEmp {

	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(nullable=false)
	private Integer teamId;
	
	@ManyToOne @JoinColumn(name="manager_Id")
	private Employee manager;
	 
	@ManyToOne @JoinColumn(name="project_id")
    private Project project;
	
}
