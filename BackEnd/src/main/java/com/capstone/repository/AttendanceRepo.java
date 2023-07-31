package com.capstone.repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.entity.Attendance;


@Repository
public interface AttendanceRepo extends JpaRepository<Attendance, Integer> {
	List<Attendance> findByEmployee_EmpId(Integer empid);
	Attendance findByEmployee_EmpIdAndDate(Integer empid,LocalDate date);
	List<Attendance> findByDate(LocalDate date);
	Attendance findByDateAndEmployee_EmpId(LocalDate date,Integer empid);

}
