"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createTask } from "../../utils/api"

export default function AddTask() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("pending")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createTask({ title, description, status })
      router.push("/")
    } catch (error) {
      console.error("Failed to create task:", error)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
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
          <label htmlFor="description" className="block mb-1 font-medium">
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
          <label htmlFor="status" className="block mb-1 font-medium">
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
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Task
        </button>
      </form>
    </div>
  )
}

