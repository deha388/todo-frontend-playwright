import { Pact } from '@pact-foundation/pact';
import { TodoApiService } from '../../src/services/todoApi';
import path from 'path';

describe('Todo API Contract Tests', () => {
  let provider: Pact;
  let todoApiService: TodoApiService;

  beforeAll(async () => {
    // Setup Pact mock server
    provider = new Pact({
      consumer: 'TodoFrontend',
      provider: 'TodoBackend',
      port: 1234,
      log: path.resolve(process.cwd(), 'logs', 'pact.log'),
      dir: path.resolve(process.cwd(), 'pacts'),
      logLevel: 'info',
    });

    await provider.setup();
    
    // Point API service to Pact mock server for contract testing
    todoApiService = new TodoApiService('http://localhost:1234');
  });

  afterAll(async () => {
    await provider.finalize();
  });

  afterEach(async () => {
    await provider.verify();
  });

  describe('GET /api/todos', () => {
    test('should get empty todos list', async () => {
      // Given: Empty todos list expected from backend
      await provider.addInteraction({
        state: 'no todos exist',
        uponReceiving: 'a request for all todos',
        withRequest: {
          method: 'GET',
          path: '/api/todos',
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: [],
        },
      });

      // When: Frontend requests todos
      const todos = await todoApiService.getTodos();

      // Then: Should receive empty array
      expect(todos).toEqual([]);
    });

    test('should get todos list with items', async () => {
      // Given: Backend has todos
      const expectedTodos = [
        {
          id: 'uuid-123',
          text: 'buy some milk',
          createdAt: '2024-01-01T10:00:00.000Z',
        }
      ];

      await provider.addInteraction({
        state: 'todos exist',
        uponReceiving: 'a request for all todos',
        withRequest: {
          method: 'GET',
          path: '/api/todos',
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: expectedTodos,
        },
      });

      // When: Frontend requests todos
      const todos = await todoApiService.getTodos();

      // Then: Should receive todos with proper structure
      expect(todos).toHaveLength(1);
      expect(todos[0]).toEqual({
        id: 'uuid-123',
        text: 'buy some milk',
        createdAt: expect.any(Date),
      });
    });
  });

  describe('POST /api/todos', () => {
    test('should create new todo', async () => {
      // Given: Backend will create todo
      const createRequest = { text: 'buy some milk' };
      const expectedResponse = {
        id: 'uuid-456',
        text: 'buy some milk',
        createdAt: '2024-01-01T10:00:00.000Z',
      };

      await provider.addInteraction({
        state: 'backend is ready to create todos',
        uponReceiving: 'a request to create a todo',
        withRequest: {
          method: 'POST',
          path: '/api/todos',
          headers: {
            'Content-Type': 'application/json',
          },
          body: createRequest,
        },
        willRespondWith: {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
          body: expectedResponse,
        },
      });

      // When: Frontend creates todo
      const todo = await todoApiService.createTodo(createRequest);

      // Then: Should receive created todo
      expect(todo).toEqual({
        id: 'uuid-456',
        text: 'buy some milk',
        createdAt: expect.any(Date),
      });
    });
  });
}); 