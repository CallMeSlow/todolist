"use client"

import React, { useState, useEffect } from "react";
import TodoItem from "@/components/TodoItem";
import { useTodoInput } from "@/hooks/useTodoInput";
import TodoStats from "@/components/TodoStats";
import { TodoProvider, useTodoContext } from "@/context/TodoContext";
import { CounterProvider } from "@/context/CounterContext";
import { CounterStatus } from "@/components/CounterStatus";
import { AddCount } from "@/components/AddCoun";
import styles from "./page.module.css";


// 为userTodoInput的返回值定义接口
interface TodoInput {
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearInput: () => void;
}

export default function Home() {
  const input = useTodoInput("")
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null;

  return (

    <main className={styles.container}>
      <TodoProvider>
        <HomeContent input={input} />
      </TodoProvider>
    </main>

  );
}

function HomeContent({ input }: { input: TodoInput }) {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo, clearAll } = useTodoContext();

  return (
    <div style={{ padding: '20px' }}>
      <h1 className={styles.title}>我的待办事项</h1>

      <TodoStats />

      <div className={styles.inputRow}>
        <button className={styles.clearButton} onClick={clearAll}>清空所有</button>

        <input className={styles.input} type="text" value={input.inputValue} onChange={input.onChange} placeholder="添加新的待办任务" />
        <button className={styles.button} onClick={() => {
          addTodo(input.inputValue)
          input.clearInput()
        }}>添加</button>

      </div>




      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
            onUpdate={updateTodo}
          />
        ))}
      </ul>
    </div>
  );
}