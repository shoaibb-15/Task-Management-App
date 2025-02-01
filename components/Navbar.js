"use client"

import Link from "next/link"
import { useTheme } from "./ThemeContext"
import { Sun, Moon } from "lucide-react"

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
            Task Manager
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              Tasks
            </Link>
            <Link
              href="/add-task"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              Add Task
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

