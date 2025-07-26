'use client';

import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoList from './TodoList';

export default function TodoApp() {
  const { todos, addTodo, loading } = useTodos();
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = async () => {
    if (inputValue.trim()) {
      await addTodo(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Input Section */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '30px'
      }}>
        <input 
          data-testid="todo-input" 
          type="text" 
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          style={{
            flex: 1,
            padding: '12px 16px',
            fontSize: '16px',
            border: '2px solid #e1e5e9',
            borderRadius: '8px',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
        />
        <button 
          data-testid="add-button"
          onClick={handleAddTodo}
          disabled={loading || !inputValue.trim()}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: loading || !inputValue.trim() ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading || !inputValue.trim() ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
            minWidth: '80px'
          }}
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </div>
      
      {/* Todo List Section */}
      <div data-testid="todo-list">
        <TodoList todos={todos} />
      </div>
      
      {/* Status Info */}
      {todos.length === 0 && !loading && (
        <p style={{ 
          textAlign: 'center', 
          color: '#6c757d', 
          fontSize: '14px',
          marginTop: '40px' 
        }}>
          No todos yet. Add one above! 👆
        </p>
      )}
    </div>
  );
} 