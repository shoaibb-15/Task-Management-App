package com.jsp.spring.taskmanagement.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.jsp.spring.taskmanagement.entity.Task;
import com.jsp.spring.taskmanagement.utility.ResponseStructure;

public interface TaskService {

	public ResponseEntity<ResponseStructure<Task>> addTask(Task task);
	
	public ResponseEntity<ResponseStructure<List<Task>>> findAllTask();
	
	public ResponseEntity<ResponseStructure<Task>> findByTaskId(int id);
	
	public ResponseEntity<ResponseStructure<Task>> updateTaskById(Task task,int id);
	
	public ResponseEntity<ResponseStructure<Task>> deleteTaskById(int id);
}
