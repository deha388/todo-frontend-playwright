export interface Todo {
  id: string;
  text: string;
  createdAt: Date;
}

export interface CreateTodoRequest {
  text: string;
} 