package com.capstone.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
//above 2 annotations must be there together when we work on spring security 3.0
@RequiredArgsConstructor
public class SecurityConfiguration 
{
	private final JwtAuthenticationFilter jwtAuthFilter;
	private final AuthenticationProvider authenticationProvider;

	//bcz as start of app, spring security will try to look for bean of securityfilterchain, as it is responsible of all configurations
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.cors().and()
//		(cors -> {
//		      CorsConfiguration config = new CorsConfiguration();
//		      config.addAllowedOrigin("http://localhost:3000"); // Allow requests from this origin
//		      config.addAllowedMethod("*"); // Allow all HTTP methods
//		      config.addAllowedHeader("*"); // Allow all headers
//		      cors.configurationSource(request -> config);
//		    })  // for disabling the cross origin security
		.csrf()
		.disable()
		.authorizeHttpRequests()
		.requestMatchers("/api/v1/auth/**")  //to whitelist this list
		.permitAll()
		.anyRequest()
		.authenticated()
		.and()
		.sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and()
		.authenticationProvider(authenticationProvider)
		.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
		
		return http.build();
	}

}
