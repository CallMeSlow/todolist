import React, { useState } from "react";

import type { Todo } from "@/types/todo"

type TodoItemProps = {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number, newText: string) => void;
}


export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState<string>(todo.text);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            console.log('editValue', editValue);
            if (editValue.trim() !== '') {
                onUpdate(todo.id, editValue);
            }
            setIsEditing(false);
        } else if (e.key === 'Escape') {
            console.log('editValue', editValue);
            console.log('editValue', todo.text);
            setEditValue(todo.text);
            setIsEditing(false);
        }
    };


    return (
        <li>
            <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)}></input>

            {isEditing ? (
                <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => setIsEditing(false)}
                    autoFocus
                />
            ) : (
                <span onDoubleClick={() => setIsEditing(true)} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    {todo.text}
                </span>
            )
            }
            <button onClick={() => onDelete(todo.id)}>删除</button>
        </li>
    )
}
