package com.capstone.entity;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {

    private int status;
    private String message;
    private String display="OOPS! we ran into an Exception";
    
	public ErrorResponse(int status, String message) {
		super();
		this.status = status;
		this.message = message;
	}
    
    
}

