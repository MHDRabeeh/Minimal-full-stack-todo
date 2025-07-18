"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { logout } from '../store/features/authSlice'
import { createTodo, getTodo, updateTodo, deleteTodo, completeTodo } from '../_api/userService'

export default function TodoList() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [count, setCount] = useState(1)
    const [todos, setTodos] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [editTitle, setEditTitle] = useState("")
    const [editDescription, setEditDescription] = useState("")

    const { user, isAuthenticated } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/")
        }
        const fetchTodo = async () => {
            const response = await getTodo()
            setTodos(response.todos)
        }
        fetchTodo()
    }, [isAuthenticated, count])

    const handleTodo = async (e) => {
        e.preventDefault()
        try {
            await createTodo({ title, description })
            setTitle("")
            setDescription("")
            setCount((prev) => (prev + 1))
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditClick = (todo) => {
        setEditingId(todo._id)
        setEditTitle(todo.title)
        setEditDescription(todo.description)
    }

    const handleEditSubmit = async (e, todoId) => {
        e.preventDefault()
        try {
            await updateTodo(todoId, { 
                title: editTitle, 
                description: editDescription 
            })
            setEditingId(null)
            setCount(prev => prev + 1)
        } catch (error) {
            console.error("Edit error:", error)
        }
    }

    const handleCancelEdit = () => {
        setEditingId(null)
    }

    const handleDelete = async (todoId) => {
        try {
            await deleteTodo(todoId)
            setCount(prev => prev + 1)
        } catch (error) {
            console.error("Delete error:", error)
        }
    }

    const handleComplete = async (todoId) => {
        try {
            await completeTodo(todoId)
            setCount(prev => prev + 1)
        } catch (error) {
            console.error("Complete error:", error)
        }
    }

    return (
        <div>
            {isAuthenticated && (
                <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
                    {/* Header */}
                    <header className="max-w-3xl mx-auto mb-8">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-bold text-indigo-700">My Todo List</h1>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500 hidden sm:inline">
                                    Welcome back, {user?.username}!
                                </span>
                                <button 
                                    onClick={() => dispatch(logout())} 
                                    className="px-4 py-2 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="max-w-3xl mx-auto">
                        {/* Add Todo Form */}
                        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
                            <form onSubmit={handleTodo} className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 space-y-2">
                                    <input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        type="text"
                                        placeholder="Todo title"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required
                                    />
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Description (optional)"
                                        rows={2}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="h-full sm:h-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-sm"
                                >
                                    Add Todo
                                </button>
                            </form>
                        </div>

                        {/* Todo List */}
                        <div className="space-y-3">
                            {todos.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                                        <span className="text-indigo-500 text-2xl">☑</span>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-700">No tasks yet</h3>
                                    <p className="text-gray-500 mt-1">Add your first task above</p>
                                </div>
                            ) : (
                                todos.map((todo) => (
                                    <div key={todo._id}>
                                        {editingId === todo._id ? (
                                            // Edit Form
                                            <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-yellow-400 mb-3">
                                                <form onSubmit={(e) => handleEditSubmit(e, todo._id)}>
                                                    <input
                                                        value={editTitle}
                                                        onChange={(e) => setEditTitle(e.target.value)}
                                                        className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        required
                                                    />
                                                    <textarea
                                                        value={editDescription}
                                                        onChange={(e) => setEditDescription(e.target.value)}
                                                        className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        rows={2}
                                                    />
                                                    <div className="flex justify-end space-x-3">
                                                        <button
                                                            type="button"
                                                            onClick={handleCancelEdit}
                                                            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                                        >
                                                            Save Changes
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        ) : todo.status === "completed" ? (
                                            // Completed Todo Item
                                            <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-green-500 flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center">
                                                        <span className="text-green-500 mr-2 font-bold">✓</span>
                                                        <h3 className="font-medium text-gray-500 line-through">{todo.title}</h3>
                                                    </div>
                                                    {todo.description && (
                                                        <p className="text-sm text-gray-400 ml-6 mt-1 line-through">
                                                            {todo.description}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex space-x-2 ml-4">
                                                    <button 
                                                        onClick={() => handleComplete(todo._id)}
                                                        className="px-3 py-1 text-xs bg-yellow-50 text-yellow-600 rounded-md hover:bg-yellow-100 transition"
                                                    >
                                                        Undo
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(todo._id)}
                                                        className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            // Pending Todo Item
                                            <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-indigo-500 flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center">
                                                        <span className="text-indigo-500 mr-2 font-bold">○</span>
                                                        <h3 className="font-medium text-gray-700">{todo.title}</h3>
                                                    </div>
                                                    {todo.description && (
                                                        <p className="text-sm text-gray-600 ml-6 mt-1">
                                                            {todo.description}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex space-x-2 ml-4">
                                                    <button 
                                                        onClick={() => handleComplete(todo._id)}
                                                        className="px-3 py-1 text-xs bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition"
                                                    >
                                                        Complete
                                                    </button>
                                                    <button 
                                                        onClick={() => handleEditClick(todo)}
                                                        className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(todo._id)}
                                                        className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </main>
                </div>
            )}
        </div>
    )
}