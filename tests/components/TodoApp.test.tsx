import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoApp from '../../src/components/TodoApp';

describe('TodoApp Component', () => {
  test('should render input field and add button', () => {
    // Given: TodoApp component is rendered
    render(<TodoApp />);
    
    // When: Component is displayed
    const textInput = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Then: Input field and add button should be visible
    expect(textInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent('Add');
  });

  test('should render todo list container', () => {
    // Given: TodoApp component is rendered
    render(<TodoApp />);
    
    // When: Component is displayed
    const todoList = screen.getByTestId('todo-list');
    
    // Then: Todo list container should be visible
    expect(todoList).toBeInTheDocument();
  });
}); 