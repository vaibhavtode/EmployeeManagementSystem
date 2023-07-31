package com.capstone.service;

import java.time.LocalDate;
import java.util.List;

import com.capstone.entity.Attendance;



public interface AttendanceService {
	public List<Attendance> findAllAttendance();
	public Attendance getAllAttendanceById(int id);
	//post method
	public String addAttendance(Attendance att);
	//update method
	public String updateAttendance(Attendance att);
	//delete method 
	public String deleteAttendance(int id);
	//attendance by empid
    public List<Attendance> findByEmpId(int id);
    //attendance by today's date and emp id
    public Attendance findByDateAndEmpId(LocalDate date, Integer empid);
    
    
    
    public void checkIn(int empId);
    public void checkout(int empId);
    public List<Attendance> attendanceById(int empId);
    public List<Attendance> attendanceByDate(LocalDate date);
    
    
    
    
    
}
