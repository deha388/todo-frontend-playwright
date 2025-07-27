import { NextRequest, NextResponse } from 'next/server';

// Backend service URL (server-side, K8s internal service)
const BACKEND_URL = process.env.BACKEND_URL || 'http://todo-backend-service:8083';

// GET /api/todos - Fetch all todos
export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/todos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const todos = await response.json();
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Failed to fetch todos from backend:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

// POST /api/todos - Create new todo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const newTodo = await response.json();
    return NextResponse.json(newTodo);
  } catch (error) {
    console.error('Failed to create todo:', error);
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
} 