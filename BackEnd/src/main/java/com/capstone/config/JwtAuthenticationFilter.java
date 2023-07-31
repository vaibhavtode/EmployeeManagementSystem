package com.capstone.config;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor  //it will create a constructor with any final field that we declare 
public class JwtAuthenticationFilter extends OncePerRequestFilter
{
	private final JwtService jwtService;
	
	private final  UserDetailsService userDetailsService;
	
	@Override
	protected void doFilterInternal(
		@NonNull	HttpServletRequest request/*our request*/, 
		@NonNull	HttpServletResponse response/*our response*/, 
		@NonNull	FilterChain filterChain /*it is a chain of resposnibility design pattern. it contains the list of other filters that we need*/
			)throws ServletException, IOException 
	
	{
		// TODO Auto-generated method stub
		final String authHeader = request.getHeader("Authorization");
		final String jwt;
		final String userEmail;
		if(authHeader == null || !authHeader.startsWith("Bearer ") ) 
		{
			filterChain.doFilter(request, response);
			return;
		}
		jwt = authHeader.substring(7);//"Bearer ": total count is 7 incl spacebar"
		userEmail = jwtService.extractUsername(jwt);// to do extract the userEmail from jwt token
		if(userEmail!= null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
			if(jwtService.isTokenValid(jwt, userDetails)) {
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities()
			);
				authToken.setDetails(
						new WebAuthenticationDetailsSource().buildDetails(request)
			);
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
			
		}
		filterChain.doFilter(request, response);
		
	}

}