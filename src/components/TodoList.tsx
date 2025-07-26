'use client';

import React from 'react';

interface Todo {
  id: string;
  text: string;
  createdAt: Date;
}

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return <div style={{ minHeight: '20px' }} />;
  }

  return (
    <div style={{ minHeight: '20px' }}>
      <h3 style={{ 
        marginBottom: '16px', 
        color: '#495057',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        Your Todos ({todos.length})
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {todos.map((todo, index) => (
          <div 
            key={todo.id} 
            data-testid="todo-item"
            style={{
              padding: '16px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              borderLeft: '4px solid #007bff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{
                minWidth: '24px',
                height: '24px',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {index + 1}
              </span>
              
              <span style={{
                fontSize: '16px',
                color: '#212529',
                flex: 1
              }}>
                {todo.text}
              </span>
              
              <span style={{
                fontSize: '12px',
                color: '#6c757d'
              }}>
                {new Date(todo.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 