"use client"

import { useState, useEffect } from "react"
import TaskList from "../../components/TaskList"
import { fetchTasks } from "../../utils/api"
import Link from "next/link"

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [sortBy, setSortBy] = useState("dueDate")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getTasks = async () => {
      try {
        setIsLoading(true)
        const fetchedTasks = await fetchTasks()
        setTasks(fetchedTasks)
        setError(null)
      } catch (error) {
        console.error("Error fetching tasks:", error)
        setError("Failed to fetch tasks. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }
    getTasks()
  }, [])

  const sortedAndFilteredTasks = tasks
    .filter((task) => filterStatus === "all" || task.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "dueDate") {
        return new Date(a.dueDate) - new Date(b.dueDate)
      }
      return 0
    })

  if (isLoading) {
    return <div className="text-center">Loading tasks...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Link href="/tasks/new" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Add New Task
        </Link>
      </div>
      <div className="mb-4 flex space-x-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="dueDate">Sort by Due Date</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <TaskList tasks={sortedAndFilteredTasks} />
    </div>
  )
}

