package com.capstone.dto;

import java.sql.Date;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpLeaveDto {
	
	private Integer empId;
	private LocalDate startDate;
	//enddate or noof days
	private LocalDate endDate;
	private Integer noOfDays;
	private String leaveType;

}
