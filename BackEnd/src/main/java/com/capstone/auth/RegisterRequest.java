package com.capstone.auth;

import com.capstone.user.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterRequest 
{
	private String email;
	private String password;
	private Role role;
	

}
