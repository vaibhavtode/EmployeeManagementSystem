package com.capstone.entity;


import java.sql.Date;
import java.time.LocalDate;

import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name="employee")
@DynamicUpdate
public class Employee 
{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable=false)
	private Integer empId;
	
	
	@Column(nullable=false,name= "firstname")
	private String firstName;
	
	@Column(nullable=false,name= "Middlename")
	private String middleName;
	
	@Column(nullable=false,name= "Lastname")
	private String lastName;
	
	@Column(name="Date_of_Birth")
	private Date Birthday;
	
	@Column(name="Gender")
	private String gender;
	
	@Column(name="Contact_Number")
	private Long contact;
	
	@Column(name="Address")
	private String address;
	
	@Column(name="Email",unique = true)
	private String email;
	
	@Column(name="status")
	private String status;
	
	//No Of Leaves Assigned 
	@Column(name="Sick_Leaves")
	private Integer sick_leaves;
	
	@Column(name="Personal_Leaves")
	private Integer personal_leaves;
	
	@Column(name="Paid_Leaves")
	private Integer paid_leaves;
	
	@Column(name= "Joining_Date")
	private LocalDate joining_date;
	
	@ManyToOne
    @JoinColumn(name = "manager_id")
//	@JsonIgnore
    private Employee manager;
	
	@ManyToOne
    @JoinColumn(name = "dept_id")
//	@JsonIgnore
    private Department department;

	@ManyToOne
    @JoinColumn(name = "team_id")
    @JsonIgnore
    private TeamEmp team;
	
	

}
