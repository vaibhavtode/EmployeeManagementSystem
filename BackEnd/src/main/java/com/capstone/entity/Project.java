package com.capstone.entity;



import java.util.List;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="project")
public class Project {
	
	@Id
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	@Column(nullable=false)
	private Integer projectId;
	
	@Column(name="project_name")
	private String projectName;
	
	@Column(name="project_details")
	
	private String projectDetails;
	
	@OneToMany

    @JoinColumn(name = "manager_id")
    private List<Employee> manager;
	
	
   
}
