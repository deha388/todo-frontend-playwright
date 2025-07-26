import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../../src/components/TodoList';

describe('TodoList Component', () => {
  test('should display todo items correctly given data', () => {
    // Given: TodoList component with sample todos
    const mockTodos = [
      { id: 'uuid-1', text: 'buy some milk', createdAt: new Date('2024-01-01') },
      { id: 'uuid-2', text: 'walk the dog', createdAt: new Date('2024-01-02') }
    ];
    
    // When: TodoList is rendered with data
    render(<TodoList todos={mockTodos} />);
    
    // Then: Todo items should be displayed correctly
    const todoItems = screen.getAllByTestId('todo-item');
    expect(todoItems).toHaveLength(2);
    expect(todoItems[0]).toHaveTextContent('buy some milk');
    expect(todoItems[1]).toHaveTextContent('walk the dog');
  });

  test('should display empty list when no todos provided', () => {
    // Given: TodoList component with empty todos
    const emptyTodos: any[] = [];
    
    // When: TodoList is rendered with empty data
    render(<TodoList todos={emptyTodos} />);
    
    // Then: No todo items should be displayed
    const todoItems = screen.queryAllByTestId('todo-item');
    expect(todoItems).toHaveLength(0);
  });
}); 