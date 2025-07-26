# Todo Frontend Development - TDD Process

## Story: Simple Todo Application
**User Interface Goal:** A simple feature for adding a TODO item with basic listing functionality.

**Acceptance Criteria:**
```
Given Empty ToDo list
When I write "buy some milk" to <text box> and click to <add button>
Then I should see "buy some milk" item in ToDo list
```

## Backend API Endpoints Available:
- `GET /api/todos` - List all todos
- `POST /api/todos` - Create new todo

---

## Development Process Checklist

### Phase 1: Acceptance Test (Red)
- [ ] **1.1** Write Playwright acceptance test for the story
  - [ ] Test: Empty todo list → add "buy some milk" → verify item appears in list
  - [ ] **Expected:** Test fails (Red) - no UI exists yet

### Phase 2: Frontend Development (TDD Cycle)

#### Component Testing Phase
- [ ] **2.1** Write high-level component test (shallow rendering)
  - [ ] Test: TodoApp component renders with input field and add button
  - [ ] Test: TodoList component displays todo items correctly given data
  - [ ] **Expected:** Tests fail (Red) - no components exist yet

- [ ] **2.2** Write minimal components (presentation logic only)
  - [ ] Create TodoApp component with input field and button
  - [ ] Create TodoList component that displays todo items
  - [ ] **Expected:** Component tests pass, but acceptance test still fails

#### Business Logic Phase
- [ ] **2.3** Write unit tests for business logic
  - [ ] Test: Adding a todo item updates the todo list state
  - [ ] Test: Todo list starts empty
  - [ ] **Expected:** Tests fail (Red) - no business logic exists yet

- [ ] **2.4** Write business logic code
  - [ ] Implement state management for todos
  - [ ] Implement add todo functionality
  - [ ] **Expected:** Unit tests pass (Green)

#### API Integration Phase
- [ ] **2.5** Write Consumer Driven Contract (CDC) tests
  - [ ] Contract test: GET /api/todos returns array of todos
  - [ ] Contract test: POST /api/todos accepts todo item and returns success
  - [ ] Set up Pact.io or similar for mock backend
  - [ ] **Expected:** Contract tests fail initially, then pass with mocks

- [ ] **2.6** Integrate API calls
  - [ ] Connect components to actual API endpoints
  - [ ] Handle loading states and errors
  - [ ] **Expected:** Full integration works with mock backend

#### Refactor Phase
- [ ] **2.7** Refactor and clean up
  - [ ] Code cleanup and optimization
  - [ ] Component structure improvements
  - [ ] Test organization and cleanup
  - [ ] **Expected:** All tests still pass (Green)

### Phase 3: Verification
- [ ] **3.1** Run acceptance test with mock backend
  - [ ] **Expected:** Acceptance test passes (Green)
  - [ ] Frontend is complete and ready for backend integration

---

## File Structure Plan

```
todo-frontend-playwright/
├── src/
│   ├── components/
│   │   ├── TodoApp.tsx
│   │   ├── TodoList.tsx
│   │   └── TodoItem.tsx
│   ├── hooks/
│   │   └── useTodos.ts
│   ├── services/
│   │   └── todoApi.ts
│   └── types/
│       └── todo.ts
├── tests/
│   ├── acceptance/
│   │   └── todo.spec.ts (Playwright)
│   ├── components/
│   │   ├── TodoApp.test.tsx
│   │   ├── TodoList.test.tsx
│   │   └── TodoItem.test.tsx
│   ├── unit/
│   │   ├── useTodos.test.ts
│   │   └── todoApi.test.ts
│   └── contracts/
│       └── todo-api.pact.ts
├── package.json
└── next.config.js
```

---

## Technology Stack
- **Framework:** Next.js 14
- **Testing Framework:** Jest + React Testing Library
- **E2E Testing:** Playwright
- **Contract Testing:** Pact.js
- **Styling:** Tailwind CSS (for modern UI)
- **State Management:** React hooks (useState, useEffect)

---

## Current Status: Ready to Begin
**Next Step:** Start with Phase 1.1 - Write the first acceptance test

---

## Notes
- Each Red-Green-Refactor cycle must be completed before moving to the next step
- No actual implementation code should be written until tests are in place and failing
- All tests must follow the given-when-then structure where applicable
- Contract tests will use mock backend until backend development phase 