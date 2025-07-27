import { renderHook, act, waitFor } from '@testing-library/react';
import { useTodos } from '../../src/hooks/useTodos';

// Mock fetch calls to /api/todos endpoint

describe('useTodos Hook - Business Logic', () => {
  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    // Mock fetch with jest.spyOn (cleaner than global mock)
    fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => []
    } as Response);
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  test('todo list starts empty', async () => {
    // Given: useTodos hook is initialized
    const { result } = renderHook(() => useTodos());
    
    // When: Hook is first loaded, wait for initial useEffect to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Then: Todo list should be empty
    const { todos } = result.current;
    expect(todos).toEqual([]);
    expect(todos).toHaveLength(0);
  });

  test('adding a todo item updates the todo list state', async () => {
    // Given: useTodos hook is initialized with empty list
    const { result } = renderHook(() => useTodos());
    
    // Wait for initial load to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Mock POST /api/todos response for addTodo call
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 'test-uuid',
        text: 'buy some milk',
        createdAt: '2024-01-01T10:00:00.000Z'
      })
    } as Response);
    
    // When: A new todo is added
    await act(async () => {
      await result.current.addTodo('buy some milk');
    });
    
    // Wait for the todo to be added to state
    await waitFor(() => {
      expect(result.current.todos).toHaveLength(1);
    });
    
    // Then: Todo list should contain the new item
    const { todos } = result.current;
    expect(todos[0]).toEqual({
      id: 'test-uuid',
      text: 'buy some milk',
      createdAt: expect.any(Date)
    });
  });

  test('adding multiple todos updates the list correctly', async () => {
    // Given: useTodos hook is initialized
    const { result } = renderHook(() => useTodos());
    
    // Wait for initial load to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Mock POST responses for both todos (in order they'll be called)
    fetchSpy
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 'test-uuid-1',
          text: 'buy some milk',
          createdAt: '2024-01-01T10:00:00.000Z'
        })
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 'test-uuid-2',
          text: 'walk the dog',  
          createdAt: '2024-01-01T10:05:00.000Z'
        })
      } as Response);
    
    // When: Multiple todos are added
    await act(async () => {
      await result.current.addTodo('buy some milk');
    });
    
    // Wait for first todo to be added
    await waitFor(() => {
      expect(result.current.todos).toHaveLength(1);
    });
    
    await act(async () => {
      await result.current.addTodo('walk the dog');
    });
    
    // Wait for second todo to be added
    await waitFor(() => {
      expect(result.current.todos).toHaveLength(2);
    });
    
    // Then: Todo list should contain both items
    const { todos } = result.current;
    expect(todos[0].text).toBe('buy some milk');
    expect(todos[1].text).toBe('walk the dog');
  });
}); 