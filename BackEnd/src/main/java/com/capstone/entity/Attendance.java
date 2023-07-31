package com.capstone.entity;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.DynamicUpdate;

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
@DynamicUpdate
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="attendance")

public class Attendance{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable=false)
	private Integer attendanceId;
	
	@Column(name="date")
	private LocalDate date;
	
	@Column(name="CheckInTime")
	
	private LocalDateTime checkIn;
	
	@Column(name="CheckOutTime")
	private LocalDateTime checkOut;

	@Column(name="Hours")
	private Time Hours;
	
	@Column(name="status")
	private String status;
	
	@ManyToOne
    @JoinColumn(name = "empId")
    private Employee employee;
	
	
	
	

}
