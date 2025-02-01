"use client"

import { useState } from "react"
import { useAuth } from "../../components/AuthContext"
import { useRouter } from "next/navigation"

export default function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    try {
      // Implement your registration logic here
      // For example:
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, password }),
      // })
      // const data = await response.json()
      // if (response.ok) {
      //   await login(username, password)
      //   router.push('/tasks')
      // } else {
      //   setError(data.message)
      // }

      // For demonstration purposes, we'll just log in the user
      await login(username, password)
      router.push("/tasks")
    } catch (error) {
      console.error("Registration failed:", error)
      setError("Registration failed. Please try again.")
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  )
}

