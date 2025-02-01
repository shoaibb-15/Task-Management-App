import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "../components/ThemeContext"
import Navbar from "../components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Task Management App",
  description: "Manage your tasks efficiently",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

