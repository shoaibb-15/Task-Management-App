"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const login = async (username, password) => {
    // Implement your login logic here
    // For example:
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, password }),
    // })
    // const data = await response.json()
    // if (response.ok) {
    //   setToken(data.token)
    //   localStorage.setItem('token', data.token)
    // } else {
    //   throw new Error(data.message)
    // }

    // For demonstration purposes, we'll use a mock token
    const mockToken = "mock_jwt_token"
    setToken(mockToken)
    localStorage.setItem("token", mockToken)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem("token")
  }

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

