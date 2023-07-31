package com.capstone.dto;

import java.sql.Date;
import java.sql.Time;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttendanceDto {
	private Integer attid;
	private Date date;
	private Time checkIn;
	private Time checkout;
    private Integer empId;

}
