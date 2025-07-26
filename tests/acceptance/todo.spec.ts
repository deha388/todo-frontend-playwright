import { test, expect } from '@playwright/test';

test.describe('Todo Application', () => {
  test('should add a new todo item to list', async ({ page }) => {
    // Given: Load the todo application
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const todoList = page.locator('[data-testid="todo-list"]');
    const todoInput = page.locator('[data-testid="todo-input"]');
    const addButton = page.locator('[data-testid="add-button"]');
    
    // Verify UI elements are visible
    await expect(todoList).toBeVisible();
    await expect(todoInput).toBeVisible();
    await expect(addButton).toBeVisible();
    
    // Count existing todos (backend might have existing data)
    const initialTodoCount = await todoList.locator('[data-testid="todo-item"]').count();
    
    // When: I write "buy some milk" to <text box> and click to <add button>
    await todoInput.fill('buy some milk');
    await addButton.click();
    
    // Wait for API call to complete
    await page.waitForTimeout(1500);
    
    // Then: I should see one more todo item in the list
    const finalTodoCount = await todoList.locator('[data-testid="todo-item"]').count();
    expect(finalTodoCount).toBe(initialTodoCount + 1);
    
    // And: The new todo should contain "buy some milk"
    const allTodos = todoList.locator('[data-testid="todo-item"]');
    let foundNewTodo = false;
    
    for (let i = 0; i < finalTodoCount; i++) {
      const todoText = await allTodos.nth(i).textContent();
      if (todoText && todoText.includes('buy some milk')) {
        foundNewTodo = true;
        break;
      }
    }
    
    expect(foundNewTodo).toBe(true);
  });
}); 