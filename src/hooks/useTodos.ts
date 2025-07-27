import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';

export function useTodos() {
  // State: todos starts empty, loading state
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  // Load todos from API on component mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/todos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const todos = await response.json();
        const todosFromApi = todos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
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
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const todo = await response.json();
      const newTodo = {
        ...todo,
        createdAt: new Date(todo.createdAt)
      };
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