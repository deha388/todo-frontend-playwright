export interface Todo {
  id: string;
  text: string;
  createdAt: Date;
}

export interface CreateTodoRequest {
  text: string;
}

export class TodoApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getTodos(): Promise<Todo[]> {
    const response = await fetch(`${this.baseUrl}/api/todos`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const todos = await response.json();
    return todos.map((todo: any) => ({
      ...todo,
      createdAt: new Date(todo.createdAt)
    }));
  }

  async createTodo(request: CreateTodoRequest): Promise<Todo> {
    const response = await fetch(`${this.baseUrl}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const todo = await response.json();
    return {
      ...todo,
      createdAt: new Date(todo.createdAt)
    };
  }
} 