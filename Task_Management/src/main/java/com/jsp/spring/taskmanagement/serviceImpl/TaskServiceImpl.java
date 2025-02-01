package com.jsp.spring.taskmanagement.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.jsp.spring.taskmanagement.entity.Task;
import com.jsp.spring.taskmanagement.exception.TaskNotFoundException;
import com.jsp.spring.taskmanagement.repositary.TaskRepositary;
import com.jsp.spring.taskmanagement.service.TaskService;
import com.jsp.spring.taskmanagement.utility.ResponseStructure;

@Service
public class TaskServiceImpl implements TaskService{

	@Autowired
	private TaskRepositary taskRepositary;


	@Override
	public ResponseEntity<ResponseStructure<Task>> addTask(Task task) {
		Task tas= taskRepositary.save(task);

		ResponseStructure<Task> responseStructure=new ResponseStructure<Task>();
		responseStructure.setStatusCode(HttpStatus.CREATED.value());
		responseStructure.setMessage("Task Created Successfully");
		responseStructure.setData(tas);

		return new ResponseEntity<ResponseStructure<Task>>(responseStructure,HttpStatus.CREATED);
	}


	@Override
	public ResponseEntity<ResponseStructure<List<Task>>> findAllTask() {
		List<Task> lis= taskRepositary.findAll();

		ResponseStructure<List<Task>> responseStructure=new ResponseStructure<List<Task>>();
		responseStructure.setStatusCode(HttpStatus.FOUND.value());
		responseStructure.setMessage("All tasks are found succcessfully");
		responseStructure.setData(lis);

		return new ResponseEntity<ResponseStructure<List<Task>>>(responseStructure,HttpStatus.FOUND);
	}


	@Override
	public ResponseEntity<ResponseStructure<Task>> findByTaskId(int id) {
		Optional<Task> opt= taskRepositary.findById(id);

		if(opt.isPresent()) {
			Task t= opt.get();

			ResponseStructure<Task> responseStructure=new ResponseStructure<Task>();
			responseStructure.setStatusCode(HttpStatus.FOUND.value());
			responseStructure.setMessage("Task Found Successfully");
			responseStructure.setData(t);

			return new ResponseEntity<ResponseStructure<Task>>(responseStructure,HttpStatus.FOUND);
			
		}else {

			throw new TaskNotFoundException("Task Not Found");
		}
	}


	@Override
	public ResponseEntity<ResponseStructure<Task>> updateTaskById(Task task, int id) {
		 Optional<Task> opt=taskRepositary.findById(id);
		 
		 if(opt.isEmpty()) {
			 throw new TaskNotFoundException("Task not found to update");
		 }else {
			 Task ts= opt.get();
			 task.setId(ts.getId());
			 taskRepositary.save(task);
			 
			 ResponseStructure<Task> responseStructure=new ResponseStructure<Task>();
			 responseStructure.setStatusCode(HttpStatus.OK.value());
			 responseStructure.setMessage("Task Updated Successfully");
			 responseStructure.setData(task);
			 
			 return new ResponseEntity<ResponseStructure<Task>>(responseStructure,HttpStatus.OK);
		 }
	}
	
	@Override
	public ResponseEntity<ResponseStructure<Task>> deleteTaskById(int id) {
		Optional<Task> opt= taskRepositary.findById(id);
		
		if(opt.isPresent()) {
			Task ts= opt.get();
			taskRepositary.delete(ts);
			
			ResponseStructure<Task> responseStructure=new ResponseStructure<Task>();
			responseStructure.setStatusCode(HttpStatus.ACCEPTED.value());
			responseStructure.setMessage("Task Deleted Successfully");
			responseStructure.setData(ts);
			
			return new ResponseEntity<ResponseStructure<Task>>(responseStructure,HttpStatus.ACCEPTED);
		}else {
			throw new TaskNotFoundException("Task Not Found To Delete");
		}
	}
}
