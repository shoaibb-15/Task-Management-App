package com.jsp.spring.taskmanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.jsp.spring.taskmanagement.utility.ErrorStructure;

@RestControllerAdvice
public class ApplicationHandler {

	
	@ExceptionHandler
	public ResponseEntity<ErrorStructure<String>> taskNotFound(TaskNotFoundException tsk){
		
		ErrorStructure<String> errorStructure=new ErrorStructure<String>();
		errorStructure.setErrorCode(HttpStatus.NOT_FOUND.value());
		errorStructure.setErrorMessage(tsk.getMessage());
		errorStructure.setData("Ur entered Task is Not in the databse plzz enter a valid task Id");
		
		return new ResponseEntity<ErrorStructure<String>>(errorStructure,HttpStatus.NOT_FOUND);
	}
}
