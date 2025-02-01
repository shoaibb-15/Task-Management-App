"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createTask } from "../../../utils/api"

export default function NewTask() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [status, setStatus] = useState("pending")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createTask({ title, description, dueDate, status })
      router.push("/tasks")
    } catch (error) {
      console.error("Error creating task:", error)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
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
          Create Task
        </button>
      </form>
    </div>
  )
}

