import Link from "next/link"
import { deleteTask } from "../utils/api"
import { useRouter } from "next/navigation"

export default function TaskList({ tasks }) {
  const router = useRouter()

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id)
        router.refresh()
      } catch (error) {
        console.error("Error deleting task:", error)
      }
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2">{task.description.substring(0, 100)}...</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          <span
            className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${
              task.status === "completed"
                ? "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
            }`}
          >
            {task.status}
          </span>
          <div className="mt-4 flex justify-end space-x-2">
            <Link href={`/tasks/${task.id}/edit`} className="text-blue-500 hover:underline">
              Edit
            </Link>
            <button onClick={() => handleDelete(task.id)} className="text-red-500 hover:underline">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

