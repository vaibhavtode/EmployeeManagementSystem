package com.capstone.dto;



import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDto {
	private Integer empId;
	private String firstName;
	private String middleName;
	private String lastName;
	private Date birthday;
	private String gender;
	private Long contact;
	private String address;
	private String email;
	private String status;
	
	
	private Integer deptId;
	private Integer teamId;
	private Integer managerId;

}
