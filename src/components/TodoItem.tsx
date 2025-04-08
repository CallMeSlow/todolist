import React, { useState } from "react";

import type { Todo } from "@/types/todo"

import styles from "./TodoItem.module.css";

type TodoItemProps = {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number, newText: string) => void;
}


export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState<string>(todo.content);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            console.log('editValue', editValue);
            if (editValue.trim() !== '') {
                onUpdate(todo.id, editValue);
            }
            setIsEditing(false);
        } else if (e.key === 'Escape') {
            console.log('editValue', editValue);
            console.log('editValue', todo.content);
            setEditValue(todo.content);
            setIsEditing(false);
        }
    };


    return (
        <li className={styles.TodoItem}>
            <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)}></input>

            {isEditing ? (
                <input
                className={styles.editInput}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => setIsEditing(false)}
                    autoFocus
                />
            ) : (
                <span className={`${styles.todoContent} ${todo.completed? styles.completed: ''}`} onDoubleClick={() => setIsEditing(true)}>
                    {todo.content}
                </span>
            )
            }
            <button className={styles.deleteButton} onClick={() => onDelete(todo.id)}>删除</button>
        </li>
    )
}
