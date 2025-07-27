import { useState, useEffect } from 'react';
import { TodoApiService, Todo } from '../services/todoApi';

// Use Next.js API routes for server-side proxy to backend
const API_BASE_URL = ''; // Empty for same-origin requests to /api/*
const todoApiService = new TodoApiService(API_BASE_URL);

export function useTodos() {
  // State: todos starts empty, loading state
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  // Load todos from API on component mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        const todosFromApi = await todoApiService.getTodos();
        setTodos(todosFromApi);
      } catch (error) {
        console.error('Failed to load todos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  // Function: addTodo calls API then updates local state
  const addTodo = async (text: string) => {
    try {
      setLoading(true);
      const newTodo = await todoApiService.createTodo({ text });
      setTodos(prevTodos => [...prevTodos, newTodo]);
    } catch (error) {
      console.error('Failed to add todo:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    todos,
    addTodo,
    loading
  };
} 