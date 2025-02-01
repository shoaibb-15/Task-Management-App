package com.jsp.spring.taskmanagement.repositary;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jsp.spring.taskmanagement.entity.Task;

public interface TaskRepositary extends JpaRepository<Task, Integer> {

	public void save(int updateId);

//	public Task save(Task task);

}
