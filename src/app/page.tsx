"use client"

import React, { useState, useEffect } from "react";
import TodoItem from "@/components/TodoItem"
import { userTodos } from "@/hooks/userTodos";
import { userTodoInput } from "@/hooks/userTodoInput"


export default function Home() {

  const userTodo = userTodos();

  const input = userTodoInput("")

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null;


  return (
    <main style={{ padding: '20px' }}>
      <h1>我的待办事项</h1>
      <button onClick={userTodo.clearAll} style={{ marginRight: '10px' }}>清空所有</button>

      <input type="text" value={input.inputValue} onChange={input.onChange} placeholder="添加新的待办任务" />
      <button onClick={() => {
        userTodo.addTodo(input.inputValue)
        input.clearInput()
      }}>添加</button>
      <ul>
        {userTodo.todos.map(todo => {
          return <TodoItem key={todo.id} todo={todo} onToggle={() => userTodo.toggleTodo(todo.id)} onDelete={() => userTodo.deleteTodo(todo.id)} onUpdate={userTodo.updateTodo} />
        })
        }
      </ul>

    </main>
  );
}