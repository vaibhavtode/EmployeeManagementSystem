package com.capstone.auth;

import com.capstone.user.Role;
import com.capstone.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationResponse 
{
	private String token;
	private Role role;
	private Integer empId;

}
