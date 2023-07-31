package com.capstone.entity;




import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
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
@Table(name="performace")
public class Performance {
	
	@Id
	@GeneratedValue
	@Column(nullable=false)
	private Integer performanceId;
	
	@Column(name="Communication")
	private Integer communication;
	
	@Column(name="Productivity")
	private Integer productivity;
	
	//organizational skills
	@Column(name="Creativity")
	private Integer creativity;
	
	//attendance
	@Column(name="punctuality")
	private Integer punctuality;
	
	@Column(name="Efficiency")
	private Integer efficiency;
	
	@Column(name="Learning_and_Development")
	private Integer learnanddevelop;
	
	@Column(name="Total_Rating")
	private Float totalRating;
	
	@Column(name="date")
	private LocalDateTime date;
	
	@ManyToOne @JoinColumn(name="empId")
    private Employee employee;
	
	@ManyToOne @JoinColumn(name="manager_id")
    private Employee manager;
	
}
