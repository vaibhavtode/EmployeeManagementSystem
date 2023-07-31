package com.capstone.service;

import java.sql.Time;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.entity.Attendance;
import com.capstone.entity.Employee;
import com.capstone.repository.AttendanceRepo;
import com.capstone.repository.EmployeeRepo;


@Service
public class AttendanceServiceImpl implements AttendanceService{
	 @Autowired
	    private EmployeeRepo erepo;

	    @Autowired
	    private AttendanceRepo arepo;

	    //CHECKIN
	    public void checkIn(int empId) {
	        try {
	            Employee emp = erepo.findById(empId).orElseThrow(() -> new RuntimeException("Employee not found."));
	            Attendance exist = arepo.findByEmployee_EmpIdAndDate(empId, LocalDate.now());
	            if (exist == null) {
	                Attendance setAttendance = new Attendance();
	                setAttendance.setCheckIn(LocalDateTime.now());
	                setAttendance.setDate(LocalDate.now());
	                setAttendance.setEmployee(emp);
	                setAttendance.setStatus("Just Checked In");
	                arepo.save(setAttendance);
	            } else {
	                throw new RuntimeException("Attendance already recorded for today.");
	            }
	        } catch (RuntimeException ex) {
	            throw new RuntimeException("Error while checking in: " + ex.getMessage());
	        }
	    }
	    // CHECKOUT
	    public void checkout(int empId) {
	        try {
	            Attendance exist = arepo.findByEmployee_EmpIdAndDate(empId, LocalDate.now());
	            if (exist != null) {
	                LocalDateTime checkoutTime = LocalDateTime.now();
	                exist.setCheckOut(checkoutTime);
	                
	                LocalDateTime checkInTime = exist.getCheckIn();
	                Duration duration = Duration.between(checkInTime, checkoutTime);
	                long hours = duration.toHours();
	                
	                exist.setHours(Time.valueOf(LocalTime.of((int)hours, 0)));
	                
	                if (hours < 7) {
	                    exist.setStatus("Absent");
	                } else {
	                    exist.setStatus("Present");
	                }
	                
	                arepo.save(exist);
	            } else {
	                throw new RuntimeException("Attendance not found for today.");
	            }
	        } catch (RuntimeException ex) {
	            throw new RuntimeException("Error while checking out: " + ex.getMessage());
	        }
	    }
	    
	    
	    public List<Attendance> attendanceById(int empId) {
	        try {
	            Employee emp = erepo.findById(empId).orElseThrow(() -> new RuntimeException("Employee not found."));
	            return arepo.findByEmployee_EmpId(empId);
	        } catch (RuntimeException ex) {

	            throw new RuntimeException("Error while fetching attendance: " + ex.getMessage());
	        }
	    }

	    public List<Attendance> attendanceByDate(LocalDate date) {
	        try {
	            return arepo.findByDate(date);
	        } catch (RuntimeException ex) {

	            throw new RuntimeException("Error while fetching attendance: " + ex.getMessage());
	        }
	    }
	
	
	//Basic crud based on attendance id
	@Override
	public List<Attendance> findAllAttendance() {
		return arepo.findAll();
	}

	@Override
	public Attendance getAllAttendanceById(int id) {
		return arepo.findById(id).get();
	}

	@Override
	public String addAttendance(Attendance att) {
		arepo.save(att);
		return  "Adding Attendance Successfully";
	}

	@Override
	public String updateAttendance(Attendance att) {
		Optional<Attendance>attOptional=arepo.findById(att.getAttendanceId());
		if(attOptional.isPresent()) {
			Attendance att1=attOptional.get();
			att1.setCheckIn(att.getCheckIn());
			att1.setCheckOut(null);
			att1.setDate(att.getDate());
			arepo.save(att1);
		}
		return "Updated Successfully";
	}

	@Override
	public String deleteAttendance(int id) {
		Optional<Attendance>att=arepo.findById(id);
		Attendance attdelete=att.orElse(null);
		if(attdelete==null) {
			return "id is not valid";
		}else {
			
			arepo.delete(attdelete);
			return "Deleted Successfully";
			
		}
		
	}

	@Override
	public List<Attendance> findByEmpId(int id) {
		// TODO Auto-generated method stub
		return arepo.findByEmployee_EmpId(id);
	}
	@Override
	public Attendance findByDateAndEmpId(LocalDate date, Integer empid) {
		// TODO Auto-generated method stub
		return arepo.findByDateAndEmployee_EmpId(date, empid);
	}
	
	

	

	
}
