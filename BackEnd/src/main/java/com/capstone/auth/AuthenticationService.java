package com.capstone.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.capstone.config.JwtService;
import com.capstone.repository.EmployeeRepo;
import com.capstone.user.Role;
import com.capstone.user.User;
import com.capstone.user.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.experimental.var;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	
	private final UserRepository repository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	
	@Autowired
	private final EmployeeRepo employeeRepo;

	public AuthenticationResponse register(RegisterRequest request) 
	{
		// TODO Auto-generated method stub
		var user = User.builder()
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.role(request.getRole())
				.build();
		repository.save(user);
		var jwtToken = jwtService.generateToken(user);
		return AuthenticationResponse.builder().token(jwtToken).build();
	}


	@Autowired
	private AuthenticationManager authenticationManager;
	
	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getEmail(), 
						request.getPassword()
				)
				);
		var user = repository.findByEmail(request.getEmail()).get();
		var jwtToken = jwtService.generateToken(user);
		var employee = employeeRepo.findByEmail(request.getEmail());	
		return AuthenticationResponse.builder()
				.token(jwtToken).role(user.getRole()).empId(employee.getEmpId())
				.build();
	}
	
	public void deleteUser(String email) {
		 
		User user = repository.findByEmail(email).get();
		repository.delete(user);
	}

}
