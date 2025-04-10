import React, { useState } from "react";

import type { Todo } from "@/types/todo"

import styles from "./TodoItem.module.css";
import { motion } from "framer-motion"

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
        <motion.li
            className={styles.TodoItem}
            layout
            whileTap={{scale:0.95}}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
        >
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
                <span className={`${styles.todoContent} ${todo.completed ? styles.completed : ''}`} onDoubleClick={() => setIsEditing(true)}>
                    {todo.content}
                </span>
            )
            }
            <button className={styles.deleteButton} onClick={() => onDelete(todo.id)}>删除</button>
        </motion.li>
    )
}
