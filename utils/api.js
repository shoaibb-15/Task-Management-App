const API_BASE_URL = "http://localhost:8080/api/task"

export async function fetchTasks() {
  const response = await fetch(`${API_BASE_URL}/`)
  if (!response.ok) {
    throw new Error("Failed to fetch tasks")
  }
  return response.json()
}

export async function fetchTask(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch task")
  }
  return response.json()
}

export async function createTask(task) {
  const response = await fetch(`${API_BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
  if (!response.ok) {
    throw new Error("Failed to create task")
  }
  return response.json()
}

export async function updateTask(id, task) {
  const response = await fetch(`${API_BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
  if (!response.ok) {
    throw new Error("Failed to update task")
  }
  return response.json()
}

export async function deleteTask(id) {
  const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete task")
  }
  return response.json()
}

