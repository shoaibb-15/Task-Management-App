"use client"

import Link from "next/link"
import { useTheme } from "./ThemeContext"
import { Sun, Moon } from "lucide-react"

export default function Navigation() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="bg-blue-500 dark:bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Task Manager
        </Link>
        <div className="space-x-4 flex items-center">
          <Link href="/tasks" className="hover:underline">
            Tasks
          </Link>
          <Link href="/tasks/new" className="hover:underline">
            New Task
          </Link>
          <button onClick={toggleTheme} className="ml-4">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </nav>
  )
}

