package com.capstone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmployeeManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeeManagementSystemApplication.class, args);
	}
//	@Bean
//  public WebMvcConfigurer corsConfigurer() {
//      return new WebMvcConfigurer() {
//          @Override
//          public void addCorsMappings(CorsRegistry registry) {
//          //    registry.addMapping("/**").allowedOrigins("http://localhost:3000").allowedMethods("*");
//              registry.addMapping("/**").allowedOrigins("*");
//          }
//      };
//	}

}
