"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { fetchTask, updateTask } from "../../../../utils/api"

export default function EditTask({ params }) {
  const [task, setTask] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [status, setStatus] = useState("")
  const router = useRouter()

  useEffect(() => {
    const getTask = async () => {
      try {
        const fetchedTask = await fetchTask(params.id)
        setTask(fetchedTask)
        setTitle(fetchedTask.title)
        setDescription(fetchedTask.description)
        setDueDate(fetchedTask.dueDate.split("T")[0])
        setStatus(fetchedTask.status)
      } catch (error) {
        console.error("Error fetching task:", error)
      }
    }
    getTask()
  }, [params.id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateTask(params.id, { title, description, dueDate, status })
      router.push("/tasks")
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  if (!task) return <div>Loading...</div>

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            rows="4"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="dueDate" className="block mb-1">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label htmlFor="status" className="block mb-1">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Update Task
        </button>
      </form>
    </div>
  )
}

