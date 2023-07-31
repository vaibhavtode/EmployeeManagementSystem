package com.capstone.entity;

import java.time.LocalDate;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="EmployeeLeave")
public class EmpLeave {
	
	@Id
	@GeneratedValue
	@Column(nullable=false)
	private Long empLeaveId;
	
	@Column(name="start_Date")
	private LocalDate startDate;
	
	@Column(name="End_Date")
	private LocalDate endDate;
	
	@Column(name="no_of_days")
	private Long nodays;
	
	@Column(name="status")     
    private String status;
	
	@ManyToOne 
	@JoinColumn(name="empId")
	private Employee employee;

	@OneToOne
	@JoinColumn(name = "leaveId")
	private LeaveEmp leave;
	

	
}
