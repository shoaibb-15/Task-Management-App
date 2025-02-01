"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../../components/AuthContext"
import { fetchTask, updateTask, deleteTask } from "../../../utils/api"
import { useRouter } from "next/navigation"

export default function TaskDetails({ params }) {
  const [task, setTask] = useState(null)
  const { token } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const getTask = async () => {
      try {
        const fetchedTask = await fetchTask(params.id, token)
        setTask(fetchedTask)
      } catch (error) {
        console.error("Error fetching task:", error)
      }
    }
    getTask()
  }, [params.id, token])

  const handleStatusChange = async (newStatus) => {
    try {
      const updatedTask = await updateTask(params.id, { ...task, status: newStatus }, token)
      setTask(updatedTask)
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteTask(params.id, token)
      router.push("/tasks")
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  if (!task) return <div>Loading...</div>

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="mb-4">{task.description}</p>
        <p className="mb-2">
          <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
        </p>
        <p className="mb-4">
          <strong>Status:</strong> {task.status}
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => handleStatusChange("completed")}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Mark as Completed
          </button>
          <button
            onClick={() => handleStatusChange("pending")}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          >
            Mark as Pending
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Delete Task
          </button>
        </div>
      </div>
    </div>
  )
}

