"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { fetchTasks, deleteTask } from "../utils/api"
import { Trash2, Edit } from "lucide-react"

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const data = await fetchTasks()
      setTasks(data.data)
      setError(null)
    } catch (err) {
      setError("Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id)
        loadTasks()
      } catch (err) {
        setError("Failed to delete task")
      }
    }
  }

  if (loading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center text-red-500">{error}</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{task.description}</p>
            <div className="flex justify-between items-center">
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  task.status === "completed" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {task.status}
              </span>
              <div className="space-x-2">
                <Link href={`/edit-task/${task.id}`} className="text-blue-500 hover:text-blue-600">
                  <Edit size={20} />
                </Link>
                <button onClick={() => handleDelete(task.id)} className="text-red-500 hover:text-red-600">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

