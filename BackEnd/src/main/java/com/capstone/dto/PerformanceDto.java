package com.capstone.dto;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PerformanceDto {
	private Integer comm;
	private Integer pro;
	//org skills
	private Integer cre;
	//attendance
	private Integer pun;
	private Integer efficiency;
	private Integer learnanddevelop;
    private Integer employeeId;

}
