import React from "react";

import type {Todo} from "@/types/todo"

type TodoItemProps = {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void
}


export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {

    return (
        <li>
            <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)}></input>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
            </span>
            <button onClick={() => onDelete(todo.id)}>删除</button>
        </li>
    )
}
