package com.capstone.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.dto.EmpLeaveDto;
import com.capstone.dto.LeaveApproveReject;
import com.capstone.entity.EmpLeave;
import com.capstone.entity.Employee;
import com.capstone.entity.LeaveEmp;
import com.capstone.repository.EmpLeaveRepo;
import com.capstone.repository.EmployeeRepo;
import com.capstone.repository.LeaveEmpRepo;

@Service
public class EmpLeaveServiceImpl implements EmpLeaveService {
	 @Autowired
	    private EmployeeRepo erepo;

	    @Autowired
	    private EmpLeaveRepo empLeaveRepo;

	    @Autowired
	    private LeaveEmpRepo leavetype;
	    @Autowired
	    private EmailService emailService;
	    

	    public String applyLeave(EmpLeaveDto leave) {
	        try {
	            Employee emp = erepo.findById(leave.getEmpId())
	                    .orElseThrow(() -> new RuntimeException("Employee not found."));
	            LeaveEmp lv = leavetype.findByLeaveType(leave.getLeaveType());
// back dating applicable only for sick leaves
	            if (emp != null && (leave.getStartDate().isEqual(LocalDate.now()) || leave.getStartDate().isAfter(LocalDate.now()) || (leave.getStartDate().isBefore(LocalDate.now()) && leave.getLeaveType().contains("SICK")))) {
	                LocalDate startDate = leave.getStartDate();
	                LocalDate endDate;

	                if (leave.getEndDate() != null) {
	                    endDate = leave.getEndDate();
	                } else if (leave.getNoOfDays() != null) {
	                    // Calculate the end date based on the number of days excluding weekends
	                    long totalDays = leave.getNoOfDays();
	                    LocalDate currentDate = startDate.plusDays(totalDays);
	                    while (currentDate.getDayOfWeek() == DayOfWeek.SATURDAY || currentDate.getDayOfWeek() == DayOfWeek.SUNDAY) {
	                        currentDate = currentDate.plusDays(1);
	                    }
	                    endDate = currentDate;
	                } else {
	                    return "Invalid leave request";
	                }

	                if (startDate.isBefore(endDate) || startDate.isEqual(endDate)) {
	                    // Calculate the total number of days excluding weekends
	                    long totalDays = ChronoUnit.DAYS.between(startDate, endDate) + 1;
	                    long weekendsCount = Stream.iterate(startDate, date -> date.plusDays(1))
	                            .limit(totalDays)
	                            .filter(date -> date.getDayOfWeek() == DayOfWeek.SATURDAY || date.getDayOfWeek() == DayOfWeek.SUNDAY)
	                            .count();
	                    long numberOfDays = totalDays - weekendsCount;

	                    if (numberOfDays > 0) {
	                        EmpLeave applyleave = new EmpLeave();
	                        applyleave.setEmployee(emp);
	                        applyleave.setStartDate(startDate);
	                        applyleave.setEndDate(endDate);
	                        applyleave.setLeave(lv);
	                        applyleave.setNodays(numberOfDays);
	                        applyleave.setStatus("PENDING");
	                        empLeaveRepo.save(applyleave);

	                        String to = emp.getManager().getEmail();
	                        String subject = "Automated Leave Request -" + emp.getFirstName() + " " + emp.getLastName() + "\n\n";
	                        String body =
	                                "Dear" + emp.getManager().getFirstName() + " " + emp.getManager().getLastName() + ",\n\n" +
	                                        "This is an automated notification to inform you about a leave request generated by our system on behalf of " + emp.getFirstName() + " " + emp.getLastName() + ". The details of the leave request are as follows:\n\n" +
	                                        "Employee Name:  " + emp.getFirstName() + " " + emp.getLastName() + "\n" +
	                                        "Leave Duration:  " + leave.getStartDate() + " to " + leave.getEndDate() + "\n" +
	                                        "Type of Leave:  " + leave.getLeaveType() + " \n\n" +
	                                        "Kindly review the provided information and take the necessary actions based on your organizational policies and procedures. Should you require any additional details or have any questions regarding this request, please contact the employee directly.\n\n" +
	                                        "Please note that this email is generated by our automated system, and any specific queries or concerns should be addressed directly to the employee.\n\n" +
	                                        "Thank you for your attention to this matter.\n\n" +
	                                        "Best regards,\n" +
	                                        "HR";
	                        emailService.sendMail(to, subject, body);
	                        return "Leave requested successfully";
	                    } else {
	                        return "Start date should be less than end date";
	                    }
	                }
	            }
	        } catch (Exception e) {
	            throw new RuntimeException("Failed to apply leave: " + e.getMessage());
	        }

	        return "Give a proper leave request";
	    }


	    public void approveLeave(Integer managerId, LeaveApproveReject leaveStatus) {
	        try {
	            String status = leaveStatus.getStatus();
	            Long empLeaveId = leaveStatus.getEmpLeaveId();

	            // Retrieve the leave request from the database based on the manager ID and leave ID
	            EmpLeave leaveRequest = empLeaveRepo.findByEmployee_Manager_EmpIdAndEmpLeaveId(managerId, empLeaveId);

	            if (empLeaveId == null) {
	                throw new IllegalArgumentException("empLeaveId must be provided");
	            }

	            if (leaveRequest != null) {
	                // Update the leave request status based on the provided status value
	                leaveRequest.setStatus(status);
	                empLeaveRepo.save(leaveRequest);

	                if (status.equalsIgnoreCase("Approved")) {
	                    // Deduct the number of days from the appropriate type of leave requested
	                    String leaveType = leaveRequest.getLeave().getLeaveType();
	                    Employee employee = leaveRequest.getEmployee();

	                    if (leaveType.equalsIgnoreCase("Sick")) {
	                        int sickLeaves = employee.getSick_leaves();
	                        int remainingSickLeaves = (int) (sickLeaves - leaveRequest.getNodays());
	                        if (remainingSickLeaves < 0) {
	                            throw new IllegalArgumentException("Cannot approve leave. Employee's sick leave quota is exhausted.");
	                        }
	                        employee.setSick_leaves(remainingSickLeaves);
	                    } else if (leaveType.equalsIgnoreCase("Personal")) {
	                        int personalLeaves = employee.getPersonal_leaves();
	                        int remainingPersonalLeaves = (int) (personalLeaves - leaveRequest.getNodays());
	                        if (remainingPersonalLeaves < 0) {
	                            throw new IllegalArgumentException("Cannot approve leave. Employee's personal leave quota is exhausted.");
	                        }
	                        employee.setPersonal_leaves(remainingPersonalLeaves);
	                    } else if (leaveType.equalsIgnoreCase("Paid")) {
	                        int paidLeaves = employee.getPaid_leaves();
	                        int remainingPaidLeaves = (int) (paidLeaves - leaveRequest.getNodays());
	                        if (remainingPaidLeaves < 0) {
	                            throw new IllegalArgumentException("Cannot approve leave. Employee's paid leave quota is exhausted.");
	                        }
	                        employee.setPaid_leaves(remainingPaidLeaves);
	                    }

	                    // Save the updated employee details
	                    erepo.save(employee);
	                }

	                // Mail sending code
	                String to = leaveRequest.getEmployee().getEmail();
	                String subject = "Automated Leave Approval/Rejection" + "\n\n";
	                String body = "Dear " + leaveRequest.getEmployee().getFirstName() + " " + leaveRequest.getEmployee().getLastName() + ",\n\n" +
	                        "This is an automated notification to inform you about the status of your leave request. The decision has been made regarding your leave application, as follows:\n\n" +
	                        "Leave Id :" + leaveRequest.getEmpLeaveId() + "\n" +
	                        "Leave Duration:" + leaveRequest.getStartDate() + " to " + leaveRequest.getEndDate() + "\n" +
	                        "No. of Days: " + leaveRequest.getNodays() + "\n\n" +
	                        "Leave Status: " + leaveRequest.getStatus() + "\n\n" +
	                        "Please review the provided information regarding the outcome of your leave request. If you have any further questions or concerns, kindly contact the respective HR.\n\n" +
	                        "Thank you for your understanding.\n\n" +
	                        "Best regards,\n" +
	                        "HR";
	                emailService.sendMail(to, subject, body);
	            } else {
	                throw new IllegalArgumentException("Leave request not found for ID: " + empLeaveId);
	            }

	        } catch (RuntimeException ex) {
	            throw new RuntimeException("Error while updating leave request: " + ex.getMessage());
	        }
	    }





	    public List<EmpLeave> getAllLeaveAppliedToManagerByEmp(Integer managerId, Integer empId) {
	        try {
	            return empLeaveRepo.findByEmployee_Manager_EmpIdAndEmployee_EmpId(managerId, empId);
	        } catch (RuntimeException ex) {
	            
	            throw new RuntimeException("Error while fetching leave applications: " + ex.getMessage());
	        }
	    }

	    public List<EmpLeave> getAllLeaveAppliedToManager(Integer managerId) {
	        try {
	            return empLeaveRepo.findByEmployee_Manager_EmpId(managerId);
	        } catch (RuntimeException ex) {
	         
	            throw new RuntimeException("Error while fetching leave applications: " + ex.getMessage());
	        }
	    }

	    public List<EmpLeave> getAllLeaveAppliedToManagerByStatus(Integer managerId, String status) {
	        try {
	            return empLeaveRepo.findByEmployee_Manager_EmpIdAndStatus(managerId, status);
	        } catch (RuntimeException ex) {
	            
	            throw new RuntimeException("Error while fetching leave applications: " + ex.getMessage());
	        }
	    }

	    public List<EmpLeave> getAllLeaveAppliedByStatus(Integer empId, String status) {
	        try {
	            return empLeaveRepo.findByEmployee_EmpIdAndStatus(empId, status);
	        } catch (RuntimeException ex) {
	           
	            throw new RuntimeException("Error while fetching leave applications: " + ex.getMessage());
	        }
	    }
	
	
	
//Basic crud based on leave id
	@Override
	public List<EmpLeave> findAllEmpLeave() {
		// TODO Auto-generated method stub
		return empLeaveRepo.findAll();
	}

	@Override
	public EmpLeave getAllEmpLeaveById(long id) {
		// TODO Auto-generated method stub
		return empLeaveRepo.findById(id).get();
	}

	@Override
	public String addEmpleave(EmpLeave eml) {
		empLeaveRepo.save(eml);
		return "Adding leave Successfully";
	}

	@Override
	public String updateEmpleave(EmpLeave eml) {
		Optional<EmpLeave>emlOptional=empLeaveRepo.findById(eml.getEmpLeaveId());
		if(emlOptional.isPresent()) {
			EmpLeave empl1=emlOptional.get();
			empl1.setStartDate(null);
			empl1.setEndDate(null);
			empl1.setNodays(null);
			
			empLeaveRepo.save(empl1);
		}
		return "Updating Successfully";
	}

	@Override
	public String deleteEmpleave(long id) {
		Optional<EmpLeave> eml=empLeaveRepo.findById(id);
		EmpLeave levdelete=eml.orElse(null);
		if(levdelete==null) {
			return "id is not valid";
		}else {
			empLeaveRepo.delete(levdelete);
			return "Deleted Successfully";
			
		}
		
	}
}