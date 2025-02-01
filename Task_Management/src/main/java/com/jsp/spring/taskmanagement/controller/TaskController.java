package com.jsp.spring.taskmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jsp.spring.taskmanagement.entity.Task;
import com.jsp.spring.taskmanagement.service.TaskService;
import com.jsp.spring.taskmanagement.utility.ResponseStructure;

@RestController
@RequestMapping("/api/task")
public class TaskController {

	@Autowired
	private TaskService taskService;
	
	
	@PostMapping("/add")
	public ResponseEntity<ResponseStructure<Task>> addTask(@RequestBody Task task) {
		return taskService.addTask(task);
	}
	
	@GetMapping("/")
	public ResponseEntity<ResponseStructure<List<Task>>> findAllTask() {
		return taskService.findAllTask();	
	}
	
	@GetMapping("/:id")
	public ResponseEntity<ResponseStructure<Task>> findByTaskId(@RequestBody int id) {
		return taskService.findByTaskId(id);
	}
	
	@PutMapping("/update/:id")
	public ResponseEntity<ResponseStructure<Task>> updateTaskById(@RequestBody Task task, int id) {
		return taskService.updateTaskById(task, id);
	}
	
	@DeleteMapping("/delete/:id")
	public ResponseEntity<ResponseStructure<Task>> deleteTaskById(@RequestBody int id) {
		return taskService.deleteTaskById(id);
	}
	
}
