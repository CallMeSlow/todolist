import React, { createContext, useContext, ReactNode } from 'react';
import { useTodos } from '@/hooks/useTodos';

const TodoContext = createContext<ReturnType<typeof useTodos> | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const todoData = useTodos();
  
  return (
    <TodoContext.Provider value={todoData}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext必须在TodoProvider内使用');
  }
  return context;
} 