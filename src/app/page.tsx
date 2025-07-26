import TodoApp from '../components/TodoApp';

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px 0'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#212529',
          margin: '0 0 8px 0',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          ✅ Todo App
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#6c757d',
          margin: 0
        }}>
          Keep track of your tasks
        </p>
      </div>
      
      <TodoApp />
    </main>
  );
} 